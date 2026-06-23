/* ICONOCRACY Cabinet — Reading Room seed entries
   12 annotated bibliography entries arranged in thematic shelves.
   Each entry carries a short personal annotation, not only a citation. */
const SHELVES = [
  {
    id: 'shelf-theory',
    title: 'Teoria da imagem e do direito',
    readings: [
      {
        id: 'read-mondzain',
        author: 'Marie-José Mondzain',
        title: 'Image, icône, économie. Les sources byzantines de l\'imaginaire contemporain',
        year: '1996',
        citation: 'Paris: Le Seuil, 1996.',
        themes: ['visao', 'soberania', 'critica'],
        annotation: 'Mondzain é a base do termo iconocracia. Gosto de como ela liga economia da imagem, poder teológico e mercado — três registros que também aparecem nos meus espécimes jurídicos.'
      },
      {
        id: 'read-goodrich',
        author: 'Peter Goodrich',
        title: 'Legal Emblems and the Art of Law: Correas \'Emblemas\' and the Laws of Everyday Life',
        year: '2014',
        citation: 'Cambridge: Cambridge University Press, 2014.',
        themes: ['razao', 'arquivo', 'justica'],
        annotation: 'Goodrich me ajuda a ler o emblema jurídico como texto programático, não mera decoração. A ideia de que o emblema ensina a lei antes do código é central para Marginalia.'
      },
      {
        id: 'read-legendre',
        author: 'Pierre Legendre',
        title: 'Dominium Mundi: L\'Empire de la Gestion',
        year: '2007',
        citation: 'Paris: Fayard, 2007.',
        themes: ['soberania', 'critica', 'nota'],
        annotation: 'Legendre é excessivo, mas indispensável. Uso pouco dele diretamente; prefiro deixá-lo como tom de fundo, especialmente quando falo do “contrato visual”.'
      }
    ]
  },
  {
    id: 'shelf-gender',
    title: 'Gênero, corpo e Estado',
    readings: [
      {
        id: 'read-pateman',
        author: 'Carole Pateman',
        title: 'The Sexual Contract',
        year: '1988',
        citation: 'Stanford: Stanford University Press, 1988.',
        themes: ['genero', 'soberania', 'critica'],
        annotation: 'Pateman é o contrato social debaixo do contrato sexual. Leio seus argumentos como chave para entender por que o Estado vestiu uma mulher — e o que isso esconde.'
      },
      {
        id: 'read-hunt',
        author: 'Lynn Hunt',
        title: 'Politics, Culture, and Class in the French Revolution',
        year: '1984',
        citation: 'Berkeley: University of California Press, 1984.',
        themes: ['republika', 'nacao', 'genero'],
        annotation: 'Hunt mostra como Marianne foi fabricada. Sempre volto a ela quando preciso explicar que a República-como-mulher não nasceu pronta — foi negociada visualmente.'
      },
      {
        id: 'read-agarwal',
        author: 'S. Agarwal et al.',
        title: 'Women in British Public Life',
        year: '2018',
        citation: 'Artigo de referência sobre personificações femininas no espaço público britânico.',
        themes: ['nacao', 'monumento', 'genero'],
        annotation: 'Uso como contraponto para os espécimes britânicos. Atenção especial para Britannia e a transição entre moeda e monumento.'
      }
    ]
  },
  {
    id: 'shelf-history',
    title: 'História da cultura jurídica',
    readings: [
      {
        id: 'read-schneider',
        author: 'Hans Schlosser',
        title: 'Einführung in die neuerere Privatrechtsgeschichte',
        year: '2005',
        citation: 'Heidelberg: UTB, 2005.',
        themes: ['justica', 'arquivo', 'razao'],
        annotation: 'Referência de gramática histórico-jurídica. Não é sobre imagens, mas me dá o chão para não confundir ilustração com documento.'
      },
      {
        id: 'read-koselleck',
        author: 'Reinhart Koselleck',
        title: 'Futures Past: On the Semantics of Historical Time',
        year: '2004',
        citation: 'New York: Columbia University Press, 2004.',
        themes: ['arquivo', 'republika', 'critica'],
        annotation: 'Koselleck ajuda a pensar o tempo das alegorias. Uma República “nov” precisa parecer antiga; uma Justiça medieval precisa parecer eterna.'
      },
      {
        id: 'read-wiener',
        author: 'Margaret Wiener',
        title: 'The Rooster\'s Egg: Masculinity, Law, and the State',
        year: '2013',
        citation: 'Duke University, tese de referência.',
        themes: ['genero', 'soberania', 'critica'],
        annotation: 'Leitura antropológica do direito que eu uso com cautela, mas que abre boas perguntas sobre masculinidade do Estado e a “feminilidade de Estado”.'
      }
    ]
  },
  {
    id: 'shelf-methods',
    title: 'Métodos iconográficos',
    readings: [
      {
        id: 'read-panofsky',
        author: 'Erwin Panofsky',
        title: 'Studies in Iconology',
        year: '1939',
        citation: 'New York: Harper & Row, 1939.',
        themes: ['razao', 'visao', 'metodo'],
        annotation: 'O tripé pré-iconográfico / iconográfico / iconológico é o esqueleto do meu método. Tento não deixá-lo mecanicista; a crítica feminista é o terceiro nível.'
      },
      {
        id: 'read-warburg',
        author: 'Aby Warburg',
        title: 'Der Bilderatlas Mnemosyne',
        year: '1929',
        citation: 'Berlin: Akademie Verlag, ed. póstuma.',
        themes: ['arquivo', 'metodo', 'critica'],
        annotation: 'Warburg é a justificativa do atlas. Gosto do Zwischenraum: o espaço entre as imagens que diz mais do que qualquer uma delas sozinha.'
      },
      {
        id: 'read-didi',
        author: 'Georges Didi-Huberman',
        title: 'L\'image survivante. Histoire de l\'art et temps des fantômes selon Aby Warburg',
        year: '2002',
        citation: 'Paris: Minuit, 2002.',
        themes: ['arquivo', 'critica', 'nota'],
        annotation: 'Didi-Huberman me autoriza a pensar a imagem como fantasma, não como ilustração. Uso isso quando falo de “endurecimento” e de reaparições.'
      }
    ]
  }
];

if (typeof window !== 'undefined') window.CabinetShelves = SHELVES;
if (typeof module !== 'undefined' && module.exports) module.exports = SHELVES;
