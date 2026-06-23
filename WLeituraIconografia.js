/* WLeituraIconografia — the thesis reading experience, rendered inside the desktop.
   Non-static: blindfold toggle, pin-gloss linking, marginalia hover, scroll reveals. */

function WLeituraIconografia({ lang }) {
  var vendaOn_state = React.useState(true);
  var vendaOn = vendaOn_state[0], setVendaOn = vendaOn_state[1];
  var activePin_state = React.useState('1');
  var activePin = activePin_state[0], setActivePin = activePin_state[1];
  var revealed_state = React.useState(false);
  var revealed = revealed_state[0], setRevealed = revealed_state[1];

  var L = function(pt, en) { return lang === 'en' ? en : pt; };

  React.useEffect(function() {
    var timer = setTimeout(function() { setRevealed(true); }, 300);
    return function() { clearTimeout(timer); };
  }, []);

  var pinData = [
    { id: '1', top: '33%', label: L('a venda','the blindfold'),
      text: L('Vendar Justitia começa como escárnio: no Narrenschiff um bobo ata-lhe a faixa. Só no século XVI a venda se inverte em virtude.',
           'Blinding Justitia begins as mockery: in the Narrenschiff a jester ties her band. Only in the 16th century does the blindfold invert into virtue.') },
    { id: '2', top: '69%', label: L('a balança','the scales'),
      text: L('A balança antecede a venda em séculos: mede o equilíbrio, não a cegueira.',
           'The scales predate the blindfold by centuries: they measure balance, not blindness.') },
    { id: '3', top: '13%', label: L('a coroa','the crown'),
      text: L('As três pontas marcam a Justitia soberana, herdeira da Astræa estelar.',
           'The three points mark the sovereign Justitia, heir to the stellar Astræa.') }
  ];

  var glossData = [
    { id: '1', title: L('a venda','the blindfold'), text: pinData[0].text },
    { id: '2', title: L('a balança','the scales'), text: pinData[1].text },
    { id: '3', title: L('a coroa','the crown'), text: pinData[2].text }
  ];

  var galleryData = [
    { fig: 'fig. ii', title: L('A República mulher','The Republic as Woman'), desc: L('alegoria e constituição, séc. XIX.','allegory and constitution, 19th c.') },
    { fig: 'fig. iii', title: 'Themis', desc: L('a medida antes da venda.','the measure before the blindfold.') },
    { fig: 'fig. iv', title: 'Astræa', desc: L('a virgem estelar que parte.','the stellar virgin who departs.') },
    { fig: 'fig. v', title: L('O bobo e a venda','The Jester and the Blindfold'), desc: 'Narrenschiff, fol. 22v.' }
  ];

  var fn = React.createElement;
  var _s = function(a, b) { return Object.assign({}, a, b); };

  return fn("div", { style: { fontFamily: 'var(--font-body)' } },

    // === HERO BANNER ===
    fn("div", { style: { position: 'relative', background: 'var(--paper)', borderBottom: '1.5px solid var(--ink)',
      padding: 'clamp(30px,5vw,58px) clamp(18px,4vw,52px) clamp(26px,4vw,44px)',
      backgroundImage: 'radial-gradient(var(--ink-15) 0.7px, transparent 0.7px)', backgroundSize: '24px 24px', overflow: 'hidden' } },
      fn("div", { style: { maxWidth: 1180, margin: '0 auto' } },
        fn("p", { style: { fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase',
          letterSpacing: 'var(--tracking-eyebrow)', fontSize: 'var(--text-eyebrow)', color: 'var(--rubric)',
          margin: '0 0 14px', opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(12px)',
          transition: 'all 0.55s cubic-bezier(0.22,1,0.36,1) 0.12s' } },
          L('advogada · doutoranda — PPGD/UFSC','lawyer · PhD candidate — PPGD/UFSC')),
        fn("span", { style: { position: 'relative', display: 'inline-block' } },
          fn("h1", { style: { fontFamily: 'var(--font-display)', fontWeight: 500, lineHeight: 0.9,
            letterSpacing: '-0.02em', margin: 0, whiteSpace: 'nowrap',
            fontSize: 'clamp(2.6rem,8.6vw,5rem)', color: 'var(--ink)',
            opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(22px)',
            transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s' } }, "ana vanzin"),
          fn("span", { style: { position: 'absolute', left: '-1.5%', right: '-1.5%', top: '56%', height: 4,
            background: 'var(--rubric)', transformOrigin: 'left center',
            transform: (revealed && vendaOn) ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 0.8s cubic-bezier(0.34,1.4,0.5,1) 0.3s', display: vendaOn ? 'block' : 'none' },
            'aria-hidden': 'true' })
        ),
        fn("p", { style: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'var(--text-lead)',
          color: 'var(--ink-70)', margin: '18px 0 0', maxWidth: '56ch', lineHeight: 'var(--leading-tight)',
          opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(12px)',
          transition: 'all 0.6s cubic-bezier(0.22,1,0.36,1) 1.7s' } },
          L('"A primeira Justitia vendada não nasceu como virtude — nasceu como sátira."',
            '"The first blindfolded Justitia was not born as virtue — it was born as satire."'))
      ),
      // Atlas strip
      fn("div", { style: { maxWidth: 1180, margin: 'clamp(26px,3.5vw,40px) auto 0', display: 'flex',
        gap: 'clamp(12px,1.6vw,22px)', alignItems: 'flex-end', borderTop: '1px solid var(--ink)', paddingTop: 18 } },
        fn("span", { style: { flex: 'none', writingMode: 'vertical-rl', transform: 'rotate(180deg)',
          alignSelf: 'stretch', fontFamily: 'var(--font-display)', fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: 11, color: 'var(--ink-50)', paddingBottom: 4 } }, "atlas"),
        [
          { label: L('a autora','the author'), sub: 'Ana Vanzin', self: true, img: 'assets/ana-portrait.png' },
          { label: 'justitia', sub: L('Frankfurt · a venda','Frankfurt · the blindfold'), img: 'assets/atlas/justitia.jpg' },
          { label: 'marianne', sub: 'Delacroix · 1830', img: 'assets/atlas/marianne.jpg' },
          { label: 'britannia', sub: L('Grã-Bretanha','Great Britain'), img: 'assets/atlas/britannia.jpg' },
          { label: 'república', sub: 'Brasil', img: 'assets/atlas/republica.jpg' }
        ].map(function(item, i) {
          return fn("figure", { key: i,
            style: { flex: '1 1 0', minWidth: 0, opacity: revealed ? 1 : 0,
              transform: revealed ? 'none' : 'translateY(16px)',
              transition: 'all 0.6s cubic-bezier(0.34,1.5,0.5,1) ' + (1.05 + i * 0.11) + 's' } },
            fn("div", { style: { position: 'relative', border: '1.5px solid ' + (item.self ? 'var(--rubric)' : 'var(--ink)'),
              background: 'var(--paper)', padding: 5, boxShadow: '3px 4px 0 rgba(33,27,22,0.1)' } },
              fn("img", { src: item.img, alt: item.label,
                style: { display: 'block', width: '100%', height: 'clamp(96px,11vw,150px)', objectFit: 'cover', filter: 'grayscale(0.12)' } })
            ),
            fn("figcaption", { style: { marginTop: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--ink-50)', lineHeight: 1.35 } },
              fn("span", { style: { display: 'block', fontWeight: 500, color: item.self ? 'var(--rubric)' : 'var(--ink)', letterSpacing: '0.02em' } }, item.label),
              item.sub
            )
          );
        })
      )
    ),

    // === MAIN READER ===
    fn("main", { style: { maxWidth: 1080, margin: '0 auto', padding: 'clamp(34px,5vw,64px) clamp(18px,5vw,56px) 0' } },

      fn("p", { style: { fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-eyebrow)', fontSize: 'var(--text-eyebrow)', color: 'var(--rubric)', margin: '0 0 18px' } },
        L('Tese de doutoramento · PPGD/UFSC','PhD thesis · PPGD/UFSC')),
      fn("h1", { style: { fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(3.2rem,8vw,5rem)',
        lineHeight: 0.96, letterSpacing: '-0.01em', margin: 0 } }, "iconocracia"),
      fn("p", { style: { fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'var(--text-lead)',
        fontStyle: 'italic', color: 'var(--ink-70)', maxWidth: '46ch', margin: '18px 0 0', lineHeight: 'var(--leading-tight)' } },
        L('As alegorias femininas do direito — Justitia, a República-como-mulher — lidas como imagens, não como ornamento.',
          'The female allegories of law — Justitia, the Republic-as-woman — read as images, not as ornament.')),
      fn("p", { style: { fontSize: 'var(--text-small)', color: 'var(--ink-50)', margin: '22px 0 0', letterSpacing: '0.01em' } },
        L('Ana Vanzin · história e iconografia jurídica · orientação Prof. Dr. […]',
          'Ana Vanzin · legal history & iconography · supervisor Prof. Dr. […]')),
      fn("div", { style: { height: 0, borderTop: '1.5px solid var(--ink)', margin: '38px 0 0' } }),

      // === PLATE SECTION ===
      fn("div", { style: { display: 'flex', alignItems: 'baseline', gap: 14, borderBottom: '1.5px solid var(--ink)',
        paddingBottom: 12, marginTop: 48 } },
        fn("span", { style: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem',
          color: 'var(--rubric)', lineHeight: 1 } }, "i–ii"),
        fn("h2", { style: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-h3)', margin: 0 } },
          L('a prancha anotada','the annotated plate')),
        fn("span", { style: { fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase',
          letterSpacing: 'var(--tracking-eyebrow)', fontSize: 'var(--text-eyebrow)', color: 'var(--ink-50)', marginLeft: 'auto' } },
          L('alfinetes · a venda que se revela','pins · the blindfold that reveals'))
      ),

      fn("section", { style: { display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 280px',
        gap: 'clamp(26px,4vw,52px)', alignItems: 'start', marginTop: 44 } },
        // Plate
        fn("figure", { style: { margin: 0 } },
          fn("div", { style: { position: 'relative', border: '1.5px solid var(--ink)', background: 'var(--paper)',
            padding: 30, display: 'flex', justifyContent: 'center' } },
            fn("div", { style: { position: 'absolute', inset: 7, border: '1px solid var(--ink-30)', pointerEvents: 'none' } }),
            // SVG Justitia
            fn("svg", { viewBox: '0 0 240 240', role: 'img',
              'aria-label': L('Marca da Justitia','Justitia mark'),
              style: { width: 'min(320px,70%)', height: 'auto', cursor: 'pointer' } },
              fn("g", { fill: 'none', stroke: '#211B16', strokeLinecap: 'round', strokeLinejoin: 'round' },
                fn("circle", { cx: 120, cy: 88, r: 44, strokeWidth: 9 }),
                fn("path", { d: 'M 92 50 L 96 30 L 106 44', strokeWidth: 7 }),
                fn("path", { d: 'M 113 42 L 120 22 L 127 42', strokeWidth: 7 }),
                fn("path", { d: 'M 134 44 L 144 30 L 148 50', strokeWidth: 7 }),
                fn("path", { d: 'M 120 132 L 120 150', strokeWidth: 7 })
              ),
              fn("circle", { cx: 106, cy: 84, r: 5.5, fill: '#211B16',
                style: { opacity: vendaOn ? 0 : 1, transition: 'opacity 0.3s ease 0.22s' } }),
              fn("circle", { cx: 134, cy: 84, r: 5.5, fill: '#211B16',
                style: { opacity: vendaOn ? 0 : 1, transition: 'opacity 0.3s ease 0.22s' } }),
              fn("g", { stroke: '#9B2C1C', fill: 'none', strokeLinecap: 'round' },
                fn("path", { d: 'M 74 88 L 166 88', strokeWidth: 14,
                  style: { strokeDasharray: 92, strokeDashoffset: vendaOn ? 0 : 92,
                    transition: 'stroke-dashoffset 0.9s cubic-bezier(0.22,1,0.36,1)' } }),
                fn("path", { d: 'M 166 88 L 184 74', strokeWidth: 7,
                  style: { opacity: vendaOn ? 1 : 0, transition: 'opacity 0.4s ease',
                    transitionDelay: vendaOn ? '0.35s' : '0s' } }),
                fn("path", { d: 'M 166 88 L 186 96', strokeWidth: 7,
                  style: { opacity: vendaOn ? 1 : 0, transition: 'opacity 0.4s ease',
                    transitionDelay: vendaOn ? '0.35s' : '0s' } })
              ),
              fn("g", { stroke: '#211B16', fill: 'none', strokeLinecap: 'round' },
                fn("path", { d: 'M 50 150 L 190 150', strokeWidth: 8 }),
                fn("path", { d: 'M 50 150 L 50 184', strokeWidth: 4 }),
                fn("path", { d: 'M 190 150 L 190 184', strokeWidth: 4 }),
                fn("path", { d: 'M 32 186 Q 50 206 68 186', strokeWidth: 7 }),
                fn("path", { d: 'M 172 186 Q 190 206 208 186', strokeWidth: 7 })
              ),
              fn("circle", { cx: 50, cy: 150, r: 6, fill: '#211B16' }),
              fn("circle", { cx: 190, cy: 150, r: 6, fill: '#211B16' })
            ),
            // Annotation pins
            pinData.map(function(p) {
              return fn("button", { key: p.id,
                'aria-label': 'Nota ' + p.id + ' — ' + p.label,
                onClick: function() { setActivePin(p.id); },
                style: { position: 'absolute', width: 24, height: 24, borderRadius: '50%',
                  border: '1.5px solid var(--rubric)',
                  background: activePin === p.id ? 'var(--rubric)' : 'var(--paper)',
                  color: activePin === p.id ? 'var(--paper)' : 'var(--rubric)',
                  fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.15s', padding: 0,
                  top: p.top, left: '50%', transform: 'translate(-50%,-50%)' } }, p.id);
            })
          ),
          // Venda control
          fn("div", { style: { display: 'flex', alignItems: 'center', gap: 14, marginTop: 18, flexWrap: 'wrap' } },
            fn("div", { role: 'group', 'aria-label': 'estado da venda',
              style: { display: 'inline-flex', border: '1.5px solid var(--ink)' } },
              fn("button", {
                'aria-pressed': !vendaOn,
                onClick: function() { setVendaOn(false); },
                style: { appearance: 'none', border: 0, borderRight: '1.5px solid var(--ink)',
                  background: !vendaOn ? 'var(--ink)' : 'var(--paper)',
                  color: !vendaOn ? 'var(--paper)' : 'var(--ink)',
                  cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13,
                  letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', padding: '9px 16px',
                  transition: 'all 0.15s' } },
                L('sem venda','no blindfold')),
              fn("button", {
                'aria-pressed': vendaOn,
                onClick: function() { setVendaOn(true); },
                style: { appearance: 'none', border: 0,
                  background: vendaOn ? 'var(--ink)' : 'var(--paper)',
                  color: vendaOn ? 'var(--paper)' : 'var(--ink)',
                  cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13,
                  letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', padding: '9px 16px',
                  transition: 'all 0.15s' } },
                L('com venda','with blindfold'))
            ),
            fn("span", { style: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1rem',
              color: 'var(--ink-50)', whiteSpace: 'nowrap' } },
              L('a faixa desenha-se de uma vez só','the band draws itself in one stroke'))
          ),
          fn("figcaption", { style: { marginTop: 22, fontSize: 'var(--text-footnote)', color: 'var(--ink-50)',
            lineHeight: 'var(--leading-tight)' } },
            fn("span", { style: { display: 'block', fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: '0.9rem', color: 'var(--ink-70)', marginBottom: 3 } },
              'Justitia, marca da casa — S. Brant, ', fn("em", null, "Das Narrenschiff"),
              ', Basileia, 1494, fol. 22v.'),
            L('A xilogravura original não é reproduzida; traduz-se apenas a sua lógica — tinta, faixa, balança.',
              'The original woodcut is not reproduced; only its logic is translated — ink, band, scales.')
          )
        ),
        // Glosses
        fn("aside", { 'aria-label': 'glosas', style: { position: 'sticky', top: 80 } },
          fn("h2", { style: { fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase',
            letterSpacing: 'var(--tracking-eyebrow)', fontSize: 'var(--text-eyebrow)', color: 'var(--ink-70)',
            margin: '0 0 6px', paddingBottom: 10, borderBottom: '1px solid var(--ink-30)' } },
            L('aparato · glosas','apparatus · glosses')),
          glossData.map(function(g) {
            var isActive = activePin === g.id;
            return fn("article", { key: g.id,
              onClick: function() { setActivePin(g.id); },
              style: { display: 'grid', gridTemplateColumns: '26px 1fr', gap: 10,
                padding: '16px 0 16px 12px', borderLeft: isActive ? '2px solid var(--rubric)' : '2px solid transparent',
                background: isActive ? 'color-mix(in srgb, var(--rubric) 5%, var(--paper))' : 'transparent',
                cursor: 'pointer', transition: 'all 0.15s', marginLeft: -12 } },
              fn("div", { style: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18,
                color: isActive ? 'var(--rubric)' : 'var(--ink-30)', lineHeight: 1.1, transition: 'color 0.15s' } }, g.id),
              fn("div", null,
                fn("h3", { style: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.15rem',
                  margin: '0 0 4px', lineHeight: 1.1 } }, g.title),
                fn("p", { style: { fontSize: 'var(--text-small)', color: 'var(--ink-70)', margin: 0, lineHeight: 1.5 } }, g.text)
              )
            );
          })
        )
      ),

      // === GALLERY ===
      fn("section", { style: { marginTop: 64 } },
        fn("div", { style: { display: 'flex', alignItems: 'baseline', gap: 14,
          borderBottom: '1.5px solid var(--ink)', paddingBottom: 12, marginBottom: 26 } },
          fn("span", { style: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem',
            color: 'var(--rubric)', lineHeight: 1 } }, "iii"),
          fn("h2", { style: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-h3)', margin: 0 } },
            L('galeria de alegorias','allegory gallery')),
          fn("span", { style: { fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase',
            letterSpacing: 'var(--tracking-eyebrow)', fontSize: 'var(--text-eyebrow)', color: 'var(--ink-50)', marginLeft: 'auto' } },
            L('pranchas em estudo','plates in study'))
        ),
        fn("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 22 } },
          galleryData.map(function(item, i) {
            return fn("div", { key: i, style: { opacity: revealed ? 1 : 0,
              transform: revealed ? 'none' : 'translateY(16px)',
              transition: 'all 0.6s cubic-bezier(0.34,1.5,0.5,1) ' + (1.5 + i * 0.1) + 's' } },
              fn("figure", { style: { margin: 0 } },
                fn("div", { style: { position: 'relative', aspectRatio: '3/4', border: '1.5px solid var(--ink)',
                  background: 'var(--paper-deep)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', textAlign: 'center' } },
                  fn("span", { style: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, lineHeight: 1.5,
                    color: 'var(--ink-50)', maxWidth: '78%' } }, item.title)
                ),
                fn("figcaption", { style: { marginTop: 11 } },
                  fn("b", { style: { display: 'block', fontFamily: 'var(--font-display)', fontWeight: 600,
                    fontStyle: 'normal', fontSize: '1.05rem', color: 'var(--ink)', marginBottom: 3 } }, item.title),
                  item.desc
                )
              )
            );
          })
        )
      ),

      // === FOOTNOTES ===
      fn("section", { style: { marginTop: 64, borderTop: '1.5px solid var(--ink)', paddingTop: 22 } },
        fn("h2", { style: { fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase',
          letterSpacing: 'var(--tracking-eyebrow)', fontSize: 'var(--text-eyebrow)', color: 'var(--ink-70)', margin: '0 0 16px' } },
          L('notas','notes')),
        fn("ol", { style: { margin: 0, padding: 0, listStyle: 'none', counterReset: 'fn', maxWidth: '74ch' } },
          ['Brant, S. Das Narrenschiff. Basileia, 1494, fol. 22v.',
           'Resnik, J.; Curtis, D. Representing Justice. Yale UP, 2011, p. 62–91.',
           'Jay, M. Must Justice Be Blind? In: Law and the Image. Chicago, 1999.'].map(function(note, i) {
            return fn("li", { key: i, id: 'fn' + (i+1),
              style: { counterIncrement: 'fn', position: 'relative', padding: '8px 0 8px 28px',
                fontSize: 'var(--text-footnote)', color: 'var(--ink-70)', lineHeight: 1.55,
                borderBottom: '1px solid var(--ink-15)' } }, note);
          })
        )
      )
    ),

    // === FOOTER ===
    fn("footer", { style: { marginTop: 8, background: 'var(--ink)', color: 'var(--paper)' } },
      fn("div", { style: { maxWidth: 1080, margin: '0 auto', padding: '40px clamp(18px,5vw,56px)',
        display: 'flex', gap: 24, alignItems: 'baseline', flexWrap: 'wrap' } },
        fn("img", { src: 'assets/monogram-av-inverse.svg', alt: '', style: { width: 30, height: 30 } }),
        fn("span", null, fn("a", { href: 'mailto:ana@anavanzin.com',
          style: { color: 'var(--paper)', borderBottom: '1px solid color-mix(in srgb, var(--rubric) 80%, var(--paper))' } },
          "ana@anavanzin.com")),
        fn("span", { style: { marginLeft: 'auto', fontSize: 'var(--text-small)',
          color: 'color-mix(in srgb, var(--paper) 60%, var(--ink))' } },
          "PPGD/UFSC · Ius Gentium · anavanzin.com")
      )
    )
  );
}

window.WLeituraIconografia = WLeituraIconografia;
