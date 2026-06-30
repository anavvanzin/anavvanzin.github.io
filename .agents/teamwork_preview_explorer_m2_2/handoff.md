# Handoff Report: WPoster Markdown & Structured Data Parsing Investigation

## 1. Observation
We observed the following files, structural configurations, and execution errors:
* **Workspace Configuration**: The files `desktop-app.js` and `window-contents.js` are in the workspace root (`/Users/ana/.gemini/antigravity/worktrees/anavvanzin/create-new-feature-branch`).
* **Design System & Tokens**: `styles.css` defines the Vanguard Design System tokens:
  * Primary Palette: Warm laid-paper vellum color (`--paper: #F2EAD9`), dark black/brown ink (`--ink: #211B16`), and rubric red accents (`--rubric: #9B2C1C`).
  * Secondary Palette: Gold accents for frames, ornament, and retro-OS chrome (`--gold: #9C7C3D`, `--gold-2: #B7934C`).
  * Derived Tints: `--ink-70`, `--ink-50`, `--ink-30`, `--ink-15`, and `--paper-deep`.
  * Typography: Display serif family (`--font-display: 'Cormorant Garamond', 'Times New Roman', serif`) and body sans-serif family (`--font-body: 'Hanken Grotesk', 'Helvetica Neue', sans-serif`).
  * Layout: Strict square corners (`--radius: 0`), no drop shadows (`--shadow: none`), dynamic UI duration transition (`--duration-ui: 150ms`).
* **Desktop Window Configuration**: In `desktop-app.js` lines 26-91, windows are registered inside a `REG` registry mapping. A new entry for the WPoster component must be registered as:
  ```javascript
  poster: {
    title: {
      pt: 'sala de pôsteres',
      en: 'poster room'
    },
    w: 800,
    h: 600,
    Body: WPoster
  }
  ```
  And a desktop icon should be registered in `DESK_ICONS` (lines 93-226) mapping to an appropriate SVG icon (e.g., `AtlasIcon` or `WorksIcon`).
* **Source Markdown File 1: `WORKFLOW.md`**: Located at `/Users/ana/Research/hub/iconocracy-corpus/docs/WORKFLOW.md`. It contains standard Markdown:
  * Top-level Title: `# Workflow Operacional`
  * Headings: `## Regra-mestra`, `## Rotina diária`, `## Rotina semanal`, `## Antes de abrir PR`, `## Antes de release público`, `## Regras de bolso`
  * Lists: Bullet lists (`- `) and numbered lists (`1. `).
  * Code blocks: Monospace bash commands wrapped in ` ```bash ` ... ` ``` `.
* **Source Markdown File 2: `methodology.md`**: Located at `/Users/ana/Research/hub/iconocracy-corpus/docs/methodology.md`. It contains academic Markdown:
  * Title: `# Metodologia — Cartografia Warburguiana do Imaginário Jurídico`
  * Blockquote/Epigraph: `> Espelhamento público (para o repositório-backbone)...`
  * Metadata Table: Two-column table with headers `| Campo | Valor |`.
  * Image Tag: `![Pipeline metodológico...](./assets/pipeline-methodology.png)`
  * Visual Layout Elements: Standard markdown tables with alignment and columns.
  * Checklist items: Task items like `- [ ] Congelar pipeline...` and `- [ ] Piloto de 10 pranchas...`.
  * Academic references: Citations formatted in ABNT NBR 6023:2025.
  * Section `## Anexo M.2`: Structured table with columns `|| # | Condição | Sustentador Norte | Sustentador Sul | Efeito da adição | Indicador auditável |`.
* **Source File 3: `genealogia-alegoria-feminina.md`**: Located at `/Users/ana/Research/hub/iconocracy-corpus/genealogia-alegoria-feminina.md`. 
  * *Critical Discovery*: Although it has a `.md` extension, the file is entirely a JSON document starting on line 1 with `{` and ending on line 903 with `}`.
  * *Parsing Error*: Attempting to parse the raw text as JSON fails:
    ```
    json.decoder.JSONDecodeError: Invalid \escape: line 2 column 2 (char 3)
    ```
    This is because it contains Markdown escape backslashes before underscores and square brackets (e.g. `2: "\_meta": {`, `16: "palavras_chave": \[`, `27: \]`).
  * *Sanitization Fix*: Replacing `\_` with `_`, `\[` with `[`, and `\]` with `]` resolves all parsing errors, yielding a fully valid JSON structure containing dissertation data (`_meta`, `theses`, `genealogy_timeline`, `iconographic_mapping`, `political_paradox`, `concepts_network`, and `regimes_iconocraticos`).
  * Language attributes: It includes Portuguese keys (`titulo_principal`, `resumo`) and English equivalents (`abstract_en`).
  * Terminology Constraints: Under `CN-02` (line 706) and `TESE-03` (line 131), the concept **"endurecimento" must always remain in Portuguese**; it must never be translated to "hardening" or "embrutecimento".

---

## 2. Logic Chain
1. **Dynamic Loader Separation**:
   * Upon fetching a resource, the component must inspect the first non-whitespace character. If it is `{`, it sanitizes the string and parses it via `JSON.parse()`, routing it to the **Structured JSON Poster Renderer**. Otherwise, it routes it to the **Markdown Block Parser**.
   * Sanitization pattern for JSON text:
     ```javascript
     const cleanedText = rawText.replace(/\\_/g, '_').replace(/\\\[/g, '[').replace(/\\\]/g, ']');
     const jsonData = JSON.parse(cleanedText);
     ```
