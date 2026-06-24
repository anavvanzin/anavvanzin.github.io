// Atlas-site — research data (fake but faithful to the corpus schema).
const A = "../assets/";

window.AtlasData = {
  thesis: {
    kicker: "ICONOCRACIA · Tese de Doutorado · PPGD/UFSC",
    title: "A alegoria feminina como tecnologia visual do Estado",
    lede: "Uma cartografia comparada do corpo feminino alegórico na cultura jurídica de seis nações — França, Reino Unido, Alemanha, Estados Unidos, Bélgica e Brasil — entre 1789 e 2000. Onde o Estado precisou ser visto, vestiu uma mulher.",
    author: "Ana Vanzin", group: "Ius Gentium · UFSC · Florianópolis", year: "MMXXVI",
    heroImg: A+"corpus/br-stf-justica-1961.jpg",
    heroCap: "BR · 1961 · Alfredo Ceschiatti · A Justiça, granito · Supremo Tribunal Federal, Brasília",
  },

  stats: [
    { v: "247", l: "placas no corpus", s: "seis nações · 1789–2000" },
    { v: "8",   l: "painéis do atlas", s: "disposição warburguiana" },
    { v: "10",  l: "indicadores", s: "iconometria do endurecimento" },
    { v: "62%", l: "codificado", s: "Panofsky · três níveis" },
  ],

  argument: {
    cap: "A tese iconocrática",
    drop: "A",
    body: "imagem é sempre uma escavação. Superfícies acumulam — gravura sobre gravura, selo sobre selo, corpo sobre lei — até o substrato original tornar-se mito. A alegoria feminina não ilustra o poder soberano: ela é o poder soberano tornado visível. Ocupa a posição da própria lei — central, imponente, formalmente drapejada — e contudo habitada por uma subjetividade que o sistema não consegue nomear.",
    pull: "Onde se esperava um selo, colocou-se uma figura feminina. A tensão entre a figura e o aparato documental que a cerca é a tese iconocrática tornada visível.",
  },

  anatomia: {
    cap: "Anatomia da alegoria · ler o corpo como documento",
    title: "O corpo feminino é o aparato",
    lede: "Décio Villares, «O Retrato da República» (1896), pintado para selar a jovem República brasileira. Tratada como peça do corpus — não como ilustração — a figura deixa de representar o Estado e passa a operá-lo. Cada elemento sobreposto ao corpo feminino executa uma função soberana; é essa transferência que a tese nomeia tecnologia visual.",
    fig: A+"corpus/br-villares-republica.jpg",
    figCap: "BR · 1896 · Décio Villares — O Retrato da República (óleo s/ tela)",
    parts: [
      { n:"1", x:"52%", y:"15%", el:"O barrete frígio e o louro", fn:"A liberdade revolucionária importada — a Marianne francesa — naturalizada como insígnia do Brasil." },
      { n:"2", x:"49%", y:"40%", el:"A égide de ouro", fn:"A face da Medusa ao peito: a proteção do Estado que é também o poder de petrificar quem o encara." },
      { n:"3", x:"31%", y:"55%", el:"A espada baixa", fn:"Força em repouso — a violência convertida em guarda, a coerção tornada serenidade." },
      { n:"4", x:"70%", y:"22%", el:"A inscrição musiva", fn:"«ESTADOS UNIDOS DO BRAZIL»: o corpo emoldurado pela legenda que o fixa como norma." },
      { n:"5", x:"43%", y:"90%", el:"A palma aos pés", fn:"Vitória e martírio depositados no chão — o prêmio que a alegoria distribui mas não recebe." },
    ],
  },

  // Curated vitrine — real corpus plates, six nations, true provenance.
  corpus: [
    // ── Fundacional: o Estado veste pela primeira vez um corpo feminino ──
    { id:"FR-1792-01", title:"Liberté", country:"FR", year:1792, regime:"FUNDACIONAL", support:"gravura", img:A+"corpus/fr-moitte-liberte-1792.jpg" },
    { id:"FR-1793-02", title:"A Liberdade coroando a Virtude", country:"FR", year:1793, regime:"FUNDACIONAL", support:"gravura", img:A+"corpus/fr-boizot-liberte-1793.jpg" },
    { id:"FR-1793-03", title:"A Liberdade armada do Cetro da Razão", country:"FR", year:1793, regime:"FUNDACIONAL", support:"gravura", img:A+"corpus/fr-boizot-liberte-armada-1793.jpg" },
    { id:"BR-1896-01", title:"O Retrato da República", country:"BR", year:1896, regime:"FUNDACIONAL", support:"pintura", img:A+"corpus/br-villares-republica.jpg" },
    { id:"BR-1896-02", title:"Alegoria da República", country:"BR", year:1896, regime:"FUNDACIONAL", support:"pintura", img:A+"corpus/br-lopes-republica-1896.jpg" },
    { id:"US-1896-01", title:"History Instructing Youth", country:"US", year:1896, regime:"FUNDACIONAL", support:"cédula", img:A+"corpus/us-educational-1896-c.png" },
    // ── Normativo: a fórmula que sobrevive + a circulação como moeda ──
    { id:"BE-1559-01", title:"Iustitia", country:"BE", year:1559, regime:"NORMATIVO", support:"gravura", img:A+"corpus/fr-bruegel-justicia-1559.jpg" },
    { id:"DE-1589-01", title:"Justitia da torre do relógio", country:"DE", year:1589, regime:"NORMATIVO", support:"escultura", img:A+"corpus/de-justitia-esslingen-1589-c.png" },
    { id:"DE-1752-01", title:"Allegorie der Jus Civile", country:"DE", year:1752, regime:"NORMATIVO", support:"escultura", img:A+"corpus/de-jus-civile-wenzinger-1752-c.png" },
    { id:"UK-1600-01", title:"Iustitia e Prudentia", country:"UK", year:"s/d", regime:"NORMATIVO", support:"gravura", img:A+"corpus/uk-justitia-prudentia-c.png" },
    { id:"FR-1865-01", title:"A Justiça, a Vingança e a Verdade", country:"FR", year:1865, regime:"NORMATIVO", support:"gravura", img:A+"corpus/fr-chifflart-justice-1865.jpg" },
    { id:"BR-1961-01", title:"A Justiça", country:"BR", year:1961, regime:"NORMATIVO", support:"escultura", img:A+"corpus/br-stf-justica-1961.jpg" },
    { id:"FR-1900-01", title:"A República de Clésinger", country:"FR", year:1900, regime:"NORMATIVO", support:"escultura", img:A+"corpus/fr-clesinger-republique-1900.jpg" },
    { id:"FR-1849-01", title:"Cérès — 5 francs", country:"FR", year:1849, regime:"NORMATIVO", support:"moeda", img:A+"corpus/fr-ceres-5f-1849-c.png" },
    { id:"UK-1898-01", title:"Britannia — 1 penny", country:"UK", year:1898, regime:"NORMATIVO", support:"moeda", img:A+"corpus/uk-penny-1895-c.png" },
    { id:"UK-1695-01", title:"Britannia — meio penny", country:"UK", year:1695, regime:"NORMATIVO", support:"moeda", img:A+"corpus/uk-halfpenny-1695-c.png" },
    { id:"DE-1900-01", title:"Germania — Reichspost", country:"DE", year:1900, regime:"NORMATIVO", support:"selo", img:A+"corpus/de-germania-1900.jpg" },
    { id:"DE-1919-01", title:"Germania — 50 Mark", country:"DE", year:1919, regime:"NORMATIVO", support:"cédula", img:A+"corpus/de-50mark-1919-c.png" },
    { id:"DE-1910-01", title:"1000 Mark — duas alegorias", country:"DE", year:1910, regime:"NORMATIVO", support:"cédula", img:A+"corpus/de-1000mark-1910-c.png" },
    { id:"DE-1908-01", title:"100 Mark — duas alegorias", country:"DE", year:1908, regime:"NORMATIVO", support:"cédula", img:A+"corpus/de-100mark-1908-c.png" },
    { id:"US-1864-01", title:"Seated Liberty — 1 dólar", country:"US", year:1864, regime:"NORMATIVO", support:"moeda", img:A+"corpus/us-seated-liberty-1840-c.png" },
    { id:"BR-1906-01", title:"República — 1000 réis", country:"BR", year:1906, regime:"NORMATIVO", support:"moeda", img:A+"corpus/br-1000reis-1906-c.png" },
    { id:"BR-1970-01", title:"República — 1 cruzeiro", country:"BR", year:1970, regime:"NORMATIVO", support:"cédula", img:A+"corpus/br-1cruzeiro-1970-c.png" },
    { id:"BR-1965-01", title:"República — 50 cruzeiros", country:"BR", year:1965, regime:"NORMATIVO", support:"moeda", img:A+"corpus/br-50cruzeiros-1965-c.png" },
    // ── Militar / endurecimento: a guerra e a colônia enrijecem a figura ──
    { id:"FR-1915-01", title:"A República nos chama", country:"FR", year:1915, regime:"MILITAR", support:"litografia", img:A+"corpus/fr-steinlen-republique-1915.jpg" },
    { id:"UK-1912-01", title:"Britannia armada — 1 penny", country:"UK", year:1912, regime:"MILITAR", support:"moeda", img:A+"corpus/uk-britannia-penny-1912.jpg" },
    { id:"BE-1912-01", title:"Banque du Congo Belge — 100 francs", country:"BE", year:1912, regime:"MILITAR", support:"cédula", img:A+"corpus/be-congo-100f-1912-c.png" },
    { id:"BE-1921-01", title:"Monumento ao Congo Belga", country:"BE", year:1921, regime:"MILITAR", support:"monumento", img:A+"corpus/be-congo-monumento-1921.jpg" },
    // ── Contra-alegoria: sátira e fissura ──
    { id:"FR-1871-01", title:"A República amável", country:"FR", year:1871, regime:"CONTRA_ALEGORIA", support:"gravura", img:A+"corpus/fr-rops-republique-1871.jpg" },
    { id:"FR-1904-01", title:"O chocalho da República", country:"FR", year:1904, regime:"CONTRA_ALEGORIA", support:"litografia", img:A+"corpus/fr-veber-hochet-1904.jpg" },
  ],

  panels: [
    { n:"I",    name:"Gênese",          desc:"A primeira vez que o Estado vestiu um corpo feminino.", period:"1789–1850" },
    { n:"II",   name:"Justitia",        desc:"Balança, espada, venda — a fórmula que sobrevive.",     period:"1800–2000" },
    { n:"III",  name:"Domesticação",    desc:"Como o corpo alegórico foi purificado.",                period:"1850–1920" },
    { n:"IV",   name:"ENDURECIMENTO",   desc:"O corpo que endurece quando o Estado faz guerra.",      period:"1870–1945" },
    { n:"V",    name:"Pedra e Bronze",  desc:"Quando a alegoria se torna monumento.",                 period:"1870–1940" },
    { n:"VI",   name:"Balança e Império",desc:"A justiça como arma geopolítica.",                     period:"1850–1960" },
    { n:"VII",  name:"Branquitude",     desc:"O contrato racial da imagem soberana.",                 period:"1870–1950" },
    { n:"VIII", name:"Fissuras",        desc:"Contra-alegorias e rupturas.",                          period:"1960–2000" },
  ],
  panelImg: [
    A+"corpus/fr-moitte-liberte-1792.jpg",   // I · Gênese
    A+"corpus/fr-bruegel-justicia-1559.jpg", // II · Justitia
    A+"corpus/fr-ceres-5f-1849-c.png",       // III · Domesticação
    A+"corpus/fr-steinlen-republique-1915.jpg", // IV · ENDURECIMENTO
    A+"corpus/br-stf-justica-1961.jpg",      // V · Pedra e Bronze
    A+"corpus/be-congo-100f-1912-c.png",     // VI · Balança e Império
    A+"corpus/us-educational-1896-c.png",    // VII · Branquitude
    A+"corpus/fr-veber-hochet-1904.jpg",     // VIII · Fissuras
  ],

  radiografia: {
    cap: "Radiografia · ENDURECIMENTO",
    title: "Da serenidade ao endurecimento",
    desc: "O mesmo dispositivo — a mulher-Estado — em duas têmperas. O rosto sereno e laureado da moeda republicana francesa, e o corpo armado, de elmo, escudo e tridente, da potência imperial britânica. A iconometria mede, em dez indicadores ordinais, a distância entre a serenidade e o endurecimento: a guerra não inventa a figura, ela a enrijece.",
    indicators: ["desincorporação","rigidez postural","dessexualização","uniformização facial","heraldicização","enquadramento arq.","apagamento narrativo","monocromatização","serialidade","inscrição estatal"],
    a: { cap:"FR · 1849 · moeda", title:"Cérès, 5 francs", regime:"NORMATIVO", img:A+"corpus/fr-ceres-5f-1849-c.png", scores:[3,3,2,3,3,2,2,3,3,4] },
    b: { cap:"UK · 1912 · moeda", title:"Britannia armada", regime:"MILITAR", img:A+"corpus/uk-britannia-penny-1912.jpg", scores:[7,8,7,7,9,6,8,6,8,9] },
  },

  verbetes: [
    { term:"Iconocracia", source:"Mondzain (2002) → tese", type:"mobilizado", ch:"Cap. 2" },
    { term:"Visiocracia", source:"Goodrich (2014)", type:"mobilizado", ch:"Cap. 1" },
    { term:"Contrato Sexual Visual", source:"original · sobre Pateman", type:"original", ch:"Cap. 1" },
    { term:"Feminilidade de Estado", source:"original", type:"original", ch:"Cap. 2" },
    { term:"Economia Icônica", source:"Mondzain (2002)", type:"mobilizado", ch:"Cap. 1" },
    { term:"endurecimento", source:"original", type:"original", ch:"Cap. 6–7" },
    { term:"Purificação Clássica", source:"original", type:"original", ch:"Cap. 5–6" },
    { term:"Pintura de alma", source:"Legendre · Goodrich · Mondzain", type:"original", ch:"Cap. 1" },
    { term:"Pathosformel", source:"Warburg", type:"mobilizado", ch:"Cap. 4" },
    { term:"Zwischenraum", source:"Warburg", type:"mobilizado", ch:"Cap. 8" },
    { term:"Regime Iconocrático", source:"original", type:"original", ch:"Cap. 2" },
    { term:"Acoplamento imagem-norma", source:"original", type:"original", ch:"Cap. 5" },
    { term:"Iconometria", source:"método quantitativo", type:"método", ch:"Cap. 6" },
    { term:"Iconologia", source:"método qualitativo · Panofsky", type:"método", ch:"Cap. 7" },
  ],

  method: [
    { k:"QUAN", t:"Iconometria do corpus", d:"Dez indicadores ordinais aplicados a cada placa; séries por década, suporte e nação revelam a curva do endurecimento. Cap. 6." },
    { k:"QUAL", t:"Iconologia jurídica", d:"Leitura panofskyana em três níveis — pré-iconográfico, iconográfico, iconológico — ancorada na crítica feminista do direito. Cap. 7." },
    { k:"SÍNTESE", t:"Atlas comparativo", d:"Montagem warburguiana, não linear: os oito painéis fazem ver o Zwischenraum entre nações, regimes e séculos. Cap. 8–9." },
  ],

  COUNTRY: { FR:"França", UK:"Reino Unido", DE:"Alemanha", US:"EUA", BE:"Bélgica", BR:"Brasil" },
  REGIME_LABEL: { FUNDACIONAL:"fundacional", NORMATIVO:"normativo", MILITAR:"militar", CONTRA_ALEGORIA:"contra-alegoria" },
};
