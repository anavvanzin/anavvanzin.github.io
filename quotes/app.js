/**
 * Quotes Site v3 — Editorial gallery experience
 * Mix B+C: minimal gallery + editorial details (catalog numbers,
 * masonry layout, stagger animations, search highlight).
 */

const CONFIG = {
  BATCH_SIZE: 40,
  DATA_URL: 'forum-data.json',
  SEARCH_DEBOUNCE: 120,
  STAGGER_DELAY: 45,
};

let allPosts = [];
let filteredPosts = [];
let renderedCount = 0;
let randomHistory = [];
let randomIndex = -1;
let authorsList = [];
let visibleCount = 0;

/* ── Helpers ── */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
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

const padNum = (n) => String(n).padStart(3, '0');

/* ── Attribution Parser ── */
function parseAttribution(text) {
  if (!text) return { quote: '', attribution: '', raw: '' };
  const patterns = [
    /^"?(.+?)"?\s*[\n\r]+\s*[—–-]\s*(.+)$/s,
    /^"?(.+?)"?\s*[—–-]\s*(.+)$/s,
    /^(.+?)\s*[—–-]\s*(.+)$/s,
  ];
  for (const re of patterns) {
    const m = text.match(re);
    if (m && m[1].trim().length > 10) {
      return { quote: m[1].trim(), attribution: m[2].trim(), raw: text };
    }
  }
  const lines = text.split(/\n|\r|<br\s*\/?>/i);
  const last = lines[lines.length - 1].trim();
  if (/^[—–-]\s*/.test(last) && lines.length > 1) {
    const attr = last.replace(/^[—–-]\s*/, '');
    return { quote: lines.slice(0, -1).join('\n').trim(), attribution: attr, raw: text };
  }
  return { quote: text, attribution: '', raw: text };
}

