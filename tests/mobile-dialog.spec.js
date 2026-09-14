const { test, expect } = require('@playwright/test');

for (const entry of ['/', '/mesa/']) {
  test(`mobile menu stays reachable above open windows at ${entry}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 740 });
    await page.addInitScript(() => localStorage.setItem('av_booted', '1'));
    await page.goto(entry);
    const toggle = page.locator('#desktop-menu-toggle');
    const navigation = page.locator('#desktop-navigation');
    await expect(navigation).toBeHidden();
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(navigation.locator('[data-app-id]')).toHaveCount(10);
    await expect(navigation.getByRole('link')).toHaveCount(4);
    await navigation.locator('[data-app-id="projetos"]').click();
    await expect(navigation).toBeHidden();
    await expect(page.locator('[data-window-id="projetos"]')).toBeVisible();
    await toggle.click();
    await expect(navigation.getByRole('button', { name: 'Contato', exact: true })).toBeInViewport();
    await page.keyboard.press('Escape');
    await expect(navigation).toBeHidden();
    await expect(toggle).toBeFocused();
    await expect(page.locator('[data-window-id="projetos"]')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await toggle.click();
    await navigation.locator('[data-app-id="contato"]').click();
    await expect(page.locator('[data-window-id="contato"]')).toBeVisible();
  });
}

test('mobile modal keeps keyboard focus inside the active archive window', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  // Compact/mobile starts with no windows open; tap the projects record to open it.
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await page.locator('button[data-app-id="projetos"]').click();

  const dialog = page.locator('[data-window-id="projetos"]');
  const close = dialog.getByRole('button', { name: 'Fechar Janela', exact: true });
  const lastLink = dialog.getByRole('link', { name: /iconocracia\.com/ });

  await expect(dialog).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(close).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(lastLink).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(close).toBeFocused();
});
