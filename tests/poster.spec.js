const { test, expect } = require('@playwright/test');

test('standalone poster page loads and tabs function', async ({ page }) => {
  await page.goto('/poster.html');

  // Verify the page title
  await expect(page).toHaveTitle(/ana vanzin · sala de pôsteres/);

  // Check that the two tabs are visible
  const tabs = page.locator('.poster-tab');
  await expect(tabs).toHaveCount(2);
  await expect(tabs.nth(0)).toHaveText(/Metodologia/);
  await expect(tabs.nth(1)).toHaveText(/Genealogia da Alegoria Feminina/);

  // Verify default poster content (Metodologia should be active)
  await expect(tabs.nth(0)).toHaveClass(/active/);
  const loading = page.locator('.poster-loading');
  await expect(loading).not.toBeVisible();

  // Verify that methodology content renders
  await expect(page.locator('.poster-h2').first()).toHaveText(/0. Pipeline metodológico/);

  // Toggle to Genealogia tab (JSON)
  await tabs.nth(1).click();
  await expect(tabs.nth(1)).toHaveClass(/active/);
  // Verify banner title in Column layout (either Portuguese or English)
  const bannerTitle = page.locator('.poster-banner h1');
  await expect(bannerTitle).toHaveText(/(O contrato visual|The Visual Contract)/);
});

test('desktop app poster window integration', async ({ page }) => {
  await page.addInitScript(() => { localStorage.setItem('av_booted', '1'); });
  await page.goto('/mesa/');

  // Enter the desktop app if there is a boot screen or enter button
  const enterBtn = page.locator('button', { hasText: /entrar/i });
  if (await enterBtn.isVisible()) {
    await enterBtn.click();
  }

  // Find the posters icon on desktop (could be "pôsteres" or "posters")
  const posterIcon = page.locator('button', { hasText: /^(pôsteres|posters)$/i });
  await expect(posterIcon).toBeVisible();

  // Double click the posters icon to open window
  await posterIcon.dblclick();

  // Verify that the window is open (could be "sala de pôsteres" or "poster room")
  const win = page.locator('.dwin', { hasText: /(sala de pôsteres|poster room)/i });
  await expect(win).toBeVisible();

  // Check that the poster tabs are rendered inside the window
  const tabs = win.locator('.poster-tab');
  await expect(tabs).toHaveCount(2);
});
