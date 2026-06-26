// Atlas Lab — front-end data (ported from uploads/atlas_lab/data, ES exports stripped).
// Canonical sources remain in the repo; this is the demonstrative UI seed.
/*
 * Atlas Lab v1 shared front-end constants.
 *
 * Demonstrative UI seed/config only.
 * This file does not replace canonical corpus sources:
 * - data/corpus.json
 *
 * Intended use: Atlas Lab v1 shell and upcoming front-end extraction work.
 */

const ATLAS_LAB_PLATFORM = {
  id: 'atlas-lab',
  name: 'Atlas Lab',
  version: 'v1',
  status: 'demonstrative-ui-seed',
  mission:
    'Atlas Lab is the umbrella research platform for guided visual inquiry. In v1, it frames ICONOCRACY as a demonstrative module for observing, comparing, and interpreting legal-political allegories without treating UI seed data as canonical corpus truth.',
  uiNote:
    'Observe first. Compare before concluding. AI responds after user input and supports reflection rather than authority.',
  canonicalDataNotice:
    'Canonical repository data remains in data/corpus.json. The constants here exist only to support the first front-end proof of concept.',
  featuredModuleId: 'iconocracy',
};

const ATLAS_LAB_MODULES = {
  iconocracy: {
    id: 'iconocracy',
    shortName: 'ICONOCRACY',
    displayName: 'ICONOCRACY',
    subtitle: 'Contrato Sexual Visual na iconocracia jurídica ocidental',
    description:
      'Flagship Atlas Lab module for comparative study of female allegory, legal iconography, regime legibility, and iconeometric interpretation.',
    status: 'featured-v1-module',
    surfaceModel: '5-panel-demonstrative-atlas',
    provenance:
      'Derived from the existing public atlas surface and extracted for shared front-end reuse.',
  },
};

const ATLAS_LAB_MODES = {
  learning: {
    id: 'learning',
    label: 'Learning Mode',
    shortLabel: 'Learn',
    audience: 'first-pass visitors, students, and guided readers',
    intent:
      'Introduce the visual grammar of the module through curated examples, panel prompts, and legible comparison paths.',
    defaultPanelIds: ['P1', 'P2'],
    promptStyle: 'guided-observation',
  },
  research: {
    id: 'research',
    label: 'Research Mode',
    shortLabel: 'Research',
    audience: 'researchers and advanced comparative users',
    intent:
      'Support deeper comparative reading with iconeometric indicators, regime framing, and panel-led analytical navigation.',
    defaultPanelIds: ['P2', 'P1', 'P3'],
    promptStyle: 'comparative-analysis',
  },
};

const ICONOCRACY_REGIMES = {
  '1': {
    id: '1',
    roman: 'I',
    slug: 'fundacional-sacrificial',
    label: 'Fundacional-Sacrificial',
    shortLabel: 'I·FUNDACIONAL',
    colors: {
      bg: '#3d1f28',
      text: '#e8a0a8',
      border: '#7a3040',
      stroke: '#e8a0a8',
      fill: 'rgba(232,160,168,0.25)',
    },
  },
  '2': {
    id: '2',
    roman: 'II',
    slug: 'normativo-juridico',
    label: 'Normativo-Jurídico',
    shortLabel: 'II·NORMATIVO',
    colors: {
      bg: '#1f2d3d',
      text: '#90b8e8',
      border: '#305878',
      stroke: '#90b8e8',
      fill: 'rgba(144,184,232,0.25)',
    },
  },
  '3': {
    id: '3',
    roman: 'III',
    slug: 'militar-imperial',
    label: 'Militar-Imperial',
    shortLabel: 'III·MILITAR',
    colors: {
      bg: '#252535',
      text: '#b8b8d8',
      border: '#484868',
      stroke: '#b8b8d8',
      fill: 'rgba(184,184,216,0.25)',
    },
  },
};

const ICONOCRACY_INDICATORS = [
  { id: 'FEI', label: 'Exposição da Carne', description: 'Flesh Exposure Index' },
  { id: 'CII', label: 'Idealização Clássica', description: 'Classical Idealisation' },
  { id: 'PRI', label: 'Rigidez Postural', description: 'Postural Rigidity' },
  { id: 'SMI', label: 'Materialidade Estatuária', description: 'Statuary Material' },
  { id: 'SMS', label: 'Serenidade/Militância', description: 'Serenity/Militancy' },
  { id: 'AMCP', label: 'Presença de Armadura', description: 'Armor / Military Clothing' },
  { id: 'MVI', label: 'Visibilidade Maternal', description: 'Maternal Visibility' },
  { id: 'WI', label: 'Índice de Armamento', description: 'Weapon Index' },
  { id: 'RI', label: 'Racialização', description: 'Racialisation Index' },
  { id: 'AI', label: 'Atemporalidade', description: 'Agelessness Index' },
];

