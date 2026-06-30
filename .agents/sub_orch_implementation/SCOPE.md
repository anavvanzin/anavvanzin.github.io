# Scope: Implementation Track

## Architecture
- Metaphor: A retro computer desktop (System 7 style) utilizing custom window manager (`desktop-app.js`) and component definitions (`window-contents.js`, `icons.js`).
- Component: `WPoster.js` - React component that dynamically fetches, parses, and displays `.md` files in a conference-style poster layout.
- Visuals: Vanguard Protocol design system (vellum paper color `#F2EAD9`, dark ink text `#211B16`, rubric red accents `#9B2C1C`, gold frames/details `#9C7C3D`). Nested double-bezel frames, drop caps.
- Physics: Spring physics transitions on hover, focus, zoom, and expansion using GPU-accelerated CSS `transform` / `opacity` transitions.
- Page: `poster.html` - Standalone page exhibiting the academic posters.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 2 | Exploration | Explorer analysis of visual design, markdown parsing, and animations | None | DONE |
| 3 | Core Implementation | Implement WPoster.js and poster.html | M1, M2 | DONE |
| 4 | Desktop Integration | Register window, icons, and menus in desktop-app.js, window-contents.js, icons.js, index.html | M3 | DONE |
| 5 | Verification & Hardening | Run E2E tests, add Tier 5 white-box tests, check layout and console errors | M4 | DONE |

## Interface Contracts
### WPoster ↔ Markdown Sources
- Source path: `/docs/WORKFLOW.md`, `/docs/methodology.md` (or local copied paths).
- Parse strategy: dynamic parsing of headers, quote blocks, bullet lists, and body paragraphs.
- Render: split into a multi-column visual grid.

### Desktop Window Manager ↔ WPoster
- Window ID: `poster`
- Register properties: `title: { pt: 'sala de pôsteres', en: 'poster room' }, w: 800, h: 600, Body: WPoster`
- Close/Minimize: handled via TitleBar in WindowFrame.

## Code Layout
- `poster.html`: Standalone poster room in root.
- `WPoster.js`: React component in root.
- `index.html`: Desktop landing page (HTML/JS progressive).
- `desktop-app.js`: Window management, registers the desktop icons and window configurations.
- `window-contents.js`: Exports React window components.
- `icons.js`: Exports retro desktop SVG icons.
- `styles.css`: CSS styling and design system tokens.
