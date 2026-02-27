const CONFIG = {
  dataUrl: "./data/web_page_list_template.json"
};

const STATUS_LABELS = {
  active: "운영 중",
  planning: "준비 중",
  archived: "보관"
};

const TYPE_LABELS = {
  web: "웹",
  mobile: "모바일",
  backend: "백엔드",
  tool: "도구",
  ai: "AI",
  game: "게임",
  other: "기타"
};

const els = {
  card: document.getElementById("featured-card"),
  totalProjects: document.getElementById("total-projects")
};

function resolveLocalizedText(value) {
  if (typeof value === "string") {
    return value;
  }
  if (!value || typeof value !== "object") {
    return "";
  }

  return value.ko
    ?? value.en
    ?? value.ja
    ?? value.zh
    ?? Object.values(value).find((entry) => typeof entry === "string")
    ?? "";
}

function formatDate(dateString) {
  if (!dateString) {
    return "-";
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

function statusLabel(status) {
  return STATUS_LABELS[status] ?? STATUS_LABELS.planning;
}

function typeLabel(type) {
  return TYPE_LABELS[type] ?? TYPE_LABELS.other;
}

function parseHostname(url) {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, "");
  } catch (error) {
    return "preview.local";
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeProject(project, index = 0) {
  const normalizedType = String(project?.type ?? "other").toLowerCase();
  const normalizedStatus = String(project?.status ?? "planning").toLowerCase();

  return {
    id: project?.id ?? `project-${index + 1}`,
    name: resolveLocalizedText(project?.name) || "이름 없는 페이지",
    description: resolveLocalizedText(project?.description) || "페이지 설명이 아직 등록되지 않았습니다.",
    type: TYPE_LABELS[normalizedType] ? normalizedType : "other",
    status: STATUS_LABELS[normalizedStatus] ? normalizedStatus : "planning",
    updatedAt: project?.updatedAt ?? null,
    serviceUrl: project?.links?.service ?? ""
  };
}

async function loadProjects() {
  try {
    const response = await fetch(CONFIG.dataUrl, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${CONFIG.dataUrl}: ${response.status}`);
    }

    const raw = await response.json();
    return Array.isArray(raw.projects) ? raw.projects : [];
  } catch (error) {
    console.error("프로젝트 로딩 실패:", error);
    return [];
  }
}

function createCardMarkup(project) {
  const hostname = parseHostname(project.serviceUrl);
  const isLinked = Boolean(project.serviceUrl);
  const previewMarkup = isLinked
    ? `
      <div class="preview-shell">
        <div class="preview-toolbar">
          <span></span><span></span><span></span>
        </div>
        <div class="preview-canvas preview-canvas-live">
          <p class="preview-label">LIVE SCREEN</p>
          <p class="preview-domain">${escapeHtml(hostname)}</p>
          <div class="preview-frame-wrap">
            <div class="preview-loading">실시간 화면 불러오는 중...</div>
            <iframe
              class="preview-iframe"
              title="${escapeHtml(project.name)} 미리보기"
              src="${escapeHtml(project.serviceUrl)}"
              loading="lazy"
              referrerpolicy="no-referrer"
            ></iframe>
          </div>
        </div>
      </div>
    `
    : `
      <div class="preview-shell" aria-hidden="true">
        <div class="preview-toolbar">
          <span></span><span></span><span></span>
        </div>
        <div class="preview-canvas">
          <p class="preview-label">BASIC SCREEN</p>
          <h3 class="preview-title">${escapeHtml(project.name)}</h3>
          <p class="preview-domain">${escapeHtml(hostname)}</p>
          <div class="preview-lines">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    `;
  const actionMarkup = isLinked
    ? `<a class="action-link" href="${escapeHtml(project.serviceUrl)}" target="_blank" rel="noreferrer">페이지 열기</a>`
    : '<span class="action-disabled">링크 준비 중</span>';

  return `
    ${previewMarkup}

    <div class="card-content">
      <div class="meta-row">
        <span class="type-pill">${escapeHtml(typeLabel(project.type))}</span>
        <span class="status-pill status-${escapeHtml(project.status)}">${escapeHtml(statusLabel(project.status))}</span>
      </div>

      <h3 class="card-title">${escapeHtml(project.name)}</h3>
      <p class="card-description">${escapeHtml(project.description)}</p>

      <dl class="card-meta">
        <div class="card-meta-item">
          <dt>페이지 ID</dt>
          <dd>${escapeHtml(project.id)}</dd>
        </div>
        <div class="card-meta-item">
          <dt>업데이트</dt>
          <dd>${escapeHtml(formatDate(project.updatedAt))}</dd>
        </div>
      </dl>

      <div class="card-actions">
        ${actionMarkup}
      </div>
    </div>
  `;
}

function hydrateLivePreview() {
  const iframe = els.card.querySelector(".preview-iframe");
  const loading = els.card.querySelector(".preview-loading");
  if (!iframe || !loading) {
    return;
  }

  const hideLoading = () => {
    loading.classList.add("is-hidden");
  };

  const timeoutId = setTimeout(hideLoading, 8000);

  iframe.addEventListener("load", () => {
    clearTimeout(timeoutId);
    hideLoading();
  }, { once: true });

  iframe.addEventListener("error", () => {
    clearTimeout(timeoutId);
    loading.textContent = "미리보기를 불러올 수 없습니다. '페이지 열기'를 이용해주세요.";
    loading.classList.add("is-error");
  }, { once: true });
}

function renderEmptyState() {
  els.card.innerHTML = `
    <div class="empty-card">
      <p>표시할 페이지가 없습니다.<br>data/web_page_list_template.json에 프로젝트를 추가해 주세요.</p>
    </div>
  `;
}

function renderFeaturedCard(projects) {
  if (!projects.length) {
    renderEmptyState();
    return;
  }

  const normalized = projects.map((project, index) => normalizeProject(project, index));
  const featured = normalized.find((project) => project.status === "active") ?? normalized[0];
  els.card.innerHTML = createCardMarkup(featured);
  hydrateLivePreview();
}

function renderTotal(projects) {
  els.totalProjects.textContent = `${projects.length} Projects Indexed`;
}

async function init() {
  const projects = await loadProjects();
  renderTotal(projects);
  renderFeaturedCard(projects);
}

init();
