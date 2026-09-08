# Hasnat Khan · GitHub-style portfolio
<p align="center">
  <a href="https://hasnatkhan010.github.io/">
    <img src="https://img.shields.io/badge/Visit_My_Portfolio-007EC6?style=for-the-badge&logo=safari&logoColor=white" alt="Portfolio Link">
  </a>
</p>
A separate, framework-free portfolio designed for GitHub Pages. It uses plain HTML, CSS, and JavaScript, so there is no build step and no server to maintain.

## What it includes

- GitHub-inspired profile and repository layout
- Live public repositories from `HasnatKhan010`, refreshed every five minutes while the page is open
- Six curated pinned projects with verified outcomes
- A section-aware animated panda guide with reduced-motion support
- A five-minute browser cache and a bundled offline fallback
- Repository search, language filters, sorting, and shareable section hashes
- Experience, education, verified credentials, skills, résumé, and contact links
- Light and dark themes
- Responsive and reduced-motion layouts

## Preview locally

Run any static file server from this directory. For example:

```powershell
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Deploy to GitHub Pages

1. Create a new public repository and push this folder to its `main` branch.
2. Open **Settings → Pages** in that repository.
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. The included workflow deploys the site. Later pushes to `main` redeploy it automatically.

The site will normally be available at:

```text
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/
```

## Edit content

- Personal information, featured work, experience, education, and skills: `data.js`
- Layout: `index.html`
- Visual design: `styles.css`
- Repository loading and interactions: `app.js`
- Fallback repository data: `fallback-repos.json`

The live repository request uses GitHub's public API without a token. Do not add a personal access token to this site: browser-delivered secrets are public.
