import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.join(process.env.HOME, 'Projects', 'forum-migration', 'scrape', 'output');
fs.mkdirSync(OUT_DIR, { recursive: true });

const BASE_URL = 'https://anavanzin.boards.net';
const THREAD_PATH = '/thread/2/trechos';
const DELAY_MS = 1500; // 1.5s entre páginas

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function scrapePage(page, pageNum) {
  const url = pageNum === 1 ? `${BASE_URL}${THREAD_PATH}` : `${BASE_URL}${THREAD_PATH}?page=${pageNum}`;
  console.log(`  → Página ${pageNum}: ${url}`);
  
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  } catch (e) {
    console.error(`    ERRO navegação página ${pageNum}: ${e.message}`);
    return null;
  }

  const data = await page.evaluate(() => {
    const result = {
      pageNumber: null,
      totalPages: null,
      posts: [],
      images: [],
      users: {}
    };

    // Paginação
    const pagLinks = Array.from(document.querySelectorAll('ul.ui-pagination a[href*="page="]'));
    const pageNumbers = pagLinks
      .map(a => {
        const m = a.href.match(/[?&]page=(\d+)/);
        return m ? parseInt(m[1]) : null;
      })
      .filter(n => n !== null);
    if (pageNumbers.length) result.totalPages = Math.max(...pageNumbers);

    // Detectar página atual
    const currentPageEl = document.querySelector('ul.ui-pagination li.state-selected a');
    if (currentPageEl) {
      const m = currentPageEl.href.match(/[?&]page=(\d+)/);
      result.pageNumber = m ? parseInt(m[1]) : 1;
    } else {
      result.pageNumber = 1;
    }

    // Posts
    const messages = document.querySelectorAll('article .message');
    messages.forEach((msg) => {
      const article = msg.closest('article');
      if (!article) return;

      let author = null;
      let authorId = null;
      let dateStr = null;
      let timestamp = null;
      let postId = null;

      // Extrair postId do quote button ou do container
      const quoteBtn = article.querySelector('a.quote-button[href^="/post/"]');
      if (quoteBtn) {
        const m = quoteBtn.href.match(/\/post\/(\d+)\/quote/);
        if (m) postId = parseInt(m[1]);
      }
      // Ou do checkbox
      if (!postId) {
        const checkbox = article.querySelector('input[type="checkbox"]');
        if (checkbox) {
          const classes = checkbox.className || '';
          const m = classes.match(/post-(\d+)/);
          if (m) postId = parseInt(m[1]);
        }
      }

      const titleEl = article.querySelector('h3.title');
      if (titleEl) {
        const text = titleEl.textContent.trim();
        const match = text.match(/Post by (.+?) on (.+)/);
        if (match) {
          author = match[1].trim();
          dateStr = match[2].trim();
        }
      }

      const dateAbbr = article.querySelector('abbr[data-timestamp]');
      if (dateAbbr) {
        timestamp = parseInt(dateAbbr.getAttribute('data-timestamp'));
        if (!dateStr) dateStr = dateAbbr.textContent.trim();
      }

      // Avatar / user link para ID
      const userLink = article.querySelector('a[href^="/user/"]');
      if (userLink) {
        const m = userLink.href.match(/\/user\/(\d+)/);
        if (m) authorId = parseInt(m[1]);
      }

      const bodyHtml = msg.innerHTML.trim();
      const bodyText = msg.textContent.trim();

      // Imagens dentro do post
      const imgs = msg.querySelectorAll('img');
      const postImages = [];
      imgs.forEach(img => {
        const src = img.getAttribute('src');
        if (src && !src.includes('proboards.com/forum/images/icon')) {
          postImages.push(src);
          result.images.push(src);
        }
      });

      if (authorId) {
        result.users[authorId] = { name: author, id: authorId };
      }

      result.posts.push({
        postId,
        author,
        authorId,
        dateStr,
        timestamp: timestamp || null,
        bodyHtml,
        bodyText,
        images: postImages
      });
    });

    return result;
  });

  return data;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });
  const page = await context.newPage();

  // Primeira página para descobrir total
  console.log('Descobrindo estrutura...');
  const firstPage = await scrapePage(page, 1);
  if (!firstPage) {
    console.error('Falha ao carregar página 1');
    await browser.close();
    process.exit(1);
  }

  const totalPages = firstPage.totalPages || 1;
  console.log(`Total de páginas: ${totalPages}`);
  console.log(`Posts na página 1: ${firstPage.posts.length}`);

  // Salvar página 1
  fs.writeFileSync(path.join(OUT_DIR, 'page-001.json'), JSON.stringify(firstPage, null, 2), 'utf-8');

  // Coletar dados acumulativos
  const allPosts = [...firstPage.posts];
  const allImages = new Set(firstPage.images);
  const allUsers = { ...firstPage.users };

  // Páginas 2..N
  for (let p = 2; p <= totalPages; p++) {
    await sleep(DELAY_MS);
    const pgData = await scrapePage(page, p);
    if (!pgData) {
      console.error(`    Pulando página ${p} por erro`);
      continue;
    }
    fs.writeFileSync(path.join(OUT_DIR, `page-${String(p).padStart(3, '0')}.json`), JSON.stringify(pgData, null, 2), 'utf-8');
    allPosts.push(...pgData.posts);
    pgData.images.forEach(img => allImages.add(img));
    Object.assign(allUsers, pgData.users);
    console.log(`    Posts acumulados: ${allPosts.length}`);
  }

  await browser.close();

  // JSON final consolidado
  const final = {
    forumName: 'Quotes',
    sourceUrl: BASE_URL,
    extractedAt: new Date().toISOString(),
    thread: {
      id: 2,
      title: 'Trechos',
      url: `${BASE_URL}${THREAD_PATH}`,
      totalPages,
      totalPosts: allPosts.length
    },
    users: allUsers,
    images: Array.from(allImages),
    posts: allPosts.map((p, idx) => ({
      ...p,
      position: idx + 1
    }))
  };

  const finalPath = path.join(OUT_DIR, 'forum-data.json');
  fs.writeFileSync(finalPath, JSON.stringify(final, null, 2), 'utf-8');

  console.log('\n=== EXTRAÇÃO CONCLUÍDA ===');
  console.log(`Posts extraídos: ${allPosts.length}`);
  console.log(`Imagens encontradas: ${allImages.size}`);
  console.log(`Usuários: ${Object.keys(allUsers).length}`);
  console.log(`Arquivo final: ${finalPath}`);
  console.log(`Páginas parciais salvas em: ${OUT_DIR}/page-NNN.json`);
}

main().catch(err => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