const ICONOCRACY_PANEL_FOCUS_AREAS = {
  regime: {
    id: 'regime',
    label: 'Regime iconocrático',
    description: 'Panel structured primarily by regime framing.',
  },
  indicator: {
    id: 'indicator',
    label: 'Indicador',
    description: 'Panel structured primarily around one iconeometric indicator.',
  },
  theme: {
    id: 'theme',
    label: 'Tema',
    description: 'Panel structured around a thematic recurrence rather than a single regime or indicator.',
  },
};

const ICONOCRACY_PANELS_V1 = [
  {
    id: 'P1',
    order: 1,
    slug: 'maes-fundacionais',
    label: 'Mães Fundacionais',
    panelType: 'regime-surface',
    focusArea: { type: 'regime', value: '1' },
    regime: '1',
    role: 'origin-myth and sacrificial maternity surface',
    summary:
      'Introduces the founding maternal-allegorical surface and frames how polity legitimates itself through feminised origin imagery.',
    modes: ['learning', 'research'],
    sampleEntryIds: ['FR-003', 'US-001'],
  },
  {
    id: 'P2',
    order: 2,
    slug: 'calcificacao-da-justitia',
    label: 'Calcificação da Justitia',
    panelType: 'regime-surface',
    focusArea: { type: 'regime', value: '2' },
    regime: '2',
    role: 'juridical stabilization and statue-like authority',
    summary:
      'Highlights the transition from mobile allegory toward rigid legal embodiment, especially in justice iconography.',
    modes: ['learning', 'research'],
    sampleEntryIds: ['BR-006', 'UK-003'],
  },
  {
    id: 'P3',
    order: 3,
    slug: 'enrijecimento-tegumentar',
    label: 'Enrijecimento Tegumentar',
    panelType: 'regime-surface',
    focusArea: { type: 'regime', value: '3' },
    regime: '3',
    role: 'militarisation of the female allegorical body',
    summary:
      'Focuses on hardening, protection, and mobilization of the feminine figure under militarised or imperial visual regimes.',
    modes: ['research'],
    sampleEntryIds: ['FR-001', 'US-001'],
  },
  {
    id: 'P4',
    order: 4,
    slug: 'hegemonia-marmorea',
    label: 'Hegemonia Marmórea',
    panelType: 'indicator-surface',
    focusArea: { type: 'indicator', value: 'RI' },
    regime: null,
    focusIndicator: 'RI',
    role: 'stone authority, whitening, and monumental normativity',
    summary:
      'Tracks how monumentality, material permanence, and racialised normativity converge in the public staging of authority.',
    modes: ['research'],
    sampleEntryIds: ['BR-002', 'BR-006'],
  },
  {
    id: 'P5',
    order: 5,
    slug: 'ubiquidade-intima',
    label: 'Ubiquidade Íntima',
    panelType: 'theme-surface',
    focusArea: { type: 'theme', value: 'micro-iconocracia' },
    regime: null,
    thematicFocus: 'micro-iconocracia',
    role: 'diffuse recurrence of the allegorical form across everyday surfaces',
    summary:
      'Makes room for recurrent, portable, and less monumental forms that still reproduce the iconocratic script.',
    modes: ['learning', 'research'],
    sampleEntryIds: ['BR-001', 'BR-005'],
  },
];

const ATLAS_LAB_V1_CONFIG = {
  platform: ATLAS_LAB_PLATFORM,
  modules: ATLAS_LAB_MODULES,
  modes: ATLAS_LAB_MODES,
  contracts: {
    demoDataStatus: 'demonstrative-ui-seed',
    canonicalDataSources: ['data/corpus.json'],
    entryProvenanceField: 'canonicalSource',
    note:
      'Use these exports for the first Atlas Lab shell only. Any future hydration against canonical corpus data should resolve via canonicalSource.',
  },
  iconocracy: {
    regimes: ICONOCRACY_REGIMES,
    indicators: ICONOCRACY_INDICATORS,
    panelFocusAreas: ICONOCRACY_PANEL_FOCUS_AREAS,
    panels: ICONOCRACY_PANELS_V1,
  },
};

var ATLAS_LAB_DEFAULT_CFG = ATLAS_LAB_V1_CONFIG;

/*
 * ICONOCRACY Atlas Lab v1 demonstrative UI seed data.
 *
 * This file is intentionally small and front-end oriented.
 * It is not canonical corpus storage and must not be treated as a repository source of truth.
 * Canonical data remains in:
 * - data/corpus.json
 *
 * Contract for Task 3 shell work:
 * - each entry may expose canonicalSource to indicate how it should later hydrate
 *   against canonical corpus data
 * - comparison pairs and panel role maps are demonstrative front-end helpers only
 */

