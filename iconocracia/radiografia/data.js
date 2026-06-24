// templates/radiografia/data.js — corpus + iconometric measures for the Radiografia tool.
// Scholarly Brazilian-Portuguese metadata; scores are the thesis' illustrative
// iconometric indices (0–10). Anchors (0–100, normalized to the plate frame)
// drive the diagrammatic overlay — they are an analytical apparatus laid over
// the specimen, not a claim of pixel registration.
(function () {
  const A = "/assets/corpus/";

  // ── Iconometric indicators (the analytical payload of a radiografia) ──
  const INDICATORS = [
    { key: "venda",        label: "Venda · olhar velado",  gloss: "Recusa ou suspensão do olhar — a justiça que opta por não ver." },
    { key: "equilibrio",   label: "Equilíbrio da balança", gloss: "Simetria do braço da balança; a medida apresentada como neutra." },
    { key: "endurecimento",label: "ENDURECIMENTO",          gloss: "Rigidez do corpo, couraça, postura militarizada do Estado." },
    { key: "frontalidade", label: "Frontalidade",           gloss: "Eixo frontal, passividade icônica, corpo exposto ao olhar." },
    { key: "forca",        label: "Atributos de força",     gloss: "Espada, fasces, escudo, gládio — a potência armada da norma." },
    { key: "contencao",    label: "Contenção do corpo",     gloss: "Corpo sentado, drapejado, domesticado — a feminilidade contida." },
  ];

  const REGIME_LABEL = { fundacional:"Fundacional", normativo:"Normativo", militar:"Militar", contra:"Contra-alegoria" };
  const REGIME_GLOSS = {
    fundacional:"Corpus revolucionário — a alegoria como promessa.",
    normativo:"Estabilização burocrática — a alegoria como norma.",
    militar:"ENDURECIMENTO — a alegoria vestida para a guerra.",
    contra:"Fissuras e sátiras — onde o dispositivo se denuncia.",
  };

  const DEF_ANCHOR = { headCx:50, eyeY:33, axisX:50, baseY:92, gaze:160, hasVenda:false, vendaY:31,
    canon:{ top:24, unit:14, modules:5 }, scale:null, attrs:[] };

  const SPECIMENS = [
    { id:"liberte-1792", img:A+"fr-moitte-liberte-1792.jpg",
      title:"Liberté", author:"Jean-Guillaume Moitte", year:"1792", country:"França", regime:"fundacional",
      support:"Gravura a buril", ref:"MOITTE, J.-G. Liberté. Paris, 1792.",
      note:"Sentada, coroa cívica, serpente domada sob os pés. O corpo monumental ainda é autoridade serena — não couraça. A liberdade revolucionária antes de qualquer endurecimento.",
      scores:{ venda:1, equilibrio:6, endurecimento:3, frontalidade:7, forca:4, contencao:8 },
      anchor:{ headCx:53, eyeY:34, axisX:52, baseY:90, gaze:172, hasVenda:false, canon:{ top:24, unit:13, modules:5 },
        attrs:[ {x:25,y:30,label:"gorro frígio"}, {x:50,y:80,label:"serpente domada"}, {x:30,y:58,label:"esfinge do trono"} ] } },

    { id:"germania-1900", img:A+"de-germania-1900.jpg",
      title:"Germania", author:"Reichspost", year:"1900", country:"Alemanha", regime:"militar",
      support:"Selo postal calcográfico", ref:"DEUTSCHE REICHSPOST. Germania. Berlim, 1900.",
      note:"Couraça, espada erguida, coroa mural. A alegoria do Estado já vestida para a guerra: ENDURECIMENTO em estado puro, o oposto exato da Liberté sentada.",
      scores:{ venda:0, equilibrio:3, endurecimento:9, frontalidade:8, forca:9, contencao:3 },
      anchor:{ headCx:48, eyeY:30, axisX:48, baseY:96, gaze:120, hasVenda:false, canon:{ top:14, unit:15, modules:5 },
        attrs:[ {x:62,y:26,label:"espada erguida"}, {x:46,y:16,label:"coroa mural"}, {x:42,y:54,label:"couraça"} ] } },

    { id:"justitia-1589", img:A+"de-justitia-esslingen-1589-c.png",
      title:"Iustitia", author:"Fonte de Esslingen", year:"1589", country:"Sacro Império", regime:"normativo",
      support:"Escultura · fonte cívica", ref:"Iustitia. Marktbrunnen, Esslingen am Neckar, 1589.",
      note:"Olhos descobertos: a Iustitia velada ainda não se firmara como norma em 1589. Balança e gládio em equilíbrio explícito — a medida exibida como neutralidade.",
      scores:{ venda:2, equilibrio:8, endurecimento:5, frontalidade:6, forca:6, contencao:5 },
      anchor:{ headCx:50, eyeY:28, axisX:50, baseY:94, gaze:160, hasVenda:false, canon:{ top:18, unit:14, modules:5 },
        scale:{ cx:30, cy:48, len:24, angle:0 }, attrs:[ {x:30,y:48,label:"balança"}, {x:70,y:42,label:"gládio"} ] } },

    { id:"stf-justica-1961", img:A+"br-stf-justica-1961.jpg",
      title:"A Justiça", author:"Alfredo Ceschiatti", year:"1961", country:"Brasil", regime:"normativo",
      support:"Escultura · granito", ref:"CESCHIATTI, A. A Justiça. Praça dos Três Poderes, Brasília, 1961.",
      note:"Olhos cerrados, espada repousada sobre o colo: a venda interiorizada. Geometria moderna e monumental — a Justiça do Estado novo, contida e cega por desígnio.",
      scores:{ venda:7, equilibrio:7, endurecimento:6, frontalidade:9, forca:5, contencao:8 },
      anchor:{ headCx:50, eyeY:24, axisX:50, baseY:96, gaze:90, hasVenda:true, vendaY:24, canon:{ top:16, unit:16, modules:5 },
        attrs:[ {x:50,y:60,label:"espada no colo"}, {x:50,y:24,label:"olhos cerrados"} ] } },

    { id:"britannia-1912", img:A+"uk-britannia-penny-1912.jpg",
      title:"Britannia", author:"segundo L. C. Wyon", year:"1912", country:"Reino Unido", regime:"militar",
      support:"Moeda · bronze", ref:"Britannia. One Penny, Royal Mint, 1912.",
      note:"Tridente, escudo da União, elmo. O império personificado: a força naval contida numa pose sentada — endurecimento sob aparência de calma.",
      scores:{ venda:0, equilibrio:5, endurecimento:7, frontalidade:5, forca:8, contencao:6 },
      anchor:{ headCx:48, eyeY:30, axisX:50, baseY:90, gaze:120, hasVenda:false, canon:{ top:22, unit:14, modules:5 },
        attrs:[ {x:66,y:34,label:"tridente"}, {x:34,y:58,label:"escudo da União"}, {x:50,y:22,label:"elmo"} ] } },

    { id:"us-educational-1896", img:A+"us-educational-1896-c.png",
      title:"History instructing Youth", author:"W. de Leftwich Dodge", year:"1896", country:"Estados Unidos", regime:"fundacional",
      support:"Cédula · série Educational", ref:"Educational Series. $1 Silver Certificate, U.S. Treasury, 1896.",
      note:"A alegoria pedagógica: a República como mestra. Corpo drapejado, gesto aberto — pedagogia da nação, não couraça do Estado.",
      scores:{ venda:1, equilibrio:5, endurecimento:2, frontalidade:6, forca:2, contencao:6 },
      anchor:{ headCx:52, eyeY:32, axisX:50, baseY:90, gaze:150, hasVenda:false, canon:{ top:24, unit:13, modules:5 }, attrs:[] } },

    { id:"clesinger-rep-1900", img:A+"fr-clesinger-republique-1900.jpg",
      title:"La République", author:"Auguste Clésinger", year:"1900", country:"França", regime:"normativo",
      support:"Escultura", ref:"CLÉSINGER, A. La République. França, c. 1900.",
      note:"A Marianne institucional da Terceira República — serenada, estabilizada, sem o ardor combatente de 1848. A norma substitui a barricada.",
      scores:{ venda:1, equilibrio:6, endurecimento:4, frontalidade:7, forca:3, contencao:7 },
      anchor:{ headCx:50, eyeY:30, axisX:50, baseY:92, gaze:158, hasVenda:false, canon:{ top:22, unit:14, modules:5 }, attrs:[] } },

    { id:"lopes-rep-1896", img:A+"br-lopes-republica-1896.jpg",
      title:"A República", author:"atrib. H. Bernardelli", year:"1896", country:"Brasil", regime:"fundacional",
      support:"Pintura · óleo", ref:"A República. Brasil, 1896.",
      note:"A jovem República brasileira — barrete frígio, ainda revolucionária em 1896, antes do endurecimento republicano e da Feminilidade de Estado consolidada.",
      scores:{ venda:1, equilibrio:5, endurecimento:3, frontalidade:6, forca:3, contencao:5 },
      anchor:{ headCx:50, eyeY:30, axisX:50, baseY:92, gaze:155, hasVenda:false, canon:{ top:22, unit:14, modules:5 }, attrs:[] } },

    { id:"veber-hochet-1904", img:A+"fr-veber-hochet-1904.jpg",
      title:"Le Hochet", author:"Jean Veber", year:"1904", country:"França", regime:"contra",
      support:"Litografia satírica", ref:"VEBER, J. Le Hochet. L'Assiette au Beurre, Paris, 1904.",
      note:"A contra-alegoria: a sátira desnuda a alegoria de Estado como chocalho, como engodo. Aqui o dispositivo se denuncia — a fissura no Contrato Sexual Visual.",
      scores:{ venda:3, equilibrio:2, endurecimento:4, frontalidade:3, forca:2, contencao:4 },
      anchor:{ headCx:50, eyeY:34, axisX:50, baseY:92, gaze:140, hasVenda:false, canon:{ top:26, unit:13, modules:5 }, attrs:[] } },

    { id:"congo-monumento-1921", img:A+"be-congo-monumento-1921.jpg",
      title:"Monumento colonial", author:"—", year:"1921", country:"Congo Belga", regime:"contra",
      support:"Fotografia · monumento", ref:"Monumento colonial. Congo Belga, 1921.",
      note:"A alegoria a serviço da empresa colonial: a Belgique civilizadora. A face imperial da Feminilidade de Estado, sustentada sobre o corpo do colonizado.",
      scores:{ venda:0, equilibrio:3, endurecimento:8, frontalidade:7, forca:7, contencao:4 },
      anchor:{ headCx:50, eyeY:26, axisX:50, baseY:94, gaze:130, hasVenda:false, canon:{ top:16, unit:15, modules:5 }, attrs:[] } },
  ];

  const byId = (id) => SPECIMENS.find(s => s.id === id) || SPECIMENS[0];
  const anchorOf = (s) => Object.assign({}, DEF_ANCHOR, s.anchor || {});

  window.RadioData = { INDICATORS, REGIME_LABEL, REGIME_GLOSS, SPECIMENS, byId, anchorOf,
    DEFAULT_A:"liberte-1792", DEFAULT_B:"germania-1900" };
})();
