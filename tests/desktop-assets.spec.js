const { test, expect } = require('@playwright/test');

test('home and desktop reference the shipped mae asset', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a.icon[href="/assets/mae.jpg"]')).toHaveCount(1);
  await expect(page.locator('img[src="/assets/mae.jpg"]')).toHaveCount(0);

  await page.goto('/landing/');
  await expect(page.locator('a.icon[href="/assets/mae.jpg"]')).toHaveCount(1);

  await page.addInitScript(() => { localStorage.setItem('av_booted', '1'); });
  await page.goto('/mesa/');
  const enterBtn = page.locator('button', { hasText: /entrar/i });
  if (await enterBtn.isVisible()) {
    await enterBtn.click();
  }
  await expect(page.locator('button', { hasText: /^mãe\.jpg$/i })).toHaveCount(1);
});
