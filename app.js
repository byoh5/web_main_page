const CONFIG = {
  dataUrl: "./data/web_page_list_template.json"
};

const DESKTOP_PREVIEW = {
  width: 1440,
  height: 900
};

const KNOWN_TYPES = new Set(["web", "mobile", "backend", "tool", "ai", "game", "other"]);

const els = {
  card: document.getElementById("featured-card"),
  totalProjects: document.getElementById("total-projects")
};

let resizeBound = false;

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

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeProject(project, index = 0) {
  const normalizedType = String(project?.type ?? "other").toLowerCase();
  const serviceUrl = typeof project?.links?.service === "string"
    ? project.links.service.trim()
    : "";

  return {
    id: project?.id ?? `project-${index + 1}`,
    name: resolveLocalizedText(project?.name) || "이름 없는 페이지",
    description: resolveLocalizedText(project?.description) || "페이지 설명이 아직 등록되지 않았습니다.",
    type: KNOWN_TYPES.has(normalizedType) ? normalizedType : "other",
    serviceUrl
  };
}

function iconForProject(project) {
  const haystack = `${project.id} ${project.name} ${project.description}`.toLowerCase();

  if (/quiz|gugudan|hanja|study|learn|education|vocabulary/.test(haystack)) {
    return { symbol: "📘", label: "학습" };
  }
  if (/dothegi|whack|mole|game|arcade/.test(haystack)) {
    return { symbol: "🎮", label: "게임" };
  }
  if (/passport|photo|image|camera|crop/.test(haystack)) {
    return { symbol: "📷", label: "이미지" };
  }
  if (/asset|finance|dashboard|excel/.test(haystack)) {
    return { symbol: "📈", label: "자산" };
  }
  if (/lotto|random/.test(haystack)) {
    return { symbol: "🎲", label: "로또" };
  }
  if (/plot|graph|chart|scatter|regression|csv/.test(haystack)) {
    return { symbol: "📊", label: "그래프" };
  }
  if (/face|detector|vision/.test(haystack)) {
    return { symbol: "🙂", label: "얼굴 탐지" };
  }

  switch (project.type) {
    case "game":
      return { symbol: "🎮", label: "게임" };
    case "tool":
      return { symbol: "🛠️", label: "도구" };
    case "ai":
      return { symbol: "🤖", label: "AI" };
    case "mobile":
      return { symbol: "📱", label: "모바일" };
    case "backend":
      return { symbol: "🧩", label: "백엔드" };
    case "web":
      return { symbol: "🌐", label: "웹" };
    default:
      return { symbol: "📦", label: "프로젝트" };
  }
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

function createPreviewMarkup(project) {
  if (!project.serviceUrl) {
    return `
      <div class="preview-shell preview-shell-placeholder" aria-hidden="true">
        <div class="preview-toolbar">
          <span></span><span></span><span></span>
        </div>
        <div class="preview-placeholder">링크가 준비되면 프로젝트 UI 미리보기가 표시됩니다.</div>
      </div>
    `;
  }

  return `
    <div class="preview-shell">
      <div class="preview-toolbar" aria-hidden="true">
        <span></span><span></span><span></span>
      </div>
      <div class="preview-frame-wrap has-live-preview">
        <div
          class="preview-desktop-stage"
          data-desktop-width="${DESKTOP_PREVIEW.width}"
          data-desktop-height="${DESKTOP_PREVIEW.height}"
        >
          <iframe
            class="preview-iframe"
            title="${escapeHtml(project.name)} 미리보기"
            src="${escapeHtml(project.serviceUrl)}"
            loading="lazy"
            referrerpolicy="no-referrer"
          ></iframe>
        </div>
        <div class="preview-loading">실시간 화면 불러오는 중...</div>
      </div>
    </div>
  `;
}

function createCardMarkup(project, index) {
  const detailId = `project-detail-${index + 1}`;
  const icon = iconForProject(project);
  const iconMarkup = project.serviceUrl
    ? `
      <a
        class="project-icon-link tone-${escapeHtml(project.type)}"
        href="${escapeHtml(project.serviceUrl)}"
        target="_blank"
        rel="noreferrer"
        title="${escapeHtml(project.name)} 열기"
        aria-label="${escapeHtml(project.name)} 페이지 열기"
      >
        <span class="project-icon-symbol" aria-hidden="true">${icon.symbol}</span>
        <span class="sr-only">${escapeHtml(icon.label)}</span>
      </a>
    `
    : `
      <span
        class="project-icon-link is-disabled tone-${escapeHtml(project.type)}"
        aria-hidden="true"
      >
        <span class="project-icon-symbol">${icon.symbol}</span>
      </span>
    `;

  return `
    <header class="card-compact">
      ${iconMarkup}
      <div class="compact-copy">
        <h3 class="compact-title">${escapeHtml(project.name)}</h3>
        <p class="compact-description">${escapeHtml(project.description)}</p>
      </div>
      <button
        class="compact-toggle"
        type="button"
        aria-expanded="false"
        aria-controls="${escapeHtml(detailId)}"
      >
        <span class="sr-only">상세 보기</span>
        <span class="toggle-chevron" aria-hidden="true"></span>
      </button>
    </header>

    <div class="card-expandable" id="${escapeHtml(detailId)}" hidden>
      ${createPreviewMarkup(project)}
    </div>
  `;
}

function hydrateLivePreview() {
  const wraps = els.card.querySelectorAll(".preview-frame-wrap.has-live-preview");
  if (!wraps.length) {
    return;
  }

  wraps.forEach((wrap) => {
    if (wrap.dataset.hydrated === "true") {
      return;
    }

    const iframe = wrap.querySelector(".preview-iframe");
    const loading = wrap.querySelector(".preview-loading");
    if (!iframe || !loading) {
      return;
    }

    wrap.dataset.hydrated = "true";

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
      loading.textContent = "미리보기를 불러올 수 없습니다. 아이콘을 눌러 페이지를 열어주세요.";
      loading.classList.add("is-error");
    }, { once: true });
  });
}

