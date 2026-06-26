// ICONOCRACIA · corpus — ficha logic (shared by all 30 specimen pages).
// Reads window.SPECIMEN = { id, scores:[10]|null, annot:[{n,x,y,el,fn}]|null, indicators:[10] }
(function () {
  var S = window.SPECIMEN || {};
  var doc = document;

  // ── sub-tabs ──
  function showTab(t) {
    doc.querySelectorAll('.subtab').forEach(function (s) { s.classList.toggle('on', s.dataset.t === t); });
    doc.querySelectorAll('.tabbody').forEach(function (b) { b.classList.toggle('on', b.dataset.b === t); });
    try { localStorage.setItem('ficha-tab', t); } catch (e) {}
  }
  doc.querySelectorAll('.subtab').forEach(function (s) { s.addEventListener('click', function () { showTab(s.dataset.t); }); });
  try { var st = localStorage.getItem('ficha-tab'); if (st && doc.querySelector('.subtab[data-t="' + st + '"]')) showTab(st); } catch (e) {}

  // ── radar + bars (only when coded) ──
  if (S.scores && S.indicators) {
    var R = 84, N = S.indicators.length;
    var spokes = doc.getElementById('spokes'), poly = doc.getElementById('poly');
    if (spokes && poly) {
      var pts = [];
      for (var i = 0; i < N; i++) {
        var a = -Math.PI / 2 + i * (2 * Math.PI / N);
        var ex = Math.cos(a) * R, ey = Math.sin(a) * R;
        spokes.insertAdjacentHTML('beforeend', '<line x1="0" y1="0" x2="' + ex.toFixed(1) + '" y2="' + ey.toFixed(1) + '"/>');
        var v = Math.max(0, Math.min(10, S.scores[i])) / 10;
        pts.push((Math.cos(a) * R * v).toFixed(1) + ',' + (Math.sin(a) * R * v).toFixed(1));
      }
      poly.setAttribute('points', pts.join(' '));
    }
    var bars = doc.getElementById('bars');
    if (bars) {
      S.indicators.map(function (name, i) { return [name, S.scores[i]]; })
        .sort(function (a, b) { return b[1] - a[1]; }).slice(0, 5)
        .forEach(function (row) {
          bars.insertAdjacentHTML('beforeend',
            '<div><div class="bl"><span>' + row[0] + '</span><span>' + row[1] + ' / 10</span></div><div class="track"><div class="fill" style="width:' + (row[1] * 10) + '%"></div></div></div>');
        });
    }
  }

  // ── corpo→função legend + node hover sync (only when annotated) ──
  if (S.annot) {
    var legend = doc.getElementById('legend');
    if (legend) {
      S.annot.forEach(function (p) {
        legend.insertAdjacentHTML('beforeend',
          '<div class="li" data-n="' + p.n + '"><div class="nn">' + p.n + '</div><div><div class="el">' + p.el + '</div><div class="fn">' + p.fn + '</div></div></div>');
      });
    }
    function setHot(n, on) {
      doc.querySelectorAll('.node[data-n="' + n + '"]').forEach(function (e) { e.classList.toggle('hot', on); });
      doc.querySelectorAll('.legend .li[data-n="' + n + '"] .nn').forEach(function (e) { e.classList.toggle('hot', on); });
    }
    doc.querySelectorAll('.node').forEach(function (node) {
      node.addEventListener('mouseenter', function () { setHot(node.dataset.n, true); });
      node.addEventListener('mouseleave', function () { setHot(node.dataset.n, false); });
      node.addEventListener('click', function () { showTab('icono'); });
    });
    doc.addEventListener('mouseover', function (e) { var li = e.target.closest && e.target.closest('.legend .li'); if (li) setHot(li.dataset.n, true); });
    doc.addEventListener('mouseout', function (e) { var li = e.target.closest && e.target.closest('.legend .li'); if (li) setHot(li.dataset.n, false); });
  }

  // ── notes · persist per specimen ──
  var noteBtn = doc.getElementById('noteBtn'), notes = doc.getElementById('notes'), area = doc.getElementById('noteArea');
  var KEY = 'ficha.note.' + (S.id || 'x');
  if (area) { try { area.value = localStorage.getItem(KEY) || ''; } catch (e) {} if (area.value) { if (notes) notes.hidden = false; } }
  if (noteBtn && notes) {
    noteBtn.addEventListener('click', function () {
      showTab('desc');
      notes.hidden = false;
      if (area) area.focus();
    });
  }
  if (area) { area.addEventListener('input', function () { try { localStorage.setItem(KEY, area.value); } catch (e) {} }); }

  // ── cite (ABNT-style record citation, copied to clipboard) ──
  var citeBtn = doc.getElementById('citeBtn');
  if (citeBtn) {
    citeBtn.addEventListener('click', function () {
      var t = doc.querySelector('.ttl') ? doc.querySelector('.ttl').textContent.trim() : '';
      var url = (doc.querySelector('link[rel="canonical"]') || {}).href || location.href;
      var year = new Date().getFullYear();
      var cit = 'VANZIN, Ana (org.). ' + t + '. In: ICONOCRACIA — corpus iconocrático [' + (S.id || '') + ']. Florianópolis: PPGD/UFSC, ' + year + '. Disponível em: ' + url + '. Acesso em: ' + new Date().toLocaleDateString('pt-BR') + '.';
      var done = function () { var o = citeBtn.textContent; citeBtn.textContent = '✓ copiado'; setTimeout(function () { citeBtn.textContent = o; }, 1600); };
      if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(cit).then(done, done); }
      else { try { var ta = doc.createElement('textarea'); ta.value = cit; doc.body.appendChild(ta); ta.select(); doc.execCommand('copy'); ta.remove(); done(); } catch (e) {} }
    });
  }
})();
