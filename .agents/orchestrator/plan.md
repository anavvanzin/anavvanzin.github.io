# Project Plan — Academic Poster Room & WPoster Component

## 1. Setup & Exploration (Milestone 1)
- Examine other React files (e.g., `WSalaLeitura.js`, `WLeituraIconografia.js`) to see how they are structured, how they handle markdown or fetch content, and how they apply design tokens.
- Locate the document folder containing the academic markdown files (`docs/` or `hub/iconocracy-corpus/`).
- Understand how React scripts are bundled (e.g., `_ds_bundle.js` or Babel in browser).

## 2. Poster Component & Page Implementation (Milestone 2)
- Build `WPoster.js`:
  - Fetch/parse `.md` files dynamically.
  - Render into readable poster columns/blocks (title, text, lists, quotes).
  - Implement Vanguard Protocol UI theme (ink `#211B16`, paper `#F2EAD9`, rubric `#9B2C1C`, gold `#9C7C3D`).
  - Apply double-bezel nested borders, drop caps on text sections, physical paper texture.
  - Implement spring physics transitions on hover, focus, zoom, and expansion using CSS `transform` / `opacity` or math interpolations.
- Build `poster.html`:
  - Standalone HTML page loading `WPoster.js` or serving as the standalone Academic Poster Room.

## 3. Desktop & Home Page Integration (Milestone 3)
- Register `poster` in `desktop-app.js` (under `REG` with w: 800 (and h: 600 or style auto), `DESK_ICONS` table, and `MENUS`/`MENU_LABEL` if needed).
- Register `WPoster` component in `window-contents.js` and expose it to the desktop shell.
- Implement poster icon in `icons.js` (retro SVG format matching the system 7 desktop theme).
- Add the poster icon on the home page (`index.html`) using progressive enhancement: double-click to open in draggable iframe window, click to navigate to `/poster.html`.

## 4. Verification (Milestone 4)
- Verify browser console is error-free.
- Verify mobile responsiveness and responsive panel adaptation.
- Verify spring physics and visual standards.
