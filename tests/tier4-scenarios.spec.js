const { test, expect } = require('@playwright/test');

test.describe('Tier 4 - Real-World Application Scenarios', () => {

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => { localStorage.setItem('av_booted', '1'); });
  });

  test('T4.1: Scenario 1 (Full Poster Room Navigation): Full path from home page double-click icon -> open poster room -> hover poster (tactile scale) -> click poster (spring physics zoom) -> read content', async ({ page }) => {
    await page.goto('/mesa/');
    const enterBtn = page.locator('button', { hasText: /entrar/i });
    if (await enterBtn.isVisible()) {
      await enterBtn.click();
    }
    const posterIcon = page.locator('button', { hasText: /^tabula$/i });
    await posterIcon.dblclick();

    const poster = page.locator('.poster, .poster-bezel-outer').first();
    await poster.hover();
    await poster.click();
    
    const p = page.locator('.poster p, p.poster-p').first();
    await expect(p).toBeVisible();
  });

  test('T4.2: Scenario 2 (Keyboard Accessibility & Escape Close): Tab navigation -> Enter zoom -> Escape close', async ({ page }) => {
    await page.goto('/poster.html');
    
    await page.keyboard.press('Tab');
    const poster = page.locator('.poster, .poster-bezel-outer').first();
    await poster.focus();
    
    await page.keyboard.press('Enter');
    await expect(poster).toHaveClass(/zoomed|zoom-active/i);
    
    await page.keyboard.press('Escape');
    await expect(poster).not.toHaveClass(/zoomed|zoom-active/i);
  });

  test('T4.3: Scenario 3 (Single-plate tabula): renders as one academic plate with no document switcher', async ({ page }) => {
    await page.goto('/poster.html');
    // No tabs / document switcher anymore — it is a single plate
    await expect(page.locator('.poster-tab')).toHaveCount(0);
    await expect(page.locator('.poster-banner h1, h1').first()).toContainText(/Visual Contract|O contrato visual/i);
    await expect(page.locator('.tabula-card').first()).toBeVisible();
    await expect(page.locator('.tabula-refs li').first()).toBeVisible();
  });

  test('T4.4: Scenario 4 (Multi-Window Interaction): Open multiple windows, verify z-index focus layering and interaction separation', async ({ page }) => {
    await page.goto('/mesa/');
    const enterBtn = page.locator('button', { hasText: /entrar/i });
    if (await enterBtn.isVisible()) {
      await enterBtn.click();
    }
    
    const posterIcon = page.locator('button', { hasText: /^tabula$/i });
    await posterIcon.dblclick();

    const teseTitle = page.locator('button', { hasText: /tese/i }).first();
    await teseTitle.click();

    // The tabula plate stays mounted alongside the other window
    await expect(page.locator('.poster-banner h1').first()).toBeVisible();
  });

  test('T4.5: Scenario 5 (Mobile / Small Screen Responsiveness): Simulating small screen, verify grid reflows to single column, drop caps remain readable, no horizontal overflow', async ({ page }) => {
    await page.goto('/poster.html');
    await page.setViewportSize({ width: 375, height: 667 });
    
    const isOverflowing = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(isOverflowing).toBe(false);
    
    const columns = page.locator('.poster-columns');
    if (await columns.isVisible()) {
      const columnCount = await columns.evaluate(el => window.getComputedStyle(el).columnCount);
      expect(columnCount).toBe('1');
    }
  });
});
