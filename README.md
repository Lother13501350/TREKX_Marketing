# ChillOut Marketing Dashboard

A **static JavaScript marketing workspace** for planning campaigns, organizing content, and tracking execution. The repository includes a public download landing page, an editable operations dashboard, and a library of travel microtools and launch materials.

純 HTML、CSS 與 JavaScript 的行銷工作台，支援編輯活動、內容排程與 KPI，並透過瀏覽器儲存及 JSON／CSV 匯出整理資料。

[Live site](https://chillout-marketing-dashboard.vercel.app) · [Operations workspace](https://chillout-marketing-dashboard.vercel.app/ops.html)

## Features

- Public app download landing page in `index.html`.
- Editable KPIs, campaigns, experiments, content schedules, and partner pipelines in `ops.html`.
- Local persistence in the browser with JSON backup and restore, plus CSV exports.
- Marketing plan and content libraries, metrics reference pages, and launch materials.
- A generator for independent travel microtools.
- GitHub Actions validation for internal links and required static assets.

## Architecture

| Part | Role |
| --- | --- |
| HTML pages & `assets/` | Page layouts, styles, and browser-side behavior. |
| Browser `localStorage` | Stores edits on the current browser. |
| JSON / CSV exports | Portable backups and handoffs. |
| `scripts/build-independent-tools.mjs` | Generates standalone tool pages. |
| `scripts/validate-static-site.mjs` | Checks links and required files. |
| `.github/workflows/ci-cd.yml` | Runs static validation on pull requests, main pushes, and manual dispatch. |

The site runs without a backend or a framework build step. Tool generation is a separate maintenance command, rather than a requirement for serving the checked-in pages.

## Run locally

```bash
git clone https://github.com/Lother13501350/TREKX_Marketing.git
cd TREKX_Marketing
npm run preview
```

The preview command uses Python's HTTP server. Install Python and ensure `python` is available, or run `python3 -m http.server 4173` directly.

Open `http://localhost:4173` for the public landing page and `http://localhost:4173/ops.html` for the workspace.

## Maintenance commands

Use Node.js 20+ for the repository scripts; there are no npm dependencies to install.

| Command | Purpose |
| --- | --- |
| `npm run validate` | Check the static site. |
| `npm run build:tools` | Regenerate standalone microtool pages. |
| `npm run preview` | Serve the repository locally on port 4173. |

## Current scope

Workspace data belongs to the current browser. There is no account system, server-side database, or automatic synchronization between teammates. Use JSON exports for backups and transfers; CSV exports support reporting outside the dashboard.

Static HTML is publicly served when deployed. This repository demonstrates a browser-based workspace, rather than an authenticated shared backend.

## Deployment

The existing repository includes Vercel, Netlify, and GitHub Pages configuration. See [README_DEPLOY.md](README_DEPLOY.md) for deployment details and operational checks.
