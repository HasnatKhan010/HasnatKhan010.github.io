(() => {
  "use strict";

  const data = window.PORTFOLIO_DATA;
  const state = { repositories: [], source: "GitHub", query: "", language: "", sort: "featured" };
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const languageColors = {
    Python: "#3572A5",
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Rust: "#dea584",
    "Jupyter Notebook": "#DA5B0B",
    "C++": "#f34b7d",
    C: "#555555",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051"
  };

  function escapeHtml(value = "") {
    return String(value).replace(/[&<>'"]/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    })[character]);
  }

  function projectCopy(repository) {
    return data.projectCopy[repository.name] || {};
  }

  function fullName(repository) {
    return repository.full_name || `HasnatKhan010/${repository.name}`;
  }

  function featuredRank(repository) {
    const rank = data.featuredOrder.indexOf(fullName(repository));
    return rank === -1 ? Number.MAX_SAFE_INTEGER : rank;
  }

  function normaliseRepository(repository) {
    const copy = projectCopy(repository);
    return {
      ...repository,
      full_name: fullName(repository),
      description: copy.description || repository.description || "Repository documentation is available on GitHub.",
      topics: copy.topics || repository.topics || [],
      proof: copy.proof || "",
      html_url: repository.html_url || `https://github.com/${fullName(repository)}`,
      stargazers_count: repository.stargazers_count || 0,
      updated_at: repository.pushed_at || repository.updated_at || repository.created_at,
      featured: featuredRank(repository) !== Number.MAX_SAFE_INTEGER
    };
  }

  async function fetchJson(url) {
    const response = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
    if (!response.ok) throw new Error(`GitHub request failed: ${response.status}`);
    return response.json();
  }

  async function loadRepositories() {
    const cacheKey = "hasnat-github-portfolio-repos-v1";
    try {
      const cached = JSON.parse(localStorage.getItem(cacheKey) || "null");
      if (cached && Date.now() - cached.savedAt < 15 * 60 * 1000 && Array.isArray(cached.repositories)) {
        state.source = "GitHub · cached 15 min";
        return cached.repositories.map(normaliseRepository);
      }
    } catch (_) {
      localStorage.removeItem(cacheKey);
    }

    const requests = [
      ...data.accounts.map((account) =>
        fetchJson(`https://api.github.com/users/${account}/repos?per_page=100&type=owner&sort=updated`)
      ),
      ...data.extraRepositories.map((repository) => fetchJson(`https://api.github.com/repos/${repository}`))
    ];

    const results = await Promise.allSettled(requests);
    const live = results.flatMap((result) =>
      result.status === "fulfilled" ? (Array.isArray(result.value) ? result.value : [result.value]) : []
    );

    if (live.length) {
      const unique = [...new Map(live.map((repository) => [repository.full_name, repository])).values()]
        .filter((repository) => !repository.fork)
        .map(normaliseRepository);
      localStorage.setItem(cacheKey, JSON.stringify({ savedAt: Date.now(), repositories: unique }));
      state.source = results.some((result) => result.status === "rejected")
        ? "GitHub · partial live result"
        : "GitHub · live public data";
      return unique;
    }

    const fallback = await fetchJson("fallback-repos.json");
    state.source = "Bundled snapshot · GitHub temporarily unavailable";
    return fallback.filter((repository) => !repository.fork).map(normaliseRepository);
  }

  function repositoryTopics(repository) {
    return repository.topics.slice(0, 3);
  }

  function formatDate(value) {
    if (!value) return "Unknown";
    return new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric" }).format(new Date(value));
  }

  function makeMeta(repository) {
    const fragment = document.createDocumentFragment();
    if (repository.language) {
      const language = document.createElement("span");
      const dot = document.createElement("i");
      dot.className = "language-dot";
      dot.style.background = languageColors[repository.language] || "#8b949e";
      language.append(dot, document.createTextNode(repository.language));
      fragment.append(language);
    }
    if (repository.stargazers_count) {
      const stars = document.createElement("span");
      stars.textContent = `☆ ${repository.stargazers_count}`;
      fragment.append(stars);
    }
    if (repository.proof) {
      const proof = document.createElement("span");
      proof.textContent = `✓ ${repository.proof}`;
      fragment.append(proof);
    }
    return fragment;
  }

  function renderPinned() {
    const container = $("#pinned-repos");
    container.replaceChildren();
    const selected = [...state.repositories]
      .sort((a, b) => featuredRank(a) - featuredRank(b))
      .filter((repository) => repository.featured)
      .slice(0, 6);

    for (const repository of selected) {
      const card = $("#repo-card-template").content.firstElementChild.cloneNode(true);
      const link = $(".repo-name", card);
      link.href = repository.html_url;
      link.textContent = repository.name;
      $(".repo-description", card).textContent = repository.description;
      const topics = $(".repo-topics", card);
      for (const topic of repositoryTopics(repository)) {
        const item = document.createElement("span");
        item.className = "topic";
        item.textContent = topic;
        topics.append(item);
      }
      $(".repo-meta", card).append(makeMeta(repository));
      container.append(card);
    }
  }

  function filteredRepositories() {
    const query = state.query.trim().toLowerCase();
    const filtered = state.repositories.filter((repository) => {
      const searchable = [repository.name, repository.description, repository.language, ...repository.topics]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return (!query || searchable.includes(query)) && (!state.language || repository.language === state.language);
    });

    return filtered.sort((a, b) => {
      if (state.sort === "updated") return new Date(b.updated_at) - new Date(a.updated_at);
      if (state.sort === "stars") return b.stargazers_count - a.stargazers_count || a.name.localeCompare(b.name);
      if (state.sort === "name") return a.name.localeCompare(b.name);
      return featuredRank(a) - featuredRank(b) || new Date(b.updated_at) - new Date(a.updated_at);
    });
  }

  function renderRepositories() {
    const repositories = filteredRepositories();
    const list = $("#repo-list");
    list.replaceChildren();
    $("#repo-status").textContent = `${repositories.length} of ${state.repositories.length} repositories · ${state.source}`;

    if (!repositories.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "No repositories match those filters.";
      list.append(empty);
      return;
    }

    for (const repository of repositories) {
      const row = document.createElement("article");
      row.className = "repo-row";
      const main = document.createElement("div");
      const heading = document.createElement("h3");
      const link = document.createElement("a");
      link.href = repository.html_url;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = repository.name;
      heading.append(link);
      if (repository.archived) {
        const archived = document.createElement("span");
        archived.className = "visibility";
        archived.textContent = "Archived";
        heading.append(archived);
      }
      const description = document.createElement("p");
      description.textContent = repository.description;
      const topics = document.createElement("div");
      topics.className = "repo-topics";
      for (const topic of repositoryTopics(repository)) {
        const item = document.createElement("span");
        item.className = "topic";
        item.textContent = topic;
        topics.append(item);
      }
      const meta = document.createElement("div");
      meta.className = "repo-meta";
      meta.append(makeMeta(repository));
      main.append(heading, description, topics, meta);
      const updated = document.createElement("span");
      updated.className = "repo-updated";
      updated.textContent = `Updated ${formatDate(repository.updated_at)}`;
      row.append(main, updated);
      list.append(row);
    }
  }

  function populateLanguageFilter() {
    const select = $("#language-filter");
    const languages = [...new Set(state.repositories.map((repository) => repository.language).filter(Boolean))].sort();
    for (const language of languages) {
      const option = document.createElement("option");
      option.value = language;
      option.textContent = language;
      select.append(option);
    }
  }

  function renderExperience() {
    const container = $("#experience-list");
    container.innerHTML = data.experience.map((item) => `
      <article class="timeline-item">
        <div class="timeline-top">
          <div><h3>${escapeHtml(item.role)}</h3><p class="timeline-org">${escapeHtml(item.organization)}</p></div>
          <span class="timeline-date">${escapeHtml(item.dates)} · ${escapeHtml(item.location)}</span>
        </div>
        <p class="timeline-summary">${escapeHtml(item.summary)}</p>
        <div class="tag-row">${item.stack.map((skill) => `<span class="tag">${escapeHtml(skill)}</span>`).join("")}</div>
        <details class="timeline-details">
          <summary>Show verified outcomes</summary>
          <ul>${item.achievements.map((achievement) => `<li>${escapeHtml(achievement)}</li>`).join("")}</ul>
        </details>
        <a class="credential-link" href="${escapeHtml(item.link)}" target="_blank" rel="noreferrer">Open evidence ↗</a>
      </article>
    `).join("");
  }

  function renderCredentials() {
    $("#education-list").innerHTML = data.education.map((item) => `
      <article class="credential-card">
        <div class="credential-line"><h4>${escapeHtml(item.qualification)}</h4><span class="credential-year">${escapeHtml(item.dates)}</span></div>
        <p><strong>${escapeHtml(item.institution)}</strong></p><p>${escapeHtml(item.detail)}</p>
      </article>
    `).join("");

    $("#certification-list").innerHTML = data.certifications.map((item) => `
      <article class="credential-card">
        <div class="credential-line"><h4>${escapeHtml(item.title)}</h4><span class="credential-year">${escapeHtml(item.year)}</span></div>
        <p><strong>${escapeHtml(item.issuer)}</strong></p><p>${escapeHtml(item.detail)}</p>
        <a class="credential-link" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">Verify credential ↗</a>
      </article>
    `).join("");

    $("#skills-list").innerHTML = data.skills.map((group, index) => `
      <section class="skill-group${index === 0 ? " open" : ""}">
        <button type="button" aria-expanded="${index === 0}"><span>${escapeHtml(group.label)}</span><span aria-hidden="true">+</span></button>
        <div class="skill-body"><p class="skill-note">${escapeHtml(group.note)}</p><div class="tag-row">${group.items.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("")}</div></div>
      </section>
    `).join("");

    $$(".skill-group button").forEach((button) => button.addEventListener("click", () => {
      const group = button.closest(".skill-group");
      group.classList.toggle("open");
      button.setAttribute("aria-expanded", group.classList.contains("open"));
    }));
  }

  function activateTab(name, updateHash = true) {
    const target = $(`#${name}`);
    if (!target) return;
    $$(".tab").forEach((tab) => {
      const active = tab.dataset.tab === name;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    $$(".tab-panel").forEach((panel) => {
      const active = panel.id === name;
      panel.hidden = !active;
      panel.classList.toggle("active", active);
    });
    if (updateHash) history.replaceState(null, "", `#${name}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function installInteractions() {
    $$(".tab").forEach((tab) => tab.addEventListener("click", () => activateTab(tab.dataset.tab)));
    $$('[data-open-tab]').forEach((button) => button.addEventListener("click", () => activateTab(button.dataset.openTab)));

    const search = $("#repo-search");
    const globalSearch = $("#global-search");
    const updateSearch = (value) => {
      state.query = value;
      search.value = value;
      globalSearch.value = value;
      activateTab("repositories");
      renderRepositories();
    };
    search.addEventListener("input", () => { state.query = search.value; globalSearch.value = search.value; renderRepositories(); });
    globalSearch.addEventListener("input", () => updateSearch(globalSearch.value));
    $("#language-filter").addEventListener("change", (event) => { state.language = event.target.value; renderRepositories(); });
    $("#repo-sort").addEventListener("change", (event) => { state.sort = event.target.value; renderRepositories(); });

    document.addEventListener("keydown", (event) => {
      const typing = /input|textarea|select/i.test(document.activeElement?.tagName || "");
      if (event.key === "/" && !typing) { event.preventDefault(); globalSearch.focus(); }
    });

    const root = document.documentElement;
    const savedTheme = localStorage.getItem("hasnat-portfolio-theme");
    const preferred = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    root.dataset.theme = savedTheme || preferred;
    const toggle = $("#theme-toggle");
    const updateThemeLabel = () => toggle.setAttribute("aria-label", `Switch to ${root.dataset.theme === "dark" ? "light" : "dark"} theme`);
    updateThemeLabel();
    toggle.addEventListener("click", () => {
      root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem("hasnat-portfolio-theme", root.dataset.theme);
      updateThemeLabel();
    });
  }

  async function init() {
    $("#year").textContent = new Date().getFullYear();
    renderExperience();
    renderCredentials();
    installInteractions();
    const initialTab = location.hash.slice(1);
    if (initialTab && $(`#${initialTab}.tab-panel`)) activateTab(initialTab, false);

    try {
      state.repositories = await loadRepositories();
    } catch (error) {
      console.error(error);
      state.repositories = [];
      state.source = "Repository data unavailable";
    }
    $("#repo-count").textContent = state.repositories.length;
    populateLanguageFilter();
    renderPinned();
    renderRepositories();
  }

  init();
})();
