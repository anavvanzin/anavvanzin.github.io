/* ana vanzin — Atlas object page renderer (reusable).
   Each atlas/<slug>.html is an identical thin host; the slug is read from
   the filename, and the dossier is rendered from window.AVContent.
   Uses the editorial primitives (editorial.css). Re-renders on av:lang. */
(function () {
  function slugFromPath() {
    var f = (location.pathname.split('/').pop() || 'justitia.html').replace(/\.html?$/, '');
    return f || 'justitia';
  }
  var L = function (o) { return window.AVContent.L(o); };
  var SLUG = slugFromPath();

  function themeChips(slugs) {
    return slugs.map(function (s) {
      var t = window.AVContent.theme(s); if (!t) return '';
      return '<a class="oc-th" href="../sala-de-leitura/#' + t.slug + '">' + L(t.name) + '</a>';
    }).join('');
  }

  function symbolRow(slugs) {
    if (!slugs || !slugs.length) return '';
    var items = slugs.map(function (s) {
      var sy = window.AVContent.SYMBOLS.filter(function (x) { return x.slug === s; })[0];
      if (!sy) return '';
      return '<a class="oc-sym" href="../iconocracia/desenhe-um-simbolo.html#' + sy.slug + '" title="' + L(sy.gloss) + '">' +
        '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="' + sy.path + '"/></svg>' +
        '<span>' + L(sy.name) + '</span></a>';
    }).join('');
    return '<div class="oc-syms"><p class="oc-h"><span data-k="symbols"></span></p><div class="oc-sym-row">' + items + '</div></div>';
  }

  function notesBlock(notes) {
    if (!notes || !notes.length) return '';
    return notes.map(function (n) {
      return '<aside class="mn"><span class="mn-k">' + L(n.k) + '</span><span>' + L(n.t) + '</span></aside>';
    }).join('');
  }

  function sourcesBlock(src) {
    if (!src || !src.length) return '';
    var lis = src.map(function (s) { return '<li>' + L(s) + '</li>'; }).join('');
    var h = (window.AV && window.AV.lang === 'en') ? 'Sources &amp; notes' : 'Fontes &amp; notas';
    return '<div class="source-note prose"><p class="sn-h">' + h + '</p><ol>' + lis + '</ol></div>';
  }

  function relatedBlock(o) {
    var en = window.AV && window.AV.lang === 'en';
    var rows = [];
    if (o.essay) rows.push('<li><a href="../' + o.essay.href + '"><span class="ri-k">' + (en ? 'essay' : 'ensaio') +
      '</span><span class="ri-t">' + L(o.essay.label) + '</span><span class="ar">→</span></a></li>');
    var firstTheme = o.themes[0];
    if (firstTheme) rows.push('<li><a href="../sala-de-leitura/#' + firstTheme + '"><span class="ri-k">' + (en ? 'reading' : 'leitura') +
      '</span><span class="ri-t">' + (en ? 'In the reading room' : 'Na sala de leitura') + '</span><span class="ar">→</span>' +
      '<span class="ri-d">' + (en ? 'shelves linked to this object' : 'prateleiras ligadas a este objeto') + '</span></a></li>');
    rows.push('<li><a href="index.html"><span class="ri-k">' + (en ? 'atlas' : 'atlas') +
      '</span><span class="ri-t">' + (en ? 'All objects' : 'Todos os objetos') + '</span><span class="ar">→</span></a></li>');
    return '<nav class="related"><p class="rel-h">' + (en ? 'Research trail' : 'Trilha de pesquisa') + '</p><ul>' + rows.join('') + '</ul></nav>';
  }

  function figure(o) {
    var inner;
    if (o.img) {
      inner = '<img src="../' + o.img + '" alt="' + L(o.caption) + '" loading="lazy">';
    } else {
      inner = '<div class="ph tall"><span class="ph-lbl">' + L(o.caption) + '</span></div>';
    }
    return '<figure class="ed-fig"><div class="frame">' + inner + '</div>' +
      '<figcaption><span class="cap">' + L(o.caption) + '</span>' +
      '<span class="src">' + L(o.origin) + ', ' + o.date + ' · ' + L(o.rights) + '</span></figcaption></figure>';
  }

  function metaBlock(o) {
    var en = window.AV && window.AV.lang === 'en';
    function fm(k, v, mono) { return '<div class="fm"><span class="k">' + k + '</span><span class="v' + (mono ? ' mono' : '') + '">' + v + '</span></div>'; }
    return '<div class="folio-meta">' +
      fm(en ? 'Object' : 'Objeto', L(o.object)) +
      fm(en ? 'Origin' : 'Origem', L(o.origin)) +
      fm(en ? 'Date' : 'Data', o.date, true) +
      fm(en ? 'Maker' : 'Autoria', L(o.maker)) +
      fm(en ? 'Shelfmark' : 'Localização', L(o.shelf), true) +
      fm(en ? 'Status' : 'Estado', L(o.status)) +
      '</div>';
  }

  function render() {
    var root = document.getElementById('obj');
    var o = window.AVContent.object(SLUG);
    var en = window.AV && window.AV.lang === 'en';
    document.documentElement.lang = en ? 'en' : 'pt';
    if (!o) {
      root.innerHTML = '<div class="ed-head"><p class="kicker">Atlas</p><h1 class="ed-title">' +
        (en ? 'object not found' : 'objeto não encontrado') + '</h1>' +
        '<p class="dek">' + (en ? 'This dossier is not yet in the archive.' : 'Este dossiê ainda não está no arquivo.') +
        ' <a class="tl" href="index.html">' + (en ? 'Back to the Atlas' : 'Voltar ao Atlas') + ' →</a></p></div>';
      return;
    }
    document.title = L(o.title) + ' · Atlas · ana vanzin';
    root.innerHTML =
      '<a class="ed-back" href="index.html"><span class="ar">←</span><span>' + (en ? 'Atlas' : 'Atlas') + '</span></a>' +
      '<div class="ed-head">' +
        '<p class="kicker rise">' + (en ? 'Atlas · object dossier' : 'Atlas · dossiê de objeto') + '</p>' +
        '<h1 class="ed-title rise" style="--d:.06s">' + L(o.title) + '</h1>' +
        '<p class="dek rise" style="--d:.12s">' + L(o.summary) + '</p>' +
        '<div class="oc-ths rise" style="--d:.16s">' + themeChips(o.themes) + '</div>' +
        metaBlock(o) +
      '</div>' +
      '<section class="oc-fig">' + figure(o) + '</section>' +
      '<section class="oc-body"><div class="prose">' +
        notesBlock(o.notes) +
        '<p class="lede">' + L(o.summary) + '</p>' +
        (o.essay ? '<p>' + (en ? 'Read the essay that follows this object: ' : 'Leia o ensaio que acompanha este objeto: ') +
          '<a class="tl" href="../' + o.essay.href + '">' + L(o.essay.label) + ' <span class="ar">→</span></a></p>' : '') +
        '</div></section>' +
      symbolRow(o.symbols) +
      sourcesBlock(o.sources) +
      relatedBlock(o);

    // labels that need lang
    root.querySelectorAll('[data-k="symbols"]').forEach(function (el) {
      el.textContent = en ? 'Symbols in this object' : 'Símbolos neste objeto';
    });
  }

  window.addEventListener('av:lang', render);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();
