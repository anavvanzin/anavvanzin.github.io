/* WSalaLeitura — the reading room, rendered inside the desktop.
   Shelves of books/articles organized by research theme.
   Non-static: theme filter with animated transitions, bilingual support. */

function WSalaLeitura() {
  var _a = React.useState('all');
  var activeTheme = _a[0], setActiveTheme = _a[1];
  var _b = React.useState(false);
  var revealed = _b[0], setRevealed = _b[1];

  React.useEffect(function() {
    var t = setTimeout(function() { setRevealed(true); }, 200);
    return function() { clearTimeout(t); };
  }, []);

  var lang = (window.AV && window.AV.lang) || 'pt';
  var L = function(o) {
    return (o && typeof o === 'object' && ('pt' in o || 'en' in o)) ? (o[lang] != null ? o[lang] : o.pt) : o;
  };

  var themes = [
    { slug: 'justica-cegueira', n: '01', name: { pt: 'justiça e cegueira', en: 'justice and blindness' } },
    { slug: 'nacao-republica', n: '02', name: { pt: 'nação e república', en: 'nation and republic' } },
    { slug: 'direito-violencia', n: '03', name: { pt: 'direito e violência', en: 'law and violence' } },
    { slug: 'alegoria-feminina', n: '04', name: { pt: 'alegoria feminina', en: 'feminine allegory' } },
    { slug: 'soberania-visual', n: '05', name: { pt: 'soberania visual', en: 'visual sovereignty' } },
    { slug: 'colonialidade-ver', n: '06', name: { pt: 'colonialidade do ver', en: 'coloniality of seeing' } }
  ];

  var shelves = [
    {
      slug: 'lei-imagem',
      shelf: { pt: 'Lei e imagem', en: 'Law and image' },
      note: { pt: 'Como o direito se torna visível, e o que a imagem faz quando vira norma.',
              en: 'How law becomes visible, and what the image does once it becomes norm.' },
      themes: ['soberania-visual', 'justica-cegueira'],
      items: [
        { author: 'Costas Douzinas & Lynda Nead (eds.)', year: '1999',
          title: { pt: 'Law and the Image', en: 'Law and the Image' },
          line: { pt: 'A imagem como lugar do jurídico, não seu ornamento.', en: 'The image as a site of the legal, not its ornament.' } },
        { author: 'Peter Goodrich', year: '1995',
          title: { pt: 'Oedipus Lex', en: 'Oedipus Lex' },
          line: { pt: 'Psicanálise, história e os signos do direito.', en: 'Psychoanalysis, history and the signs of law.' } },
        { author: 'W. J. T. Mitchell', year: '1986',
          title: { pt: 'Iconology', en: 'Iconology' },
          line: { pt: 'Imagem, texto e ideologia — a gramática do ver.', en: 'Image, text and ideology — the grammar of seeing.' } }
      ]
    },
    {
      slug: 'alegoria-corpo',
      shelf: { pt: 'Alegoria e corpo', en: 'Allegory and body' },
      note: { pt: 'Por que a autoridade toma forma de mulher — e o que esse corpo carrega.',
              en: 'Why authority takes the form of a woman — and what that body carries.' },
      themes: ['alegoria-feminina', 'nacao-republica'],
      items: [
        { author: 'Marina Warner', year: '1985',
          title: { pt: 'Monuments and Maidens', en: 'Monuments and Maidens' },
          line: { pt: 'A alegoria feminina da forma pública, de Atena à República.', en: 'The feminine allegory of public form, from Athena to the Republic.' } },
        { author: 'Carole Pateman', year: '1988',
          title: { pt: 'O Contrato Sexual', en: 'The Sexual Contract' },
          line: { pt: 'O pacto que a teoria política não nomeia.', en: 'The pact that political theory does not name.' } },
        { author: 'Maurice Agulhon', year: '1979',
          title: { pt: 'Marianne au combat', en: 'Marianne into Battle' },
          line: { pt: 'A figura da República como imagem militante.', en: 'The figure of the Republic as militant image.' } }
      ]
    },
    {
      slug: 'metodo',
      shelf: { pt: 'Método: atlas e iconologia', en: 'Method: atlas and iconology' },
      note: { pt: 'Ferramentas para ler imagens em série — montagem, sobrevivência, sintoma.',
              en: 'Tools for reading images in series — montage, survival, symptom.' },
      themes: ['soberania-visual', 'colonialidade-ver'],
      items: [
        { author: 'Aby Warburg', year: '1929',
          title: { pt: 'Atlas Mnemosyne', en: 'Mnemosyne Atlas' },
          line: { pt: 'A montagem de imagens como forma de pensamento.', en: 'The montage of images as a form of thought.' } },
        { author: 'Georges Didi-Huberman', year: '2002',
          title: { pt: 'A Imagem Sobrevivente', en: 'The Surviving Image' },
          line: { pt: 'Warburg, o tempo das imagens e o sintoma.', en: 'Warburg, the time of images and the symptom.' } },
        { author: 'Erwin Panofsky', year: '1939',
          title: { pt: 'Estudos de Iconologia', en: 'Studies in Iconology' },
          line: { pt: 'Os três níveis do sentido na imagem.', en: 'The three levels of meaning in the image.' } }
      ]
    },
    {
      slug: 'nacao-genero',
      shelf: { pt: 'Nação, gênero e direito', en: 'Nation, gender and law' },
      note: { pt: 'Cidadania, nacionalidade e o lugar jurídico da mulher.',
              en: 'Citizenship, nationality and the legal place of women.' },
      themes: ['nacao-republica', 'colonialidade-ver'],
      items: [
        { author: 'Nira Yuval-Davis', year: '1997',
          title: { pt: 'Gênero e Nação', en: 'Gender and Nation' },
          line: { pt: 'A mulher como fronteira simbólica da nação.', en: 'Woman as the symbolic boundary of the nation.' } },
        { author: 'Linda Kerber', year: '1998',
          title: { pt: 'No Constitutional Right to Be Ladies', en: 'No Constitutional Right to Be Ladies' },
          line: { pt: 'Obrigações, cidadania e o corpo feminino diante da lei.', en: 'Obligations, citizenship and the female body before the law.' } }
      ]
    }
  ];

  var filtered = activeTheme === 'all'
    ? shelves
    : shelves.filter(function(s) { return s.themes.indexOf(activeTheme) >= 0; });

  var fn = React.createElement;

  return fn("div", { style: { fontFamily: 'var(--font-body)', padding: 'clamp(16px,3vw,32px)' } },

    // Header
    fn("div", { style: { marginBottom: 32, opacity: revealed ? 1 : 0,
      transform: revealed ? 'none' : 'translateY(12px)',
      transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)' } },
      fn("p", { style: { fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-eyebrow)', fontSize: 'var(--text-eyebrow)', color: 'var(--rubric)',
        margin: '0 0 8px' } }, 'sala de leitura'),
      fn("h1", { style: { fontFamily: 'var(--font-display)', fontWeight: 500,
        fontSize: 'clamp(1.8rem,4vw,2.8rem)', lineHeight: 1.05, margin: 0, letterSpacing: '-0.01em' } },
        'prateleiras comentadas'),
      fn("p", { style: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'var(--text-lead)',
        color: 'var(--ink-70)', marginTop: 10, maxWidth: '52ch', lineHeight: 'var(--leading-tight)' } },
        L({ pt: 'Um caminho pelo campo, organizado por tema. Não é bibliografia exaustiva — é uma cartografia.',
           en: 'A path through the field, organized by theme. Not an exhaustive bibliography — a cartography.' }))
    ),

    // Theme filter
    fn("div", { style: { display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36,
      opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(12px)',
      transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1) 0.15s' } },
      fn("button", {
        onClick: function() { setActiveTheme('all'); },
        style: { appearance: 'none', border: '1.5px solid var(--ink)',
          background: activeTheme === 'all' ? 'var(--ink)' : 'var(--paper)',
          color: activeTheme === 'all' ? 'var(--paper)' : 'var(--ink)',
          fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12,
          letterSpacing: '0.08em', textTransform: 'uppercase', padding: '6px 14px',
          cursor: 'pointer', transition: 'all 0.15s' } },
        L({ pt: 'tudo', en: 'all' })),
      themes.map(function(t) {
        var isActive = activeTheme === t.slug;
        return fn("button", { key: t.slug,
          onClick: function() { setActiveTheme(isActive ? 'all' : t.slug); },
          style: { appearance: 'none', border: '1.5px solid var(--ink)',
            background: isActive ? 'var(--rubric)' : 'var(--paper)',
            color: isActive ? 'var(--paper)' : 'var(--ink)',
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12,
            letterSpacing: '0.08em', textTransform: 'uppercase', padding: '6px 14px',
            cursor: 'pointer', transition: 'all 0.15s',
            display: 'flex', alignItems: 'center', gap: 6 } },
          fn("span", { style: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
            opacity: 0.6 } }, t.n),
          L(t.name));
      })
    ),

    // Shelves
    filtered.map(function(shelf, si) {
      return fn("section", { key: shelf.slug,
        style: { marginBottom: 40, paddingBottom: 32,
          borderBottom: '1px solid var(--ink-15)',
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'none' : 'translateY(16px)',
          transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1) ' + (0.2 + si * 0.1) + 's' } },

        // Shelf header
        fn("div", { style: { display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 8 } },
          fn("h2", { style: { fontFamily: 'var(--font-display)', fontWeight: 600,
            fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', margin: 0, lineHeight: 1.1 } },
            L(shelf.shelf)),
          fn("span", { style: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
            color: 'var(--ink-50)', letterSpacing: '0.05em' } },
            shelf.themes.map(function(ts) {
              var th = themes.filter(function(t) { return t.slug === ts; })[0];
              return th ? L(th.name) : '';
            }).join(' · '))
        ),

        // Shelf note
        fn("p", { style: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '0.95rem',
          color: 'var(--ink-70)', margin: '0 0 18px', lineHeight: 1.5, maxWidth: '56ch' } },
          L(shelf.note)),

        // Reading list
        fn("div", { style: { display: 'grid', gridTemplateColumns: 'minmax(120px,1fr) minmax(140px,1.5fr) 60px minmax(120px,1.5fr)',
          gap: '12px 16px', alignItems: 'baseline' } },

          // Header row
          fn("span", { style: { fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase',
            letterSpacing: '0.12em', fontSize: 10, color: 'var(--ink-50)', paddingBottom: 8,
            borderBottom: '1px solid var(--ink)' } }, 'autor'),
          fn("span", { style: { fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase',
            letterSpacing: '0.12em', fontSize: 10, color: 'var(--ink-50)', paddingBottom: 8,
            borderBottom: '1px solid var(--ink)' } }, 'título'),
          fn("span", { style: { fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase',
            letterSpacing: '0.12em', fontSize: 10, color: 'var(--ink-50)', paddingBottom: 8,
            borderBottom: '1px solid var(--ink)' } }, 'ano'),
          fn("span", { style: { fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase',
            letterSpacing: '0.12em', fontSize: 10, color: 'var(--ink-50)', paddingBottom: 8,
            borderBottom: '1px solid var(--ink)' } }, 'linha de pesquisa'),

          // Items
          shelf.items.map(function(item, ii) {
            return [
              fn("span", { key: 'a-' + ii, style: { fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink-70)' } },
                item.author),
              fn("span", { key: 't-' + ii, style: { fontFamily: 'var(--font-display)', fontStyle: 'italic',
                fontSize: 14, lineHeight: 1.4 } }, L(item.title)),
              fn("span", { key: 'y-' + ii, style: { fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12, color: 'var(--ink-50)' } }, item.year),
              fn("span", { key: 'l-' + ii, style: { fontFamily: 'var(--font-display)', fontStyle: 'italic',
                fontSize: 13, color: 'var(--ink-70)', lineHeight: 1.4 } }, L(item.line))
            ];
          })
        )
      );
    }),

    // Footer note
    fn("p", { style: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '0.9rem',
      color: 'var(--ink-50)', marginTop: 24, maxWidth: '52ch', lineHeight: 1.5 } },
      L({ pt: 'Referências cruzam-se com os ensaios da marginalia e os objetos do Atlas.',
         en: 'References cross with the marginalia essays and the Atlas objects.' }))
  );
}

window.WSalaLeitura = WSalaLeitura;
