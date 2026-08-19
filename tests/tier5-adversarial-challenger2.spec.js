const { test, expect } = require('@playwright/test');

test.describe('Tier 5 - Challenger 2 Adversarial Coverage Hardening', () => {

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => { localStorage.setItem('av_booted', '1'); });
  });

  // Gap 1: The plate loads from a single source with no switcher race
  test('T5.1: Single-source load resolves to the plate with no parse error', async ({ page }) => {
    await page.route('**/docs/genealogia-alegoria-feminina.md', route => route.continue());

    await page.goto('/poster.html');

    // No tabs / document switcher
    await expect(page.locator('.poster-tab')).toHaveCount(0);

    // No parse error, banner visible
    const errorBox = page.locator('text=/Error parsing JSON|Unexpected token/i');
    await expect(errorBox).not.toBeVisible();
    await expect(page.locator('.poster-banner h1')).toBeVisible();
  });

  // Gap 2: Container Scroll Position Preservation inside Desktop App Window
  test('T5.2: Scroll Position Preservation inside Desktop App Window Container', async ({ page }) => {
    await page.goto('/mesa/');
    const enterBtn = page.locator('button', { hasText: /entrar/i });
    if (await enterBtn.isVisible()) {
      await enterBtn.click();
    }
    const posterIcon = page.locator('button', { hasText: /^tabula$/i });
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

  // Gap 5: The removed operational workflow must not resurface as code blocks
  test('T5.5: The plate publishes no terminal/code content (workflow leak regression)', async ({ page }) => {
    await page.goto('/poster.html');
    await page.waitForSelector('.poster-banner h1');
    await expect(page.locator('.poster pre, .poster code')).toHaveCount(0);
    const body = await page.locator('body').innerText();
    expect(body).not.toContain('conda activate');
    expect(body).not.toContain('/Users/');
  });

  // Gap 6: Typographic dashes are normalized (no raw triple hyphen)
  test('T5.6: Source em-dashes are normalized in the rendered plate', async ({ page }) => {
    await page.goto('/poster.html');
    await page.waitForSelector('.tabula-card');
    const body = await page.locator('.tabula').innerText();
    expect(body).not.toContain('---');
  });

  // Gap 7: Drop Cap rendering on the abstract's first letter
  test('T5.7: Drop cap renders on the abstract first letter', async ({ page }) => {
    await page.goto('/poster.html');
    const dropCap = page.locator('.poster-drop-cap, .drop-cap');
    await expect(dropCap.first()).toBeVisible();
    await expect(dropCap.first()).toHaveText(/^[A-Za-zÀ-ÖØ-öø-ÿ]$/);
  });

});
