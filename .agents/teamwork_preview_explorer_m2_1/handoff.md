# Handoff Report: Vanguard Protocol Visual Design Analysis for Academic Posters

This report outlines the visual design system investigation for the Academic Poster Room and `WPoster` React component. It details the implementation of the Vanguard Protocol visual identity (colors, typography, frames, paper texture, and drop caps) and provides concrete CSS rules and React component proposals aligned with the existing codebase.

---

## 1. Observation

We directly observed the following styles, design assets, and functional conventions across the codebase:

### A. Color and Typography Tokens
In `/Users/ana/.gemini/antigravity/worktrees/anavvanzin/create-new-feature-branch/styles.css`, the primary Vanguard design tokens are declared under `:root`:
* **Vanguard Color Palette** (lines 17–25):
  ```css
  --ink: #211B16;
  --paper: #F2EAD9;
  --rubric: #9B2C1C;
  --gold: #9C7C3D;
  --gold-2: #B7934C;
  --gold-soft: color-mix(in srgb, var(--gold) 45%, var(--paper));
  ```
* **Typography Families** (lines 75–76):
  ```css
  --font-display: 'Cormorant Garamond', 'Times New Roman', serif;
  --font-body: 'Hanken Grotesk', 'Helvetica Neue', sans-serif;
  ```
* **Strict Layout Defaults** (lines 127–131):
  ```css
  --rule-w-hairline: 1px;
  --rule-w-strong: 2px;
  --radius: 0;                /* fixed: no rounded corners */
  --shadow: none;             /* fixed: no shadows */
  ```

### B. Double-Bezel (Doppelrand) Frame Implementation
In `/Users/ana/.gemini/antigravity/worktrees/anavvanzin/create-new-feature-branch/ampulheta.html`, a tactile double-bezel border is configured around the central interactive canvas (lines 124–147):
```css
.double-bezel-outer {
  background: var(--paper-card);
  border: 1.5px solid var(--ink);
  padding: 6px;
  box-shadow: 4px 4px 0 rgba(33,27,22,0.12);
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 3 / 4;
  max-height: 52vh;
  transition: transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
}

.double-bezel-inner {
  border: 1px solid var(--gold);
  background: var(--paper-card);
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
```
* **Double-Bezel Rules**: In `/Users/ana/.gemini/antigravity/worktrees/anavvanzin/create-new-feature-branch/tokens/spacing.css` (lines 22–23), shorthand tokens for gold borders are defined as:
  ```css
  --rule-gold:        1px solid var(--gold);
  --rule-gold-double: 3px double var(--gold);
  ```

### C. Paper Texture Implementations
Two paper texture mechanisms exist in the codebase:
1. **Dynamic SVG Filter Overlay** in `ampulheta.html` (lines 25–34 and 225–231):
   * *SVG Element Definition*:
     ```html
     <svg style="display:none;" aria-hidden="true">
       <filter id="paper-noise">
         <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" stitchTiles="stitch" />
         <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.038 0" />
       </filter>
     </svg>
     ```
   * *CSS Body Overlay*:
     ```css
     body::before {
       content: "";
       position: fixed;
       inset: 0;
       z-index: 9999;
       pointer-events: none;
       background: transparent;
       filter: url(#paper-noise);
       opacity: 0.7;
     }
     ```
2. **Inline Data-URI SVG Background Grain Token** in `/Users/ana/.gemini/antigravity/worktrees/anavvanzin/create-new-feature-branch/tokens/spacing.css` (lines 45–46):
   ```css
   --grain: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.035'/%3E%3C/svg%3E");
   ```

### D. Drop Caps (Capitulares) Implementation
In `ampulheta.html` (lines 193–203), drop caps are styled to create an incunabulum/press aesthetic:
```css
.drop-cap {
  font-family: var(--font-display);
  font-size: 42px;
  font-weight: 600;
  float: left;
  line-height: 0.8;
  margin-top: 3px;
  margin-right: 6px;
  color: var(--rubric);
  text-shadow: 1px 1px 0 rgba(33,27,22,0.08);
}
```
In JavaScript (line 325), it is dynamically generated from raw strings:
```javascript
document.getElementById('quote-body').innerHTML = `<span class="drop-cap">${firstChar}</span>${remainingText}`;
```

