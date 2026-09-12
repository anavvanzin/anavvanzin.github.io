(() => {
  let finished = false;
  const enter = () => { if (finished) return; finished = true; observer.disconnect(); location.replace('/'); };
  const connect = () => {
    document.documentElement.lang = 'pt-BR';
    if (document.title !== 'Intro · Ana Vanzin') document.title = 'Intro · Ana Vanzin';
    const skip = [...document.querySelectorAll('button')].find(button => /pular/i.test(button.textContent));
    if (skip && !skip.dataset.connected) { skip.dataset.connected = 'true'; skip.addEventListener('click', enter); }
    const canvas = document.querySelector('canvas');
    if (canvas && canvas.parentElement.style.opacity === '0') enter();
  };
  const observer = new MutationObserver(connect);
  observer.observe(document, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') enter(); });
  connect();
})();
