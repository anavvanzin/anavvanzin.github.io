const { test, expect } = require('@playwright/test');

const route = '/atlas/nacao-como-mulher/';

test('exhibition has a complete no-JavaScript reading edition', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  const response = await page.goto(route);
  expect(response.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('A Nação como Mulher');
  await expect(page.locator('.object-card')).toHaveCount(9);
  await expect(page.locator('.derivative-label')).toHaveCount(9);
  await expect(page.locator('.source-panel')).toHaveCount(9);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://anavanzin.com/atlas/nacao-como-mulher/');
  await context.close();
});

test('language, filters and modes are keyboard-accessible', async ({ page }) => {
  await page.goto(route);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('A Nação como Mulher');
  await page.getByRole('button', { name: 'EN', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('The Nation as a Woman');
  expect(await page.evaluate(() => localStorage.getItem('av_lang'))).toBe('en');

  await page.getByRole('button', { name: 'war', exact: true }).click();
  await expect(page.locator('.object-card')).toHaveCount(4);
  await page.getByRole('button', { name: 'Explore', exact: true }).click();
  const figure = page.locator('.draggable-figure');
  await expect(figure).toBeVisible();
  const before = await figure.boundingBox();
  await figure.focus();
  await page.keyboard.press('ArrowLeft');
  const after = await figure.boundingBox();
  expect(after.x).toBeLessThan(before.x);
});

test('comparison accepts two records and labels both studies', async ({ page }) => {
  await page.goto(route);
  const select = page.getByRole('button', { name: /Selecionar para comparação/ });
  await select.nth(0).click();
  await select.nth(1).click();
  await expect(page.locator('.comparison-grid article')).toHaveCount(2);
  await expect(page.locator('.comparison-grid article img')).toHaveCount(2);
});

for (const width of [390, 320]) {
  test(`exhibition has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(route);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}

test('the Atlas advertises the thematic exhibition', async ({ page }) => {
  await page.goto('/atlas/');
  const card = page.getByRole('link', { name: /A Nação como Mulher/ });
  await expect(card).toHaveAttribute('href', '/atlas/nacao-como-mulher/');
});
