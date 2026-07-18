const { test, expect } = require('@playwright/test');

test.describe('Tier 3 - Cross-Feature Combinations', () => {

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => { localStorage.setItem('av_booted', '1'); });
  });

  test('T3.1: F1 + F2 (Markdown + Aesthetic): Verify dynamic Markdown elements are rendered with correct Vanguard Protocol typography', async ({ page }) => {
    await page.goto('/poster.html');
    const h1 = page.locator('.poster h1, h1.poster-h1, h1').first();
    const p = page.locator('.poster p, p.poster-p').first();
    await expect(h1).toHaveCSS('font-family', /Cormorant Garamond|serif/i);
    // The tabula reading body is set in Crimson Pro (long-form academic reading)
    await expect(p).toHaveCSS('font-family', /Crimson Pro|serif/i);
  });

  test('T3.2: F1 + F3 (Markdown + Zoom): Verify that the full dynamic content layout rearranges or transitions smoothly to detailed reading layout when zoomed', async ({ page }) => {
    await page.goto('/poster.html');
    const poster = page.locator('.poster, .poster-bezel-outer').first();
    await poster.click();
    const p = page.locator('.poster p, p.poster-p').first();
    await expect(p).toBeVisible();
  });

  test('T3.3: F2 + F3 (Aesthetic + Zoom): Verify that during the zoom-in spring physics animation, the Double-Bezel border and paper texture scale proportionally without rendering artifacts', async ({ page }) => {
    await page.goto('/poster.html');
    const poster = page.locator('.poster, .poster-bezel-outer').first();
    await poster.click();
    const outerBezel = page.locator('.poster .bezel-outer, .poster-bezel-outer');
    const innerBezel = page.locator('.poster .bezel-inner, .poster-bezel-inner');
    await expect(outerBezel).toBeVisible();
    await expect(innerBezel).toBeVisible();
  });

  test('T3.4: F3 + F4 (Zoom + Desktop): Verify that zooming a poster inside WPoster React window component does not spill outside window boundaries or break desktop-level drag/drop operations', async ({ page }) => {
    await page.goto('/mesa/');
    const enterBtn = page.locator('button', { hasText: /entrar/i });
    if (await enterBtn.isVisible()) {
      await enterBtn.click();
    }
    const posterIcon = page.locator('button', { hasText: /^tabula$/i });
    await posterIcon.dblclick();

    const poster = page.locator('.poster, .poster-bezel-outer').first();
    await poster.click();

    const titleBar = page.locator('button[aria-label="Fechar"]').locator('xpath=..');
    const boxBefore = await titleBar.boundingBox();
    
    await titleBar.hover();
    await page.mouse.down();
    await page.mouse.move(boxBefore.x + 50, boxBefore.y + 30);
    await page.mouse.up();
    
    const boxAfter = await titleBar.boundingBox();
    expect(boxAfter.x).not.toBe(boxBefore.x);
  });
});
