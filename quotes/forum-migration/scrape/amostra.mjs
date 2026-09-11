import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.join(process.env.HOME, 'Projects', 'forum-migration', 'scrape');
const THREAD_URL = 'https://anavanzin.boards.net/thread/2/trechos';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });
  const page = await context.newPage();

  console.log('Navegando para ' + THREAD_URL);
  await page.goto(THREAD_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });

  const html = await page.content();
  fs.writeFileSync(path.join(OUT_DIR, 'amostra-raw.html'), html, 'utf-8');
  console.log('HTML bruto salvo');

  const data = await page.evaluate(() => {
    const result = {
      threadTitle: document.title.replace(/ \| Quotes$/, ''),
      threadUrl: window.location.href,
      pageNumber: 1,
      totalPages: null,
      posts: []
    };

    // Paginação: procura o maior número de página
    const pagLinks = Array.from(document.querySelectorAll('ul.ui-pagination a[href*="page="]'));
    const pageNumbers = pagLinks
      .map(a => {
        const m = a.href.match(/[?&]page=(\d+)/);
        return m ? parseInt(m[1]) : null;
      })
      .filter(n => n !== null);
    if (pageNumbers.length) result.totalPages = Math.max(...pageNumbers);

    // Posts: cada .message dentro de um <article>
    const messages = document.querySelectorAll('article .message');
    messages.forEach((msg, index) => {
      const article = msg.closest('article');
      if (!article) return;

      // Autor e data via h3.title
      let author = null;
      let dateStr = null;
      let timestamp = null;
      const titleEl = article.querySelector('h3.title');
      if (titleEl) {
        const text = titleEl.textContent.trim();
        // "Post by Admin on Jul 19, 2014 at 6:18pm"
        const match = text.match(/Post by (.+?) on (.+)/);
        if (match) {
          author = match[1].trim();
          dateStr = match[2].trim();
        }
      }

      // Timestamp alternativo do abbr[data-timestamp]
      const dateAbbr = article.querySelector('abbr[data-timestamp]');
      if (dateAbbr) {
        timestamp = parseInt(dateAbbr.getAttribute('data-timestamp'));
        if (!dateStr) dateStr = dateAbbr.textContent.trim();
      }

      // Corpo
      const bodyHtml = msg.innerHTML.trim();
      const bodyText = msg.textContent.trim();

      result.posts.push({
        index,
        author,
        dateStr,
        timestamp: timestamp || null,
        bodyHtml,
        bodyText
      });
    });

    return result;
  });

  fs.writeFileSync(path.join(OUT_DIR, 'amostra-trechos-p1.json'), JSON.stringify(data, null, 2), 'utf-8');
  console.log('Posts extraídos: ' + data.posts.length);
  if (data.totalPages) console.log('Total de páginas detectado: ' + data.totalPages);
  await browser.close();
}

main().catch(err => { console.error('Erro:', err); process.exit(1); });