2. **Lightweight Markdown Block Parser**:
   * Split the text by double newlines (`\n\n`) to obtain structural blocks.
   * Classify each block by inspection:
     * Header: Regex `^#{1,6}\s+(.*)` -> Render standard headers H1-H6 with Vanguard typography styles.
     * Quote Block: Regex `^>\s*(.*)` -> Render blockquote container with a left margin border in `--rubric`.
     * Bullet List: Regex `^\s*[-*+]\s+(.*)` -> Render `<ul>` with custom square/diamond list bullets.
     * Checkbox: Regex `^\s*[-*+]\s+\[([ xX])\]\s+(.*)` -> Render retro System 7 styled checkboxes.
     * Ordered List: Regex `^\s*\d+\.\s+(.*)` -> Render `<ol>` with elegant Roman or Serif numerals.
     * Table: Regex containing `|` on consecutive lines -> Parse columns and rows.
     * Monospace/Code block: Regex starting with ` ``` ` -> Render `<pre className="terminal-box">` mimicking retro terminal window chrome.
     * Body Paragraph: Default fallback. The first paragraph of any section must be styled with a **Drop Cap** (first letter isolated, floated left, scaled to 2.5x, using `--font-display` and colored in `--rubric`).
3. **Conference Poster Layout Grid Mapping**:
   * Academic posters require a grid structure consisting of a **Title Banner** (header) spanning the full width, followed by **Columns** mapping content fields.
   * **CSS Multi-column flow (`column-count: 3`, `column-fill: balance`)** can be used for normal text files like `WORKFLOW.md` and `methodology.md`. To prevent sections, tables, and callouts from being split awkwardly, we must apply `break-inside: avoid` (or `page-break-inside: avoid`) to each parsed block.
   * **Structured Data Layout Grid (for JSON)**: Since JSON is structured, we map the fields to a 3-column layout:
     * *Banner*: `_meta.titulo_principal` (or English equivalent), author name, and PPGD/UFSC affiliation.
     * *Column 1*: Theses block (`theses` map) and concepts network (`concepts_network` representation).
     * *Column 2*: Historical timeline (`genealogy_timeline` phases) and regimes of iconocracy (`regimes_iconocraticos` cards).
     * *Column 3*: Iconographic mapping (`iconographic_mapping` table/cards with visual gauges for "endurecimento score") and the political paradox analysis (`political_paradox`).
     * *Footer*: References, keywords, and bilingual toggle.
4. **Bilingual Support ({ lang } = 'pt' | 'en')**:
   * The `WPoster` component must consume the `lang` prop passed from the desktop environment.
   * *For JSON data*:
     * If `lang === 'en'`, swap `resumo` for `abstract_en`.
     * Use a translation dictionary for standard headers and key concepts (e.g. "O Álibi Gramatical" -> "The Grammatical Alibi", "A Venda" -> "The Blindfold", "A Balança" -> "The Scales").
     * *Constraint Check*: The word "endurecimento" must remain in Portuguese even when `lang === 'en'`.
   * *For standard Markdown*:
     * Translate the structural UI elements (e.g. "Próximos Passos" -> "Next Steps", "Referências" -> "References", "Status" -> "Status").
     * Render the original Portuguese text or provide an option to fetch an English localized version if it is added to `/docs/` in the future.

---

## 3. Caveats
* **Network Constraint**: The investigation is read-only and no network calls were made to external resources, adhering strictly to the CODE_ONLY mode constraint.
* **Component Implementation**: The code files `WPoster.js` and `poster.html` are not yet created, as they are designated for Milestone 3 (Core Implementation). This analysis provides the blueprint and layout calculations for that implementation.
* **Multi-column CSS Quirks**: Standard CSS multi-column layouts sometimes experience spacing bugs on older browsers. Flexbox or Grid-based column mapping (distributing blocks manually into 3 column divs based on character/block height approximations) offers higher layout stability.

---

## 4. Conclusion
The `WPoster` component must be a hybrid parser-renderer. It must dynamically fetch local assets, detect the format (JSON vs. Markdown), apply a lightweight block parser with Vanguard Design System styling (laid-paper vellum, ink text, rubric red accents, double-bezel frames, and custom drop caps), map the elements into a balanced 3-column poster grid, and handle bilingual toggling (`pt`/`en`) with strict conservation of the key concept "endurecimento".

---

## 5. Verification Method
To verify this analysis and prep for implementation:
1. Check the existence of source documents:
   ```bash
   ls -la /Users/ana/Research/hub/iconocracy-corpus/docs/WORKFLOW.md
   ls -la /Users/ana/Research/hub/iconocracy-corpus/docs/methodology.md
   ls -la /Users/ana/Research/hub/iconocracy-corpus/genealogia-alegoria-feminina.md
   ```
2. Verify the JSON syntax of `genealogia-alegoria-feminina.md` after cleaning the backslashes:
   ```bash
   python3 -c "
   import json
   with open('/Users/ana/Research/hub/iconocracy-corpus/genealogia-alegoria-feminina.md') as f:
       cleaned = f.read().replace('\\\\_', '_').replace('\\\\[', '[').replace('\\\\]', ']')
       json.loads(cleaned)
   print('JSON syntax is valid after cleaning!')
   "
   ```
   *Expected result*: Prints `JSON syntax is valid after cleaning!` and exits with code 0.
