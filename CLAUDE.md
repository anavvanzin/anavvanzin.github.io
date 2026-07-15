# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal academic site for Ana Vanzin (anavanzin.com) — the ICONOCRACIA / *Iuris Memoria* doctoral project (PPGD/UFSC). It is a **static site with no build step**: plain HTML + CSS + pre-compiled React. The main React surfaces (`/mesa/`, `poster.html`) load self-hosted React 18 production builds from `/vendor/react/`; only some sub-sites (`iconocracia/atlas*`, `manifesto/`) load React + Babel from a CDN. Editing an HTML/CSS/JS file is reflected on the next browser reload. Most content is in Portuguese; the desktop shell is bilingual (`{ lang }` prop, `'pt' | 'en'`).

## Commands

```bash
npx http-server . -p 8080          # serve the site locally (no build/watch step exists)
npm test                           # run Playwright E2E suite (= npx playwright test)
npx playwright test tests/tier1-coverage.spec.js   # run one spec file
npx playwright test -g "T5.5"      # run tests matching a title
npm run deploy:worker              # stage clean tree + deploy Cloudflare Worker
```

- Playwright auto-starts `http-server` on port 8080 (`webServer` in `playwright.config.js`), so tests don't need a running server. If browsers are missing: `npx playwright install --with-deps chromium`.
- **Known flaky test**: `tests/tier5-adversarial.spec.js` → `T5.5` (asserts exact `scrollY` equality after keyboard zoom). An isolated T5.5 failure is pre-existing flakiness, not a regression.
- There is no lint script.

## Deployment

- **Canonical domain `anavanzin.com` → GitHub Pages**: push to `main` triggers `.github/workflows/deploy-pages.yml`, which stages tracked files and strips oversize `.mp4` assets.
- **Cloudflare Worker (`anavvanzin`)**: `wrangler.jsonc` serves `.worker-assets/`, a clean tree staged by `scripts/stage-worker-assets.sh` (`npm run stage:assets`). Never point wrangler at the repo root — `.git` packs and large media exceed the **25 MiB per-asset Workers limit** (this broke Workers Builds before). New media over 25 MiB must be added to the strip lists in both `stage-worker-assets.sh` and `deploy-pages.yml`.
- Vercel previews exist (`anavvanzin-github-io.vercel.app`) but do not serve the public domain.
- `.nojekyll` is essential (GitHub Pages would otherwise ignore `_ds_bundle.js`); `CNAME` holds the custom domain. Pages use **root-absolute URLs** (`/styles.css`, `/vendor/react/…`, `/atlas/`), so the site assumes it is served at the domain root — hosting under a path prefix would require base-path work.
- Both deploy paths stage **all tracked files** (`git archive HEAD`), so `.agents/`, the root handoff `.md` files, and this file are published to the live site. Don't put private or draft-only material in tracked files.

## Architecture

### Home page vs. desktop shell

The repo-root `index.html` is the home page — a **static editorial "mesa" page** (inline CSS/JS + `editorial.js`, its own inline CSS variables, no React). The retro **React desktop shell** (window manager metaphor) lives at **`/mesa/`** (`mesa/index.html`), which loads self-hosted React from `/vendor/react/` plus the shell scripts at the repo root. These scripts are **pre-compiled** React IIFEs that register on the `window.avapp` global — there is no Babel/JSX at runtime and the original JSX sources are not in this repo, so edit the `.js` files directly:

- `desktop-app.js` — window manager, menu bar, dock, boot sequence. Holds the `REG` object mapping window keys (`sobre`, `tese`, `publicacoes`, …) to `{ title: {pt, en}, w, Body }`.
- `window-contents.js` — most window body components (`WSobre`, `WTese`, `WMae`, …), composed from the design-system bundle. Some components live in their own root file loaded separately by `mesa/index.html` — notably `WPoster.js` (which registers `window.avapp.WPoster` and also powers standalone `poster.html`) and `ampulheta-native.js`.
- `icons.js` — pixel-art icon components.
- `_ds_bundle.js` — the design-system component bundle, exposed as `window.AnaVanzinDesignSystem_b45a86`.
- `styles.css` + `tokens/` — design tokens (colors, typography, spacing) and global styles.

**To add a new desktop window** you must wire several places (the tier-1 tests assert exactly this wiring): the body component registered on `window.avapp` (in `window-contents.js`, or in its own file added to `mesa/index.html`'s script list *before* `desktop-app.js`), a `REG` entry in `desktop-app.js`, an icon in `icons.js`, and — if it should also be reachable from the home page — an `a.icon` entry in the root `index.html` grid. When editing an existing window, check which file actually registers it (e.g. `WPoster` is in `WPoster.js`, not `window-contents.js`).

### Standalone pages and sub-sites

Self-contained sections with their own entry points, largely independent of the desktop shell: `iconocracia/` (thesis atlas + atlas-lab, own `styles.css`/`tokens/`), `manifesto/`, `mesa/`, `malleus/`, `marginalia/`, `atlas/`, plus single pages like `poster.html`, `ampulheta.html`, `conceitos.html`, `trabalhos.html`, `perfil.html`, `mae.html`. Sub-sites may contain `.jsx` loaded via CDN Babel — the no-Babel rule applies to the root desktop shell only.

`.agents/` and the various `*_REQUEST.md` / handoff markdown files at the root are working notes from previous agent sessions, not site content — but note they are tracked and therefore deployed (see Deployment).

## Design system ("Vanguard Protocol")

The site has a strict visual identity; keep new work consistent with it. There are **two active token sets** — check which stylesheet the page you're editing loads before touching colors or fonts:

- **Root `styles.css`** (loaded by `/mesa/`, `poster.html`, and other root pages): paper `#F2EAD9`, ink `#211B16`, rubric `#9B2C1C`; display = Cormorant Garamond, body = **Hanken Grotesk**. The Playwright tier-1 tests assert these paper/ink values on the poster/desktop surfaces, so changing them breaks tests. The root `index.html` defines its own inline variables (paper `#EFE5CF`, ink `#211B16`).
- **`tokens/`** (imported by `iconocracia/styles.css` and `apresentacao/`): paper `#EFE5CF`, ink `#1A1612`, rubric `#9B2C1C`, amethyst `#8A5FA8`, terracotta `#A04030`; display = Instrument Serif, body = Crimson Pro, mono = JetBrains Mono.

Shared rules across both:

- **Motion**: fades and slides only, custom cubic-beziers (e.g. `0.22, 1, 0.36, 1`), animate only `transform` and `opacity`, respect `prefers-reduced-motion`. No bounces, no `linear`/`ease-in-out`.
- **Anti-patterns**: no Inter/Roboto/Arial/Helvetica, no Lucide/FontAwesome/Material icons, no `1px solid gray` borders, no generic Bootstrap-style layouts. Premium visual quality is a hard requirement. Fonts are self-hosted in `fonts/`.
