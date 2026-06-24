/* ICONOCRACY Cabinet — seed publications */
const PUBLICATIONS = [
  {
    id: 'pub-vrouwe',
    title: 'Vrouwe Justitia não é uma mulher',
    slug: 'vrouwe-justitia-nao-e-uma-mulher',
    year: '2024',
    venue: 'Revista de História do Direito e Cultura Jurídica (submetido)',
    status: 'seed',
    themes: ['justica', 'genero', 'imparcialidade'],
    summary: 'A personificação feminina da Justiça não é uma representação ingênua do gênero. Ela é uma tecnologia visual que torna o direito simultaneamente humano, superior e controlável.',
    abstract: 'O artigo percorre a trajetória de Vrouwe Justitia nos Países Baixos e na Europa setentrional para mostrar que o corpo feminino da Justiça resolve um problema político: como fazer a lei parecer próxima o suficiente para ser obedecida e distante o suficiente para ser temida. A venda, a balança e a espada são lidas não como atributos neutros, mas como operações de gênero que produzem a figura de uma autoridade sem subjetividade própria.',
    lang: 'pt',
    route: '/publications/vrouwe-justitia-nao-e-uma-mulher.html'
  },
  {
    id: 'pub-maria',
    title: 'Maria, Marianne e a República',
    slug: 'maria-marianne-e-a-republica',
    year: '2023',
    venue: 'XIX Encontro de História do Direito · UFSC',
    status: 'seed',
    themes: ['republika', 'nacao', 'genero'],
    summary: 'De Maria à Marianne, de Nossa Senhora à República: a mulher-Estado herda gestos devocionais e os converte em gestos cívicos.',
    abstract: 'Comparação entre a iconografia mariana e a iconografia republicana na França e no Brasil do século XIX. Argumenta-se que a República-como-mulher não substitui a Virgem: ela a traduz. O manto, a auréola e a posição central da figura feminina são dispositivos devocionais reciclados para produzir uma identificação afetiva com o novo regime. O artigo analisa ainda como o corpo feminino da nação exclui, por sua própria forma, certos corpos da cidadania plena.',
    lang: 'pt',
    route: '/publications/maria-marianne-e-a-republica.html'
  },
  {
    id: 'pub-contrato',
    title: 'O contrato visual',
    slug: 'o-contrato-visual',
    year: '2025',
    venue: 'Em preparação',
    status: 'seed',
    themes: ['soberania', 'genero', 'critica'],
    summary: 'Todo contrato social tem uma contrapartida iconográfica: o corpo feminino que o Estado veste para ser visto.',
    abstract: 'Artigo em preparação sobre o que a autora propõe chamar de “contrato visual”: a troca pela qual o Estado oferece uma imagem feminina da soberania em permuta pela obediência dos cidadãos. Recuperando o contrato sexual de Carole Pateman e a iconocracia de Marie-José Mondzain, o texto mostra que a escolha por uma alegoria feminina não é estética, mas constitutiva do próprio pacto político.',
    lang: 'pt',
    route: '/publications/o-contrato-visual.html'
  }
];

if (typeof window !== 'undefined') window.CabinetPublications = PUBLICATIONS;
if (typeof module !== 'undefined' && module.exports) module.exports = PUBLICATIONS;
