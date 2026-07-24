# Ana Vanzin Personal Archive Mockup

## Goal

Create a browser-based coded mockup inspired by the approved visual identity boards: an academic archive, editorial cabinet, and research terminal in one responsive interface. The mockup should feel finished enough to judge visually and interactively, while remaining isolated from the existing production surfaces.

## Scope

The first iteration is a single-page static prototype implemented with HTML, CSS, and lightweight JavaScript. It will live in a self-contained subdirectory and will not replace the current homepage, Atlas, or Atlas Lab.

Included:

- Hero identity block for “ana vanzin” and the phrase “ler é método. método é pesquisa.”
- Main navigation tabs for Acervo, Pesquisa, Metodologia, História, and Iconografia.
- Ateliê/Pista theme switch for light and dark modes.
- Search field with visual filtering of archive cards.
- Research cards styled as tarot or catalog specimens.
- GitHub badge and editorial utility blocks.
- Responsive desktop and mobile layouts.
- Reduced-motion behavior and keyboard-accessible controls.

Excluded from this iteration:

- CMS or database integration.
- Authentication.
- Real corpus search.
- Replacement of canonical production pages.
- Figma source file generation.

## Information Architecture

1. Masthead
   - Name, research motto, small GitHub badge, theme switch.
2. Hero cabinet
   - Introductory statement, illustration-led composition, primary CTA.
3. Archive navigation
   - Five semantic tabs controlling visible content groups.
4. Research shelf
   - Cards for Justiça, República, Fontes, Poder, Iconografia, and related themes.
5. Method terminal
   - Compact faux-desktop module with methodology notes and progress marks.
6. Footer colophon
   - Research identity, publication links, and visual system notes.

## Visual System

### Typography

- Blackletter display face for identity and principal headings.
- Montserrat for navigation, labels, and clean reading text.
- Monospace face for metadata, controls, badges, and terminal-like elements.

The prototype must use graceful local or web-safe fallbacks so content remains legible if a display font fails.

### Color tokens

- Ink black: `#111111`
- Paper cream: `#F4EBDD`
- Dark red: `#8B1E1E`
- Burnt yellow: `#CBA23A`

Additional neutral values may be derived from these colors for borders, hover states, and shadows.

### Texture and illustration

Use CSS texture, line work, borders, and ornamental geometry to evoke aged print without making text noisy. Existing reference images may guide the composition, but the prototype should not depend on embedded screenshots as its interface.

## Interaction Design

### Theme switch

- “Ateliê” activates the light paper mode.
- “Pista” activates the dark ink mode.
- Choice is saved in `localStorage`.

### Tabs

- Tabs use buttons with `aria-selected` and a corresponding panel relationship.
- Changing tabs filters the visible archive section without a page reload.

### Search

- Search filters cards by title, category, and descriptive keywords.
- An empty state appears when no card matches.

### Cards

- Hover and focus reveal concise metadata.
- Each card remains understandable without hover on touch devices.

## Architecture

The mockup will be isolated in a directory such as `personal-archive-mockup/`:

- `index.html`: semantic structure and content.
- `styles.css`: tokens, typography, layout, themes, responsive rules.
- `app.js`: tab switching, search filtering, theme persistence.
- `README.md`: local preview and design notes.

No build step is required. Paths remain relative so the prototype can run under GitHub Pages, Cloudflare, or a local static server.

## Error Handling

- JavaScript enhances the page but core content remains visible without it.
- Missing stored theme values fall back to Ateliê mode.
- Search normalizes accents and capitalization before matching.
- No-results state includes a one-click reset control.

## Accessibility

- Semantic headings and landmark regions.
- Visible focus states matching the visual system.
- Sufficient contrast in both themes.
- Controls usable by keyboard.
- `prefers-reduced-motion` disables decorative transitions.
- Decorative ornaments are hidden from assistive technology.

## Responsive Behavior

Desktop uses a cabinet-style asymmetric grid with a broad hero and side utilities. Tablet collapses secondary ornaments while preserving the research shelf. Mobile becomes a single-column archive with horizontally scrollable tabs, large touch targets, and no interaction that depends solely on hover.

## Validation

Manual and automated smoke checks should cover:

- Desktop viewport around 1440×900.
- Mobile viewport around 390×844.
- Theme switching and persistence.
- Keyboard navigation through tabs and controls.
- Search filtering, empty state, and reset.
- No horizontal overflow.
- Usability with JavaScript disabled.
- Basic accessibility scan and Playwright interaction test if the repository setup supports it.

## Delivery Strategy

Create the prototype on a dedicated branch and open a reviewable pull request. The PR must remain separate from production content until the visual direction is approved. No canonical route or deployment configuration should change in this iteration.
