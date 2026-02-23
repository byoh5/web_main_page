const CONFIG = {
  dataUrl: "./data/web_utility_tools_100_plus.json",
  remoteSourceEnabled: false,
  remoteUrl: ""
};

const LANGUAGE_STORAGE_KEY = "twobyone-language";
const FALLBACK_LANGUAGE = "ko";
const SUPPORTED_LANGUAGES = ["ko", "en", "ja", "zh"];

const LANGUAGE_TO_LOCALE = {
  ko: "ko-KR",
  en: "en-US",
  ja: "ja-JP",
  zh: "zh-CN"
};

const I18N = {
  ko: {
    meta: {
      title: "TWOBYONE - Web Utility Swiss Knife",
      description: "TWOBYONE의 직접 제작 도구와 엄선한 웹 유틸리티를 찾는 메인 허브"
    },
    hero: {
      eyebrow: "TWOBYONE PROJECT HUB",
      title: "돈 주고 사긴 애매하지만 꼭 필요한 도구를, 웹에서 바로 꺼내 쓰는 스위스 나이프.",
      copy: "TWOBYONE은 직접 만든 도구와 실사용에 유용한 웹 유틸리티를 함께 큐레이션해, 누구나 빠르게 찾아 쓰도록 모아두는 팀입니다.",
      subcopy: "TWOBYONE이 직접 제공하는 도구는 가능한 한 백엔드 없이 동작하며, 개인정보 요청이나 가입 절차를 최소화하는 방향으로 설계합니다.",
      trust1: "직접 제작 + 엄선 큐레이션 도구를 한곳에서 탐색",
      trust2: "도구별 출처/링크를 투명하게 제공",
      trust3: "TWOBYONE이 지속적으로 업데이트",
      contactPrefix: "필요한 프로그램이 있다면",
      contactSuffix: "으로 메일을 보내주세요."
    },
    stats: {
      total: "총 프로젝트",
      active: "운영 중",
      lastUpdated: "마지막 업데이트"
    },
    controls: {
      language: "언어 선택",
      filterAria: "프로젝트 필터",
      searchLabel: "프로젝트 검색",
      searchPlaceholder: "프로젝트 이름/설명/스택 검색",
      all: "전체"
    },
    languageNames: {
      ko: "한국어",
      en: "영어",
      ja: "일본어",
      zh: "중국어"
    },
    content: {
      title: "프로젝트 목록",
      empty: "조건에 맞는 프로젝트가 없습니다.",
      noDescription: "설명이 아직 등록되지 않았습니다.",
      resultCount: ({ count }) => `${count}개 표시`
    },
    footer: {
      lead: "TWOBYONE · 정적 버전(v1)",
      tail: "GitHub Pages 배포 대상 · 데이터 파일:"
    },
    types: {
      web: "웹",
      mobile: "모바일",
      backend: "백엔드",
      tool: "도구",
      ai: "AI",
      game: "게임",
      other: "기타"
    },
    statuses: {
      active: "운영 중",
      planning: "준비 중",
      archived: "보관"
    },
    links: {
      service: "서비스",
      repo: "Repo",
      docs: "문서"
    },
    misc: {
      updated: "업데이트"
    }
  },
  en: {
    meta: {
      title: "TWOBYONE - Web Utility Swiss Knife",
      description: "Main hub for in-house and curated web utilities collected by TWOBYONE"
    },
    hero: {
      eyebrow: "TWOBYONE PROJECT HUB",
      title: "A Swiss-knife shelf of web tools: small, practical, and essential.",
      copy: "TWOBYONE combines in-house tools with carefully curated web utilities, so you can find and use what you need quickly.",
      subcopy: "For tools we build ourselves, we prefer backend-light design with minimal data collection and no signup when possible.",
      trust1: "One place for in-house builds and curated utilities",
      trust2: "Transparent source links for each tool",
      trust3: "Continuously updated by TWOBYONE",
      contactPrefix: "Need a specific utility?",
      contactSuffix: "Please email us."
    },
    stats: {
      total: "Total Projects",
      active: "Live",
      lastUpdated: "Last Updated"
    },
    controls: {
      language: "Language",
      filterAria: "Project filters",
      searchLabel: "Search projects",
      searchPlaceholder: "Search by name, description, or stack",
      all: "All"
    },
    languageNames: {
      ko: "Korean",
      en: "English",
      ja: "Japanese",
      zh: "Chinese"
    },
    content: {
      title: "Project List",
      empty: "No projects match your current filter.",
      noDescription: "Description is not available yet.",
      resultCount: ({ count }) => `${count} shown`
    },
    footer: {
      lead: "TWOBYONE · Static version (v1)",
      tail: "GitHub Pages release · Data file:"
    },
    types: {
      web: "Web",
      mobile: "Mobile",
      backend: "Backend",
      tool: "Tool",
      ai: "AI",
      game: "Game",
      other: "Other"
    },
    statuses: {
      active: "Live",
      planning: "Planning",
      archived: "Archived"
    },
    links: {
      service: "Open",
      repo: "Repo",
      docs: "Docs"
    },
    misc: {
      updated: "Updated"
    }
  },
  ja: {
    meta: {
      title: "TWOBYONE - Web Utility Swiss Knife",
      description: "TWOBYONEの自社開発ツールと厳選Webユーティリティをまとめたメインハブ"
    },
    hero: {
      eyebrow: "TWOBYONE PROJECT HUB",
      title: "買うほどではない。でも毎日役立つ。すぐ使えるWeb版スイスアーミーナイフ。",
      copy: "TWOBYONEは自社開発ツールに加え、実用的なWebユーティリティも厳選してまとめています。",
      subcopy: "自社提供ツールは、可能な限りバックエンド依存を抑え、個人情報入力や会員登録を最小化する方針です。",
      trust1: "自社開発 + 厳選キュレーションを一か所で検索",
      trust2: "各ツールの出典リンクを明確に表示",
      trust3: "TWOBYONEが継続的にアップデート",
      contactPrefix: "必要なツールがあれば",
      contactSuffix: "までメールしてください。"
    },
    stats: {
      total: "総プロジェクト",
      active: "稼働中",
      lastUpdated: "最終更新"
    },
    controls: {
      language: "言語",
      filterAria: "プロジェクトフィルター",
      searchLabel: "プロジェクト検索",
      searchPlaceholder: "名前・説明・技術スタックで検索",
      all: "すべて"
    },
    languageNames: {
      ko: "韓国語",
      en: "英語",
      ja: "日本語",
      zh: "中国語"
    },
    content: {
      title: "プロジェクト一覧",
      empty: "条件に一致するプロジェクトはありません。",
      noDescription: "説明はまだ登録されていません。",
      resultCount: ({ count }) => `${count}件を表示`
    },
    footer: {
      lead: "TWOBYONE · 静的バージョン (v1)",
      tail: "GitHub Pages 配布対象 · データファイル:"
    },
    types: {
      web: "Web",
      mobile: "モバイル",
      backend: "バックエンド",
      tool: "ツール",
      ai: "AI",
      game: "ゲーム",
      other: "その他"
    },
    statuses: {
      active: "稼働中",
      planning: "準備中",
      archived: "保管"
    },
    links: {
      service: "開く",
      repo: "Repo",
      docs: "ドキュメント"
    },
    misc: {
      updated: "更新日"
    }
  },
  zh: {
    meta: {
      title: "TWOBYONE - Web Utility Swiss Knife",
      description: "汇集 TWOBYONE 自研工具与精选网页工具的主入口"
    },
    hero: {
      eyebrow: "TWOBYONE PROJECT HUB",
      title: "不一定值得花钱买，却总会用到的网页瑞士军刀工具箱。",
      copy: "TWOBYONE 将自研工具与精选实用网页工具集中在一起，方便你快速查找和使用。",
      subcopy: "对于我们自研的工具，我们尽量采用弱后端设计，尽可能减少个人信息与注册要求。",
      trust1: "自研 + 精选工具统一入口",
      trust2: "每个工具都提供透明来源链接",
      trust3: "由 TWOBYONE 持续更新",
      contactPrefix: "如果你需要新的工具，欢迎发邮件到",
      contactSuffix: "联系我们。"
    },
    stats: {
      total: "项目总数",
      active: "运行中",
      lastUpdated: "最近更新"
    },
    controls: {
      language: "语言",
      filterAria: "项目筛选",
      searchLabel: "搜索项目",
      searchPlaceholder: "按名称、描述或技术栈搜索",
      all: "全部"
    },
    languageNames: {
      ko: "韩语",
      en: "英语",
      ja: "日语",
      zh: "中文"
    },
    content: {
      title: "项目列表",
      empty: "没有符合当前条件的项目。",
      noDescription: "暂无说明。",
      resultCount: ({ count }) => `显示 ${count} 项`
    },
    footer: {
      lead: "TWOBYONE · 静态版本 (v1)",
      tail: "GitHub Pages 发布目标 · 数据文件:"
    },
    types: {
      web: "网页",
      mobile: "移动端",
      backend: "后端",
      tool: "工具",
      ai: "AI",
      game: "游戏",
      other: "其他"
    },
    statuses: {
      active: "运行中",
      planning: "规划中",
      archived: "归档"
    },
    links: {
      service: "打开",
      repo: "Repo",
      docs: "文档"
    },
    misc: {
      updated: "更新"
    }
  }
};

