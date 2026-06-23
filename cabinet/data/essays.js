/* ICONOCRACY Cabinet — Marginalia seed essays */
const ESSAYS = [
  {
    id: 'essay-blind',
    title: 'Justice Was Not Born Blind',
    slug: 'justice-was-not-born-blind',
    date: '2026-06-23',
    status: 'seed',
    themes: ['justica', 'imparcialidade', 'visao'],
    summary: 'A primeira Justitia vendada não nasceu como virtude — nasceu como sátira. A venda só mais tarde virou emblema de imparcialidade.',
    lede: 'A venda que hoje reconhecemos como signo da Justiça moderna começou como piada. No Narrenschiff de Sebastian Brant (1494), a mulher vendada não é a sabedoria: é a tolice, a cegueira voluntária, o juízo que se recusa a ver.',
    sections: [
      {
        heading: 'Da sátira à virtude',
        body: 'Entre o século XV e o XVIII, a faixa sobre os olhos de Justitia migra do riso para a seriedade. O que era ridículo — julgar sem ver — torna-se desejável: julgar sem se deixar ver, isto é, sem se deixar corromper.'
      },
      {
        heading: 'O que a venda esconde',
        body: 'A venda não cobre apenas os olhos. Ela apaga a identidade do juiz, a história do corpo e as relações de poder que atravessam qualquer sala de audiências. A cegueira da justiça é, sobretudo, uma cegueira do espectador.'
      },
      {
        heading: 'Para notar',
        body: 'Nas imagens, a venda raramente é total. Faixa, ameaça, promessa: ela deixa entrever o olhar que finge não ver. Isso é o que a torna um dispositivo iconocrático.'
      }
    ],
    relatedObjects: ['obj-blindfold-001'],
    relatedReadings: ['read-schneider', 'read-goodrich'],
    route: '/marginalia/justice-was-not-born-blind.html',
    lang: 'pt'
  },
  {
    id: 'essay-scale',
    title: 'A Scale Is Never Just a Scale',
    slug: 'a-scale-is-never-just-a-scale',
    date: '2026-06-23',
    status: 'seed',
    themes: ['medicao', 'proporcionalidade', 'razao'],
    summary: 'A balança converte conflito em peso e faz da justiça uma operação mensurável. Mas ela esconde a pergunta essencial: quem calibra o prato?',
    lede: 'A balança é o instrumento retórico da razão jurídica. Com ela, o direito se apresenta como medida, e o julgamento como conta. Só que nem todo peso cabe num prato.',
    sections: [
      {
        heading: 'A metáfora da ponderação',
        body: 'Desde a Antiguidade, a balança traduz o justo como equilíbrio. A metáfora sobrevive ao direito romano, penetra a emblemática medieval e reaparece em selos, frontispícios e fachadas de tribunais.'
      },
      {
        heading: 'Calibração política',
        body: 'O que entra no prato, e em que proporção, é decisão política disfarçada de operação técnica. A balança dá a impressão de neutralidade justamente porque oculta a mão que coloca os pesos.'
      },
      {
        heading: 'Para notar',
        body: 'Quando a balança pende, ela não falha: ela revela. A inclinação mostra quem o aparelho considera mais pesado.'
      }
    ],
    relatedObjects: ['obj-scale-001'],
    relatedReadings: ['read-legendre', 'read-resnik'],
    route: '/marginalia/a-scale-is-never-just-a-scale.html',
    lang: 'pt'
  },
  {
    id: 'essay-facade',
    title: 'The Woman on the Courthouse Façade',
    slug: 'the-woman-on-the-courthouse-facade',
    date: '2026-06-23',
    status: 'seed',
    themes: ['monumento', 'republika', 'genero', 'soberania'],
    summary: 'A mulher na fachada do fórum não é decoração. Ela é o rosto público da lei, esculpido para fazer o Estado ser visto como autoridade.',
    lede: 'De Brasília a Bruxelas, de Paris a Washington, a fachada do tribunal exibe uma mulher. Nua ou drapeda, vendada ou de olhos abertos, armada ou serena, ela convida o cidadão a confiar na lei antes de ler uma única sentença.',
    sections: [
      {
        heading: 'Arquitetura como argumento',
        body: 'A alegoria não fica apenas no livro ou na moeda. Ela escala para o tamanho do edifício. A fachada transforma a mulher-Estado em pedra, tornando-a aparentemente eterna.'
      },
      {
        heading: 'Quem governa fora do quadro',
        body: 'A figura feminina ocupa o centro da composição, mas o poder real está ausente. A alegoria permite que juízes, presidentes e parlamentos governem sob um rosto que ninguém elegeu.'
      },
      {
        heading: 'Para notar',
        body: 'A postura da figura — sentada ou de pé, armada ou em repouso — é uma declaração de regime. O material — mármore, bronze, granito — é uma declaração de duração.'
      }
    ],
    relatedObjects: ['obj-crown-001', 'obj-sword-001'],
    relatedReadings: ['read-wahrman', 'read-aguilar'],
    route: '/marginalia/the-woman-on-the-courthouse-facade.html',
    lang: 'pt'
  }
];

if (typeof window !== 'undefined') window.CabinetEssays = ESSAYS;
if (typeof module !== 'undefined' && module.exports) module.exports = ESSAYS;
