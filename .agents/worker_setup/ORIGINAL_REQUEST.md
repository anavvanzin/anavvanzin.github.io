## 2026-06-30T10:10:20Z
<USER_REQUEST>
You are E2E Testing Setup Worker. Your task is to:
1. Create `TEST_INFRA.md` at `/Users/ana/.gemini/antigravity/worktrees/anavvanzin/create-new-feature-branch/TEST_INFRA.md` containing the detailed E2E test infra design and the 49 test cases we planned.
2. Create `playwright.config.js` at the project root configured to:
   - Run tests located in `tests/` directory.
   - Run a local static file server using node or bun (e.g. on port 8080) as a background webServer during the tests.
   - Configure basic settings (e.g. viewport, timeouts, headless mode).
3. Validate that Playwright can be run by running a dry run command (e.g. `npx playwright test --list` or a simple hello-world test) and report the results.

Here is the exact template for `TEST_INFRA.md` and the 49 test cases:

# E2E Test Infra: Iconocracia Poster Room

## Test Philosophy
- Opaque-box, requirement-driven. No dependency on implementation design.
- Methodology: Category-Partition + BVA + Pairwise + Workload Testing.

## Feature Inventory
| # | Feature | Source (requirement) | Tier 1 | Tier 2 | Tier 3 |
|---|---------|---------------------|:------:|:------:|:------:|
| 1 | Dynamic Markdown Rendering | ORIGINAL_REQUEST §R1 | 5 | 5 | Yes |
| 2 | Editorial Aesthetic & Vanguard Protocol | ORIGINAL_REQUEST §R2 | 5 | 5 | Yes |
| 3 | Motion Choreography (Spring Physics) | ORIGINAL_REQUEST §R3 | 5 | 5 | Yes |
| 4 | Desktop & Home Page Integration | ORIGINAL_REQUEST §R4 | 5 | 5 | Yes |

## Test Architecture
- Test runner: Playwright Test (npx playwright test)
- Test case format: Playwright test specs (.spec.js)
- Directory layout: tests/

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | Full Poster Room Navigation | F1, F2, F3, F4 | Medium |
| 2 | Keyboard Accessibility & Escape Close | F3, F4 | Medium |
| 3 | Dynamic Markdown Document Switcher | F1, F2 | Medium |
| 4 | Multi-Window Interaction | F4 | High |
| 5 | Mobile / Small Screen Responsiveness | F1, F2, F3 | Medium |

## Coverage Thresholds
- Tier 1: 20 test cases (5 per feature)
- Tier 2: 20 test cases (5 per feature)
- Tier 3: 4 test cases (covering major feature pairs)
- Tier 4: 5 realistic application scenarios
- Total: 49 test cases

### Test Case Catalog

