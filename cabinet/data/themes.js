/* ICONOCRACY Cabinet — controlled vocabulary of themes */
const THEMES = [
  { id: 'justica',        label: 'Justiça',        description: 'Alegorias, emblemas e rituais do julgamento.' },
  { id: 'imparcialidade', label: 'Imparcialidade', description: 'Venda, equidistância e os limites da visão neutra.' },
  { id: 'genero',         label: 'Gênero',         description: 'O corpo feminino como tecnologia visual do Estado.' },
  { id: 'visao',          label: 'Visão',          description: 'Ver, não ver, ser visto e o controle do olhar.' },
  { id: 'medicao',        label: 'Medição',        description: 'Balança, ponderação e a retórica da quantificação.' },
  { id: 'proporcionalidade', label: 'Proporcionalidade', description: 'Penas, direitos e a lógica do peso correto.' },
  { id: 'razao',          label: 'Razão',          description: 'Alegoria, emblema e a racionalidade jurídica.' },
  { id: 'violencia',      label: 'Violência',      description: 'Força legítima, punição e monopolio da espada.' },
  { id: 'punicao',        label: 'Punição',        description: 'Execução da sentença e o espetáculo da pena.' },
  { id: 'soberania',      label: 'Soberania',      description: 'Onde o poder se torna imagem de si mesmo.' },
  { id: 'nacao',          label: 'Nação',          description: 'Corpo feminino como território simbólico.' },
  { id: 'republika',      label: 'República',      description: 'Marianne, Columbia e as irmãs fundadoras.' },
  { id: 'tese',           label: 'Tese',           description: 'Escrita, arquivo e o argumento iconocrático.' },
  { id: 'arquivo',        label: 'Arquivo',        description: 'Documentos, fontes e a memória jurídica.' },
  { id: 'documento',      label: 'Documento',      description: 'Folios, selos, moedas e suportes da norma.' },
  { id: 'marginalia',     label: 'Marginalia',     description: 'Notas, ensaios curtos e leituras de borda.' },
  { id: 'nota',           label: 'Nota',           description: 'Anotação pessoal e crítica de arquivo.' },
  { id: 'critica',        label: 'Crítica',        description: 'Intervenção, contra-alegoria e fissuras.' },
  { id: 'monumento',      label: 'Monumento',      description: 'Pedra, bronze e a alegoria como edifício.' },
  { id: 'moeda',          label: 'Moeda',          description: 'Cunho, circulação e a soberania portátil.' }
];

if (typeof window !== 'undefined') window.CabinetThemes = THEMES;
if (typeof module !== 'undefined' && module.exports) module.exports = THEMES;