/* ── Highlight search terms ── */
function highlightText(text, query) {
  if (!query || !query.trim()) return escapeHtml(text);
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return escapeHtml(text);
  let html = escapeHtml(text);
  // Escape regex special chars in terms
  const patterns = terms.map(t => ({
    regex: new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'),
    original: t
  }));
  patterns.forEach(({ regex }) => {
    html = html.replace(regex, '<mark>$1</mark>');
  });
  return html;
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
      .filter(p => !p._isEmpty);

    filteredPosts = allPosts;

    const authorCounts = {};
    allPosts.forEach(p => {
      const key = p._attr || p.author || 'Anônimo';
      authorCounts[key] = (authorCounts[key] || 0) + 1;
    });
    authorsList = Object.entries(authorCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 50);

    $('#quoteCount').textContent = `${allPosts.length} trechos · 2014–2026`;
    renderHero();
    renderAuthorTags();
    renderBatch();
    initScrollObserver();
  } catch (err) {
    $('#quotesGrid').innerHTML = `
      <div class="empty-state">
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
  el.className = 'hero-section';
  el.innerHTML = `
    <div class="hero-inner">
      <div class="hero-meta">
        <span class="hero-label">Trecho em destaque</span>
        <span class="hero-num">Nº ${padNum(hero._position)}</span>
      </div>
      <div class="hero-body">
        <span class="hero-mark">❝</span>
        <blockquote class="hero-text">${escapeHtml(hero._quote)}</blockquote>
        ${hero._attr ? `<cite class="hero-attr">${escapeHtml(hero._attr)}</cite>` : ''}
        <div class="hero-date">${hero._dateFmt}</div>
      </div>
    </div>
  `;
  el.addEventListener('click', () => openOverlay(hero));
  const header = $('.site-header');
  header.parentNode.insertBefore(el, header.nextSibling);
}

/* ── Author Tags ── */
function renderAuthorTags() {
  if (!authorsList.length) return;
  const header = $('.site-header');
  const existing = document.getElementById('authorTags');
  if (existing) existing.remove();

  const wrap = document.createElement('div');
  wrap.id = 'authorTags';
  wrap.className = 'author-tags';
  wrap.innerHTML = `
    <span class="tag-label">Autores</span>
    <button class="tag active" data-author="">Todos</button>
    ${authorsList.slice(0, 12).map(([name, count]) =>
      `<button class="tag" data-author="${escapeHtml(name)}">${escapeHtml(name)} <small>${count}</small></button>`
    ).join('')}
  `;
  header.parentNode.insertBefore(wrap, header.nextSibling);

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
function getSizeClass(text) {
  const len = (text || '').length;
  if (len > 300) return 'size-lg';
  if (len < 100) return 'size-sm';
  return '';
}

function createCard(post, searchQuery = '') {
  const div = document.createElement('div');
  div.className = `quote-card ${getSizeClass(post._quote)}`;
  div.dataset.pos = post._position;

  const q = highlightText(post._quote, searchQuery);
  const attr = post._attr ? escapeHtml(post._attr) : '';
  const hasAttr = attr.length > 0;

  div.innerHTML = `
    <span class="card-catalog">Nº ${padNum(post._position)}</span>
    <div class="quote-text">${q}</div>
    ${hasAttr ? `<div class="quote-attr">${attr}</div>` : ''}
    <div class="quote-meta">
      <span>${post._dateFmt}</span>
      <span>#${post._position}</span>
    </div>
  `;

  div.addEventListener('click', () => openOverlay(post));
  return div;
}

/* ── Intersection Observer for stagger entrance ── */
let cardObserver;
function initScrollObserver() {
  cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) % 10 * CONFIG.STAGGER_DELAY;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '60px', threshold: 0.05 });
}

function observeCards() {
  $$('.quote-card:not(.visible)').forEach(card => cardObserver.observe(card));
}

function renderBatch() {
  const grid = $('#quotesGrid');
  const slice = filteredPosts.slice(renderedCount, renderedCount + CONFIG.BATCH_SIZE);
  const frag = document.createDocumentFragment();
  const searchQuery = $('#searchInput').value;
  slice.forEach(p => frag.appendChild(createCard(p, searchQuery)));
  grid.appendChild(frag);
  renderedCount += slice.length;
  updateProgress();

  // Observe new cards for stagger animation
  requestAnimationFrame(observeCards);

  if (renderedCount >= filteredPosts.length) {
    $('#loadMoreBtn').disabled = true;
    $('#loadMoreBtn').textContent = 'Fim da coleção';
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

/* ── Load More ── */
$('#loadMoreBtn').addEventListener('click', renderBatch);
let infiniteObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting && !$('#loadMoreBtn').disabled) renderBatch(); });
}, { rootMargin: '400px' });
infiniteObserver.observe($('#loadMore'));

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
    <span class="overlay-num">Trecho Nº ${padNum(post._position)}</span>
    <div class="overlay-text">${q}</div>
    ${attr ? `<div class="overlay-attr">${attr}</div>` : ''}
  `;
  const meta = [];
  if (post.author) meta.push(escapeHtml(post.author));
  if (post._dateFmt) meta.push(post._dateFmt);
  $('#overlayMeta').textContent = meta.join(' · ');
  $('#overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeOverlay() {
  $('#overlay').classList.remove('active');
  document.body.style.overflow = '';
}

$('#closeOverlay').addEventListener('click', closeOverlay);
$('#overlay').addEventListener('click', (e) => { if (e.target === $('#overlay') || e.target.classList.contains('overlay-bg')) closeOverlay(); });

/* Copy */
$('#copyBtn').addEventListener('click', async () => {
  const text = $('#overlayQuote').textContent.trim() + '\n\n' + $('#overlayMeta').textContent;
  try {
    await navigator.clipboard.writeText(text);
    const btn = $('#copyBtn');
    const prev = btn.textContent;
    btn.textContent = 'Copiado';
    setTimeout(() => btn.textContent = prev, 1800);
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
