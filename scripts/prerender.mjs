// Materialize existing client-rendered content, without a new framework.
// Start the local static server, then run: node scripts/prerender.mjs [base URL].
// Generated regions are replaceable and remain owned by their original renderer.
import fs from 'node:fs';
import { chromium } from '@playwright/test';
const base = process.argv[2] || 'http://localhost:8097';
const targets = {
  'atlas/index.html': ['grid'],
  'atlas/justitia.html': ['obj'], 'atlas/britannia.html': ['obj'],
  'atlas/marianne.html': ['obj'], 'atlas/republica.html': ['obj'],
  'sala-de-leitura/index.html': ['shelves'],
  'conceitos.html': ['reader', 'list'], 'readme.html': ['md'],
  'trabalhos.html': ['intro', 'sections'], 'perfil.html': ['intro', 'lines', 'more'],
  'manifesto/index.html': ['root'], 'quotes/index.html': ['quotesGrid', 'authorTags'],
};
const browser = await chromium.launch();
try {
  for (const [file, ids] of Object.entries(targets)) {
    const page = await browser.newPage({ reducedMotion: 'reduce', viewport: { width: 1280, height: 900 } });
    await page.addInitScript(() => { window.AV_PRERENDER = true; localStorage.setItem('av-lang', 'pt'); });
    await page.goto(base + '/' + file);
    await page.waitForFunction(id => document.getElementById(id)?.textContent.trim().length > 10, ids[0]);
    if (file.startsWith('quotes/')) await page.waitForFunction(() => document.querySelectorAll('.quote-card').length >= 40);
    let source = fs.readFileSync(file, 'utf8');
    for (const id of ids) {
      const value = await page.locator('#' + id).evaluate(el => {
        const copy = el.cloneNode(true);
        copy.querySelectorAll('.rise').forEach(n => { n.classList.remove('rise'); });
        copy.querySelectorAll('.quote-card').forEach(n => n.classList.add('visible'));
        return copy.outerHTML;
      });
      const marker = `<!-- prerender:${id} -->`;
      const end = `<!-- /prerender:${id} -->`;
      const generated = marker + '\n' + value + '\n' + end;
      if (source.includes(marker)) source = source.slice(0, source.indexOf(marker)) + generated + source.slice(source.indexOf(end) + end.length);
      else {
        const empty = new RegExp(`<([\\w-]+)\\b[^>]*\\bid=["']${id}["'][^>]*>\\s*</\\1>`);
        if (!empty.test(source)) throw new Error(`Expected empty generated container ${file}#${id}`);
        source = source.replace(empty, () => generated);
      }
    }
    if (file.startsWith('atlas/') && file !== 'atlas/index.html') {
      const title = await page.title();
      const description = await page.locator('#obj .dek').innerText();
      const escape = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
      source = source.replace(/<title>.*?<\/title>/s, `<title>${escape(title)}</title>`)
        .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escape(description)}">`);
    }
    if (file === 'quotes/index.html') {
      const content = await page.locator('.hero-section').evaluate(el => el.outerHTML);
      const marker = '<!-- prerender:hero -->', end = '<!-- /prerender:hero -->';
      const fragment = marker + content + end;
      if (source.includes(marker)) source = source.slice(0, source.indexOf(marker)) + fragment + source.slice(source.indexOf(end) + end.length);
      else source = source.replace('</header>', '</header>\n' + fragment);
    }
    fs.writeFileSync(file, source.replace(/[\t ]+$/gm, ''));
    console.log('Rendered', file);
    await page.close();
  }
} finally { await browser.close(); }
