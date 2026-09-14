// Explicit publication policy. Run with --write to regenerate metadata and sitemap;
// without it, fail on drift. Draft status must be changed by an editorial decision.
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const policy = JSON.parse(fs.readFileSync('scripts/publication.json', 'utf8'));
const write = process.argv.includes('--write');
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
let failures = 0;
function output(file, desired) {
  const old = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  if (old === desired) return;
  if (write) fs.writeFileSync(file, desired);
  else { console.error('Publication drift:', file); failures++; }
}
const tracked = execFileSync('git', ['ls-files', '-z', '*.html'], { encoding: 'utf8' }).split('\0').filter(Boolean);
const attributes = execFileSync('git', ['check-attr', '-z', '--stdin', 'export-ignore'], { input: tracked.join('\0') + '\0', encoding: 'utf8' }).split('\0');
const exported = new Set();
for (let i = 0; i < attributes.length - 2; i += 3) if (attributes[i + 2] !== 'set') exported.add(attributes[i]);
const files = new Set(policy.pages.map(p => p.file));
for (const file of exported) if (!files.has(file)) { console.error('Unclassified HTML:', file); failures++; }
const categories = new Set(['ready', 'draft', 'duplicate', 'redirect', 'utility']);
const canonicalByPath = new Map();
for (const p of policy.pages) {
  canonicalByPath.set('/' + p.file, p.canonical);
  if (p.file.endsWith('/index.html')) canonicalByPath.set('/' + p.file.slice(0, -10), p.canonical);
}
for (const p of policy.pages) {
  if (!categories.has(p.category) || !p.reason || !fs.existsSync(p.file)) throw new Error('Invalid publication entry: ' + p.file);
  let source = fs.readFileSync(p.file, 'utf8');
  const head = source.match(/<head\b[^>]*>[\s\S]*?<\/head>/i)?.[0];
  if (!head) throw new Error('Missing head: ' + p.file);
  let updated = head.replace(/\s*<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/gi, '')
    .replace(/\s*<meta\b(?=[^>]*\bname=["']robots["'])[^>]*>/gi, '');
  updated = updated.replace(/<meta\b(?=[^>]*\bproperty=["']og:url["'])[^>]*>/gi, `<meta property="og:url" content="${esc(p.canonical)}">`);
  const robots = p.category === 'ready' || p.category === 'duplicate' ? 'index,follow' : 'noindex,follow';
  // Copies of draft records must share their destination's exclusion policy.
  const target = policy.pages.find(x => x.canonical === p.canonical && x.category !== 'duplicate');
  const effective = p.category === 'duplicate' && target?.category !== 'ready' ? 'noindex,follow' : robots;
  updated = updated.replace(/<\/head>/i, `<link rel="canonical" href="${esc(p.canonical)}">\n<meta name="robots" content="${effective}">\n</head>`);
  source = source.replace(head, updated);
  if (/^(?:iconocracia\/)?corpus\//.test(p.file)) source = source.replace(/https:\/\/anavanzin\.com\/corpus\//g, 'https://anavanzin.com/iconocracia/corpus/');
  source = source.replace(/\bhref=(["'])([^"']+)\1/g, (original, quote, href) => {
    if (/^(#|mailto:|javascript:)/i.test(href)) return original;
    let url;
    try { url = new URL(href, 'https://anavanzin.com/' + p.file); } catch { return original; }
    if (url.origin !== 'https://anavanzin.com') return original;
    const canonical = canonicalByPath.get(decodeURIComponent(url.pathname));
    if (!canonical || canonical === url.origin + url.pathname) return original;
    const destination = new URL(canonical);
    const path = destination.origin === url.origin ? destination.pathname : canonical;
    return `href=${quote}${path}${url.search}${url.hash}${quote}`;
  });
  output(p.file, source);
}
const urls = policy.pages.filter(p => p.category === 'ready').map(p => p.canonical).sort();
if (new Set(urls).size !== urls.length) throw new Error('Duplicate ready canonical');
output('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls.map(url => `  <url><loc>${esc(url)}</loc></url>`).join('\n') + '\n</urlset>\n');
console.log(`${policy.pages.length} classified pages; ${urls.length} sitemap URLs; ${failures} discrepancies`);
if (failures) process.exitCode = 1;