function resizeDesktopPreview(scope = document) {
  const wraps = scope.querySelectorAll(".preview-frame-wrap.has-live-preview");
  wraps.forEach((wrap) => {
    if (wrap.offsetParent === null) {
      return;
    }

    const stage = wrap.querySelector(".preview-desktop-stage");
    if (!stage) {
      return;
    }

    const baseWidth = Number(stage.dataset.desktopWidth) || DESKTOP_PREVIEW.width;
    const baseHeight = Number(stage.dataset.desktopHeight) || DESKTOP_PREVIEW.height;
    const availableWidth = wrap.clientWidth;

    if (!availableWidth || !baseWidth || !baseHeight) {
      return;
    }

    const scale = Math.min(1, availableWidth / baseWidth);
    stage.style.setProperty("--preview-scale", scale.toFixed(4));
    wrap.style.height = `${Math.round(baseHeight * scale)}px`;
  });
}

function bindResizeHandler() {
  if (resizeBound) {
    return;
  }

  let rafId = null;
  window.addEventListener("resize", () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
    rafId = requestAnimationFrame(() => {
      resizeDesktopPreview(els.card);
      rafId = null;
    });
  });

  resizeBound = true;
}

function enableExpandableCards() {
  const cards = els.card.querySelectorAll(".featured-card-item");

  cards.forEach((card) => {
    const toggle = card.querySelector(".compact-toggle");
    const panel = card.querySelector(".card-expandable");

    if (!toggle || !panel) {
      return;
    }

    toggle.addEventListener("click", () => {
      const willExpand = toggle.getAttribute("aria-expanded") !== "true";

      toggle.setAttribute("aria-expanded", String(willExpand));
      panel.hidden = !willExpand;
      card.classList.toggle("is-expanded", willExpand);

      if (willExpand) {
        resizeDesktopPreview(card);
      }
    });
  });
}

function renderEmptyState() {
  els.card.innerHTML = `
    <div class="empty-card">
      <p>표시할 페이지가 없습니다.<br>data/web_page_list_template.json에 프로젝트를 추가해 주세요.</p>
    </div>
  `;
}

function renderProjectCards(projects) {
  if (!projects.length) {
    renderEmptyState();
    return;
  }

  const normalized = projects.map((project, index) => normalizeProject(project, index));
  els.card.innerHTML = normalized
    .map((project, index) => `<section class="featured-card-item">${createCardMarkup(project, index)}</section>`)
    .join("");

  enableExpandableCards();
  hydrateLivePreview();
  bindResizeHandler();
}

function renderTotal(projects) {
  els.totalProjects.textContent = `${projects.length} Projects Indexed`;
}

async function init() {
  const projects = await loadProjects();
  renderTotal(projects);
  renderProjectCards(projects);
}

init();