const state = {
  projects: [],
  selectedType: "ALL",
  query: "",
  language: detectInitialLanguage()
};

const els = {
  metaDescription: document.getElementById("meta-description"),
  totalCount: document.getElementById("total-count"),
  activeCount: document.getElementById("active-count"),
  lastUpdated: document.getElementById("last-updated"),
  languageSelect: document.getElementById("language-select"),
  filterSection: document.getElementById("filter-section"),
  searchInput: document.getElementById("search-input"),
  typeFilters: document.getElementById("type-filters"),
  resultCount: document.getElementById("result-count"),
  projectGrid: document.getElementById("project-grid"),
  emptyState: document.getElementById("empty-state")
};

const toSafeArray = (value) => (Array.isArray(value) ? value.filter(Boolean) : []);

function normalizeLanguage(value) {
  if (!value) {
    return FALLBACK_LANGUAGE;
  }
  const short = value.toLowerCase().split("-")[0];
  return SUPPORTED_LANGUAGES.includes(short) ? short : FALLBACK_LANGUAGE;
}

function detectInitialLanguage() {
  const urlLang = new URLSearchParams(window.location.search).get("lang");
  if (urlLang) {
    return normalizeLanguage(urlLang);
  }

  const stored = safeStorageGet(LANGUAGE_STORAGE_KEY);
  if (stored) {
    return normalizeLanguage(stored);
  }
  return normalizeLanguage(navigator.language ?? FALLBACK_LANGUAGE);
}

function safeStorageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function safeStorageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    // Ignore storage errors in private mode or restricted environments.
  }
}

function deepGet(obj, path) {
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

function t(path, params = {}) {
  const bundle = I18N[state.language] ?? I18N[FALLBACK_LANGUAGE];
  const fallbackBundle = I18N[FALLBACK_LANGUAGE];
  const value = deepGet(bundle, path);
  const fallbackValue = deepGet(fallbackBundle, path);
  const selected = value ?? fallbackValue;

  if (typeof selected === "function") {
    return selected(params);
  }
  if (typeof selected === "string") {
    return selected;
  }
  return path;
}

function applyTranslations() {
  document.documentElement.lang = state.language;
  document.title = t("meta.title");
  if (els.metaDescription) {
    els.metaDescription.setAttribute("content", t("meta.description"));
  }

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    node.setAttribute("aria-label", t(node.dataset.i18nAriaLabel));
  });

  updateLanguageOptionLabels();
}

function updateLanguageOptionLabels() {
  if (!els.languageSelect) {
    return;
  }

  [...els.languageSelect.options].forEach((option) => {
    option.textContent = localizedLookup("languageNames", option.value, option.textContent);
  });
}

function localizedLookup(section, key, fallback = "") {
  const selectedBundle = I18N[state.language] ?? I18N[FALLBACK_LANGUAGE];
  const fallbackBundle = I18N[FALLBACK_LANGUAGE];
  return selectedBundle?.[section]?.[key] ?? fallbackBundle?.[section]?.[key] ?? fallback;
}

function resolveLocalizedText(value) {
  if (typeof value === "string") {
    return value;
  }
  if (!value || typeof value !== "object") {
    return "";
  }
  return value[state.language]
    ?? value[FALLBACK_LANGUAGE]
    ?? value.en
    ?? value.ja
    ?? value.zh
    ?? Object.values(value).find((entry) => typeof entry === "string")
    ?? "";
}

