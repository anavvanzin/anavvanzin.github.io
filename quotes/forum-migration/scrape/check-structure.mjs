import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Check home
  await page.goto('https://anavanzin.boards.net/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  const homeData = await page.evaluate(() => {
    const cats = [];
    document.querySelectorAll('.category, [id^="category-"]').forEach(cat => {
      const name = cat.querySelector('.category-name, .name, h2, h3')?.textContent?.trim() || 'Unknown';
      const boards = [];
      cat.querySelectorAll('.board, .sub-board, [class*="board"]').forEach(b => {
        const bName = b.querySelector('.board-name, .name, a')?.textContent?.trim();
        const bUrl = b.querySelector('a')?.href;
        const threads = b.textContent.match(/(\d+)\s+thread/)?.[1];
        const posts = b.textContent.match(/([\d,]+)\s+post/)?.[1];
        if (bName) boards.push({ name: bName, url: bUrl, threads, posts });
      });
      cats.push({ name, boards });
    });
    return cats;
  });
  console.log('=== HOME STRUCTURE ===');
  console.log(JSON.stringify(homeData, null, 2));

  await browser.close();
}
main().catch(e => { console.error(e); process.exit(1); });
