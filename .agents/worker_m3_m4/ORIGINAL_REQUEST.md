## 2026-06-30T10:09:41Z
You are the Worker Agent (teamwork_preview_worker). Your objective is to perform Milestone 3 (Core Implementation) and Milestone 4 (Desktop Integration) for the Academic Poster Room project.

Working directory: /Users/ana/.gemini/antigravity/worktrees/anavvanzin/create-new-feature-branch
Your own metadata folder: /Users/ana/.gemini/antigravity/worktrees/anavvanzin/create-new-feature-branch/.agents/worker_m3_m4

### MANDATORY INTEGRITY WARNING
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

### Objective
1. **Copy source Markdown/JSON files** from `/Users/ana/Research/hub/iconocracy-corpus/` to the website workspace under `/Users/ana/.gemini/antigravity/worktrees/anavvanzin/create-new-feature-branch/docs/`:
   - Copy `/Users/ana/Research/hub/iconocracy-corpus/docs/WORKFLOW.md` -> `/Users/ana/.gemini/antigravity/worktrees/anavvanzin/create-new-feature-branch/docs/WORKFLOW.md`
   - Copy `/Users/ana/Research/hub/iconocracy-corpus/docs/methodology.md` -> `/Users/ana/.gemini/antigravity/worktrees/anavvanzin/create-new-feature-branch/docs/methodology.md`
   - Copy `/Users/ana/Research/hub/iconocracy-corpus/genealogia-alegoria-feminina.md` -> `/Users/ana/.gemini/antigravity/worktrees/anavvanzin/create-new-feature-branch/docs/genealogia-alegoria-feminina.md`

2. **Create `WPoster.js`** in the root directory:
   - Must be a self-registering React component (using ES5 `React.createElement` syntax or compatible to match `window-contents.js` and `desktop-app.js`). It must define `WPoster` and assign it to `window.avapp.WPoster`.
   - The component takes `{ lang }` ('pt' | 'en') and an optional `{ standalone }` prop.
   - It should let the user select/toggle between three posters:
     - "Workflow Operacional" (loads `/docs/WORKFLOW.md`)
     - "Metodologia" (loads `/docs/methodology.md`)
     - "Genealogia da Alegoria Feminina" (loads `/docs/genealogia-alegoria-feminina.md`)
   - Implement dynamic Markdown and JSON parser:
     - For markdown files: Split by double newlines, classify blocks (Headers, Quote blocks with left border in `--rubric`, Lists, Checkboxes, ordered lists, tables, monospace/code blocks inside `.terminal-box`, body paragraphs).
     - The first letter of any text section must be isolated and wrapped in a `.poster-drop-cap` span to render as a drop cap in rubric red, serif, floated left.
     - Layout: 3-column academic conference poster style using CSS Grid or flex columns (balancing content blocks with `break-inside: avoid` on blocks).
     - For JSON (`genealogia-alegoria-feminina.md`): Clean backslash escapes (`rawText.replace(/\\_/g, '_').replace(/\\\[/g, '[').replace(/\\\]/g, ']')`) before calling `JSON.parse()`. Render a structured 3-column layout mapping:
       - Banner: Title (`titulo_principal` or English translation if `lang === 'en'`), Author, Affiliation.
       - Column 1: Theses (`theses`) and Concepts network (`concepts_network`).
       - Column 2: Timeline phases (`genealogy_timeline`) and Regimes of iconocracy (`regimes_iconocraticos`).
       - Column 3: Iconographic mapping (`iconographic_mapping` table/cards with visual gauges for "endurecimento score") and political paradox analysis (`political_paradox`).
       - Footer: Keywords, references.
     - Keep "endurecimento" in Portuguese even when `lang === 'en'`.
     - Layout/Visual Design: Vanguard Protocol colors (`--paper` background, `--ink` text, `--rubric` red accents, `--gold` frames/details). Frame is nested Double-Bezel (outer frame `1.5px solid var(--ink)` with drop-shadow, 8px padding, inner frame `1px solid var(--gold)`).
     - Paper texture: absolute overlay with `background-image: var(--grain)`, `mix-blend-mode: multiply`, `pointer-events: none`.
     - Physics/Motion: Hover, focus, zoom, and expansion animations using GPU-accelerated CSS `transform` and `opacity` (use cubic-bezier values: bouncy hover Pop `cubic-bezier(0.34, 1.56, 0.64, 1.0)`, snappy window zoom `cubic-bezier(0.175, 0.885, 0.32, 1.15)`, minimize/inertia `cubic-bezier(0.16, 1, 0.3, 1)`).

3. **Create `poster.html`** in the root directory:
   - Standalone page exhibiting the academic posters.
   - Loads `/styles.css`
   - Loads React and ReactDOM from `/vendor/react/...`
   - Loads `_ds_bundle.js`, `WPoster.js`.
   - Renders `WPoster` component. Should handle standalone toggles (e.g. read language from query parameter `?lang=en` or default to `pt`).

4. **Modify `styles.css`**:
   - Add styling rules for posters, nested double-bezels, drop-caps, columns, terminal-boxes, grain overlays, and custom cubic-bezier transitions/hover pops.

5. **Modify `desktop-app.js`**:
   - Load `WPoster` from `window.avapp`.
   - Register the window configuration for `poster` in `REG` (title: pt 'sala de pôsteres', en 'poster room', w: 800, h: 600, Body: WPoster).
   - Register `poster` icon in `DESK_ICONS` (id: 'poster', label: pt 'pôsteres', en 'posters', Icon: AtlasIcon).

6. **Modify `mesa/index.html`**:
   - Include `<script src="/WPoster.js"></script>` right before `<script src="/desktop-app.js"></script>`.

7. **Modify `index.html`** in the root:
   - Add a desktop icon for `poster.html` matching other desktop icons (use `/assets/icons/atlas.webp` for icon cover, title data-pt="pôsteres" data-en="posters", href="/poster.html", data-win="sala de pôsteres", data-win-alt="Sala de Pôsteres Acadêmicos").

Please verify all changes by inspecting files, checking console log errors (none should occur), and testing that the page opens and functions correctly. Record your exact steps, file changes, and verification commands in your handoff report (handoff.md) in your directory.
