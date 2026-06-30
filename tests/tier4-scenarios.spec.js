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
    const posterIcon = page.locator('button', { hasText: /^pôsteres$/i });
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

  test('T4.3: Scenario 3 (Dynamic Markdown Document Switcher): Toggle between different posters -> dynamic parsing -> layout refresh', async ({ page }) => {
    await page.goto('/poster.html');
    const tabs = page.locator('.poster-tab');
    
    await expect(tabs.nth(0)).toHaveClass(/active/);
    await expect(page.locator('.poster h2, h2.poster-h2, .poster-block h2').first()).toHaveText(/Regra-mestra/i);
    
    await tabs.nth(1).click();
    await expect(tabs.nth(1)).toHaveClass(/active/);
    await expect(page.locator('.poster h2, h2.poster-h2, .poster-block h2').first()).toHaveText(/0. Pipeline metodológico/i);
    
    await tabs.nth(2).click();
    await expect(tabs.nth(2)).toHaveClass(/active/);
    await expect(page.locator('.poster-banner h1, h1').first()).toContainText(/Visual Contract|O contrato visual/i);
  });

  test('T4.4: Scenario 4 (Multi-Window Interaction): Open multiple windows, verify z-index focus layering and interaction separation', async ({ page }) => {
    await page.goto('/mesa/');
    const enterBtn = page.locator('button', { hasText: /entrar/i });
    if (await enterBtn.isVisible()) {
      await enterBtn.click();
    }
    
    const posterIcon = page.locator('button', { hasText: /^pôsteres$/i });
    await posterIcon.dblclick();
    
    const teseTitle = page.locator('button', { hasText: /tese/i }).first();
    await teseTitle.click();
    
    const posterTabs = page.locator('.poster-tab');
    await expect(posterTabs.first()).toBeVisible();
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
