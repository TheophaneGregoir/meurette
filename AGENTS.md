# AGENTS.md

## Overview

- This repo is a static marketing website for Meurette restaurants.
- Deployment is Netlify-only from the repository root; there is no build step, package manager, or test runner in the repo.
- The site is a single-page HTML/CSS/JS app with JSON-fed content blocks and a Decap CMS admin.

## Repo Map

- `index.html`: main page structure, SEO metadata, restaurant/contact content, Netlify form, and script includes.
- `css/general.css`: reset, typography scale, layout utilities, shared components.
- `css/style.css`: section and component styling.
- `css/queries.css`: responsive breakpoints and mobile navigation behavior.
- `js/load-menu.js`: fetches `data/menu.json` and renders the menu lists + menu title.
- `js/load-content.js`: fetches `data/content.json` and injects concept images + CTA copy.
- `js/script.js`: mobile nav toggle, smooth scrolling, sticky header, current-year replacement, Safari flex-gap check.
- `data/menu.json`: CMS-managed weekly menu content.
- `data/content.json`: CMS-managed concept images and recruitment CTA text.
- `admin/index.html`: Decap CMS entrypoint.
- `admin/config.yml`: Decap CMS schema and Netlify Git Gateway config.
- `img/`: uploaded and hand-managed image assets.
- `netlify.toml`: publishes the repo root as the static site.

## Operating Rules

- Keep the site static unless the user explicitly asks for a larger platform change. Do not introduce React, build tooling, or a package manager by default.
- Use the existing vanilla HTML/CSS/JS structure and follow the surrounding style in each file instead of reformatting broadly.
- Keep user-facing copy in French unless the task explicitly changes language.
- Treat HTML, CSS, JS, and JSON as tightly coupled. If a class, ID, or data key changes, update every file that depends on it.
- If the CMS data shape changes, update both the matching loader script and `admin/config.yml`.
- Preserve current asset path conventions:
  - HTML/CSS use relative paths like `img/...` or `../img/...`.
  - JSON-fed image fields use root-relative paths like `/img/uploads/...`.
- Avoid renaming or removing Netlify-specific behavior unless requested:
  - the form in `index.html` uses the `netlify` attribute
  - the CMS depends on `admin/index.html`, `admin/config.yml`, and Netlify Identity/Git Gateway

## Local Preview

- Run a local web server from the repo root. Do not rely on `file://`; `fetch()` calls for `data/menu.json` and `data/content.json` need HTTP.
- Preferred preview command:

```bash
python3 -m http.server 4173
```

- Preview URLs:
  - `http://localhost:4173/`
  - `http://localhost:4173/admin/`

## Verification

- Validate any edited JSON:

```bash
python3 -m json.tool data/menu.json >/dev/null
python3 -m json.tool data/content.json >/dev/null
```

- Run a whitespace/conflict sanity check before finishing:

```bash
git diff --check
```

- If markup, styles, or behavior changed, manually verify in the browser:
  - menu items render from `data/menu.json`
  - concept images and CTA text render from `data/content.json`
  - mobile nav opens/closes below tablet breakpoints
  - sticky header still activates on scroll
  - in-page anchor links still scroll correctly
  - external links still open correctly
  - no broken image paths or console errors introduced by missing selectors

## Common Task Routing

- Weekly menu update: edit `data/menu.json`.
- Recruitment CTA copy or concept images: edit `data/content.json` and add any new files under `img/uploads/`.
- Layout or content section changes: usually `index.html` plus `css/style.css` and `css/queries.css`.
- Global typography, spacing, grid helpers: `css/general.css`.
- Responsive fixes: `css/queries.css`.
- CMS/editor changes: `admin/config.yml` and possibly the related JSON/JS loader.

## Known Gotchas

- `js/script.js` assumes `.year`, `.btn-mobile-nav`, `.header`, and `.section-hero` exist. If those elements move or disappear, update the script defensively.
- Link handling is centralized in `js/script.js`: all `a:link` clicks are intercepted, internal anchors smooth-scroll, and non-anchor URLs open in a new tab.
- Because Netlify publishes the repository root directly, broken asset paths or malformed HTML/JSON ship as-is.
- Menu arrays should contain displayable strings only. Empty strings will render as empty list items.
