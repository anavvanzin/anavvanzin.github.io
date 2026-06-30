const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // No mock routing, use real file
  await page.goto('http://localhost:8080/poster.html');
  await page.waitForTimeout(1000);

  const poster = page.locator('.poster, .poster-bezel-outer').first();
  console.log('Class before click:', await poster.getAttribute('class'));

  await poster.click();
  await page.waitForTimeout(500);
  console.log('Class after click:', await poster.getAttribute('class'));

  const backdrop = page.locator('.poster-backdrop, .zoom-backdrop');
  console.log('Backdrop visible:', await backdrop.isVisible());

  await browser.close();
})();
