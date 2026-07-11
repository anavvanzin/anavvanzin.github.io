const { test, expect } = require('@playwright/test');

test.describe('Tier 5 - Challenger 2 Adversarial Coverage Hardening', () => {

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => { localStorage.setItem('av_booted', '1'); });
  });

  // Gap 1: Network Fetch Race Condition
  test('T5.1: Network Fetch Race Condition in Tab Switcher', async ({ page }) => {
    // Delay methodology.md by 2000ms
    await page.route('**/docs/methodology.md', async route => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await route.continue();
    });
    // genealogia-alegoria-feminina.md resolves instantly
    await page.route('**/docs/genealogia-alegoria-feminina.md', route => route.continue());

    await page.goto('/poster.html');

    const tabs = page.locator('.poster-tab');
    await expect(tabs.nth(0)).toHaveClass(/active/);

    // Rapidly switch tabs: click Genealogia (instant), click Methodology (delayed), click Genealogia (instant)
    await tabs.nth(1).click(); // Genealogia
    await tabs.nth(0).click(); // Methodology (triggers delayed fetch)
    await tabs.nth(1).click(); // Genealogia (triggers instant fetch)

    // Wait for delayed fetch to finish (2500ms)
    await page.waitForTimeout(2500);

    // The active tab is Genealogia (index 1)
    await expect(tabs.nth(1)).toHaveClass(/active/);

    // If race condition bug is present, the slow methodology.md (Markdown) response overwrites
    // the content, causing a JSON parse error because it tries to parse Markdown as JSON.
    const errorBox = page.locator('text=/Error parsing JSON|Unexpected token/i');
    await expect(errorBox).not.toBeVisible();

    // The banner title of Genealogia should be visible
    const bannerTitle = page.locator('.poster-banner h1');
    await expect(bannerTitle).toBeVisible();
  });

  // Gap 2: Container Scroll Position Preservation inside Desktop App Window
  test('T5.2: Scroll Position Preservation inside Desktop App Window Container', async ({ page }) => {
    await page.goto('/mesa/');
    const enterBtn = page.locator('button', { hasText: /entrar/i });
    if (await enterBtn.isVisible()) {
      await enterBtn.click();
    }
    const posterIcon = page.locator('button', { hasText: /^pôsteres$/i });
    await posterIcon.dblclick();

    // The poster-root-container is the element with overflow-y/scroll inside the desktop window wrapper
    const rootContainer = page.locator('.poster-root-container');
    await expect(rootContainer).toBeVisible();

    // Force a scrollbar by constraining height and setting overflow
    await rootContainer.evaluate(el => {
      el.style.height = '200px';
      el.style.overflow = 'auto';
    });

    // Scroll the container downwards
    await rootContainer.evaluate(el => el.scrollTop = 100);
    const scrollTopBefore = await rootContainer.evaluate(el => el.scrollTop);
    expect(scrollTopBefore).toBeGreaterThan(0);
    
    // Zoom the poster
    const poster = page.locator('.poster, .poster-bezel-outer').first();
    await poster.click({ position: { x: 10, y: 10 } });
    await expect(poster).toHaveClass(/zoomed/);

    // Unzoom the poster using Escape key
    await page.keyboard.press('Escape');
    await expect(poster).not.toHaveClass(/zoomed/);

    // Verify if scroll position of the container is preserved
    const scrollTopAfter = await rootContainer.evaluate(el => el.scrollTop);
    expect(scrollTopAfter).toBe(scrollTopBefore);
  });

  // Gap 3: Keyboard Accessibility Spacebar Zoom Activation
  test('T5.3: Keyboard Accessibility - Spacebar Zoom Activation', async ({ page }) => {
    await page.goto('/poster.html');
    const poster = page.locator('.poster, .poster-bezel-outer').first();
    await poster.focus();
    await expect(poster).toBeFocused();
    
    // Press Space bar to trigger zoom
    await page.keyboard.press('Space');
    await expect(poster).toHaveClass(/zoomed|zoom-active/i);
  });

  // Gap 4: Mobile Touch Target size for Zoom Backdrop
  test('T5.4: Zoom Close Backdrop Touch Target Size on Mobile Screens', async ({ page }) => {
    await page.goto('/poster.html');
    await page.setViewportSize({ width: 375, height: 667 });

    const poster = page.locator('.poster, .poster-bezel-outer').first();
    await poster.click();
    await expect(poster).toHaveClass(/zoomed/);

    const posterBox = await poster.boundingBox();
    const viewportWidth = 375;
    
    const leftMargin = posterBox.x;
    const rightMargin = viewportWidth - (posterBox.x + posterBox.width);
    
    // Touch targets should have a width/height of at least 44px for accessibility
    expect(leftMargin).toBeGreaterThanOrEqual(44);
    expect(rightMargin).toBeGreaterThanOrEqual(44);
  });

  // Gap 5: Single-line Code Block Parsing
  test('T5.5: Markdown Parser - Single-line Code Block Handling', async ({ page }) => {
    const md = '```js const val = 42; ```';
    await page.route('**/docs/methodology.md', route => route.fulfill({ status: 200, body: md }));
    await page.goto('/poster.html');
    
    const code = page.locator('.poster code, code');
    await expect(code).toBeVisible();
    await expect(code).toHaveText(/const val = 42/);
  });

  // Gap 6: Unmatched Formatting Characters Rendering
  test('T5.6: Markdown Parser - Unmatched Single Formatting Character Handling', async ({ page }) => {
    const md = 'This is *italic but unmatched text';
    await page.route('**/docs/methodology.md', route => route.fulfill({ status: 200, body: md }));
    await page.goto('/poster.html');
    
    const em = page.locator('.poster em, em');
    // Unmatched asterisks should be rendered as literal text, not wrapped in em tags
    await expect(em).not.toBeVisible();
  });

  // Gap 7: Drop Cap Formatting Suppression
  test('T5.7: Drop Cap rendering on Formatted Starting Paragraphs', async ({ page }) => {
    const md = '**T**his starts with bold text.';
    await page.route('**/docs/methodology.md', route => route.fulfill({ status: 200, body: md }));
    await page.goto('/poster.html');
    
    const dropCap = page.locator('.poster-drop-cap, .drop-cap');
    // Drop cap should find the starting letter even if wrapped in bold/italic tags
    await expect(dropCap).toBeVisible();
    await expect(dropCap).toHaveText('T');
  });

});