#### Tier 1 - Feature Coverage (5 per feature, total 20 test cases)
- **Feature 1: Dynamic Markdown Rendering (R1)**
  - T1.F1.1: Verify poster.html parses a simple Markdown header (# Heading) and renders it as an h1 element.
  - T1.F1.2: Verify poster.html parses Markdown paragraphs and renders them inside p blocks.
  - T1.F1.3: Verify poster.html parses Markdown bold/italic text and renders strong/em tags.
  - T1.F1.4: Verify poster.html parses Markdown bullet lists (- item) and renders ul/li structure.
  - T1.F1.5: Verify poster.html parses blockquotes (> quote) and renders blockquote elements.
- **Feature 2: Editorial Aesthetic & Vanguard Protocol (R2)**
  - T1.F2.1: Verify background color of the poster container matches the Vanguard Protocol paper color (#F2EAD9).
  - T1.F2.2: Verify text colors use the ink color (#211B16) and highlight/titles use the rubrica (#9B2C1C) or gold (#9C7C3D).
  - T1.F2.3: Verify the nested Double-Bezel (Doppelrand) border style exists on posters (two layers of borders).
  - T1.F2.4: Verify posters have a subtle paper texture overlay (e.g., background-image or pattern).
  - T1.F2.5: Verify drop caps (Drop Caps) are applied to the first letter of paragraphs in the poster sections.
- **Feature 3: Motion Choreography (R3)**
  - T1.F3.1: Verify clicking or hovering on a poster triggers a CSS transition using a custom cubic-bezier timing function.
  - T1.F3.2: Verify transitions only animate transform and opacity to ensure GPU acceleration.
  - T1.F3.3: Verify poster zoom state changes class name or data-state to indicate a transition occurred.
  - T1.F3.4: Verify zoom state displays a backdrop/overlay behind the active poster.
  - T1.F3.5: Verify pressing Escape or clicking the backdrop closes the zoomed poster back to its normal state with a smooth transition.
- **Feature 4: Desktop & Home Page Integration (R4)**
  - T1.F4.1: Verify window-contents.js registers the WPoster component globally under window.avapp.WPoster.
  - T1.F4.2: Verify desktop-app.js registers the poster window key in the REG object.
  - T1.F4.3: Verify icons.js contains a definition for the poster icon.
  - T1.F4.4: Verify index.html (the Home Page) has the poster icon on the desktop.
  - T1.F4.5: Verify double-clicking the poster icon on the desktop successfully creates a window container for poster.

#### Tier 2 - Boundary & Corner Cases (5 per feature, total 20 test cases)
- **Feature 1: Dynamic Markdown Rendering (R1)**
  - T2.F1.1: Verify handling of empty Markdown files or empty content strings gracefully.
  - T2.F1.2: Verify rendering of extremely large Markdown documents without breaking layout.
  - T2.F1.3: Verify rendering of complex nested lists and code blocks.
  - T2.F1.4: Verify handling of special/accented characters (Portuguese/Latin glyphs) without encoding corruption.
  - T2.F1.5: Verify parser handles malformed Markdown gracefully without breaking the DOM tree.
- **Feature 2: Editorial Aesthetic & Vanguard Protocol (R2)**
  - T2.F2.1: Verify text styling when font sizes are changed or scaled (no overlapping text).
  - T2.F2.2: Verify Double-Bezel borders maintain correct proportional scaling when the window is resized.
  - T2.F2.3: Verify the gold color (#9C7C3D) is applied strictly to internal bezels/decorations.
  - T2.F2.4: Verify drop caps are not applied to empty paragraphs or paragraphs starting with non-alphabetical characters.
  - T2.F2.5: Verify the contrast ratio of the ink color (#211B16) on the paper color (#F2EAD9) meets readable standards.
- **Feature 3: Motion Choreography (R3)**
  - T2.F3.1: Verify behavior when clicking a poster multiple times rapidly during the zoom animation.
  - T2.F3.2: Verify zoom behaves correctly when the window is resized during an active zoom state.
  - T2.F3.3: Verify that nested elements inside the poster do not animate independently or break alignment during zoom.
  - T2.F3.4: Verify scroll position of the poster is preserved or reset correctly upon zooming/unzooming.
  - T2.F3.5: Verify focus outline states are maintained correctly during and after animations.
- **Feature 4: Desktop & Home Page Integration (R4)**
  - T2.F4.1: Verify behavior when the poster window is opened multiple times (should focus existing or open a single instance cleanly).
  - T2.F4.2: Verify the poster window can be dragged and repositioned within the desktop workspace boundary.
  - T2.F4.3: Verify window minimize, maximize, and close buttons on the poster window work correctly.
  - T2.F4.4: Verify opening the poster window does not close or interfere with other open desktop windows.
  - T2.F4.5: Verify window dimensions are clamped within minimum/maximum boundaries.

#### Tier 3 - Cross-Feature Combinations (4 test cases)
- T3.1: F1 + F2 (Markdown + Aesthetic): Verify dynamic Markdown elements are rendered with correct Vanguard Protocol typography.
- T3.2: F1 + F3 (Markdown + Zoom): Verify that the full dynamic content layout rearranges or transitions smoothly to detailed reading layout when zoomed.
- T3.3: F2 + F3 (Aesthetic + Zoom): Verify that during the zoom-in spring physics animation, the Double-Bezel border and paper texture scale proportionally without rendering artifacts.
- T3.4: F3 + F4 (Zoom + Desktop): Verify that zooming a poster inside WPoster React window component does not spill outside window boundaries or break desktop-level drag/drop operations.

#### Tier 4 - Real-World Application Scenarios (5 test cases)
- T4.1: Scenario 1 (Full Poster Room Navigation): Full path from home page double-click icon -> open poster room -> hover poster (tactile scale) -> click poster (spring physics zoom) -> read content.
- T4.2: Scenario 2 (Keyboard Accessibility & Escape Close): Tab navigation -> Enter zoom -> Escape close.
- T4.3: Scenario 3 (Dynamic Markdown Document Switcher): Toggle between different posters -> dynamic parsing -> layout refresh.
- T4.4: Scenario 4 (Multi-Window Interaction): Open multiple windows, verify z-index focus layering and interaction separation.
- T4.5: Scenario 5 (Mobile / Small Screen Responsiveness): Simulating small screen, verify grid reflows to single column, drop caps remain readable, no horizontal overflow.

***

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Please perform these steps, run builds/tests to verify the initial setup (dry run), and write a handoff report in your directory (.agents/worker_setup/handoff.md) listing the files created, configurations, and verification command output.
</USER_REQUEST>
