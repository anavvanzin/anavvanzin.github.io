# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal academic site for Ana Vanzin (anavanzin.com) — the ICONOCRACIA / *Iuris Memoria* doctoral project (PPGD/UFSC). It is a **static site with no build step**: plain HTML + CSS + pre-compiled React loaded via CDN. Editing an HTML/CSS/JS file is reflected on the next browser reload. Most content is in Portuguese; the desktop shell is bilingual (`{ lang }` prop, `'pt' | 'en'`).

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
- `.nojekyll` is essential (GitHub Pages would otherwise ignore `_ds_bundle.js`); `CNAME` holds the custom domain. All site paths are relative, so the site works from any subdirectory.

## Architecture

### Desktop shell (repo root — the home page)

`index.html` is a retro "mesa de trabalho" (desktop metaphor) built from **pre-compiled** React IIFEs that register on the `window.avapp` global — there is no Babel/JSX at runtime and the original JSX sources are not in this repo, so edit the `.js` files directly:

- `desktop-app.js` — window manager, menu bar, dock, boot sequence. Holds the `REG` object mapping window keys (`sobre`, `tese`, `publicacoes`, …) to `{ title: {pt, en}, w, Body }`.
- `window-contents.js` — window body components (`WSobre`, `WTese`, `WMae`, `WPoster`, …), composed from the design-system bundle.
- `icons.js` — pixel-art icon components.
- `_ds_bundle.js` — the design-system component bundle, exposed as `window.AnaVanzinDesignSystem_b45a86`.
- `styles.css` + `tokens/` — design tokens (colors, typography, spacing) and global styles.

**To add a new desktop window** you must touch four places (the tier-1 tests assert exactly this wiring): the body component in `window-contents.js` (registered on `window.avapp`), a `REG` entry in `desktop-app.js`, an icon in `icons.js`, and the desktop icon in `index.html`.

### Standalone pages and sub-sites

Self-contained sections with their own entry points, largely independent of the desktop shell: `iconocracia/` (thesis atlas + atlas-lab, own `styles.css`/`tokens/`), `manifesto/`, `mesa/`, `malleus/`, `marginalia/`, `atlas/`, plus single pages like `poster.html`, `ampulheta.html`, `conceitos.html`, `trabalhos.html`, `perfil.html`, `mae.html`. Sub-sites may contain `.jsx` loaded via CDN Babel — the no-Babel rule applies to the root desktop shell only.

`.agents/` and the various `*_REQUEST.md` / handoff markdown files at the root are working notes from previous agent sessions, not site content.

## Design system ("Vanguard Protocol")

The site has a strict visual identity; keep new work consistent with it:

- **Palette**: paper `#EFE5CF`, ink `#1A1612`, rubric (iron-gall red) `#9B2C1C`, amethyst `#8A5FA8`, terracotta `#A04030` — defined as CSS custom properties in `tokens/`.
- **Typography**: display = Instrument Serif / Cormorant Garamond; body = Crimson Pro; mono = JetBrains Mono. Fonts live in `fonts/` or come from Google Fonts.
- **Motion**: fades and slides only, custom cubic-beziers (e.g. `0.22, 1, 0.36, 1`), animate only `transform` and `opacity`, respect `prefers-reduced-motion`. No bounces, no `linear`/`ease-in-out`.
- **Anti-patterns**: no Inter/Roboto/Arial/Helvetica, no Lucide/FontAwesome/Material icons, no `1px solid gray` borders, no generic Bootstrap-style layouts. Premium visual quality is a hard requirement.
