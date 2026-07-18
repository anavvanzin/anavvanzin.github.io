const { test, expect } = require('@playwright/test');

test.describe('Tier 5 - Adversarial Coverage Hardening', () => {

  test.beforeEach(async ({ page }) => {
    // Standard setup: set the av_booted flag to bypass boot screen
    await page.addInitScript(() => {
      localStorage.setItem('av_booted', '1');
    });
  });

  // Gap 1: HTML Injections / XSS in the JSON source
  test('T5.1: Verify the tabula escapes HTML injections in source fields and prevents XSS execution', async ({ page }) => {
    const maliciousJson = JSON.stringify({
      _meta: {
        titulo_principal: 'SafeTitle<img src=x onerror="window.injectedXss=true"><script>window.injectedXss=true</script>',
        titulo_alternativo: 'Alt',
        autora: 'A', afiliacao: 'B', grupo_pesquisa: 'C',
        resumo: 'Resumo de teste.', palavras_chave: ['x']
      }
    });

    await page.route('**/docs/genealogia-alegoria-feminina.md', route => route.fulfill({
      status: 200, contentType: 'application/json', body: maliciousJson
    }));

    await page.goto('/poster.html');
    await page.waitForSelector('.poster-banner h1');

    // The injected <script> must not execute
    const xssTriggered = await page.evaluate(() => typeof window.injectedXss !== 'undefined');
    expect(xssTriggered).toBe(false);

    // The markup must be rendered as inert text, not as real DOM nodes
    await expect(page.locator('.poster-banner h1')).toContainText('<script>');
    await expect(page.locator('.poster-banner img')).toHaveCount(0);
  });

  // Gap 2: Drop-cap logic against Latin and non-Latin character sets
  test('T5.2: Verify drop cap applies to accented Latin initials but not non-Latin scripts', async ({ page }) => {
    const withAccent = JSON.stringify({ _meta: { titulo_principal: 'T', resumo: 'Água mineral corrente.' } });
    await page.route('**/docs/genealogia-alegoria-feminina.md', route => route.fulfill({
      status: 200, contentType: 'application/json', body: withAccent
    }));
    await page.goto('/poster.html');
    const dropCap = page.locator('.poster-drop-cap');
    await expect(dropCap).toHaveCount(1);
    await expect(dropCap.first()).toHaveText('Á');

    // Cyrillic initial must NOT be drop-capped
    const nonLatin = JSON.stringify({ _meta: { titulo_principal: 'T', resumo: 'Двадцать линий.' } });
    await page.route('**/docs/genealogia-alegoria-feminina.md', route => route.fulfill({
      status: 200, contentType: 'application/json', body: nonLatin
    }));
    await page.goto('/poster.html');
    await page.waitForSelector('.poster-banner h1');
    await expect(page.locator('.poster-drop-cap')).toHaveCount(0);
  });

  // Gap 3: Graceful handling of invalid or incomplete JSON
  test('T5.3: Verify the tabula handles invalid and incomplete JSON gracefully', async ({ page }) => {
    // 1. Syntactically invalid JSON -> explicit error UI
    await page.route('**/docs/genealogia-alegoria-feminina.md', route => route.fulfill({
      status: 200, contentType: 'text/markdown', body: '{ invalid: json }'
    }));
    await page.goto('/poster.html');
    await expect(page.locator('.poster')).toContainText('Error parsing JSON');

    // 2. Valid but incomplete JSON (missing sections) -> degrades gracefully, no crash
    await page.route('**/docs/genealogia-alegoria-feminina.md', route => route.fulfill({
      status: 200, contentType: 'application/json',
      body: JSON.stringify({ _meta: { titulo_principal: 'Test Title', autora: 'A', resumo: 'R' } })
    }));
    await page.goto('/poster.html');
    // The banner still renders, no "Error parsing JSON", no page crash
    await expect(page.locator('.poster-banner h1')).toContainText('Test Title');
    await expect(page.locator('.poster')).not.toContainText('Error parsing JSON');
  });

  // Gap 4: Keyboard Event Interception on the plate
  test('T5.4: Verify keyboard Enter/Escape drive the zoom state on the plate', async ({ page }) => {
    await page.goto('/poster.html');
    const poster = page.locator('.poster, .poster-bezel-outer').first();

    await poster.focus();
    await page.keyboard.press('Enter');
    await expect(poster).toHaveClass(/zoomed|zoom-active/i);

    // Escape closes it back down
    await page.keyboard.press('Escape');
    await expect(poster).not.toHaveClass(/zoomed|zoom-active/i);

    // Space also opens the zoom
    await poster.focus();
    await page.keyboard.press(' ');
    await expect(poster).toHaveClass(/zoomed|zoom-active/i);
  });

  // Gap 5: Keyboard Zoom Scroll Preservation
  test('T5.5: Verify scroll position is preserved exactly during keyboard-triggered zoom/unzoom', async ({ page }) => {
    await page.goto('/poster.html');
    const poster = page.locator('.poster, .poster-bezel-outer').first();

    // Scroll to a known position manually
    await page.evaluate(() => window.scrollTo(0, 100));

    // Focus via keyboard, which may trigger browser-level auto-scroll into view
    await poster.focus();

    // Capture the baseline scroll position AFTER focus-induced auto-scroll, but BEFORE zoom
    const scrollTopBefore = await page.evaluate(() => window.scrollY);

    // Zoom via keyboard Enter
    await page.keyboard.press('Enter');
    await expect(poster).toHaveClass(/zoomed|zoom-active/i);

    // Unzoom via Escape
    await page.keyboard.press('Escape');
    await expect(poster).not.toHaveClass(/zoomed|zoom-active/i);

    // Verify scroll position is restored to the post-focus baseline exactly
    const scrollTopAfter = await page.evaluate(() => window.scrollY);
    expect(scrollTopAfter).toBe(scrollTopBefore);
  });

  // Gap 6: Single source loads cleanly with no leftover loading state
  test('T5.6: Verify the single tabula source loads cleanly with no stale loading state', async ({ page }) => {
    await page.goto('/poster.html');
    await expect(page.locator('.poster-banner h1')).toBeVisible();
    await expect(page.locator('.poster-loading')).toHaveCount(0);
    // Only the single plate is present — no document switcher
    await expect(page.locator('.poster-tab')).toHaveCount(0);
  });

});
