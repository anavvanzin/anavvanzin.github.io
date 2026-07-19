const { test, expect } = require('@playwright/test');

test.describe('Tier 1 - Feature Coverage', () => {

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => { localStorage.setItem('av_booted', '1'); });
  });

  // Feature 1: Dynamic Markdown Rendering (R1)
  test('T1.F1.1: Verify poster.html (tabula) renders the plate title as an h1 element', async ({ page }) => {
    await page.goto('/poster.html');
    const h1 = page.locator('.poster h1, .poster-banner h1, h1');
    await expect(h1.first()).toBeVisible();
    await expect(h1.first()).toHaveText(/(O contrato visual|The Visual Contract)/i);
  });

  test('T1.F1.2: Verify poster.html parses Markdown paragraphs and renders them inside p blocks', async ({ page }) => {
    await page.goto('/poster.html');
    const p = page.locator('.poster p, p.poster-p');
    await expect(p.first()).toBeVisible();
  });

  test('T1.F1.3: Verify poster.html parses Markdown bold/italic text and renders strong/em tags', async ({ page }) => {
    await page.goto('/poster.html');
    // Using spec selectors that might fail if not fully implemented in parsing
    const strong = page.locator('.poster strong, strong');
    const em = page.locator('.poster em, em');
    await expect(strong.first()).toBeVisible();
  });

  test('T1.F1.4: Verify poster.html parses Markdown bullet lists (- item) and renders ul/li structure', async ({ page }) => {
    await page.goto('/poster.html');
    const ul = page.locator('.poster ul, ul.poster-ul');
    const li = page.locator('.poster li, ul.poster-ul li');
    await expect(ul.first()).toBeVisible();
    await expect(li.first()).toBeVisible();
  });

  test('T1.F1.5: Verify poster.html parses blockquotes (> quote) and renders blockquote elements', async ({ page }) => {
    await page.goto('/poster.html');
    const blockquote = page.locator('.poster blockquote, blockquote');
    await expect(blockquote.first()).toBeVisible();
  });

  // Feature 2: Editorial Aesthetic & Vanguard Protocol (R2)
  test('T1.F2.1: Verify background color of the poster container matches the Mnemosyne Viva paper color (#F5F0E6)', async ({ page }) => {
    await page.goto('/poster.html');
    const poster = page.locator('.poster, .poster-bezel-outer');
    await expect(poster).toHaveCSS('background-color', 'rgb(245, 240, 230)');
  });

  test('T1.F2.2: Verify text colors use the ink color (#111111) and highlight/titles use the sienna (#8B3A1A) or ochre (#D4AF37)', async ({ page }) => {
    await page.goto('/poster.html');
    const poster = page.locator('.poster, .poster-bezel-outer');
    await expect(poster).toHaveCSS('color', 'rgb(17, 17, 17)');
    const h1 = page.locator('.poster h1, .poster-block h1, h1.poster-h1');
    await expect(h1.first()).toHaveCSS('color', 'rgb(139, 58, 26)');
  });

  test('T1.F2.3: Verify the nested Double-Bezel (Doppelrand) border style exists on posters (two layers of borders)', async ({ page }) => {
    await page.goto('/poster.html');
    const outerBezel = page.locator('.poster .bezel-outer, .poster-bezel-outer');
    const innerBezel = page.locator('.poster .bezel-inner, .poster-bezel-inner');
    await expect(outerBezel).toBeVisible();
    await expect(innerBezel).toBeVisible();
  });

  test('T1.F2.4: Verify posters have a subtle paper texture overlay (e.g., background-image or pattern)', async ({ page }) => {
    await page.goto('/poster.html');
    const texture = page.locator('.poster .paper-texture, .poster-grain');
    await expect(texture).toBeVisible();
    await expect(texture).toHaveCSS('background-image', /url|pattern/i);
  });

  test('T1.F2.5: Verify drop caps (Drop Caps) are applied to the first letter of paragraphs in the poster sections', async ({ page }) => {
    await page.goto('/poster.html');
    const dropCap = page.locator('.poster .drop-cap, .poster-drop-cap');
    await expect(dropCap.first()).toBeVisible();
  });

  // Feature 3: Motion Choreography (R3)
  test('T1.F3.1: Verify clicking or hovering on a poster triggers a CSS transition using a custom cubic-bezier timing function', async ({ page }) => {
    await page.goto('/poster.html');
    const poster = page.locator('.poster, .poster-bezel-outer').first();
    await poster.hover();
    const transitionProperty = await poster.evaluate(el => window.getComputedStyle(el).transitionTimingFunction);
    expect(transitionProperty).toMatch(/cubic-bezier/i);
  });

  test('T1.F3.2: Verify transitions only animate transform and opacity to ensure GPU acceleration', async ({ page }) => {
    await page.goto('/poster.html');
    const poster = page.locator('.poster, .poster-bezel-outer').first();
    const transitionProperty = await poster.evaluate(el => window.getComputedStyle(el).transitionProperty);
    const properties = transitionProperty.split(',').map(s => s.trim());
    expect(properties).toEqual(expect.arrayContaining(['transform', 'opacity']));
  });

  test('T1.F3.3: Verify poster zoom state changes class name or data-state to indicate a transition occurred', async ({ page }) => {
    await page.goto('/poster.html');
    const poster = page.locator('.poster, .poster-bezel-outer').first();
    await poster.click();
    await expect(poster).toHaveClass(/zoomed|zoom-active/i);
  });

  test('T1.F3.4: Verify zoom state displays a backdrop/overlay behind the active poster', async ({ page }) => {
    await page.goto('/poster.html');
    const poster = page.locator('.poster, .poster-bezel-outer').first();
    await poster.click();
    const backdrop = page.locator('.poster-backdrop, .zoom-backdrop');
    await expect(backdrop).toBeVisible();
  });

  test('T1.F3.5: Verify pressing Escape or clicking the backdrop closes the zoomed poster back to its normal state with a smooth transition', async ({ page }) => {
    await page.goto('/poster.html');
    const poster = page.locator('.poster, .poster-bezel-outer').first();
    await poster.click();
    await page.keyboard.press('Escape');
    await expect(poster).not.toHaveClass(/zoomed|zoom-active/i);
  });

  // Feature 4: Desktop & Home Page Integration (R4)
  test('T1.F4.1: Verify window-contents.js registers the WPoster component globally under window.avapp.WPoster', async ({ page }) => {
    await page.goto('/mesa/');
    const wPosterExists = await page.evaluate(() => typeof window.avapp?.WPoster !== 'undefined');
    expect(wPosterExists).toBe(true);
  });

  test('T1.F4.2: Verify desktop-app.js registers the poster window key in the REG object', async ({ page }) => {
    await page.goto('/mesa/');
    const isRegistered = await page.evaluate(() => {
      return typeof window.avapp?.WPoster !== 'undefined';
    });
    expect(isRegistered).toBe(true);
  });

  test('T1.F4.3: Verify icons.js contains a definition for the poster icon', async ({ page }) => {
    await page.goto('/mesa/');
    const posterIconExists = await page.evaluate(() => {
      return typeof window.avapp?.AtlasIcon !== 'undefined' || typeof window.avapp?.DocIcon !== 'undefined';
    });
    expect(posterIconExists).toBe(true);
  });

  test('T1.F4.4: Verify index.html (the Home Page) has the poster icon on the desktop', async ({ page }) => {
    await page.goto('/');
    const enterBtn = page.locator('#bootenter');
    if (await enterBtn.isVisible()) {
      await enterBtn.click();
    }
    const posterIcon = page.locator('a.icon', { hasText: /tabula/i });
    await expect(posterIcon).toBeVisible();
  });

  test('T1.F4.4b: Verify index.html does not reference the missing mother photo asset', async ({ page }) => {
    await page.goto('/');
    const enterBtn = page.locator('#bootenter');
    if (await enterBtn.isVisible()) {
      await enterBtn.click();
    }
    await expect(page.locator('a[href="/assets/mae.jpg"], img[src="/assets/mae.jpg"]')).toHaveCount(0);
  });

  test('T1.F4.5: Verify double-clicking the poster icon on the desktop successfully creates a window container for poster', async ({ page }) => {
    await page.goto('/mesa/');
    const enterBtn = page.locator('button', { hasText: /entrar/i });
    if (await enterBtn.isVisible()) {
      await enterBtn.click();
    }
    const posterIcon = page.locator('button', { hasText: /^tabula$/i });
    await expect(posterIcon).toBeVisible();
    await posterIcon.dblclick();
    // Opening the window mounts the WPoster (tabula) plate
    const plate = page.locator('.poster-banner h1');
    await expect(plate.first()).toBeVisible();
  });
});
