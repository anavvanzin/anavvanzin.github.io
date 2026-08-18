const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ana vanzin · direito & iconografia/);
});

test('home opens as an archive desktop with projects, Justitia and a simple advisor credit', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');

  await expect(page.locator('#boot')).toHaveCount(0);
  await expect(page.locator('.dwin')).toHaveCount(2);
  await expect(page.getByText('Projetos vivos', { exact: true })).toBeVisible();
  await expect(page.getByText('justitia.png', { exact: true }).first()).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/ana vanzin/);
  await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toBeVisible();
  await expect(page.getByRole('dialog')).toHaveCount(2);
  await expect(page.getByRole('dialog', { name: 'justitia.png' })).toBeVisible();
  await expect(page.getByRole('dialog', { name: 'projetos-vivos.app' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Orientador responsável: Arno Dal Ri Júnior, PPGD/UFSC' })).toHaveAttribute(
    'href',
    'https://anavanzin.com/arno-dal-ri-site/'
  );
  await expect(page.locator('a[href*="CV%20Arno"]')).toHaveCount(0);
  await expect(page.locator('[data-desktop-wallpaper="illuminated-justitia"]')).toHaveAttribute(
    'src',
    /assets\/landing\/bg-justitia\.jpg\?v=20260811-archive2/
  );
});

test('home language switch updates projects and the advisor credit', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');

  await page.locator('button[data-lang="en"]').click();

  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('button[data-lang="en"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByText('Living projects', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Responsible advisor: Arno Dal Ri Júnior, PPGD/UFSC' })).toBeVisible();
});

test('home remains usable when JavaScript is unavailable', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://localhost:8080/');

  await expect(page.locator('#main')).toBeVisible();
  await expect(page.locator('a[href="https://iconocracia.com/"]')).toBeVisible();
  await expect(page.locator('a[href="https://grupoiusgentium.com.br/"]')).toBeVisible();
  await expect(page.locator('a[href="https://anavanzin.com/arno-dal-ri-site/"]')).toBeVisible();

  await context.close();
});

test('projects window keeps the Mnemosyne editorial system and sienna focus', async ({ page }) => {
  await page.goto('/');

  const style = await page.locator('.projects-window-title').evaluate((element) => {
    const computed = getComputedStyle(element);
    return { color: computed.color, family: computed.fontFamily };
  });

  expect(style.color).toBe('rgb(17, 17, 17)');
  expect(style.family).toContain('Playfair Display');

  const projectsMenu = page.getByRole('button', { name: 'Projetos', exact: true });
  await projectsMenu.focus();
  await expect(projectsMenu).toBeFocused();
  await expect.poll(() => projectsMenu.evaluate((element) => getComputedStyle(element).outlineColor)).toBe('rgb(139, 58, 26)');
});

