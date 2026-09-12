const deck = [
  {
    title: "Justiça",
    number: "I",
    image: "/assets/tarot/justica.png",
    hue: 40,
    description:
      "A Justiça surge como uma soberana serena do equilíbrio: o ideal de que o julgamento deve pesar os atos com simetria, contenção e razão pública.",
    history:
      "Na iconografia jurídica, a Justiça herda as traditions clássica e medieval em que a mulher com balança e espada encarna a legitimidade da adjudicação e a promessa de igual medida perante a lei.",
    meaning:
      "Academicamente, a Justiça marca a tensão entre a igualdade formal e a desigualdade material, questionando se o direito pode ser imparcial sem se tornar cego às estruturas sociais."
  },
  {
    title: "Liberdade",
    number: "II",
    image: "/assets/tarot/liberdade.png",
    hue: 15,
    description:
      "A Liberdade é a figure do movimento, do sopro e do devir cívico — um corpo que recusa o enclausuramento e insiste na autodeterminação coletiva.",
    history:
      "Dos emblemas revolucionários aos selos republicanos, a Liberdade serviu como alegoria feminina da emancipação, da ruptura constitucional e do direito de aparecer em público como sujeito político.",
    meaning:
      "Na leitura teórica, a Liberdade nunca é apenas uma condition individual; ela nomeia os arranjos institucionais e materiais que tornam a liberdade real, frágil e contestada."
  },
  {
    title: "República",
    number: "III",
    image: "/assets/tarot/republica.png",
    hue: 110,
    description:
      "A República ergue-se como a figura disciplinada da vida comum, onde a autoridade é imaginada como algo compartilhado, não herdada como propriedade privada.",
    history:
      "As repúblicas modernas frequentemente adotaram personificações femininas para sinalizar a esfera pública, a virtude cívica e a abstração da nação como um corpo maior do que qualquer governante.",
    meaning:
      "A força acadêmica da República reside no lembrete de que a forma política é tanto simbólica quanto constitucional: uma república deve narrar continuamente quem pertence ao povo."
  },
  {
    title: "Lei",
    number: "IV",
    image: "/assets/tarot/lei.png",
    hue: 205,
    description:
      "A Lei aparece como a arquitetura da ordem — não apenas um livro de regras, mas uma linguagem cultural que molda o que pode ser reconhecido, reivindicado ou punido.",
    history:
      "Na imagética jurídica, a Lei muitas vezes toma emprestada a alegoria feminina para tornar visível a normatividade abstrata, apresentando a legalidade como um poder solene e civilizador.",
    meaning:
      "Uma leitura reflexiva enxerga a Lei como habilitadora e restritiva: ela distribui autoridade enquanto também revela as exclusões ocultas em todo sistema de classificação."
  },
  {
    title: "Verdade",
    number: "V",
    image: "/assets/tarot/verdade.png",
    hue: 270,
    description:
      "A Verdade é a carta mais elusiva: luminosa, severa e avessa à adulação, sugere a revelação como uma exigência ética.",
    history:
      "A Verdade há muito é imaginada como uma mulher que revela o que está oculto, vinculando a cultura jurídica aos ideais probatórios, à confissão, à prova e à encenação pública dos fatos.",
    meaning:
      "Em termos acadêmicos, a Verdade nunca é um ponto final neutro. Ela é produzida por meio de instituições, arquivos, discursos e conflitos — e permanece vulnerável ao poder."
  }
];

