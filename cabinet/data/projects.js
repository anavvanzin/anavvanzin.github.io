/* ICONOCRACY Cabinet — projects / practice seed entries */
const PROJECTS = [
  {
    id: 'proj-ius',
    title: 'Ius Gentium · Grupo de pesquisa',
    slug: 'ius-gentium',
    status: 'seed',
    role: 'Integrante · Linha de pesquisa em iconografia e iconologia do direito',
    institution: 'PPGD/UFSC',
    year: '2022–',
    summary: 'Grupo de pesquisa em história da cultura jurídica, com encontros quinzenais abertos a graduação e pós-graduação.',
    link: 'http://dgp.cnpq.br/dgp/espelhogrupo/0180852402050845',
    themes: ['arquivo', 'tese', 'critica']
  },
  {
    id: 'proj-talks',
    title: 'Comunicações e traduções',
    slug: 'comunicacoes',
    status: 'seed',
    role: 'Pesquisadora e tradutora',
    institution: 'UFSC / ENHD',
    year: '2024–',
    summary: 'Comunicações em história do direito e traduções de textos de cultura jurídica italiana.',
    link: null,
    themes: ['nota', 'critica', 'arquivo']
  },
  {
    id: 'proj-workshops',
    title: 'Oficinas de leitura iconográfica',
    slug: 'oficinas',
    status: 'seed',
    role: 'Coordenação ocasional',
    institution: 'PPGD/UFSC',
    year: '2025–',
    summary: 'Oficinas práticas sobre como ler imagens jurídicas como documentos — balança, venda, espada e corpo alegórico.',
    link: null,
    themes: ['visao', 'metodo', 'justica']
  }
];

if (typeof window !== 'undefined') window.CabinetProjects = PROJECTS;
if (typeof module !== 'undefined' && module.exports) module.exports = PROJECTS;
