# Handoff Report — Adversarial Coverage Hardening (Tier 5)

## 1. Observation

During Phase 2: Adversarial Coverage Hardening, we analyzed `WPoster.js`, `styles.css`, and the existing tests in `tests/`. We created a new test suite file at `tests/tier5-adversarial.spec.js` targeting six separate edge cases and potential bugs. We also discovered and executed a parallel suite `tests/tier5-adversarial-challenger2.spec.js` which surfaced five more gaps.

We ran the test suite using `npx playwright test` under various configurations. The following observations were recorded:

1. **Stale Fetch Race Condition**:
   - In `WPoster.js` (lines 187–205), `useEffect` initiates a fetch without cancellation (e.g. `AbortController` or a local active boolean flag).
   - Our test `T5.6` in `tests/tier5-adversarial.spec.js` simulates a slow response (800ms) for the first tab and a fast response (100ms) for the second tab, clicked in rapid succession.
   - The test failed with:
     ```
     Error: expect(received).toContain(expected) // indexOf
     Expected substring: "Fast Methodology Content"
     Received string:    "Slow Workflow Content"
     ```
     This confirms that the late-resolving fetch from the first tab overwrites the active content of the second tab.

2. **Keyboard Event Capture / Bubbling Bug**:
   - In `WPoster.js` (lines 396–406 and 440–454), `onKeyDown` handles the `Enter` key on the `.poster` container and calls `e.preventDefault()`.
   - Our test `T5.4` focused a checkbox within the zoomed poster and pressed `Enter`. The checkbox state change was prevented because the event bubbled up and triggered `preventDefault()` in `handleKeyDown`. The test successfully verified this blocking behavior.

3. **Scroll Position Preservation**:
   - The existing test `T2.F3.4` and our draft test `T5.5` failed because Playwright's `click()` and `focus()` automatically scroll elements into view, changing the scroll position *before* the click/focus events fire.
   - For `T5.5`, changing the scroll position measurement to be captured *after* the browser focus scroll but *before* zoom resulted in a passing test, verifying that the React scroll restoration logic (`window.scrollTo(0, saved)` in `WPoster.js:239`) works correctly once isolated from Playwright's test runner side-effects.

4. **JSON Parsing Resilience**:
   - `WPoster.js` (lines 268–385) has `try-catch` error handling in `renderJsonContent()`. Our test `T5.3` confirmed that malformed or incomplete JSON does not crash the React app but displays a clean error card (`Error parsing JSON: ...`), which is a robust behavior.

5. **Additional Gaps (from peer tests in `tier5-adversarial-challenger2.spec.js`)**:
   - `T5.3: Keyboard Accessibility - Spacebar Zoom Activation` failed:
     ```
     Error: expect(locator).toHaveClass(expected) failed
     Locator: locator('.poster, .poster-bezel-outer').first()
     Expected pattern: /zoomed|zoom-active/i
     Received string:  "poster poster-bezel-outer poster-window-zoom"
     ```
     Spacebar is not registered to toggle zoom; only Enter is supported.
   - `T5.4: Zoom Close Backdrop Touch Target Size on Mobile Screens` failed:
     ```
     Error: expect(received).toBeGreaterThanOrEqual(expected)
     Expected: >= 44
     Received:    17.5963134765625
     ```
     On mobile screens, the touch target boundary margins on the zoom backdrop fail the 44px minimum touch target size standard.
   - `T5.5: Markdown Parser - Single-line Code Block Handling` failed:
     ```
     Error: expect(locator).toBeVisible() failed
     Locator:  locator('.poster code, code')
     ```
     Single-line code blocks like `` ```code``` `` are not parsed correctly by the block splitter because it expects newlines.
   - `T5.6: Markdown Parser - Unmatched Single Formatting Character Handling` failed:
     ```
     Error: expect(locator).not.toBeVisible() failed
     Locator:  locator('.poster em, em')
     ```
     Unmatched asterisks are incorrectly parsed as styling elements instead of literal text.
   - `T5.7: Drop Cap rendering on Formatted Starting Paragraphs` failed:
     ```
     Error: expect(locator).toBeVisible() failed
     Locator: locator('.poster-drop-cap, .drop-cap')
     ```
     Drop caps fail to render on paragraphs starting with bold/italic tags (e.g. `**T**he`).

---

## 2. Logic Chain

1. We examined the source code of `WPoster.js` and identified that:
   - Promises from async fetches are never cancelled or ignored when tabs change.
   - The poster container intercepts `Enter` keyboard events and suppresses defaults without checking if the event originated from an interactive child (e.g., a link or checkbox).
   - The drop cap regex restricts itself to `[A-Za-zÀ-ÖØ-öø-ÿ]`.
   - JSON parsing wraps all column mappings in a single try-catch.
2. Based on these observations, we wrote tests in `tests/tier5-adversarial.spec.js` using Playwright's routing (`page.route()`) and event simulation to evaluate these behaviors.
3. Upon running the tests:
   - The tab-switching race condition test failed because late-arriving requests overwrite active state (`T5.6` failed).
   - The keydown Enter test proved that interactive input elements inside the poster have their default actions blocked (`T5.4` passed, exposing the bug).
   - Scroll position tests initially failed because Playwright's `focus()` scrolls the viewport, but capturing the baseline post-focus scroll position allowed the test to pass (`T5.5` passed).
4. Therefore, the implementation contains concrete bugs in asynchronous race-condition prevention and keyboard event capture scoping.

---

## 3. Caveats

- We did not modify the implementation code of `WPoster.js` or `styles.css` as we are under a **Review-only** constraint.
- The Playwright tests run headlessly in Chromium. We did not verify other browser engines (like WebKit or Firefox), though the identified bugs are logical and apply across all browsers.
- We assumed that Playwright's automated scroll-into-view behavior during `focus()` was an artifact of the test environment rather than a bug in the application, and structured `T5.5` accordingly.

---

## 4. Conclusion

The Academic Poster Room implementation has two major functional bugs and several minor parser limitations:
1. **Critical Race Condition**: Switching tabs quickly results in corrupted views where the active tab displays content from a previously clicked tab.
2. **Keyboard Accessibility Interception**: Focused interactive elements (e.g. checkboxes, buttons) inside the zoomed poster cannot be activated via `Enter` because the outer container intercepts the keydown event, cancels its default action, and triggers zoom.
3. **Parser Gaps**: The parser fails on single-line code blocks, unmatched formatting characters, and drop-caps on formatted starting letters.
4. **Touch Targets**: The zoom backdrop touch close targets are below the 44px accessibility threshold on mobile viewports.

---

## 5. Verification Method

To verify these findings, run the following commands in the project root:

1. Install dependencies (if not already done):
   ```bash
   npm install
   ```
2. Execute the Playwright test suite (port 8083 is used to avoid EADDRINUSE lockups from previous ports):
   ```bash
   npx playwright test
   ```
3. Inspect the failing test results. The test runner will log:
   - `tests/tier5-adversarial.spec.js:162` (`T5.6` stale fetch race condition fails)
   - `tests/tier5-adversarial-challenger2.spec.js` (multiple tests fail, confirming parser, keyboard, and touch target bugs)
