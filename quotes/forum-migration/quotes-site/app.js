/**
 * Quotes Site v2 — Better quotes experience
 * Features: attribution parsing, hero quote, masonry layout,
 *           author filtering, search, dark/light, keyboard nav.
 */

const CONFIG = {
  BATCH_SIZE: 50,
  DATA_URL: 'forum-data.json',
  SEARCH_DEBOUNCE: 120,
};

let allPosts = [];
let filteredPosts = [];
let renderedCount = 0;
let randomHistory = [];
let randomIndex = -1;
let authorsList = [];

/* ── Helpers ── */
const $ = (sel) => document.querySelector(sel);
const fmtDate = (ts) => {
  if (!ts) return '';
  const d = new Date(ts);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
};

const debounce = (fn, ms) => {
  let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
};

const normalize = (s) => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const escapeHtml = (str) => {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
  return String(str).replace(/[&<>"]/g, (c) => map[c] || c);
};

/* ── Attribution Parser ── */
function parseAttribution(text) {
  if (!text) return { quote: '', attribution: '', raw: '' };

  // Patterns: "…"\n— Author  or  — Author  or  "text"— Author
  // Also handles: <br>— Author,   -Author,   —Author
  const patterns = [
    /^"?(.+?)"?\s*[\n\r]+\s*[—–-]\s*(.+)$/s,
    /^"?(.+?)"?\s*[—–-]\s*(.+)$/s,
    /^(.+?)\s*[—–-]\s*(.+)$/s,
  ];

  for (const re of patterns) {
    const m = text.match(re);
    if (m && m[1].trim().length > 10) {
      return {
        quote: m[1].trim(),
        attribution: m[2].trim(),
        raw: text,
      };
    }
  }

  // Fallback: look for last line starting with dash/em-dash
  const lines = text.split(/\n|\r|<br\s*\/?>/i);
  const last = lines[lines.length - 1].trim();
  if (/^[—–-]\s*/.test(last) && lines.length > 1) {
    const attr = last.replace(/^[—–-]\s*/, '');
    return {
      quote: lines.slice(0, -1).join('\n').trim(),
      attribution: attr,
      raw: text,
    };
  }

  return { quote: text, attribution: '', raw: text };
}

/* ── Data Loading ── */
async function loadData() {
  try {
    const res = await fetch(CONFIG.DATA_URL);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();

    allPosts = (data.posts || [])
      .map((p, i) => {
        const parsed = parseAttribution(p.bodyText);
        const isEmpty = !p.bodyText || p.bodyText === '-' || !p.bodyText.trim();
        return {
          ...p,
          _position: i + 1,
          _dateFmt: fmtDate(p.timestamp),
          _quote: parsed.quote,
          _attr: parsed.attribution,
          _isEmpty: isEmpty,
          _searchText: normalize(`${parsed.quote} ${parsed.attribution} ${p.author || ''}`),
        };
      })
      .filter(p => !p._isEmpty); // skip empty/placeholder posts

    filteredPosts = allPosts;

    // Build author list from attributions + post authors
    const authorCounts = {};
    allPosts.forEach(p => {
      const key = p._attr || p.author || 'Anônimo';
      authorCounts[key] = (authorCounts[key] || 0) + 1;
    });
    authorsList = Object.entries(authorCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 50); // top 50

    $('#quoteCount').textContent = `${allPosts.length} trechos · 2014–2026`;
    renderHero();
    renderAuthorTags();
    renderBatch();
  } catch (err) {
    $('#quotesGrid').innerHTML = `
      <div class="quote-card empty" style="text-align:center;color:var(--text-muted)">
        <p>Não foi possível carregar os dados.</p>
        <p style="font-size:0.8rem;margin-top:0.5rem">Erro: ${err.message}</p>
      </div>`;
    console.error('Data load failed:', err);
  }
}

/* ── Hero ── */
function renderHero() {
  if (!allPosts.length) return;
  const hero = allPosts[Math.floor(Math.random() * allPosts.length)];
  const el = document.createElement('div');
  el.className = 'hero-quote';
  el.innerHTML = `
    <div class="hero-inner">
      <div class="hero-mark">❝</div>
      <blockquote class="hero-text">${escapeHtml(hero._quote)}</blockquote>
      ${hero._attr ? `<cite class="hero-attr">${escapeHtml(hero._attr)}</cite>` : ''}
      <div class="hero-date">${hero._dateFmt}</div>
    </div>
  `;
  el.addEventListener('click', () => openOverlay(hero));
  document.body.insertBefore(el, document.body.querySelector('.site-header').nextSibling);
}

/* ── Author Tags ── */
function renderAuthorTags() {
  if (!authorsList.length) return;
  const toolbar = document.querySelector('.toolbar');
  const existing = document.getElementById('authorTags');
  if (existing) existing.remove();

  const wrap = document.createElement('div');
  wrap.id = 'authorTags';
  wrap.className = 'author-tags';
  wrap.innerHTML = `
    <span class="tag-label">Filtrar:</span>
    <button class="tag active" data-author="">Todos</button>
    ${authorsList.slice(0, 12).map(([name, count]) =>
      `<button class="tag" data-author="${escapeHtml(name)}">${escapeHtml(name)} <small>${count}</small></button>`
    ).join('')}
  `;
  toolbar.parentNode.insertBefore(wrap, toolbar.nextSibling);

  wrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.tag');
    if (!btn) return;
    wrap.querySelectorAll('.tag').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const author = btn.dataset.author;
    if (author) {
      filteredPosts = allPosts.filter(p =>
        (p._attr || p.author || '') === author
      );
    } else {
      filteredPosts = allPosts;
    }
    clearGrid();
    renderBatch();
  });
}

