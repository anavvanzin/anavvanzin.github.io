# Handoff Report — E2E Test Execution

## 1. Observation
The Playwright E2E test suite was executed in the workspace using the command:
`npx playwright test`

### Results Summary
- **Total Tests**: 52
- **Passed**: 31
- **Failed**: 21
- **Exit Code**: 1

### Detailed Failures (Verbatim Errors)

#### 1. Desktop App Icon Visibility & Click Timeouts
- **Test File**: `tests/poster.spec.js:40:1` (`desktop app poster window integration`)
  - **Error**:
    ```
    Error: expect(locator).toBeVisible() failed
    Locator: locator('button').filter({ hasText: /^(pôsteres|posters)$/i })
    Expected: visible
    Timeout: 5000ms
    Error: element(s) not found
    ```
- **Test File**: `tests/tier1-coverage.spec.js:150:3` (`T1.F4.5: Verify double-clicking the poster icon...`)
  - **Error**:
    ```
    Error: expect(locator).toBeVisible() failed
    Locator: locator('button').filter({ hasText: /^pôsteres$/i })
    Expected: visible
    Timeout: 2000ms
    Error: element(s) not found
    ```
- **Test File**: `tests/tier2-boundaries.spec.js` (Multiple tests like `T2.F4.1`, `T2.F4.2`, `T2.F4.3`, `T2.F4.5`) & `tests/tier3-combinations.spec.js` (`T3.4`) & `tests/tier4-scenarios.spec.js` (`T4.1`, `T4.4`)
  - **Error**:
    ```
    Error: locator.dblclick: Test timeout of 30000ms exceeded.
    Call log:
      - waiting for locator('button').filter({ hasText: /^pôsteres$/i })
    ```

#### 2. Brittle Timeout Failures on Markdown Elements
- **Test File**: `tests/tier1-coverage.spec.js:19:3` (`T1.F1.3: Verify poster.html parses Markdown bold/italic text and renders strong/em tags`)
  - **Error**:
    ```
    Error: expect(locator).toBeVisible() failed
    Locator: locator('.poster strong, strong').first()
    Expected: visible
    Timeout: 2000ms
    Error: element(s) not found
    ```
- **Test File**: `tests/tier1-coverage.spec.js:35:3` (`T1.F1.5: Verify poster.html parses blockquotes (> quote) and renders blockquote elements`)
  - **Error**:
    ```
    Error: expect(locator).toBeVisible() failed
    Locator: locator('.poster blockquote, blockquote').first()
    Expected: visible
    Timeout: 2000ms
    Error: element(s) not found
    ```

#### 3. Styling / CSS Rule Mismatch
- **Test File**: `tests/tier1-coverage.spec.js:48:3` (`T1.F2.2: Verify text colors use the ink color (#211B16) and highlight/titles use the rubrica (#9B2C1C) or gold (#9C7C3D)`)
  - **Error**:
    ```
    Error: expect(locator).toHaveCSS(expected) failed
    Locator:  locator('.poster h1, .poster-block h1, h1.poster-h1').first()
    Expected: "rgb(155, 44, 28)"
    Received: "rgb(33, 27, 22)"
    Timeout:  2000ms
    ```

#### 4. Scroll Position Loss
- **Test File**: `tests/tier2-boundaries.spec.js:125:3` (`T2.F3.4: Verify scroll position of the poster is preserved or reset correctly upon zooming/unzooming`)
  - **Error**:
    ```
    Error: expect(received).toBe(expected) // Object.is equality
    Expected: 100
    Received: 0  (or 118 in some runs)
    ```

#### 5. Outline Focus Mismatch
- **Test File**: `tests/tier2-boundaries.spec.js:136:3` (`T2.F3.5: Verify focus outline states are maintained correctly during and after animations`)
  - **Error**:
    ```
    Error: expect(locator).toBeFocused() failed
    Locator:  locator('.poster, .poster-bezel-outer').first()
    Expected: focused
    Received: inactive
    ```

---

## 2. Logic Chain

