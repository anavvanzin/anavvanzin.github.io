const { test, expect } = require('@playwright/test');

test('mobile modal keeps keyboard focus inside the active archive window', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  // Compact/mobile starts with no windows open; tap the projects record to open it.
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