const ICONOCRACY_DEMO_ENTRIES = (window.IconocracyCorpus || []).map((record, index) => ({
  id: record.id,
  canonicalSource: { type: 'generated-corpus', path: 'data/corpus.json', key: record.id },
  title: record.title,
  date: String(record.year ?? ''),
  country: record.country,
  medium: record.support,
  archive: record.credit,
  regime: record.regime,
  img: record.img,
  panelIds: index < 6 ? ['P1'] : index < 24 ? ['P2'] : ['P3'],
  note: record.shortDescription,
  indicators: { FEI: 1, CII: 2, PRI: 2, SMI: 1, SMS: 1, AMCP: 1, MVI: 1, WI: 1, RI: 1, AI: 2 },
}));

const ICONOCRACY_DEMO_COMPARISON_PAIRS = [
  {
    id: 'foundational-vs-juridical',
    label: 'Foundational allegory vs juridical rigidity',
    leftEntryId: 'FR-003',
    rightEntryId: 'BR-006',
    panelIds: ['P1', 'P2'],
    modeIds: ['learning', 'research'],
    guidingQuestion:
      'How does insurgent allegorical movement become stabilized as judicial authority?',
  },
  {
    id: 'monument-vs-militant',
    label: 'Monumental republic vs militant mobilisation',
    leftEntryId: 'BR-002',
    rightEntryId: 'FR-001',
    panelIds: ['P3', 'P4'],
    modeIds: ['research'],
    guidingQuestion:
      'What changes when the female figure shifts from stone permanence to wartime mobilisation?',
  },
  {
    id: 'domestic-recurrence-vs-state-ideal',
    label: 'Diffuse recurrence vs state idealisation',
    leftEntryId: 'BR-001',
    rightEntryId: 'BR-005',
    panelIds: ['P5', 'P2'],
    modeIds: ['learning'],
    guidingQuestion:
      'How do intimate or everyday surfaces reinforce broader state iconographic scripts?',
  },
];

const ICONOCRACY_PANEL_ROLE_MAP = {
  P1: {
    heroEntryId: 'FR-003',
    comparisonEntryIds: ['US-001', 'BR-002'],
    teachingUse: 'Introduce foundational-sacrificial rhetoric through high-recognition images.',
  },
  P2: {
    heroEntryId: 'BR-006',
    comparisonEntryIds: ['UK-003', 'BR-005'],
    teachingUse: 'Show juridical authority through rigid posture, statuary form, and legal symbolism.',
  },
  P3: {
    heroEntryId: 'FR-001',
    comparisonEntryIds: ['US-001'],
    teachingUse: 'Expose militarisation and mobilisation as a differentiated visual regime.',
  },
  P4: {
    heroEntryId: 'BR-002',
    comparisonEntryIds: ['BR-006'],
    teachingUse: 'Discuss monumentality, whitened authority, and public normativity.',
  },
  P5: {
    heroEntryId: 'BR-001',
    comparisonEntryIds: ['BR-005'],
    teachingUse: 'Surface recurring allegorical scripts outside exclusively monumental settings.',
  },
};

const ICONOCRACY_DEMO_DATASET = {
  datasetId: 'atlas-lab-iconocracy-demo-v1',
  type: 'demonstrative-ui-seed',
  entryCount: ICONOCRACY_DEMO_ENTRIES.length,
  entries: ICONOCRACY_DEMO_ENTRIES,
  comparisonPairs: ICONOCRACY_DEMO_COMPARISON_PAIRS,
  panelRoleMap: ICONOCRACY_PANEL_ROLE_MAP,
};

var ATLAS_LAB_DEFAULT_SEED = ICONOCRACY_DEMO_DATASET;


window.ATLAS_LAB = {
  platform: ATLAS_LAB_PLATFORM,
  modules: ATLAS_LAB_MODULES,
  modes: ATLAS_LAB_MODES,
  regimes: ICONOCRACY_REGIMES,
  indicators: ICONOCRACY_INDICATORS,
  panelFocusAreas: ICONOCRACY_PANEL_FOCUS_AREAS,
  panels: ICONOCRACY_PANELS_V1,
  entries: ICONOCRACY_DEMO_ENTRIES,
  pairs: ICONOCRACY_DEMO_COMPARISON_PAIRS,
  roleMap: ICONOCRACY_PANEL_ROLE_MAP,
  byId: Object.fromEntries(ICONOCRACY_DEMO_ENTRIES.map(e => [e.id, e])),
};
