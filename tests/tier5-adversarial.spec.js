const { test, expect } = require('@playwright/test');

test.describe('Tier 5 - Adversarial Coverage Hardening', () => {

  test.beforeEach(async ({ page }) => {
    // Standard setup: set the av_booted flag to bypass boot screen
    await page.addInitScript(() => {
      localStorage.setItem('av_booted', '1');
    });
  });

  // Gap 1: HTML Injections / XSS in Markdown
  test('T5.1: Verify markdown parser escapes HTML injections and prevents XSS execution', async ({ page }) => {
    const maliciousMd = '# Safe Title\n\n<div id="injected-html-test">Malicious Element</div><script>window.injectedXss = true;</script>';
    
    // Intercept poster document fetch and return malicious markdown content
    await page.route('**/docs/methodology.md', route => route.fulfill({
      status: 200,
      contentType: 'text/markdown',
      body: maliciousMd
    }));

    await page.goto('/poster.html');

    // Verify the HTML tag itself is NOT parsed as a DOM element
    const injectedDiv = page.locator('#injected-html-test');
    await expect(injectedDiv).not.toBeVisible();

    // Verify that script did NOT execute and set window variable
    const xssTriggered = await page.evaluate(() => typeof window.injectedXss !== 'undefined');
    expect(xssTriggered).toBe(false);

    // Verify the raw HTML string is rendered as plain text in the paragraph block
    const pContent = page.locator('.poster p, p.poster-p').first();
    await expect(pContent).toContainText('<div id="injected-html-test">');
  });

  // Gap 2: Unicode character ranges and Drop Cap logic boundaries
  test('T5.2: Verify drop cap logic against Latin and non-Latin character sets', async ({ page }) => {
    // Cyrillic (Д) and Arabic (ع) should NOT get drop caps.
    // normal accented Portuguese characters like Ç or Á should.
    const customMd = 'Çapata verde.\n\nÁgua mineral.\n\nДвадцать.\n\nعربي.\n\n📌 Emoji paragraph.';
    
    await page.route('**/docs/methodology.md', route => route.fulfill({
      status: 200,
      contentType: 'text/markdown',
      body: customMd
    }));

    await page.goto('/poster.html');

    const dropCaps = page.locator('.poster-drop-cap');
    const dropCapTexts = await dropCaps.allInnerTexts();

    // Accented Latin characters Ç and Á should be drop capped
    expect(dropCapTexts).toContain('Ç');
    expect(dropCapTexts).toContain('Á');

    // Non-Latin characters (Д, ع) and emojis (📌) should NOT be drop capped
    expect(dropCapTexts).not.toContain('Д');
    expect(dropCapTexts).not.toContain('ع');
    expect(dropCapTexts).not.toContain('📌');
  });

  // Gap 3: Graceful error UI for invalid or incomplete JSON configuration
  test('T5.3: Verify poster room handles invalid and incomplete JSON content gracefully', async ({ page }) => {
    // 1. Syntactically invalid JSON
    await page.route('**/docs/genealogia-alegoria-feminina.md', route => route.fulfill({
      status: 200,
      contentType: 'text/markdown',
      body: '{ invalid: json }'
    }));

    await page.goto('/poster.html');
    const tabs = page.locator('.poster-tab');
    await tabs.nth(1).click(); // Switch to the Genealogy poster (which loads JSON)

    // Verify error UI is displayed (using auto-retry assertion)
    await expect(page.locator('.poster')).toContainText('Error parsing JSON');

    // 2. Syntactically valid but incomplete JSON (missing required nested properties like theses, concepts_network)
    await page.route('**/docs/genealogia-alegoria-feminina.md', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        _meta: {
          titulo_principal: "Test Title",
          titulo_alternativo: "Alt Title",
          autora: "Test Author",
          afiliacao: "Test Affiliation",
          palavras_chave: ["test"]
        }
        // missing theses, concepts_network, genealogy_timeline, regimes_iconocraticos, iconographic_mapping, political_paradox, references_abnt
      })
    }));

    await page.goto('/poster.html');
    await tabs.nth(1).click();

    // Verify it still fails gracefully via the catch block rather than crashing the page (using auto-retry assertion)
    await expect(page.locator('.poster')).toContainText('Error parsing JSON');
  });

  // Gap 4: Keyboard Event Bubbling and PreventDefault Interception
  test('T5.4: Verify keydown Enter intercepts and prevents default actions on interactive elements inside poster', async ({ page }) => {
    // Create markdown containing a checkbox list item and a markdown link
    const interactiveMd = '- [ ] Checkbox Item\n- Check out **[link](http://example.com)** here.';
    
    await page.route('**/docs/methodology.md', route => route.fulfill({
      status: 200,
      contentType: 'text/markdown',
      body: interactiveMd
    }));

    await page.goto('/poster.html');
    const poster = page.locator('.poster, .poster-bezel-outer').first();

    // Focus the poster and press Enter to zoom in
    await poster.focus();
    await page.keyboard.press('Enter');
    await expect(poster).toHaveClass(/zoomed|zoom-active/i);

    // Verify that clicking or focusing and pressing Enter on a checkbox inside the zoomed poster
    // bubbles keydown and calls preventDefault, blocking standard browser behavior.
    const checkbox = page.locator('input[type="checkbox"]').first();
    await checkbox.focus();
    
    // Pressing Enter when checkbox is focused
    await page.keyboard.press('Enter');
    
    // The poster should stay zoomed (the event bubbles and is caught as poster-level Enter)
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

  // Gap 6: Stale Fetch Race Conditions (Fast Tab Switching)
  test('T5.6: Verify race conditions in tab switching are prevented and active content is correctly preserved', async ({ page }) => {
    // Intercept calls to return slow content for Genealogia and fast content for Methodology
    await page.route('**/docs/genealogia-alegoria-feminina.md', async (route) => {
      // Introduce a 800ms delay to simulate network latency
      await new Promise(resolve => setTimeout(resolve, 800));
      await route.fulfill({
        status: 200,
        contentType: 'text/markdown',
        body: '# Slow Genealogia Content'
      });
    });

    await page.route('**/docs/methodology.md', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'text/markdown',
        body: '# Fast Methodology Content'
      });
    });

    await page.goto('/poster.html');
    const tabs = page.locator('.poster-tab');

    // Click tab 1 (Genealogia — starts slow fetch)
    await tabs.nth(1).click();

    // Immediately click tab 0 (Methodology — starts fast fetch)
    await tabs.nth(0).click();

    // Wait for everything to resolve (1200ms)
    await page.waitForTimeout(1200);

    // If there is a race condition, the slow genealogia content resolving late might overwrite
    // the methodology content even though methodology is the currently active tab.
    const activeTab = tabs.nth(0);
    await expect(activeTab).toHaveClass(/active/);

    const bodyText = await page.locator('.poster').innerText();

    // If it is broken, it will display the slow content instead of the fast content.
    expect(bodyText).toContain('Fast Methodology Content');
    expect(bodyText).not.toContain('Slow Genealogia Content');
  });

});
