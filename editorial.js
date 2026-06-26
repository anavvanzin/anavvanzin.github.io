/* ana vanzin — editorial route shell.
   Bilingual (PT primary / EN secondary) via localStorage 'av_lang', shared
   across all routes and the desktop homepage. Generic + declarative:
   - any element with data-pt / data-en   -> textContent swapped on lang change
   - any element with data-pt-html / data-en-html -> innerHTML swapped
   - .langtog buttons[data-lang] toggle + persist
   - .avnav a[data-match] (space-separated filenames) gets .cur for current page
   No asset paths here, so the file loads correctly from root or a subdir. */
(function () {
  // Feature detection — progressive enhancement: lang toggle requires these APIs.
  // Without them, the page remains fully functional in Portuguese (the HTML default).
  if (!document.querySelectorAll || !window.localStorage) return;
  document.documentElement.classList.add('js');

  function getLang() {
    try { var s = localStorage.getItem('av_lang'); return s === 'en' ? 'en' : 'pt'; } catch (e) { return 'pt'; }
  }
  function setLang(l) {
    try { localStorage.setItem('av_lang', l); } catch (e) {}
  }
  var lang = getLang();

  function paintText() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-pt]').forEach(function (el) {
      var v = el.getAttribute('data-' + lang);
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll('[data-pt-html]').forEach(function (el) {
      var v = el.getAttribute('data-' + lang + '-html');
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll('.langtog button[data-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
    });
    // let pages react (re-render data-driven content)
    window.dispatchEvent(new CustomEvent('av:lang', { detail: { lang: lang } }));
  }

  function markActive() {
    var route = document.body && document.body.getAttribute('data-route');
    if (!route) return;
    document.querySelectorAll('.avnav a[data-route]').forEach(function (a) {
      if (a.getAttribute('data-route') === route) a.classList.add('cur');
    });
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('.langtog button[data-lang]');
    if (!b) return;
    if (b.dataset.lang === lang) return;
    lang = b.dataset.lang;
    setLang(lang);
    paintText();
  });

  // expose current lang for pages that build content imperatively
  window.AV = { get lang() { return lang; } };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { paintText(); markActive(); });
  } else { paintText(); markActive(); }
})();