### A. Analysis of Desktop App Integration Failures
1. **Observation**: All `/mesa/` desktop app integration tests failed or timed out waiting for the `pôsteres` button.
2. **Investigation**: `test-debug.js` was run and confirmed that `pôsteres` is indeed rendered in the DOM, has size, and is visible. The `ENTRAR →` button is also visible on load.
3. **Reasoning**: The tests use the following conditional click logic:
   ```javascript
   const enterBtn = page.locator('button', { hasText: /entrar/i });
   if (await enterBtn.isVisible()) {
     await enterBtn.click();
   }
   ```
   Playwright's `isVisible()` check runs immediately. Since React takes some time to hydrate, the button is not visible yet when the check runs, so the `if` block is skipped. A split second later, the `Boot` overlay renders on screen, covering the desktop. When the test later tries to double-click the `pôsteres` button, the click is intercepted/blocked by the `Boot` overlay, causing Playwright to wait indefinitely for it to be hit-testable and eventually time out.

### B. Analysis of Markdown Element Failures
1. **Observation**: `T1.F1.3` (strong/em) and `T1.F1.5` (blockquote) failed with `element not found` after exactly 2.3 seconds of execution.
2. **Investigation**: The default poster `/docs/WORKFLOW.md` contains the blockquote `> **Workflow curto** para tocar a tese sem perder tempo com *drift de estrutura*, Git ou release.`. Thus, blockquotes, strong tags, and em tags are all present in the static file.
3. **Reasoning**: These assertions explicitly override the timeout to 2000ms (`await expect(...).toBeVisible({ timeout: 2000 })`). Under parallel test execution, hydration and file fetching take slightly longer than 2 seconds, causing the assertions to fail prematurely before the React component has finished fetching the markdown file.

### C. Analysis of Styling / CSS Rule Mismatch
1. **Observation**: `T1.F2.2` expected the h1 header to have the rubrica color (`rgb(155, 44, 28)`), but received the ink color (`rgb(33, 27, 22)`).
2. **Investigation**: The parsed header is rendered as `<h1 class="poster-h1">` directly under `.poster-columns`.
3. **Reasoning**: In `styles.css`, there are rules for `.poster-block h1`, but because parsed header elements are not wrapped inside `.poster-block` blocks, they fall back to the default ink color inherit from `body`. There is no `.poster-h1` or `.poster-columns h1` styling rule in `styles.css`.

### D. Analysis of Scroll Position Loss
1. **Observation**: `T2.F3.4` failed because the scroll position returned `0` (or `118`) instead of the expected `100`.
2. **Reasoning**: When the poster transitions to a zoomed state, its positioning style changes to `absolute`/`fixed`. This removes it from the document flow, collapsing the height of the document body. As a result, the browser scrolls the page back to `0`. When the poster is unzoomed, the original scroll position is lost.

---

## 3. Caveats
- No changes to the codebase or tests were implemented, as the role of this worker is strictly test execution, analysis, and reporting.
- Exact rendering times and hydration speeds will vary based on hardware performance and test runner parallelization.

---

## 4. Conclusion
The failures in the test suite are divided into two categories:

### Genuine Code / Implementation Issues:
1. **Missing CSS Selector (`T1.F2.2`)**: The styles do not apply the rubrica color (`#9B2C1C`) to parsed headings (`.poster-h1` / `.poster-columns h1`).
2. **Scroll Position Loss (`T2.F3.4`)**: The layout does not preserve document height or restore the scroll position when transitioning in and out of the zoomed state.

### Genuine Test Suite Issues:
1. **Hydration Race Condition on Boot Dismissal**: The tests use conditional `if (await enterBtn.isVisible())` which evaluates before React is hydrated, causing it to skip dismissing the boot screen.
2. **Too-Short Assertion Timeouts (`T1.F1.3`, `T1.F1.5`)**: Explicit 2000ms timeouts are too low for parallel test runner execution, failing tests before the markdown files can be fetched.

---

## 5. Verification Method
To verify the failures independently, you can run:
1. `npx playwright test` to run the full test suite.
2. `npx playwright test tests/tier1-coverage.spec.js` to target coverage tests specifically.
3. `node test-debug.js` to execute the standalone debug script that demonstrates that the desktop app loads and renders elements correctly if given enough time to hydrate.