const DIALECTICAL_MATRIX = {
  "Justiça": {
    "Liberdade": {
      title: "O Equilíbrio da Autonomia",
      text: "A tensão entre Justiça e Liberdade reside no limite onde o direito coletivo encontra a autodeterminação individual. Enquanto a Justiça busca a medida e a proporção, a Liberdade invoca a ruptura e a expansão do sujeito. Dialeticamente, o direito só é justo quando protege a capacidade de ser livre, e a liberdade só é real quando balizada por um horizonte de equidade."
    },
    "República": {
      title: "A Institucionalidade do Bem Comum",
      text: "Justiça e República convergem na ideia de autoridade pública. A República oferece o corpo político e o espaço comum, enquanto a Justiça fornece a régua moral para a distribuição de poder. O risco dialético aqui é a burocratização da virtude: quando a forma republicana se torna um fim em si mesma, a Justiça se desvanece em mera administração."
    },
    "Lei": {
      title: "A Norma e o Ideal",
      text: "A Lei é a ferramenta técnica, a Justiça é o horizonte ético. A tensão surge quando a legalidade formal se afasta da legitimidade material. Uma lei sem justiça é arbítrio; uma justiça sem lei é instabilidade. A síntese reside na legalidade reflexiva, onde a norma é constantemente testada pelo seu propósito humanizador."
    },
    "Verdade": {
      title: "A Verdade como Prova e Veredito",
      text: "Justiça e Verdade formam o núcleo do rito jurídico. A Justiça depende da revelação dos fatos para operar, mas a Verdade jurídica é sempre uma construção mediada pelo processo. A tensão reside na impossibilidade de uma transparência absoluta: a Justiça deve decidir mesmo diante da incerteza, transformando a verdade provisória em decisão definitiva."
    }
  },
  "Liberdade": {
    "República": {
      title: "O Povo e a Instituição",
      text: "A Liberdade é o sopro constituinte; a República é o poder constituído. A tensão dialética ocorre na transição do movimento revolucionário para a ordem estabilizada. A República corre o risco de aprisionar a Liberdade em suas molduras, enquanto a Liberdade desmedida pode implodir a vida comum. A síntese é a cidadania ativa."
    },
    "Lei": {
      title: "A Liberdade sob a Norma",
      text: "Aqui se encontra o paradoxo clássico: a lei que limita é a mesma que garante a liberdade. Sem lei, a liberdade é apenas o poder do mais forte. Sob a lei, a liberdade torna-se um direito exigível. A tensão reside na resistência à lei opressiva, onde a Liberdade atua como a força que denuncia a clausura do sistema jurídico."
    },
    "Verdade": {
      title: "A Revelação como Emancipação",
      text: "Liberdade e Verdade conectam-se na ideia de parresía — o falar a verdade ao poder. A Liberdade exige o acesso à Verdade para que o sujeito possa se autodeterminar sem manipulações. Dialeticamente, a Verdade é o que liberta das sombras do mito e da ideologia, permitindo um agir político consciente."
    }
  },
  "República": {
    "Lei": {
      title: "O Governo das Leis",
      text: "A República se define como a recusa ao governo dos homens em favor do governo das leis. A tensão dialética surge na fonte da lei: quem fala pela República? A Lei deve ser a expressão da vontade comum, não um instrumento de facção. A República dá à Lei seu propósito público; a Lei dá à República sua durabilidade."
    },
    "Verdade": {
      title: "A Transparência da Coisa Pública",
      text: "A República exige publicidade, o que a vincula intrinsecamente à Verdade. O segredo é o veneno da República. A tensão reside no arcano do poder: o Estado que esconde suas entranhas trai sua natureza republicana. Dialeticamente, a Verdade atua como o mecanismo de vigilância que mantém a República fiel ao povo."
    }
  },
  "Lei": {
    "Verdade": {
      title: "A Verdade Nominal e a Realidade",
      text: "A Lei busca fixar a Verdade em definições e tipos, mas a realidade é sempre excedente. A tensão ocorre no hiato entre o que está escrito e o que é vivido. A Verdade desafia a rigidez da Lei, exigindo interpretação e ajuste. A síntese é a hermenêutica: a arte de ler a Verdade nas frestas da legalidade."
    }
  }
};