### E. Codebase Environment and Compilation Constraints
According to the root `_LEIA.md` (lines 36–38), scripts in the desktop app environment must run directly in the browser without active transpilers:
> "Scripts da mesa (pré-compilados, sem Babel): icons.js · desktop-app.js · window-contents.js"
All React components inside `window-contents.js` are either compiled to ES5 `React.createElement` calls or designed to run natively.

---

## 2. Logic Chain

1. **Colors & Palete Fidelity**:
   The poster and its interior elements must exclusively use `--paper` (`#F2EAD9`) as backgrounds, `--ink` (`#211B16`) for body text and primary bounds, `--rubric` (`#9B2C1C`) for section indicators and decorative drop caps, and `--gold` (`#9C7C3D`) for nested frames.

2. **Double-Bezel (Doppelrand) Architecture**:
   * To prevent visual leakage and support standard retro styling, the poster's outer border must be `1.5px solid var(--ink)` with an offset drop-shadow (`box-shadow: 5px 5px 0 var(--ink)` or similar).
   * Inside, a padding of `8px` creates a warm border gap (`--paper`), which terminates on a thin inner gold frame of `1px solid var(--gold)`.
   * This is implemented as a nested div structure: `.poster-double-bezel-outer` wrapping `.poster-double-bezel-inner`.

3. **Optimizing Paper Texture**:
   * *Dynamic SVG Filter* (`#paper-noise`) creates a true organic displacement and noise, but it causes significant repaint cost on large containers because the browser re-evaluates the turbulence vector matrix on every scroll or zoom action.
   * *Inline SVG Tiled Background* (`var(--grain)`) generates a static 256x256 pattern which is hardware-accelerated. By referencing this token in a pseudo-element (`::after` or `::before`) absolute overlay with `pointer-events: none` and a blend mode (`mix-blend-mode: multiply`), the poster achieves a tactile, physical press feel across all text and images without performance stuttering.

4. **Dynamic Drop Caps (Capitulares)**:
   * A pure-CSS approach using `:first-letter` is simple, but fails to handle edge cases like starting paragraphs with quote marks (`"`, `“`, `«`) or footnotes, often scaling the quotes instead of the letter.
   * A JS/React wrapper detects the first alphanumeric character, wraps it in a `.drop-cap` span, and appends the remainder. This ensures strict typographical precision.

---

## 3. Caveats

* **CSS filter performance**: If the poster is placed in a scaling window (e.g. using `transform: scale(x)` for retro desktop window zoom or spring physics transitions), real-time SVG filter effects (`filter: url(#paper-noise)`) will cause pixelated scaling or massive frame drops on mobile Safari/Chrome. We recommend the inline tiled background (`var(--grain)`) for scaling nodes.
* **Cormorant Garamond metrics**: Cormorant Garamond has deep descenders and a high ascender line. The `line-height: 0.8` and `margin-top: 3px` values for `.drop-cap` should be spot-checked across different font-rendering engines to prevent the top of letters from clipping.

---

## 4. Conclusion & Concrete Proposal

We propose the following CSS classes and React elements to implement the Vanguard visual system for `WPoster.js`:

### A. CSS Class Declarations (`styles.css` additions)

```css
/* ==========================================================================
   Vanguard Protocol Design System: Academic Poster Styles
   ========================================================================== */

/* 1. Double-Bezel Frame */
.poster-bezel-outer {
  background: var(--paper);
  border: 1.5px solid var(--ink);
  padding: 8px; /* Classic Doppelrand offset */
  box-sizing: border-box;
  box-shadow: 5px 5px 0 var(--ink);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.poster-bezel-inner {
  border: 1px solid var(--gold);
  background: var(--paper);
  box-sizing: border-box;
  padding: var(--space-6); /* inner poster padding: 24px */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* 2. Paper Texture Layering */
.poster-texture-overlay::before {
  content: "";
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-image: var(--grain); /* references the token */
  background-repeat: repeat;
  opacity: 0.8;
  mix-blend-mode: multiply;
  pointer-events: none;
  z-index: 100; /* overlays everything including text/images */
}

/* 3. Typographical Layout Elements */
.poster-title-banner {
  border-bottom: 2px solid var(--ink);
  padding-bottom: var(--space-4);
  margin-bottom: var(--space-6);
  text-align: center;
}

.poster-eyebrow {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.8125rem;
  letter-spacing: var(--tracking-eyebrow, 0.22em);
  color: var(--rubric);
  text-transform: uppercase;
  margin-bottom: var(--space-2);
}

.poster-title {
  font-family: var(--font-display);
  font-weight: var(--weight-display-strong, 600);
  font-size: 2.2rem;
  line-height: var(--leading-heading, 1.15);
  color: var(--ink);
  margin: 0;
}

.poster-grid-3col {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
  flex: 1;
}

.poster-column {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.poster-section {
  border-top: 1px solid var(--ink-30);
  padding-top: var(--space-4);
  break-inside: avoid;
}

.poster-section-header {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.375rem;
  color: var(--rubric);
  margin-bottom: var(--space-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* 4. Drop Cap Styling */
.poster-drop-cap {
  font-family: var(--font-display);
  font-size: 3.8rem;
  font-weight: 600;
  float: left;
  line-height: 0.75;
  margin-top: 4px;
  margin-right: 8px;
  margin-left: 2px;
  color: var(--rubric);
  text-shadow: 1px 1px 0 rgba(33,27,22,0.08);
}

.poster-body-text {
  font-family: var(--font-body);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-body);
  text-align: justify;
  margin: 0 0 var(--space-4);
}
```

