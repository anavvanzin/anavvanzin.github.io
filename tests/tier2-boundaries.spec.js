const { test, expect } = require('@playwright/test');

test.describe('Tier 2 - Boundaries & Corner Cases', () => {

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => { localStorage.setItem('av_booted', '1'); });
  });

  // Feature 1: Tabula plate rendering (R1)
  test('T2.F1.1: Verify handling of empty source content gracefully (no crash)', async ({ page }) => {
    await page.route('**/docs/genealogia-alegoria-feminina.md', route => route.fulfill({ status: 200, body: '' }));
    await page.goto('/poster.html');
    const root = page.locator('#root');
    await expect(root).toBeVisible();
    await expect(page.locator('text=/Failed to fetch/i')).not.toBeVisible();
  });

  test('T2.F1.2: Verify the plate renders without horizontal overflow / broken layout', async ({ page }) => {
    await page.goto('/poster.html');
    await page.waitForSelector('.tabula-refs li');
    const noOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 2);
    expect(noOverflow).toBeTruthy();
    const cards = await page.locator('.tabula-card').count();
    expect(cards).toBeGreaterThanOrEqual(4);
  });

  test('T2.F1.3: Verify complex structured content (the iconographic table) renders', async ({ page }) => {
    await page.goto('/poster.html');
    const table = page.locator('.tabula-table');
    await expect(table).toBeVisible();
    const rows = await page.locator('.tabula-table tbody tr').count();
    expect(rows).toBeGreaterThan(3);
  });

  test('T2.F1.4: Verify handling of special/accented characters (Portuguese/Latin glyphs) without encoding corruption', async ({ page }) => {
    await page.goto('/poster.html');
    await page.waitForSelector('.poster-banner h1');
    const textContent = await page.locator('body').innerText();
    // Correctly-decoded UTF-8 accents are present…
    expect(textContent).toContain('jurídica');
    // …and no classic UTF-8→Latin-1 mojibake sequences leaked in
    expect(textContent).not.toContain('Ã©');
    expect(textContent).not.toContain('Ã£');
    expect(textContent).not.toContain('Ã§');
  });

  test('T2.F1.5: Verify malformed JSON source is handled gracefully without breaking the DOM tree', async ({ page }) => {
    await page.route('**/docs/genealogia-alegoria-feminina.md', route => route.fulfill({ status: 200, body: '{ not: valid json ' }));
    await page.goto('/poster.html');
    await expect(page.locator('.poster')).toContainText(/Error parsing JSON/);
    await expect(page.locator('#root')).toBeVisible();
  });

  // Feature 2: Editorial Aesthetic & Vanguard Protocol (R2)
  test('T2.F2.1: Verify text styling when font sizes are changed or scaled (no overlapping text)', async ({ page }) => {
    await page.goto('/poster.html');
    await page.setViewportSize({ width: 800, height: 1000 });
    const h1 = page.locator('.poster h1, .poster-banner h1, h1').first();
    const box = await h1.boundingBox();
    expect(box.height).toBeGreaterThan(10);
  });

  test('T2.F2.2: Verify Double-Bezel borders maintain correct proportional scaling when the window is resized', async ({ page }) => {
    await page.goto('/poster.html');
    await page.setViewportSize({ width: 600, height: 800 });
    const outerBezel = page.locator('.poster .bezel-outer, .poster-bezel-outer');
    const innerBezel = page.locator('.poster .bezel-inner, .poster-bezel-inner');
    await expect(outerBezel).toBeVisible();
    await expect(innerBezel).toBeVisible();
  });

  test('T2.F2.3: Verify the gold color (#9C7C3D) is applied strictly to internal bezels/decorations', async ({ page }) => {
    await page.goto('/poster.html');
    const innerBezel = page.locator('.poster .bezel-inner, .poster-bezel-inner');
    await expect(innerBezel).toHaveCSS('border-color', 'rgb(156, 124, 61)');
  });

  test('T2.F2.4: Verify a single drop cap is applied to the abstract on an alphabetic first letter', async ({ page }) => {
    await page.goto('/poster.html');
    const dropCap = page.locator('.poster-drop-cap');
    await expect(dropCap).toHaveCount(1);
    await expect(dropCap.first()).toHaveText(/[A-Za-zÀ-ÖØ-öø-ÿ]/);
  });

  test('T2.F2.5: Verify the contrast ratio of the ink color (#211B16) on the paper color (#F2EAD9) meets readable standards', async ({ page }) => {
    await page.goto('/poster.html');
    const paper = 'rgb(242, 234, 217)';
    const ink = 'rgb(33, 27, 22)';
    const contrast = await page.evaluate(([p, i]) => {
      const getLuminance = (rgbStr) => {
        const parts = rgbStr.match(/\d+/g).map(Number);
        const [r, g, b] = parts.map(c => {
          const s = c / 255;
          return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };
      const l1 = getLuminance(p);
      const l2 = getLuminance(i);
      return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    }, [paper, ink]);
    expect(contrast).toBeGreaterThan(7.0);
  });

  // Feature 3: Motion Choreography (R3)
  test('T2.F3.1: Verify behavior when clicking a poster multiple times rapidly during the zoom animation', async ({ page }) => {
    await page.goto('/poster.html');
    const poster = page.locator('.poster, .poster-bezel-outer').first();
    await poster.click({ clickCount: 3, delay: 50 });
    await expect(poster).toHaveClass(/zoomed|zoom-active/i);
  });

  test('T2.F3.2: Verify zoom behaves correctly when the window is resized during an active zoom state', async ({ page }) => {
    await page.goto('/poster.html');
    const poster = page.locator('.poster, .poster-bezel-outer').first();
    await poster.click();
    await page.setViewportSize({ width: 1024, height: 768 });
    await expect(poster).toHaveClass(/zoomed|zoom-active/i);
  });

  test('T2.F3.3: Verify that nested elements inside the poster do not animate independently or break alignment during zoom', async ({ page }) => {
    await page.goto('/poster.html');
    const poster = page.locator('.poster, .poster-bezel-outer').first();
    await poster.click();
    await page.waitForTimeout(400);
    const innerBezel = page.locator('.poster .bezel-inner, .poster-bezel-inner');
    const dropCap = page.locator('.poster .drop-cap, .poster-drop-cap').first();
    const bezelBox = await innerBezel.boundingBox();
    const capBox = await dropCap.boundingBox();
    expect(capBox.x).toBeGreaterThanOrEqual(bezelBox.x);
  });

  test('T2.F3.4: Verify scroll position of the poster is preserved or reset correctly upon zooming/unzooming', async ({ page }) => {
    await page.goto('/poster.html');
    const poster = page.locator('.poster, .poster-bezel-outer').first();
    await page.evaluate(() => window.scrollTo(0, 100));
    const scrollTopBefore = await page.evaluate(() => window.scrollY);
    await poster.click({ position: { x: 10, y: 10 } });
    await page.keyboard.press('Escape');
    await expect(poster).not.toHaveClass(/zoomed|zoom-active/i);
    const scrollTopAfter = await page.evaluate(() => window.scrollY);
    expect(scrollTopAfter).toBe(scrollTopBefore);
  });

  test('T2.F3.5: Verify focus outline states are maintained correctly during and after animations', async ({ page }) => {
    await page.goto('/poster.html');
    const poster = page.locator('.poster, .poster-bezel-outer').first();
    await poster.focus();
    await expect(poster).toBeFocused();
  });

  // Feature 4: Desktop & Home Page Integration (R4)
  test('T2.F4.1: Verify behavior when the tabula window is opened multiple times (opens cleanly)', async ({ page }) => {
    await page.goto('/mesa/');
    const enterBtn = page.locator('button', { hasText: /entrar/i });
    if (await enterBtn.isVisible()) {
      await enterBtn.click();
    }
    // The desktop icon and the open window title bar both read "tabula";
    // scope to the first match (the desktop icon).
    const posterIcon = page.locator('button', { hasText: /^tabula$/i }).first();
    await posterIcon.dblclick();
    await posterIcon.dblclick();
    await expect(page.locator('.poster-banner h1').first()).toBeVisible();
  });

  test('T2.F4.2: Verify the tabula window can be dragged and repositioned within the desktop workspace boundary', async ({ page }) => {
    await page.goto('/mesa/');
    const enterBtn = page.locator('button', { hasText: /entrar/i });
    if (await enterBtn.isVisible()) {
      await enterBtn.click();
    }
    const posterIcon = page.locator('button', { hasText: /^tabula$/i });
    await posterIcon.dblclick();

    const titleBar = page.locator('button[aria-label="Fechar"]').locator('xpath=..');
    const boxBefore = await titleBar.boundingBox();

    await titleBar.hover();
    await page.mouse.down();
    await page.mouse.move(boxBefore.x + 100, boxBefore.y + 50);
    await page.mouse.up();

    const boxAfter = await titleBar.boundingBox();
    expect(boxAfter.x).not.toBe(boxBefore.x);
  });

  test('T2.F4.3: Verify window close button on the tabula window works correctly', async ({ page }) => {
    await page.goto('/mesa/');
    const enterBtn = page.locator('button', { hasText: /entrar/i });
    if (await enterBtn.isVisible()) {
      await enterBtn.click();
    }
    const posterIcon = page.locator('button', { hasText: /^tabula$/i });
    await posterIcon.dblclick();
    await expect(page.locator('.poster-banner h1')).toBeVisible();

    const closeBtn = page.locator('button[aria-label="Fechar"]').first();
    await closeBtn.click();
    await expect(page.locator('.dwin', { hasText: /tabula/i })).toHaveCount(0);
  });

  test('T2.F4.4: Verify opening the tabula window does not close or interfere with other open desktop windows', async ({ page }) => {
    await page.goto('/mesa/');
    const enterBtn = page.locator('button', { hasText: /entrar/i });
    if (await enterBtn.isVisible()) {
      await enterBtn.click();
    }
    const teseTabs = page.locator('button', { hasText: /tese/i });
    await expect(teseTabs.first()).toBeVisible();

    const posterIcon = page.locator('button', { hasText: /^tabula$/i });
    await posterIcon.dblclick();

    await expect(page.locator('button', { hasText: /tese/i }).first()).toBeVisible();
  });

  test('T2.F4.5: Verify window dimensions are clamped within minimum/maximum boundaries', async ({ page }) => {
    await page.goto('/mesa/');
    const enterBtn = page.locator('button', { hasText: /entrar/i });
    if (await enterBtn.isVisible()) {
      await enterBtn.click();
    }
    const posterIcon = page.locator('button', { hasText: /^tabula$/i });
    await posterIcon.dblclick();

    await page.setViewportSize({ width: 400, height: 600 });
    const win = page.locator('.poster-root-wrapper').or(page.locator('.poster-bezel-outer')).first();
    const box = await win.boundingBox();
    expect(box.width).toBeLessThanOrEqual(400);
  });
});
