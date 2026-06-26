/* ana vanzin — reusable theme filter.
   A row of pill buttons built from AVContent.THEMES (+ "all").
   Filters any list of elements carrying data-themes="slug slug".
   Bilingual: re-labels on av:lang. Square-corner-free pills follow
   the editorial grammar (see .tfilter in editorial.css).

   window.AVThemeFilter.mount(containerEl, { base, onChange })
   window.AVThemeFilter.apply(listEl, slug)   // 'all' shows everything */
(function () {
  var L = function (o) { return window.AVContent.L(o); };

  function mount(container, opts) {
    opts = opts || {};
    var active = 'all';

    function render() {
      var en = window.AV && window.AV.lang === 'en';
      var btns = [];
      btns.push(btn('all', '', en ? 'all' : 'tudo'));
      window.AVContent.THEMES.forEach(function (t) {
        btns.push(btn(t.slug, t.n, L(t.name)));
      });
      container.innerHTML = btns.join('');
      container.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-pressed', b.dataset.slug === active ? 'true' : 'false');
        b.addEventListener('click', function () {
          active = b.dataset.slug;
          container.querySelectorAll('button').forEach(function (x) {
            x.setAttribute('aria-pressed', x.dataset.slug === active ? 'true' : 'false');
          });
          if (opts.onChange) opts.onChange(active);
        });
      });
    }
    function btn(slug, n, label) {
      return '<button type="button" data-slug="' + slug + '">' +
        (n ? '<span class="n">' + n + '</span>' : '') + label + '</button>';
    }

    render();
    window.addEventListener('av:lang', render);
    return { get active() { return active; } };
  }

  function apply(listEl, slug) {
    if (!listEl) return;
    Array.prototype.forEach.call(listEl.children, function (el) {
      var t = el.getAttribute('data-themes');
      var show = slug === 'all' || (t && t.split(/\s+/).indexOf(slug) >= 0);
      el.classList.toggle('is-hidden', !show);
      if (el.classList.contains('rr-shelf')) return; // shelves use .is-hidden (display:none via CSS)
      el.style.display = show ? '' : 'none';
    });
  }

  window.AVThemeFilter = { mount: mount, apply: apply };
})();
