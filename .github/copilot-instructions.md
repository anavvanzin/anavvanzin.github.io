# Copilot Instructions for anavvanzin.github.io

This repo is a static site (HTML + React via CDN) with Playwright E2E tests. No build step.

## Build, test, and lint
- Install deps: npm install
- Install Playwright browsers: npx playwright install
- Run all tests: npx playwright test
- Run a single spec: npx playwright test tests/poster.spec.js
- Run one test by title: npx playwright test -g "has title"
- Headed/UI: npx playwright test --headed or npx playwright test --ui
- Manual local server (for ad‑hoc checks): npx http-server . -p 8080
Notes
- playwright.config.js auto-starts http-server at :8080 with baseURL http://localhost:8080.
- No lint or type-check tooling is configured in this repo.

## High‑level architecture
- Entry surfaces
  - index.html — main site/home, static HTML enhanced by React via script tags
  - mesa/ — “desktop OS” surface (mesa/index.html). React renders Desktop from window.avapp.Desktop
  - poster.html — standalone Poster Room; same Poster component used inside the desktop window
- Runtime model (no bundler)
  - React 18 loaded from /vendor; components are attached to a global namespace window.avapp via IIFEs
  - Design System bundle (_ds_bundle.js) exposes window.AnaVanzinDesignSystem_… (Eyebrow, RubricLink, etc.)
- Desktop composition
  - desktop-app.js: window manager, dock/menu/boot, and a REG registry mapping window keys → Body components
  - window-contents.js: window body components (WSobre, WTese, WPublicacoes, …). Each takes { lang }
  - icons.js: icon components used by the desktop
  - WPoster.js: Poster Room React component; rendered in poster.html and as a desktop window (via REG)
- Styling system
  - styles.css + tokens/ define the Vanguard Protocol design tokens (paper/ink/rubric, typography, spacing)
  - Key visual motifs expected by tests: Double‑Bezel (.bezel-outer/.bezel-inner), paper grain (.poster-grain), drop caps (.poster-drop-cap)

## Key conventions
- Global namespace
  - Expose UI elements as properties of window.avapp; do not switch to ES modules unless you also adjust script tags and tests
- Bilingual content
  - Use the L(lang, pt, en) helper pattern across window components; components accept { lang: 'pt' | 'en' }
- Design constraints (see CLAUDE_CODE_HANDOFF.md)
  - Colors: paper #F2EAD9, ink #211B16, rubric #9B2C1C (tests assert these)
  - Motion: transitions limited to transform/opacity with custom cubic‑bezier timing; honor prefers-reduced-motion
  - Avoid introducing external icon sets or generic system fonts; rely on existing tokens and components
- Test‑sensitive selectors/behaviors
  - Poster classes: .poster, .poster-bezel-outer, .poster-grain, .poster-tab, .poster-backdrop, .poster-drop-cap
  - Desktop/window: .dwin, double‑click icons to open; some tests set localStorage 'av_booted' = '1'
  - Changing these requires updating tests in tests/*.spec.js

## Playwright tests
- Config: playwright.config.js uses baseURL http://localhost:8080 and starts http-server
- Suites live in tests/*.spec.js with tiered coverage (Tier1→Tier5) reflecting requirements R1–R4
- Add new specs under tests/; prefer requirement‑style names and opaque‑box assertions (no coupling to internals)

## Related docs to consult
- README.md — repo purpose, static architecture notes
- CLAUDE_CODE_HANDOFF.md — Vanguard Protocol rules, anti‑patterns, and priorities
- TEST_INFRA.md and TEST_READY.md — test philosophy, tiers, and coverage catalog
