(() => {
  const key = 'av-intro-seen';
  const remember = () => { try { sessionStorage.setItem(key, '1'); } catch {} };
  if (/^\/intro(?:\/|$)/.test(location.pathname)) {
    window.addEventListener('av:intro-finished', () => {
      remember();
      if (parent !== window) parent.postMessage({ type: 'av:intro-finished' }, location.origin);
      else location.replace('/?intro=done');
    }, { once: true });
    return;
  }
  const params = new URLSearchParams(location.search);
  const returned = params.get('intro') === 'done';
  if (returned) {
    remember();
    params.delete('intro');
    history.replaceState(null, '', location.pathname + (params.size ? '?' + params : '') + location.hash);
  }
  function show(event) {
    if (document.getElementById('intro-overlay') || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const previous = event?.type === 'av:intro-replay' ? document.querySelector('[data-app-id="intro"]') : document.activeElement;
    const root = document.getElementById('root');
    const overlay = document.createElement('div');
    overlay.id = 'intro-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Abertura de Ana Vanzin');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:#F5F0E6';
    const frame = document.createElement('iframe');
    frame.title = 'Ampulheta vinho — abertura';
    frame.src = '/intro/';
    frame.style.cssText = 'width:100%;height:100%;border:0;display:block';
    const skip = document.createElement('button');
    skip.textContent = 'Pular abertura';
    skip.style.cssText = 'position:absolute;right:16px;top:16px;min-height:44px;padding:8px 16px;background:#F5F0E6;color:#521d28;border:1px solid currentColor;cursor:pointer';
    let timer;
    function close() {
      clearTimeout(timer);
      remember();
      overlay.remove();
      if (root) root.inert = false;
      window.removeEventListener('message', message);
      document.removeEventListener('keydown', escape, true);
      if (previous?.isConnected && previous !== document.body) previous.focus();
      else document.getElementById('main')?.focus({ preventScroll: true });
    }
    function message(event) {
      if (event.origin === location.origin && event.source === frame.contentWindow && event.data?.type === 'av:intro-finished') close();
    }
    function escape(event) {
      if (event.key === 'Escape') { event.preventDefault(); event.stopImmediatePropagation(); close(); }
    }
    window.addEventListener('message', message);
    document.addEventListener('keydown', escape, true);
    frame.addEventListener('error', close);
    skip.addEventListener('click', close);
    overlay.append(frame, skip);
    document.body.append(overlay);
    if (root) root.inert = true;
    skip.focus();
    timer = setTimeout(close, 12000);
  }
  window.addEventListener('av:intro-replay', show);
  function automatic() {
    if (returned) return;
    try {
      if (sessionStorage.getItem(key) === '1') return;
      sessionStorage.setItem(key, '1');
    } catch { return; }
    show();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', automatic, { once: true });
  else automatic();
})();
