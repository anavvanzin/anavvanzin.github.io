/* ICONOCRACY Cabinet — the six symbolic entry points */
const SYMBOLS = [
  {
    id: 'blindfold',
    title: 'A Venda',
    label: 'Ver / Não ver',
    summary: 'A venda transforma o olhar em protocolo. Ela não apaga a visão: a substitui por uma ideia de imparcialidade que o corpo da mulher é chamado a encarnar.',
    themes: ['justica', 'imparcialidade', 'genero', 'visao'],
    visualAttributes: ['pano', 'olhos', 'rosto'],
    legalFunction: 'Sinal de equidistância entre as partes; posteriormente convertida em emblema da Justiça moderna.',
    whatToNotice: 'A venda raramente cobre completamente os olhos. Na maioria das imagens, ela é faixa, ameaça de cegueira ou promessa.',
    color: '#8A5FA8',
    route: '/iconocracy/justice-was-not-always-blind.html',
    icon: 'blindfold'
  },
  {
    id: 'scale',
    title: 'A Balança',
    label: 'Medição / Julgamento',
    summary: 'A balança converte conflito em peso. É o instrumento que faz da justiça uma operação mensurável — e que esconde a pergunta sobre quem calibra o prato.',
    themes: ['medicao', 'proporcionalidade', 'razao'],
    visualAttributes: ['bracos', 'pratos', 'equilibrio'],
    legalFunction: 'Medir direito, dever e pena; metonímia do julgamento como operação racional.',
    whatToNotice: 'A balança nem sempre está nivelada. Quando pende, revela quem o aparelho considera mais pesado.',
    color: '#B8924A',
    route: '/marginalia/a-scale-is-never-just-a-scale.html',
    icon: 'scale'
  },
  {
    id: 'sword',
    title: 'A Espada',
    label: 'Violência / Punição',
    summary: 'A espada é a parte da alegoria que o Estado não consegue disfarçar. Ela lembra que por trás de toda sentença há uma força que pode ferir.',
    themes: ['violencia', 'punicao', 'soberania'],
    visualAttributes: ['gume', 'empunhadura', 'fio'],
    legalFunction: 'Executar a sentença; monopolizar a violência legítima.',
    whatToNotice: 'Espada erguida ameaça; espada baixa governa. A inclinação é uma declaração de regime.',
    color: '#A8281F',
    route: '/marginalia/',
    icon: 'sword'
  },
  {
    id: 'crown',
    title: 'Coroa ou Louro',
    label: 'Nação / República',
    summary: 'Coroas, diademas e ramos de louro transferem para o corpo feminino a autoridade que o Estado não possui por si só: a de ser visto como soberano.',
    themes: ['nacao', 'republika', 'soberania'],
    visualAttributes: ['coroa', 'louro', 'barrete'],
    legalFunction: 'Sinalizar titularidade do poder; distinguir monarquia, república e império.',
    whatToNotice: 'A coroa repousa sobre a cabeça de uma mulher. Quem governa fica fora do quadro.',
    color: '#2A7A5A',
    route: '/marginalia/the-woman-on-the-courthouse-facade.html',
    icon: 'crown'
  },
  {
    id: 'folio',
    title: 'Página de Folio',
    label: 'Tese / ICONOCRACY',
    summary: 'O folio do jurista é superfície de trabalho e de memória. Sobre ele, alegoria e norma se escrevem uma sobre a outra.',
    themes: ['tese', 'arquivo', 'documento'],
    visualAttributes: ['papel', 'letra', 'margem'],
    legalFunction: 'Arquivar, transmitir e autorizar o saber jurídico.',
    whatToNotice: 'A folha em branco não é neutra. Ela espera uma mão, uma caneta, uma ordem.',
    color: '#1D2548',
    route: '/atlas/',
    icon: 'folio'
  },
  {
    id: 'rubric',
    title: 'Nota Rubrica',
    label: 'Marginalia',
    summary: 'A rubrica é a cor da intervenção: o comentário pessoal, a correção, a objeção. No Cabinet, ela nomeia o espaço dos ensaios curtos.',
    themes: ['marginalia', 'nota', 'critica'],
    visualAttributes: ['vermelho', 'linha', 'anotacao'],
    legalFunction: 'Registrar leitura particular, discordância ou lembrete dentro do arquivo público.',
    whatToNotice: 'Uma nota rubrica nunca é a última palavra. Ela marca o lugar de onde outra leitura pode começar.',
    color: '#A04030',
    route: '/marginalia/',
    icon: 'rubric'
  }
];

if (typeof window !== 'undefined') window.CabinetSymbols = SYMBOLS;
if (typeof module !== 'undefined' && module.exports) module.exports = SYMBOLS;