function flattenLocalizedText(value) {
  if (typeof value === "string") {
    return value;
  }
  if (!value || typeof value !== "object") {
    return "";
  }
  return Object.values(value).filter((entry) => typeof entry === "string").join(" ");
}

function normalizeProjects(projects) {
  return projects.map((project, index) => ({
    id: project.id ?? `project-${index + 1}`,
    name: project.name ?? {
      ko: "이름 없는 프로젝트",
      en: "Untitled Project"
    },
    description: project.description ?? "",
    type: (project.type ?? "other").toLowerCase(),
    stack: toSafeArray(project.stack),
    links: {
      service: project.links?.service ?? "",
      repo: project.links?.repo ?? "",
      docs: project.links?.docs ?? ""
    },
    status: (project.status ?? "planning").toLowerCase(),
    updatedAt: project.updatedAt ?? null
  }));
}

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

function typeLabel(type) {
  return localizedLookup("types", type, type.toUpperCase());
}

function statusLabel(status) {
  return localizedLookup("statuses", status, localizedLookup("statuses", "planning", "planning"));
}

function formatDate(value) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  const locale = LANGUAGE_TO_LOCALE[state.language] ?? LANGUAGE_TO_LOCALE[FALLBACK_LANGUAGE];
  return new Intl.DateTimeFormat(locale, {
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

  if (state.selectedType !== "ALL" && !uniqueTypes.includes(state.selectedType)) {
    state.selectedType = "ALL";
  }

  els.typeFilters.innerHTML = "";

  filterList.forEach((type) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `chip${state.selectedType === type ? " is-active" : ""}`;
    btn.dataset.type = type;
    btn.textContent = type === "ALL" ? t("controls.all") : typeLabel(type);
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

    const stackText = project.stack.map((item) => resolveLocalizedText(item)).join(" ");
    const haystack = [
      flattenLocalizedText(project.name),
      flattenLocalizedText(project.description),
      project.type,
      stackText
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
  status.textContent = statusLabel(project.status);

  top.append(type, status);

  const title = document.createElement("h3");
  title.textContent = resolveLocalizedText(project.name);

  const desc = document.createElement("p");
  desc.textContent = resolveLocalizedText(project.description) || t("content.noDescription");

  const tags = document.createElement("div");
  tags.className = "tags";
  project.stack.forEach((stackItem) => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = resolveLocalizedText(stackItem);
    tags.append(tag);
  });

  const links = document.createElement("div");
  links.className = "project-links";
  const linkNodes = [
    createLink(project.links.service, t("links.service")),
    createLink(project.links.repo, t("links.repo")),
    createLink(project.links.docs, t("links.docs"))
  ].filter(Boolean);
  linkNodes.forEach((node) => links.append(node));

  const date = document.createElement("p");
  date.className = "project-date";
  date.textContent = `${t("misc.updated")}: ${formatDate(project.updatedAt)}`;

  item.append(top, title, desc, tags, links, date);
  return item;
}

function renderProjects(projects) {
  els.projectGrid.innerHTML = "";
  projects.forEach((project, index) => {
    els.projectGrid.append(createProjectCard(project, index));
  });

  els.resultCount.textContent = t("content.resultCount", { count: projects.length });
  els.emptyState.hidden = projects.length > 0;
}

function render() {
  applyTranslations();
  renderStats(state.projects);
  buildTypeFilters(state.projects);
  renderProjects(filteredProjects());
}

function setLanguage(language) {
  state.language = normalizeLanguage(language);
  safeStorageSet(LANGUAGE_STORAGE_KEY, state.language);
  els.languageSelect.value = state.language;
  syncLanguageQuery();
  render();
}

function syncLanguageQuery() {
  try {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", state.language);
    window.history.replaceState({}, "", url);
  } catch (error) {
    // Ignore unsupported environments.
  }
}

async function init() {
  const rawProjects = await loadProjects();
  state.projects = normalizeProjects(rawProjects);

  els.languageSelect.value = state.language;
  const onLanguageSelect = (event) => {
    setLanguage(event.target.value);
  };
  els.languageSelect.addEventListener("change", onLanguageSelect);
  els.languageSelect.addEventListener("input", onLanguageSelect);

  els.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderProjects(filteredProjects());
  });

  syncLanguageQuery();
  render();
}

init();