const archetypeKeywords = {
  "Justiça": ["justiça", "balance", "balança", "espada", "equity", "equidade", "julgamento", "tribunal"],
  "Liberdade": ["liberdade", "liberté", "freedom", "emancipação", "ruptura", "revolução", "corrente", "frígio"],
  "República": ["república", "republic", "povo", "virtude", "público", "comum", "nação", "constituição"],
  "Lei": ["lei", "law", "norma", "código", "tábua", "ordem", "legalidade", "regra"],
  "Verdade": ["verdade", "truth", "veritas", "nu", "espelho", "luz", "revelação", "prova"]
};

let corpusData = [];

async function loadCorpus() {
  try {
    const response = await fetch("/data/corpus.json");
    corpusData = await response.json();
    console.log("Corpus loaded:", corpusData.length, "items");
  } catch (err) {
    console.error("Failed to load corpus:", err);
  }
}

loadCorpus();

const cardEls = [document.getElementById("card1"), document.getElementById("card2")];
const drawBtn = document.getElementById("drawBtn");
const reshuffleBtn = document.getElementById("reshuffleBtn");
const remainingCount = document.getElementById("remainingCount");
const lastDrawn = document.getElementById("lastDrawn");

// Readings Panel Elements
const readingsPlaceholder = document.getElementById("readingsPlaceholder");
const readingsDivider = document.getElementById("readingsDivider");

const readingSlots = [
  {
    content: document.getElementById("readingsContent1"),
    number: document.getElementById("readingsNumber1"),
    title: document.getElementById("readingsTitle1"),
    description: document.getElementById("readingsDescription1"),
    history: document.getElementById("readingsHistory1"),
    meaning: document.getElementById("readingsMeaning1")
  },
  {
    content: document.getElementById("readingsContent2"),
    number: document.getElementById("readingsNumber2"),
    title: document.getElementById("readingsTitle2"),
    description: document.getElementById("readingsDescription2"),
    history: document.getElementById("readingsHistory2"),
    meaning: document.getElementById("readingsMeaning2")
  }
];

const cardUIs = [
  {
    number: document.getElementById("cardNumber1"),
    title: document.getElementById("cardTitle1"),
    image: document.getElementById("cardImage1")
  },
  {
    number: document.getElementById("cardNumber2"),
    title: document.getElementById("cardTitle2"),
    image: document.getElementById("cardImage2")
  }
];

const synthesisPanel = document.getElementById("synthesisPanel");
const synthesisTitle = document.getElementById("synthesisTitle");
const synthesisText = document.getElementById("synthesisText");
const evidenceGrid = document.getElementById("evidenceGrid");

let remainingDeck = [...deck];
let currentCards = [];

function updateDeckMeta() {
  remainingCount.textContent = String(remainingDeck.length);
  const canDraw = remainingDeck.length >= 2;
  drawBtn.disabled = !canDraw;
  drawBtn.textContent = canDraw ? "Retirar duas cartas" : remainingDeck.length === 0 ? "Baralho vazio" : "Insuficiente para par";
}

