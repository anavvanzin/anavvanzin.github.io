const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const policy = require('../scripts/publication.json');

for (const entry of policy.pages.filter(p => p.category === 'ready')) {
  test('indexable HTML works without JavaScript: ' + entry.file, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    const response = await page.goto('http://localhost:8080/' + entry.file);
    expect(response.status()).toBe(200);
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', entry.canonical);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index,follow');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S.{15}/);
    expect((await page.locator('body').innerText()).trim().length).toBeGreaterThan(80);
    expect(await page.locator('a[href]').count()).toBeGreaterThan(0);
    await context.close();
  });
}

test('drafts and auxiliary pages never enter the sitemap', () => {
  const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
  expect(urls.sort()).toEqual(policy.pages.filter(p => p.category === 'ready').map(p => p.canonical).sort());
  for (const p of policy.pages.filter(p => ['draft', 'utility', 'redirect'].includes(p.category))) {
    expect(fs.readFileSync(p.file, 'utf8')).toMatch(/<meta name="robots" content="noindex,follow">/);
  }
});

test('intro message cannot be dismissed by an unrelated window', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#intro-overlay')).toBeVisible();
  await page.evaluate(() => window.postMessage({ type: 'av:intro-finished' }, location.origin));
  await expect(page.locator('#intro-overlay')).toBeVisible();
  await page.getByRole('button', { name: 'Pular abertura', exact: true }).click();
  await expect(page.locator('#intro-overlay')).toHaveCount(0);
  await expect(page.locator('#root')).not.toHaveAttribute('inert', '');
});