### B. React Components Proposal

We provide both modern **ES6 JSX** (for documentation) and **ES5 React.createElement** (for direct injection inside `window-contents.js`):

#### 1. JSX Structure

```jsx
// Poster Double-Bezel Frame Component
const PosterBezel = ({ children, className = '' }) => (
  <div className={`poster-bezel-outer poster-texture-overlay ${className}`}>
    <div className="poster-bezel-inner">
      {children}
    </div>
  </div>
);

// Dynamic Drop Cap Paragraph Component
const DropCapParagraph = ({ text, className = '' }) => {
  if (!text) return null;

  // Find the first alphanumeric letter to apply drop cap, ignoring initial punctuation
  const match = text.match(/[a-zA-ZÀ-ÿ]/);
  if (!match) {
    return <p className={`poster-body-text ${className}`}>{text}</p>;
  }

  const index = match.index;
  const leadingPunctuation = text.slice(0, index);
  const firstLetter = match[0];
  const restText = text.slice(index + 1);

  return (
    <p className={`poster-body-text ${className}`}>
      {leadingPunctuation}
      <span className="poster-drop-cap">{firstLetter}</span>
      {restText}
    </p>
  );
};
```

#### 2. Pre-Compiled ES5 `React.createElement` (Ready for `window-contents.js`)

```javascript
/* Pre-compiled React components for window-contents.js integration */

function PosterBezel(props) {
  var className = props.className || '';
  return React.createElement("div", {
    className: "poster-bezel-outer poster-texture-overlay " + className
  }, React.createElement("div", {
    className: "poster-bezel-inner"
  }, props.children));
}

function DropCapParagraph(props) {
  var text = props.text;
  var className = props.className || '';
  if (!text) return null;

  var match = text.match(/[a-zA-ZÀ-ÿ]/);
  if (!match) {
    return React.createElement("p", {
      className: "poster-body-text " + className
    }, text);
  }

  var index = match.index;
  var leadingPunctuation = text.slice(0, index);
  var firstLetter = match[0];
  var restText = text.slice(index + 1);

  return React.createElement("p", {
    className: "poster-body-text " + className
  },
    leadingPunctuation,
    React.createElement("span", { className: "poster-drop-cap" }, firstLetter),
    restText
  );
}

// Export components globally to window.avapp registry
Object.assign(window.avapp = window.avapp || {}, {
  PosterBezel: PosterBezel,
  DropCapParagraph: DropCapParagraph
});
```

---

## 5. Verification Method

To independently verify these proposed structures and styles:

1. **Verify Asset Presence**:
   Confirm that the referenced `--grain` variable contains a valid SVG data URI:
   ```bash
   grep -o "var(--grain)" /Users/ana/.gemini/antigravity/worktrees/anavvanzin/create-new-feature-branch/tokens/spacing.css
   ```
2. **HTML Prototype Check**:
   Create a small temporary HTML snippet applying `.poster-bezel-outer`, `.poster-bezel-inner`, `.poster-texture-overlay`, and `.poster-drop-cap` inside a browser environment. Double-check that:
   * The outer frame aligns correctly with the 8px padding and 1px inner gold border.
   * The paper texture (`var(--grain)`) tiles across the whole container.
   * The text wraps naturally around the drop cap float boundary.