/* ── Cards ── */
function createCard(post) {
  const div = document.createElement('div');
  div.className = 'quote-card';
  div.dataset.pos = post._position;

  const q = escapeHtml(post._quote);
  const attr = post._attr ? escapeHtml(post._attr) : '';
  const hasAttr = attr.length > 0;

  div.innerHTML = `
    <div class="quote-text">${q}</div>
    ${hasAttr ? `<div class="quote-attr">${attr}</div>` : ''}
    <div class="quote-meta">
      <span class="quote-date">${post._dateFmt}</span>
      <span class="quote-pos">#${post._position}</span>
    </div>
  `;

  div.addEventListener('click', () => openOverlay(post));
  return div;
}

function renderBatch() {
  const grid = $('#quotesGrid');
  const slice = filteredPosts.slice(renderedCount, renderedCount + CONFIG.BATCH_SIZE);
  const frag = document.createDocumentFragment();
  slice.forEach(p => frag.appendChild(createCard(p)));
  grid.appendChild(frag);
  renderedCount += slice.length;
  updateProgress();

  if (renderedCount >= filteredPosts.length) {
    $('#loadMoreBtn').disabled = true;
    $('#loadMoreBtn').textContent = 'Fim';
  }
}

function updateProgress() {
  $('#progressText').textContent = `${renderedCount} de ${filteredPosts.length}`;
}

function clearGrid() {
  $('#quotesGrid').innerHTML = '';
  renderedCount = 0;
  $('#loadMoreBtn').disabled = false;
  $('#loadMoreBtn').textContent = 'Carregar mais';
}

/* ── Search ── */
const doSearch = debounce((query) => {
  const q = normalize(query.trim());
  if (!q) {
    filteredPosts = allPosts;
    // reset author tag
    const activeTag = document.querySelector('#authorTags .tag.active');
    if (activeTag && activeTag.dataset.author) {
      document.querySelector('#authorTags .tag[data-author=""]')?.classList.add('active');
      activeTag.classList.remove('active');
    }
  } else {
    filteredPosts = allPosts.filter(p => p._searchText.includes(q));
  }
  clearGrid();
  renderBatch();
}, CONFIG.SEARCH_DEBOUNCE);

$('#searchInput').addEventListener('input', (e) => doSearch(e.target.value));

/* ── Keyboard ── */
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    $('#searchInput').focus();
  }
  if (e.key === 'Escape') {
    if ($('#overlay').classList.contains('active')) closeOverlay();
    else $('#searchInput').blur();
  }
  if ($('#overlay').classList.contains('active')) {
    if (e.key === 'ArrowLeft') $('#prevRandom').click();
    if (e.key === 'ArrowRight') $('#nextRandom').click();
  }
});

/* ── Load More / Infinite Scroll ── */
$('#loadMoreBtn').addEventListener('click', renderBatch);
let scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) renderBatch(); });
}, { rootMargin: '300px' });
scrollObserver.observe($('#loadMore'));

/* ── Random ── */
$('#randomBtn').addEventListener('click', () => {
  if (!allPosts.length) return;
  const post = allPosts[Math.floor(Math.random() * allPosts.length)];
  randomHistory.push(post);
  randomIndex = randomHistory.length - 1;
  openOverlay(post);
});

/* ── Overlay ── */
function openOverlay(post) {
  const q = escapeHtml(post._quote);
  const attr = post._attr ? escapeHtml(post._attr) : '';

  $('#overlayQuote').innerHTML = `
    <div class="overlay-text">${q}</div>
    ${attr ? `<div class="overlay-attr">${attr}</div>` : ''}
  `;
  const meta = [];
  if (post.author) meta.push(escapeHtml(post.author));
  if (post._dateFmt) meta.push(post._dateFmt);
  meta.push(`#${post._position}`);
  $('#overlayMeta').textContent = meta.join(' · ');
  $('#overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeOverlay() {
  $('#overlay').classList.remove('active');
  document.body.style.overflow = '';
}

$('#closeOverlay').addEventListener('click', closeOverlay);
$('#overlay').addEventListener('click', (e) => { if (e.target === $('#overlay')) closeOverlay(); });

/* Copy */
$('#copyBtn').addEventListener('click', async () => {
  const text = $('#overlayQuote').textContent.trim() + '\n\n' + $('#overlayMeta').textContent;
  try {
    await navigator.clipboard.writeText(text);
    const btn = $('#copyBtn');
    const prev = btn.textContent;
    btn.textContent = '✓ Copiado';
    setTimeout(() => btn.textContent = prev, 1500);
  } catch (e) { console.warn('Clipboard failed:', e); }
});

/* Random nav */
$('#prevRandom').addEventListener('click', () => {
  if (randomIndex > 0) { randomIndex--; openOverlay(randomHistory[randomIndex]); }
});

$('#nextRandom').addEventListener('click', () => {
  if (randomIndex < randomHistory.length - 1) {
    randomIndex++;
    openOverlay(randomHistory[randomIndex]);
  } else {
    const post = allPosts[Math.floor(Math.random() * allPosts.length)];
    randomHistory.push(post);
    randomIndex++;
    openOverlay(post);
  }
});

/* ── Theme ── */
$('#themeBtn').addEventListener('click', () => {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

(function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
})();

/* ── Init ── */
loadData();
