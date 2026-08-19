const { test, expect } = require('@playwright/test');

test('standalone tabula page loads as a single academic plate', async ({ page }) => {
  await page.goto('/poster.html');

  // Verify the page title
  await expect(page).toHaveTitle(/ana vanzin · tabula/);

  // The tabula is a single plate — there are no navigation tabs anymore
  await expect(page.locator('.poster-tab')).toHaveCount(0);

  const loading = page.locator('.poster-loading');
  await expect(loading).not.toBeVisible();

  // Banner title of the plate (Portuguese or English)
  const bannerTitle = page.locator('.poster-banner h1');
  await expect(bannerTitle).toHaveText(/(O contrato visual|The Visual Contract)/);

  // Core sections render from the JSON
  await expect(page.locator('.tabula-card').first()).toBeVisible();      // theses
  await expect(page.locator('.tabula-table')).toBeVisible();             // iconographic mapping
  await expect(page.locator('.tabula-refs li').first()).toBeVisible();   // references

  // The internal operational workflow must NOT be published here
  const body = await page.locator('body').innerText();
  expect(body).not.toContain('Research/hub');
  expect(body).not.toContain('conda activate');
  expect(body).not.toMatch(/Regra-mestra/);
});

test('desktop app tabula window integration', async ({ page }) => {
  await page.addInitScript(() => { localStorage.setItem('av_booted', '1'); });
  await page.goto('/mesa/');

  // Enter the desktop app if there is a boot screen or enter button
  const enterBtn = page.locator('button', { hasText: /entrar/i });
  if (await enterBtn.isVisible()) {
    await enterBtn.click();
  }

  // Find the tabula icon on desktop
  const posterIcon = page.locator('button', { hasText: /^tabula$/i });
  await expect(posterIcon).toBeVisible();

  // Double click the icon to open the window
  await posterIcon.dblclick();

  // Verify the window is open
  const win = page.locator('.dwin', { hasText: /tabula/i });
  await expect(win).toBeVisible();

  // Check that the tabula plate renders inside the window
  await expect(win.locator('.poster-banner h1')).toBeVisible();
});