test('mobile opens living projects as a scrollable window without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await expect(page.locator('.dwin')).toHaveCount(1);
  await expect(page.getByText('Projetos vivos', { exact: true })).toBeVisible();
  await expect(page.locator('article h3 a[href="https://grupoiusgentium.com.br/"]').filter({ hasText: 'Ius Gentium' })).toBeVisible();
  await expect(page.locator('article h3 a[href="https://iconocracia.com/"]').filter({ hasText: 'Iconocracia' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'grupoiusgentium.com.br' })).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('compact layout engages before desktop windows can overflow', async ({ page }) => {
  await page.setViewportSize({ width: 800, height: 700 });
  await page.goto('/');

  await expect(page.getByRole('dialog')).toHaveCount(1);
  await expect(page.getByText('Projetos vivos', { exact: true })).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('advisor opens as a movable academic record with one official site action', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/');

  await expect(page.locator('[data-window-id="orientador"]')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Mover-se', exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Orientador', exact: true }).click();
  const advisor = page.locator('[data-window-id="orientador"]');
  await expect(advisor).toBeVisible();
  await expect(advisor).toHaveAttribute('role', 'dialog');
  await expect(advisor).toHaveAttribute('aria-labelledby', 'window-title-orientador');
  await expect(advisor.locator('#window-title-orientador')).toHaveText('orientação.txt');
  await expect(advisor.getByRole('heading', { name: 'Arno Dal Ri Júnior' })).toBeVisible();
  await expect(advisor.getByText('Orientador responsável pela pesquisa de doutorado', { exact: false })).toBeVisible();
  await expect(advisor.getByText('Vínculo acadêmico · PPGD/UFSC')).toBeVisible();
  const advisorAction = advisor.getByRole('link', { name: '↗ conhecer o orientador' });
  await expect(advisorAction).toHaveAttribute('href', 'https://anavanzin.com/arno-dal-ri-site/');
  const advisorActionBox = await advisorAction.boundingBox();
  expect(advisorActionBox?.height).toBeGreaterThanOrEqual(44);
  const advisorBox = await advisor.boundingBox();
  expect(advisorBox?.width).toBeGreaterThanOrEqual(470);
  expect(advisorBox?.y).toBeLessThan(400);
  await expect(page.getByRole('link', { name: 'Orientador responsável: Arno Dal Ri Júnior, PPGD/UFSC' })).toBeVisible();
});

test('archive windows keep touch-sized controls and the minimize, drag, escape cycle', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  const launcher = page.getByRole('button', { name: 'Orientador', exact: true });
  await launcher.click();
  const advisor = page.getByRole('dialog', { name: 'orientação.txt' });
  const controls = advisor.getByRole('button');

  await expect(controls).toHaveCount(2);
  for (const control of await controls.all()) {
    const box = await control.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }

  const before = await advisor.boundingBox();
  const titlebar = advisor.locator(':scope > div').first();
  const titlebarBox = await titlebar.boundingBox();
  await page.mouse.move(titlebarBox.x + titlebarBox.width / 2, titlebarBox.y + 18);
  await page.mouse.down();
  await page.mouse.move(titlebarBox.x + titlebarBox.width / 2 + 72, titlebarBox.y + 72, { steps: 4 });
  await page.mouse.up();
  const after = await advisor.boundingBox();
  expect(after.x).not.toBe(before.x);
  expect(after.y).not.toBe(before.y);

  await advisor.getByRole('button', { name: 'Minimizar' }).click();
  await expect(advisor).toHaveCount(0);
  await page.getByRole('button', { name: 'orientação.txt', exact: true }).click();
  await expect(advisor).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(advisor).toHaveCount(0);
  await expect(launcher).toBeFocused();
});

test('closing a desktop window returns focus to its launcher', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');

  const projects = page.locator('[data-window-id="projetos"]');
  await projects.getByRole('button', { name: 'Fechar Janela' }).click();
  await expect(projects).toHaveCount(0);
  await expect(page.locator('[data-app-id="projetos"]:focus')).toHaveCount(1);
});

test('advisor card resolves to a dedicated public page', async ({ page }) => {
  await page.goto('/orientador/');

  await expect(page).toHaveTitle(/Orientador · Arno Dal Ri Júnior/);
  await expect(page.getByRole('heading', { name: 'Arno Dal Ri Júnior' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Site de Arno Dal Ri Júnior ↗' })).toHaveAttribute(
    'href',
    'https://anavanzin.com/arno-dal-ri-site/'
  );
  await expect(page.locator('a[href*="CV%20Arno"]')).toHaveCount(0);
  await expect(page.locator('a[href="https://grupoiusgentium.com.br/"]')).toBeVisible();
  await expect(page.locator('a[href="https://iconocracia.com/"]')).toBeVisible();
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

for (const route of ['/sobre.html', '/conceitos.html']) {
  test(`${route} exposes a keyboard skip link to main content`, async ({ page }) => {
    await page.goto(route);

    const skip = page.locator('.skip-link');
    await skip.focus();
    await expect(skip).toBeVisible();
    await skip.press('Enter');

    await expect(page.locator('#main')).toBeFocused();
  });
}

test('editorial back-to-top link preserves a clean URL', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/sobre.html');
  await page.locator('a.top[href="#"]').click();

  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await expect(page).toHaveURL(/\/sobre\.html$/);
});

test('profile drag bar does not trap touch scrolling on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/perfil.html');

  await expect.poll(() => page.locator('#bar').evaluate((element) => getComputedStyle(element).touchAction)).toBe('auto');
});
