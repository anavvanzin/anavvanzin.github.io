const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ana vanzin · direito & iconografia/);
});

test('mother desktop icon does not load the full photo as its thumbnail', async ({ page }) => {
  await page.goto('/');

  const icon = page.locator('a.icon[href="/assets/mae.jpg"]');
  await expect(icon).toBeVisible();
  await expect(icon.locator('.cap img')).toHaveCount(0);
  await expect(icon.locator('.cap')).toHaveText('M');
});