function matchCorpusItems(drawnCards) {
  if (!corpusData || corpusData.length === 0) return [];

  const keywords = drawnCards.flatMap(card => archetypeKeywords[card.title] || []);
  
  return corpusData
    .map(item => {
      let score = 0;
      const textToSearch = [
        item.title,
        item.shortDescription,
        item.longDescription,
        ...(item.tags || []),
        ...(item.concepts || [])
      ].join(" ").toLowerCase();

      keywords.forEach(kw => {
        if (textToSearch.includes(kw.toLowerCase())) {
          score += 1;
        }
      });

      return { item, score };
    })
    .filter(res => res.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(res => res.item);
}

function generateSynthesis(card1, card2) {
  // Try both orderings since matrix is triangular
  const synthesis = 
    (DIALECTICAL_MATRIX[card1.title] && DIALECTICAL_MATRIX[card1.title][card2.title]) ||
    (DIALECTICAL_MATRIX[card2.title] && DIALECTICAL_MATRIX[card2.title][card1.title]);

  if (!synthesis) return;

  synthesisTitle.textContent = synthesis.title;
  synthesisText.innerHTML = synthesis.text.split("\n\n").map(p => `<p>${p}</p>`).join("");

  const evidence = matchCorpusItems([card1, card2]);
  evidenceGrid.innerHTML = evidence.map(item => `
    <div class="evidence-item">
      <img src="${item.files?.[0]?.path || ""}" alt="${item.title}" class="evidence-thumb">
      <div class="evidence-meta">
        <span class="evidence-title">${item.title}</span>
        <span class="evidence-desc">${item.shortDescription}</span>
      </div>
    </div>
  `).join("");

  synthesisPanel.classList.remove("hidden");
}


function setCardUI(card, index) {
  const ui = cardUIs[index];
  const reading = readingSlots[index];
  const cardEl = cardEls[index];

  // Set the primary hue from the first card drawn
  if (index === 0) {
    document.documentElement.style.setProperty("--card-hue", card.hue);
  }

  // Update Card Face
  ui.number.textContent = card.number;
  ui.title.textContent = card.title;
  ui.image.src = card.image;
  ui.image.alt = card.title;
  cardEl.setAttribute("aria-label", `Carta de tarô ${index + 1}: ${card.title}`);

  // Update Readings Panel
  reading.number.textContent = `Arcano ${card.number}`;
  reading.title.textContent = card.title;
  reading.description.textContent = card.description;
  reading.history.textContent = card.history;
  reading.meaning.textContent = card.meaning;
}

function drawPair() {
  if (remainingDeck.length < 2) return;

  const drawn = [];
  for (let i = 0; i < 2; i++) {
    const index = Math.floor(Math.random() * remainingDeck.length);
    drawn.push(remainingDeck.splice(index, 1)[0]);
  }

  currentCards = drawn;
  lastDrawn.textContent = drawn.map(c => c.title).join(" & ");
  synthesisPanel.classList.add("hidden");

  // Start with flip reset
  cardEls.forEach(el => el.classList.remove("is-flipped"));
  
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (currentCards !== drawn) return;
      drawn.forEach((card, i) => setCardUI(card, i));
      
      readingsPlaceholder.classList.add("hidden");
      readingSlots.forEach(s => s.content.classList.remove("hidden", "visible"));
      readingsDivider.classList.remove("hidden");

      cardEls.forEach(el => el.classList.add("is-flipped"));
      
      requestAnimationFrame(() => {
        if (currentCards !== drawn) return;
        readingSlots.forEach(s => s.content.classList.add("visible"));
        
        // Show synthesis after animations
        setTimeout(() => {
          if (currentCards !== drawn) return;
          generateSynthesis(drawn[0], drawn[1]);
        }, 1200);
      });
    });
  });

  updateDeckMeta();
}

function reshuffleDeck() {
  remainingDeck = [...deck];
  lastDrawn.textContent = currentCards.length > 0 ? currentCards.map(c => c.title).join(" & ") : "—";
  currentCards = [];
  const resetCards = currentCards;
  synthesisPanel.classList.add("hidden");
  
  cardEls.forEach(el => {
    el.classList.remove("is-flipped");
    el.setAttribute("aria-label", "Verso da carta de tarô");
  });

  // Reset Card Faces
  cardUIs.forEach(ui => {
    ui.number.textContent = "00";
    ui.title.textContent = "Aguardando";
    ui.image.src = "/assets/tarot/card_back.png";
    ui.image.alt = "";
  });

  readingSlots.forEach(s => s.content.classList.remove("visible"));
  
  setTimeout(() => {
    if (currentCards !== resetCards) return;
    readingSlots.forEach(s => s.content.classList.add("hidden"));
    readingsDivider.classList.add("hidden");
    readingsPlaceholder.classList.remove("hidden");
  }, 300);

  updateDeckMeta();
}

drawBtn.addEventListener("click", drawPair);
reshuffleBtn.addEventListener("click", reshuffleDeck);

updateDeckMeta();
