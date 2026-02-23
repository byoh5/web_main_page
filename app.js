const CONFIG = {
  dataUrl: "./data/projects.json",
  remoteSourceEnabled: false,
  remoteUrl: ""
};

const STATUS_LABELS = {
  active: "운영 중",
  planning: "기획 중",
  archived: "보관"
};

const state = {
  projects: [],
  selectedType: "ALL",
  query: ""
};

const els = {
  totalCount: document.getElementById("total-count"),
  activeCount: document.getElementById("active-count"),
  lastUpdated: document.getElementById("last-updated"),
  searchInput: document.getElementById("search-input"),
  typeFilters: document.getElementById("type-filters"),
  resultCount: document.getElementById("result-count"),
  projectGrid: document.getElementById("project-grid"),
  emptyState: document.getElementById("empty-state")
};

const toSafeArray = (value) => (Array.isArray(value) ? value.filter(Boolean) : []);

async function loadProjects() {
  const endpoint = CONFIG.remoteSourceEnabled && CONFIG.remoteUrl ? CONFIG.remoteUrl : CONFIG.dataUrl;

  try {
    const response = await fetch(endpoint, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${response.status}`);
    }
    const raw = await response.json();
    return raw.projects ?? [];
  } catch (error) {
    console.error("프로젝트 로딩 실패:", error);
    return [];
  }
}

function normalizeProjects(projects) {
  return projects.map((project, index) => ({
    id: project.id ?? `project-${index + 1}`,
    name: project.name ?? "Untitled Project",
    description: project.description ?? "",
    type: (project.type ?? "other").toLowerCase(),
    stack: toSafeArray(project.stack),
    links: {
      service: project.links?.service ?? "",
      repo: project.links?.repo ?? "",
      docs: project.links?.docs ?? ""
    },
    status: project.status ?? "planning",
    updatedAt: project.updatedAt ?? null
  }));
}

function typeLabel(type) {
  const map = {
    web: "Web",
    mobile: "Mobile",
    backend: "Backend",
    tool: "Tool",
    ai: "AI",
    game: "Game",
    other: "Other"
  };
  return map[type] ?? type.toUpperCase();
}

function formatDate(value) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

function newestDate(projects) {
  const sorted = [...projects]
    .filter((item) => item.updatedAt)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  return sorted[0]?.updatedAt ?? null;
}

function buildTypeFilters(projects) {
  const uniqueTypes = [...new Set(projects.map((project) => project.type))];
  const filterList = ["ALL", ...uniqueTypes];

  els.typeFilters.innerHTML = "";

  filterList.forEach((type) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `chip${state.selectedType === type ? " is-active" : ""}`;
    btn.dataset.type = type;
    btn.textContent = type === "ALL" ? "전체" : typeLabel(type);
    btn.addEventListener("click", () => {
      state.selectedType = type;
      render();
    });
    els.typeFilters.append(btn);
  });
}

function filteredProjects() {
  const query = state.query.trim().toLowerCase();
  return state.projects.filter((project) => {
    const typeMatch = state.selectedType === "ALL" || project.type === state.selectedType;
    if (!typeMatch) {
      return false;
    }

    if (!query) {
      return true;
    }

    const haystack = [
      project.name,
      project.description,
      project.type,
      ...project.stack
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}

function renderStats(projects) {
  els.totalCount.textContent = String(projects.length);
  els.activeCount.textContent = String(projects.filter((project) => project.status === "active").length);
  els.lastUpdated.textContent = formatDate(newestDate(projects));
}

function createLink(href, label) {
  if (!href) {
    return null;
  }
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.target = "_blank";
  anchor.rel = "noreferrer";
  anchor.textContent = label;
  return anchor;
}

function createProjectCard(project, index) {
  const item = document.createElement("li");
  item.className = "project-card";
  item.style.setProperty("--index", String(index));

  const top = document.createElement("div");
  top.className = "project-top";

  const type = document.createElement("p");
  type.className = "type";
  type.textContent = typeLabel(project.type);

  const status = document.createElement("span");
  status.className = `status status-${project.status}`;
  status.textContent = STATUS_LABELS[project.status] ?? "기획 중";

  top.append(type, status);

  const title = document.createElement("h3");
  title.textContent = project.name;

  const desc = document.createElement("p");
  desc.textContent = project.description;

  const tags = document.createElement("div");
  tags.className = "tags";
  project.stack.forEach((stackItem) => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = stackItem;
    tags.append(tag);
  });

  const links = document.createElement("div");
  links.className = "project-links";
  const linkNodes = [
    createLink(project.links.service, "서비스"),
    createLink(project.links.repo, "Repo"),
    createLink(project.links.docs, "문서")
  ].filter(Boolean);

  linkNodes.forEach((node) => links.append(node));

  const date = document.createElement("p");
  date.className = "project-date";
  date.textContent = `업데이트: ${formatDate(project.updatedAt)}`;

  item.append(top, title, desc, tags, links, date);
  return item;
}

function renderProjects(projects) {
  els.projectGrid.innerHTML = "";
  projects.forEach((project, index) => {
    els.projectGrid.append(createProjectCard(project, index));
  });

  els.resultCount.textContent = `${projects.length}개 표시`;
  els.emptyState.hidden = projects.length > 0;
}

function render() {
  renderStats(state.projects);
  buildTypeFilters(state.projects);
  renderProjects(filteredProjects());
}

async function init() {
  const rawProjects = await loadProjects();
  state.projects = normalizeProjects(rawProjects);

  els.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderProjects(filteredProjects());
  });

  render();
}

init();
