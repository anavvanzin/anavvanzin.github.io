const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ana vanzin · direito & iconografia/);
});

test('home entrance is keyboard-safe and transfers focus to the archive', async ({ page }) => {
  await page.goto('/');

  const enter = page.locator('#bootenter');
  await expect(enter).toBeEnabled();
  await enter.press('Enter');

  await expect(page.locator('#boot')).toHaveCount(0);
  await expect(page.locator('#main')).toBeFocused();
});

test('home language switch updates content and accessible names', async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('av_entered', '1'));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await page.locator('button[data-lang="en"]').click();

  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('a.mae')).toHaveAttribute('aria-label', 'For my mother, Suzane Beatriz Vanzin');
  await expect(page.locator('#mob-toggle')).toHaveAttribute('aria-label', 'Open menu');
  await expect(page.locator('.panel-kicker')).toHaveText('Featured research');
});

test('home remains usable when JavaScript is unavailable', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://localhost:8080/');

  await expect(page.locator('#boot')).toBeHidden();
  await expect(page.locator('#main')).toBeVisible();
  await expect(page.locator('a[href="/iconocracia/"]').first()).toBeVisible();

  await context.close();
});

test('featured-research kicker keeps its editorial token styling', async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('av_entered', '1'));
  await page.goto('/');

  const style = await page.locator('.panel-kicker').evaluate((element) => {
    const computed = getComputedStyle(element);
    return { color: computed.color, family: computed.fontFamily };
  });

  expect(style.color).toBe('rgb(212, 175, 55)');
  expect(style.family).toContain('JetBrains Mono');
});

test('atlas symbols open the drawing workshop and accept a stroke', async ({ page }) => {
  await page.goto('/atlas/justitia.html');
  await page.locator('.oc-sym').first().click();

  await expect(page).toHaveURL(/\/iconocracia\/desenhe-um-simbolo\.html#/);
  const canvas = page.locator('#cv');
  await expect(canvas).toBeVisible();

  const before = await canvas.evaluate((element) => element.toDataURL());
  const box = await canvas.boundingBox();
  expect(box).not.toBeNull();
  await page.mouse.move(box.x + box.width * 0.3, box.y + box.height * 0.3);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.7, { steps: 8 });
  await page.mouse.up();
  const after = await canvas.evaluate((element) => element.toDataURL());

  expect(after).not.toBe(before);
});
