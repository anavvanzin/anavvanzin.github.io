/* ============================================================
   ana vanzin — shared content architecture
   One bilingual data spine for the research wing. No styling here.
   Consumed by: atlas/*, sala-de-leitura, desenhe-um-simbolo, and any
   future route. Pages read window.AVContent and render with the
   editorial primitives (editorial.css). PT primary / EN secondary.

   Collections:
     THEMES        — the taxonomy that links essays, objects, readings
     OBJECTS       — Atlas dossiers (visual objects under curation)
     READINGS      — the reading-room shelves (books, articles, sources)
     SYMBOLS       — legal symbols, used by "Draw a Legal Symbol"
     ESSAYS        — pointers into marginália (index only, not full text)
     PUBLICATIONS  — pointers into publicações (index only)
     PROJECTS      — research strands / work in formation
   Helpers: AVContent.theme(slug), .objectsByTheme(slug), .readingsByTheme(slug)
   ============================================================ */
(function () {
  function L(o) {
    var lang = (window.AV && window.AV.lang) || 'pt';
    return (o && typeof o === 'object' && ('pt' in o || 'en' in o)) ? (o[lang] != null ? o[lang] : o.pt) : o;
  }

  /* ---------- THEMES — the shared taxonomy ---------- */
  var THEMES = [
    { slug: 'justica-cegueira', n: '01',
      name: { pt: 'justiça e cegueira', en: 'justice and blindness' },
      gloss: { pt: 'a venda, do escárnio à virtude', en: 'the blindfold, from satire to virtue' } },
    { slug: 'nacao-republica', n: '02',
      name: { pt: 'nação e república', en: 'nation and republic' },
      gloss: { pt: 'Marianne, Britannia, a República', en: 'Marianne, Britannia, the Republic' } },
    { slug: 'direito-violencia', n: '03',
      name: { pt: 'direito e violência', en: 'law and violence' },
      gloss: { pt: 'o gume por trás da virtude', en: 'the blade behind the virtue' } },
    { slug: 'alegoria-feminina', n: '04',
      name: { pt: 'alegoria feminina', en: 'feminine allegory' },
      gloss: { pt: 'o corpo emprestado à lei', en: 'the body lent to law' } },
    { slug: 'soberania-visual', n: '05',
      name: { pt: 'soberania visual', en: 'visual sovereignty' },
      gloss: { pt: 'quem governa o que se vê', en: 'who governs what is seen' } },
    { slug: 'colonialidade-ver', n: '06',
      name: { pt: 'colonialidade do ver', en: 'coloniality of seeing' },
      gloss: { pt: 'raça, nação e o olhar jurídico', en: 'race, nation and the legal gaze' } }
  ];

  /* ---------- OBJECTS — Atlas dossiers ---------- */
  var OBJECTS = [
    {
      slug: 'justitia', href: 'atlas/justitia.html',
      img: 'assets/atlas/justitia.jpg',
      status: { pt: 'em curadoria', en: 'under curation' },
      title: { pt: 'Justitia vendada', en: 'Blindfolded Justitia' },
      object: { pt: 'Xilogravura', en: 'Woodcut' },
      origin: { pt: 'Das Narrenschiff, Basileia', en: 'Das Narrenschiff, Basel' },
      date: '1494',
      maker: { pt: 'Sebastian Brant (atrib. oficina)', en: 'Sebastian Brant (attrib. workshop)' },
      shelf: { pt: 'fólio 22v', en: 'folio 22v' },
      rights: { pt: 'direitos a verificar', en: 'rights to be verified' },
      themes: ['justica-cegueira', 'alegoria-feminina'],
      caption: { pt: 'O tolo venda os olhos de Justitia. A primeira Justitia vendada não é virtude — é escárnio.',
                 en: "The fool blindfolds Justitia. The first blindfolded Justitia is not virtue — it is mockery." },
      symbols: ['venda', 'balanca', 'gume'],
      summary: {
        pt: 'A mais antiga Justitia vendada de que se tem notícia não a mostra como virtude, mas como alvo: um tolo lhe cobre os olhos, e o gesto é de zombaria. Este dossiê reúne o objeto, sua descrição material e as leituras que o atravessam.',
        en: 'The earliest known blindfolded Justitia shows her not as virtue but as target: a fool covers her eyes, and the gesture is one of mockery. This dossier gathers the object, its material description and the readings that cross it.'
      },
      notes: [
        { k: { pt: 'O gesto', en: 'The gesture' },
          t: { pt: 'A autoria do gesto decide o sentido. Quase nunca é a própria Justitia quem se venda — é alguém que a venda.',
               en: 'The authorship of the gesture decides its meaning. It is almost never Justitia who blindfolds herself — it is someone who blindfolds her.' } },
        { k: { pt: 'A viagem', en: 'The journey' },
          t: { pt: 'Da margem satírica do livro impresso ao tímpano do tribunal, em pouco mais de um século.',
               en: 'From the satirical margin of the printed book to the courthouse tympanum, in little more than a century.' } }
      ],
      essay: { href: 'marginalia/justica-nao-nasceu-cega.html', label: { pt: 'a justiça não nasceu cega', en: 'justice was not born blind' } },
      sources: [
        { pt: 'Brant, Sebastian. <em>Das Narrenschiff</em>. Basileia, 1494, fol. 22v. Digitalização e direitos a confirmar.',
          en: 'Brant, Sebastian. <em>Das Narrenschiff</em>. Basel, 1494, fol. 22v. Digitisation and rights to be confirmed.' }
      ]
    },
    {
      slug: 'marianne', href: 'atlas/marianne.html',
      img: 'assets/atlas/marianne.jpg',
      status: { pt: 'em formação', en: 'in formation' },
      title: { pt: 'Marianne', en: 'Marianne' },
      object: { pt: 'Alegoria nacional', en: 'National allegory' },
      origin: { pt: 'França', en: 'France' },
      date: 'séc. XVIII–',
      maker: { pt: 'tradição republicana', en: 'republican tradition' },
      shelf: { pt: 'múltiplos suportes', en: 'multiple supports' },
      rights: { pt: 'imagem a sourcing', en: 'image to be sourced' },
      themes: ['nacao-republica', 'alegoria-feminina', 'soberania-visual'],
      caption: { pt: 'A República figurada em corpo de mulher — e sua irmã tropical.',
                 en: 'The Republic figured in a woman\u2019s body — and her tropical sister.' },
      symbols: ['barrete', 'coroa'],
      summary: {
        pt: 'A figura feminina que encarna a República francesa e viaja, transformada, para a alegoria da nação brasileira. Dossiê em formação.',
        en: 'The feminine figure that embodies the French Republic and travels, transformed, into the allegory of the Brazilian nation. Dossier in formation.'
      },
      notes: [],
      essay: { href: 'publicacoes/maria-marianne.html', label: { pt: 'Maria, Marianne e a República', en: 'Maria, Marianne and the Republic' } },
      sources: []
    },
    {
      slug: 'britannia', href: 'atlas/britannia.html',
      img: 'assets/atlas/britannia.jpg',
      status: { pt: 'em formação', en: 'in formation' },
      title: { pt: 'Britannia', en: 'Britannia' },
      object: { pt: 'Alegoria nacional', en: 'National allegory' },
      origin: { pt: 'Grã-Bretanha', en: 'Great Britain' },
      date: 'séc. XVII–',
      maker: { pt: 'tradição imperial', en: 'imperial tradition' },
      shelf: { pt: 'moeda, estátua, gravura', en: 'coin, statue, print' },
      rights: { pt: 'imagem a sourcing', en: 'image to be sourced' },
      themes: ['nacao-republica', 'soberania-visual', 'colonialidade-ver'],
      caption: { pt: 'A nação imperial em corpo de mulher armada.',
                 en: 'The imperial nation as an armed woman\u2019s body.' },
      symbols: ['gume', 'coroa'],
      summary: {
        pt: 'A alegoria britânica entre virtude cívica e poder imperial. Dossiê em formação.',
        en: 'The British allegory between civic virtue and imperial power. Dossier in formation.'
      },
      notes: [], essay: null, sources: []
    },
    {
      slug: 'republica', href: 'atlas/republica.html',
      img: 'assets/atlas/republica.jpg',
      status: { pt: 'em formação', en: 'in formation' },
      title: { pt: 'A República', en: 'The Republic' },
      object: { pt: 'Alegoria nacional', en: 'National allegory' },
      origin: { pt: 'Brasil', en: 'Brazil' },
      date: '1889–',
      maker: { pt: 'iconografia republicana', en: 'republican iconography' },
      shelf: { pt: 'moeda, selo, pintura', en: 'coin, stamp, painting' },
      rights: { pt: 'imagem a sourcing', en: 'image to be sourced' },
      themes: ['nacao-republica', 'alegoria-feminina', 'colonialidade-ver'],
      caption: { pt: 'A irmã tropical de Marianne: a República brasileira figurada como mulher.',
                 en: 'Marianne\u2019s tropical sister: the Brazilian Republic figured as a woman.' },
      symbols: ['barrete', 'coroa'],
      summary: {
        pt: 'A alegoria feminina da nação brasileira, entre importação iconográfica e invenção local. Dossiê em formação.',
        en: 'The feminine allegory of the Brazilian nation, between iconographic import and local invention. Dossier in formation.'
      },
      notes: [], essay: { href: 'publicacoes/maria-marianne.html', label: { pt: 'Maria, Marianne e a República', en: 'Maria, Marianne and the Republic' } }, sources: []
    }
  ];

  /* ---------- SYMBOLS — for "Draw a Legal Symbol" ---------- */
  /* path = an SVG path string drawn on a 100x100 viewBox (study line) */
  var SYMBOLS = [
    { slug: 'venda', name: { pt: 'a venda', en: 'the blindfold' },
      gloss: { pt: 'cega o juízo — ou o protege do que não deve ver', en: 'blinds judgement — or shields it from what it must not see' },
      theme: 'justica-cegueira',
      path: 'M16 50 Q50 38 84 50 Q50 62 16 50 Z M16 50 L8 44 M84 50 L92 44' },
    { slug: 'balanca', name: { pt: 'a balança', en: 'the scale' },
      gloss: { pt: 'a medida como tecnologia política', en: 'measure as a political technology' },
      theme: 'direito-violencia',
      path: 'M50 18 L50 78 M34 78 L66 78 M22 34 L78 34 M22 34 L14 54 M22 34 L30 54 M14 54 Q22 64 30 54 M78 34 L70 54 M78 34 L86 54 M70 54 Q78 64 86 54' },
    { slug: 'gume', name: { pt: 'o gume', en: 'the blade' },
      gloss: { pt: 'a força que a virtude esconde', en: 'the force the virtue conceals' },
      theme: 'direito-violencia',
      path: 'M50 14 L50 70 M38 70 L62 70 M34 76 L66 76 M44 22 L50 14 L56 22' },
    { slug: 'coroa', name: { pt: 'a coroa', en: 'the crown' },
      gloss: { pt: 'soberania que se vê de longe', en: 'sovereignty seen from afar' },
      theme: 'soberania-visual',
      path: 'M22 64 L18 34 L34 50 L50 28 L66 50 L82 34 L78 64 Z M22 64 L78 64' },
    { slug: 'barrete', name: { pt: 'o barrete frígio', en: 'the Phrygian cap' },
      gloss: { pt: 'a liberdade que a república veste', en: 'the liberty the republic wears' },
      theme: 'nacao-republica',
      path: 'M30 70 L30 46 Q30 22 56 22 Q74 22 70 40 Q66 50 70 70 Z M30 46 Q44 52 70 48' },
    { slug: 'trono', name: { pt: 'o trono', en: 'the throne' },
      gloss: { pt: 'o lugar de onde a lei fala', en: 'the seat from which law speaks' },
      theme: 'soberania-visual',
      path: 'M30 30 L30 84 M70 30 L70 84 M30 30 L70 30 M30 56 L70 56 M24 84 L76 84' }
  ];

  /* ---------- READINGS — the reading-room shelves ---------- */
  var READINGS = [
    {
      slug: 'lei-imagem', anchor: 'lei-imagem',
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
      slug: 'alegoria-corpo', anchor: 'alegoria-corpo',
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
      slug: 'metodo', anchor: 'metodo',
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
      slug: 'nacao-genero', anchor: 'nacao-genero',
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

  /* ---------- ESSAYS — pointers into marginália ---------- */
  var ESSAYS = [
    { href: 'marginalia/justica-nao-nasceu-cega.html', date: '2026 · 03',
      title: { pt: 'a justiça não nasceu cega', en: 'justice was not born blind' }, themes: ['justica-cegueira', 'alegoria-feminina'] },
    { href: 'marginalia/balanca.html', date: '2026 · 02',
      title: { pt: 'uma balança nunca é só uma balança', en: 'a scale is never just a scale' }, themes: ['direito-violencia', 'soberania-visual'] },
    { href: 'marginalia/fachada.html', date: '2026 · 01',
      title: { pt: 'a mulher na fachada do tribunal', en: 'the woman on the courthouse façade' }, themes: ['nacao-republica', 'alegoria-feminina'] }
  ];

  /* ---------- PROJECTS — research strands ---------- */
  var PROJECTS = [
    { slug: 'iconocracia', href: 'iconocracia/',
      title: { pt: 'ICONOCRACIA', en: 'ICONOCRACIA' },
      line: { pt: 'A tese: como o direito imagina a si mesmo.', en: 'The thesis: how law imagines itself.' } },
    { slug: 'feminilidade-estado',
      title: { pt: 'Feminilidade de Estado', en: 'State Femininity' },
      line: { pt: 'A nação personificada como mulher: Justitia, Marianne, a República.', en: 'The nation personified as a woman: Justitia, Marianne, the Republic.' } },
    { slug: 'condicao-juridica',
      title: { pt: 'Condição jurídica da mulher', en: 'Women\u2019s legal condition' },
      line: { pt: 'Nacionalidade, casamento e cidadania na história do direito.', en: 'Nationality, marriage and citizenship in legal history.' } }
  ];

  function theme(slug) { return THEMES.filter(function (t) { return t.slug === slug; })[0] || null; }
  function objectsByTheme(slug) { return OBJECTS.filter(function (o) { return o.themes.indexOf(slug) >= 0; }); }
  function readingsByTheme(slug) { return READINGS.filter(function (r) { return r.themes.indexOf(slug) >= 0; }); }
  function object(slug) { return OBJECTS.filter(function (o) { return o.slug === slug; })[0] || null; }

  window.AVContent = {
    L: L,
    THEMES: THEMES, OBJECTS: OBJECTS, SYMBOLS: SYMBOLS, READINGS: READINGS,
    ESSAYS: ESSAYS, PROJECTS: PROJECTS,
    theme: theme, object: object, objectsByTheme: objectsByTheme, readingsByTheme: readingsByTheme
  };
})();
