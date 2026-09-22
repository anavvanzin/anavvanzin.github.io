const { test, expect } = require('@playwright/test');

test.describe('O contrato visual — integração da publicação', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => { localStorage.setItem('av_booted', '1'); });
  });

  test('links antigos de Tabula chegam à publicação', async ({ page }) => {
    await page.goto('/poster.html');
    await expect(page).toHaveURL(/\/publicacoes\/contrato-visual\.html$/);
    await expect(page.getByRole('heading', { name: /O contrato visual/i }).first()).toBeVisible();
  });

  test('a publicação é identificada como versão de trabalho', async ({ page }) => {
    await page.goto('/publicacoes/contrato-visual.html');
    await expect(page.getByText(/Versão de trabalho/i).first()).toBeVisible();
    await expect(page.getByText(/peer review incorporado/i)).toHaveCount(0);

    const source = await page.request.get('/docs/genealogia-alegoria-feminina.md');
    expect(await source.text()).not.toMatch(/peer review incorporado/i);
  });

  for (const route of ['/', '/mesa/']) {
    test(`${route} não carrega o renderizador antigo`, async ({ page }) => {
      const requested = [];
      page.on('request', request => requested.push(new URL(request.url()).pathname));
      await page.goto(route);
      await expect(page.getByRole('button', { name: 'Tabula', exact: true })).toHaveCount(0);
      expect(requested).not.toContain('/WPoster.js');
      expect(requested).not.toContain('/docs/genealogia-alegoria-feminina.md');
    });
  }

  test('o ladrilho abre diretamente O contrato visual', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'materiais e escrita', exact: true }).click();
    const articleTile = page.locator('.desktop-icon[data-app-id="contrato-visual"]');
    await expect(articleTile).toBeVisible();
    await expect(articleTile).toContainText(/o contrato visual/i);
    await articleTile.click();
    await expect(page).toHaveURL(/\/publicacoes\/contrato-visual\.html$/);
  });

  test('a página inicial não referencia a foto materna ausente', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a[href="/assets/mae.jpg"], img[src="/assets/mae.jpg"]')).toHaveCount(0);
  });
});
