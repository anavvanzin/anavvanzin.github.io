import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import rawData from './exhibition.json'
import { CONTOURS, ParagraphCache, flowText, type Obstacle } from './engine'
import type { ExhibitionData, ExhibitionItem, Lang, Localized } from './types'

const data = rawData as ExhibitionData
const base = import.meta.env.BASE_URL
const asset = (path: string) => `${base}${path}`
const t = (value: Localized, lang: Lang) => value[lang]

const copy = {
  pt: {
    atlas: 'atlas · exposição temática',
    title: 'A Nação como Mulher',
    deck: 'Nove estudos sobre corpos femininos convocados para tornar território, República e soberania visíveis.',
    note: 'As pranchas são estudos interpretativos gerados por IA a partir de objetos históricos identificados. Não são reproduções nem evidência do corpus.',
    read: 'Leitura', explore: 'Explorar', all: 'Todos', compare: 'Comparar', source: 'Fonte e direitos',
    observed: 'Descrição visível', context: 'Contexto histórico-jurídico', interpretation: 'Hipótese interpretativa',
    study: 'estudo interpretativo gerado por IA', original: 'Ver estudo integral', figure: 'Ver figura recortada',
    select: 'Selecionar para comparação', selected: 'Selecionado', clear: 'Limpar comparação', reset: 'Repor figura',
    instructions: 'Arraste a figura. Use as setas para mover, + e − para dimensionar e Enter para alternar a prancha.',
    canonical: 'corpus canônico em expansão', survey: 'levantamento comparativo datado',
    scopeCanonical: 'objeto relacionado ao corpus canônico', scopeAntecedent: 'antecedente genealógico comparativo',
    comparison: 'Leitura comparativa', emptyComparison: 'Escolha dois objetos para compará-los lado a lado.',
    corpusNote: 'As duas contagens pertencem a universos documentais diferentes e não devem ser somadas.',
    back: 'voltar ao Atlas', rights: 'Direitos', record: 'Registro', reviewed: 'revisado em',
  },
  en: {
    atlas: 'atlas · thematic exhibition',
    title: 'The Nation as a Woman',
    deck: 'Nine studies of female bodies summoned to make territory, the Republic and sovereignty visible.',
    note: 'The plates are AI-generated interpretive studies based on identified historical objects. They are neither reproductions nor corpus evidence.',
    read: 'Reading', explore: 'Explore', all: 'All', compare: 'Compare', source: 'Source and rights',
    observed: 'Visible description', context: 'Legal-historical context', interpretation: 'Interpretive hypothesis',
    study: 'AI-generated interpretive study', original: 'View full study', figure: 'View cut-out figure',
    select: 'Select for comparison', selected: 'Selected', clear: 'Clear comparison', reset: 'Reset figure',
    instructions: 'Drag the figure. Use arrow keys to move, + and − to resize, and Enter to switch the plate.',
    canonical: 'expanding canonical corpus', survey: 'dated comparative survey',
    scopeCanonical: 'object related to the canonical corpus', scopeAntecedent: 'comparative genealogical antecedent',
    comparison: 'Comparative reading', emptyComparison: 'Choose two objects to compare them side by side.',
    corpusNote: 'The two counts describe different documentary universes and must not be added together.',
    back: 'back to the Atlas', rights: 'Rights', record: 'Record', reviewed: 'reviewed on',
  },
} as const

const themeLabels: Record<string, Localized> = {
  genealogia: { pt: 'genealogia', en: 'genealogy' }, cartografia: { pt: 'cartografia', en: 'cartography' },
  soberania: { pt: 'soberania', en: 'sovereignty' }, moeda: { pt: 'moeda', en: 'coin' },
  fundacional: { pt: 'fundacional', en: 'foundational' }, circulação: { pt: 'circulação', en: 'circulation' },
  normativo: { pt: 'normativo', en: 'normative' }, império: { pt: 'império', en: 'empire' },
  cartaz: { pt: 'cartaz', en: 'poster' }, guerra: { pt: 'guerra', en: 'war' },
  mobilização: { pt: 'mobilização', en: 'mobilisation' }, pintura: { pt: 'pintura', en: 'painting' },
  república: { pt: 'república', en: 'republic' }, imprensa: { pt: 'imprensa', en: 'press' },
}

function initialLang(): Lang {
  try { return localStorage.getItem('av_lang') === 'en' ? 'en' : 'pt' } catch { return 'pt' }
}

function useLanguage() {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try { localStorage.setItem('av_lang', next) } catch { /* progressive enhancement */ }
    window.dispatchEvent(new CustomEvent('av:lang', { detail: { lang: next } }))
  }, [])
  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    const onExternalLanguage = (event: Event) => {
      const next = (event as CustomEvent<{ lang?: Lang }>).detail?.lang
      if (next === 'pt' || next === 'en') setLangState(next)
    }
    window.addEventListener('av:lang', onExternalLanguage)
    return () => window.removeEventListener('av:lang', onExternalLanguage)
  }, [lang])
  return { lang, setLang }
}

function figureId(item: ExhibitionItem) {
  return item.images.figure.replace(/^plates\//, '').replace(/-cut\.webp$/, '')
}

function SourcePanel({ item, lang }: { item: ExhibitionItem; lang: Lang }) {
  const c = copy[lang]
  return (
    <details className="source-panel">
      <summary>{c.source}</summary>
      <div className="source-grid">
        <p><span>{c.record}</span><b>{item.atlasId}</b></p>
        <p><span>{c.rights}</span>{t(item.source.rights, lang)}</p>
        <p className="citation">{t(item.source.citation, lang)}</p>
        <a href={item.source.url} target="_blank" rel="noreferrer">{item.source.institution} ↗</a>
        <small>{c.reviewed} {item.review.reviewedAt}</small>
      </div>
    </details>
  )
}

function ReadingCard({ item, index, lang, selected, onCompare }: {
  item: ExhibitionItem; index: number; lang: Lang; selected: boolean; onCompare: () => void
}) {
  const c = copy[lang]
  return (
    <article className="object-card" id={item.id}>
      <div className="folio">{String(index + 1).padStart(2, '0')}</div>
      <div className="object-visual">
        <span className="derivative-label">{c.study}</span>
        <img src={asset(item.images.plate)} alt={t(item.images.alt, lang)} loading={index > 1 ? 'lazy' : 'eager'} />
      </div>
      <div className="object-copy">
        <div className="eyebrow">{t(item.territory, lang)} · {item.date} · {t(item.medium, lang)}</div>
        <h2>{t(item.title, lang)}</h2>
        <p className="object-subtitle">{t(item.subtitle, lang)}</p>
        <div className="scope-badge">{item.scope === 'canonical' ? c.scopeCanonical : c.scopeAntecedent}</div>
        <dl className="reading-layers">
          <div><dt>{c.observed}</dt><dd>{t(item.observed, lang)}</dd></div>
          <div><dt>{c.context}</dt><dd>{t(item.context, lang)}</dd></div>
          <div><dt>{c.interpretation}</dt><dd>{t(item.interpretation, lang)}</dd></div>
        </dl>
        <div className="card-actions">
          <button type="button" className={selected ? 'compare-button selected' : 'compare-button'} onClick={onCompare}>
            {selected ? `✓ ${c.selected}` : `＋ ${c.select}`}
          </button>
          <a href={item.source.url} target="_blank" rel="noreferrer">{item.source.institution} ↗</a>
        </div>
        <SourcePanel item={item} lang={lang} />
      </div>
    </article>
  )
}

function ExploreStage({ item, lang }: { item: ExhibitionItem; lang: Lang }) {
  const c = copy[lang]
  const stageRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ pointerId: number; offsetX: number; offsetY: number } | null>(null)
  const cache = useMemo(() => new ParagraphCache(), [])
  const id = figureId(item)
  const contour = CONTOURS[id]
  const [width, setWidth] = useState(900)
  const initialWidth = Math.min(290, width * 0.36)
  const initial = useMemo<Obstacle>(() => ({
    id, x: Math.max(10, width - initialWidth - 28), y: 72, w: initialWidth,
    h: contour.h * (initialWidth / contour.w),
  }), [contour.h, contour.w, id, initialWidth, width])
  const [obstacle, setObstacle] = useState<Obstacle>(initial)
  const [showPlate, setShowPlate] = useState(false)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])
  useEffect(() => setObstacle(initial), [initial])

  const blocks = useMemo(() => [
    { text: t(item.title, lang), font: '600 32px Georgia', lineHeight: 40, heading: true, gapAfter: 18 },
    { text: t(item.observed, lang), font: '18px Georgia', lineHeight: 30, gapAfter: 16 },
    { text: t(item.context, lang), font: '18px Georgia', lineHeight: 30, gapAfter: 16 },
    { text: t(item.interpretation, lang), font: '18px Georgia', lineHeight: 30, gapAfter: 0 },
  ], [item, lang])
  const layout = useMemo(() => flowText(width, blocks, obstacle, cache), [blocks, cache, obstacle, width])
  const height = Math.max(layout.height + 40, obstacle.y + obstacle.h + 84, 560)

  const clamp = useCallback((next: Obstacle): Obstacle => ({
    ...next,
    x: Math.min(Math.max(0, next.x), Math.max(0, width - next.w)),
    y: Math.min(Math.max(0, next.y), Math.max(0, height - next.h - 42)),
  }), [height, width])

  const resize = (delta: number) => setObstacle((current) => {
    const nextWidth = Math.min(430, Math.max(150, current.w + delta))
    return clamp({ ...current, w: nextWidth, h: contour.h * (nextWidth / contour.w) })
  })

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const step = event.shiftKey ? 24 : 10
    if (event.key === 'Enter') { setShowPlate((value) => !value); event.preventDefault(); return }
    if (event.key === '+' || event.key === '=') { resize(18); event.preventDefault(); return }
    if (event.key === '-' || event.key === '_') { resize(-18); event.preventDefault(); return }
    const delta = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[event.key]
    if (delta) {
      setObstacle((current) => clamp({ ...current, x: current.x + delta[0], y: current.y + delta[1] }))
      event.preventDefault()
    }
  }

  return (
    <section className="explore-section" aria-labelledby={`explore-${item.id}`}>
      <div className="explore-meta">
        <p className="eyebrow">{t(item.territory, lang)} · {item.date}</p>
        <h2 id={`explore-${item.id}`}>{t(item.title, lang)}</h2>
        <p id={`instructions-${item.id}`}>{c.instructions}</p>
        <div className="explore-actions">
          <button type="button" onClick={() => setShowPlate((value) => !value)}>{showPlate ? c.figure : c.original}</button>
          <button type="button" onClick={() => setObstacle(initial)}>{c.reset}</button>
        </div>
      </div>
      <div className="living-text" ref={stageRef} style={{ height }}>
        {layout.lines.map((line, index) => (
          <span key={`${line.y}-${index}`} className={line.heading ? 'living-line heading' : 'living-line'} style={{ left: line.x, top: line.y }}>{line.text}</span>
        ))}
        <button
          type="button"
          className="draggable-figure"
          style={{ left: obstacle.x, top: obstacle.y, width: obstacle.w, height: obstacle.h }}
          aria-describedby={`instructions-${item.id}`}
          aria-label={`${t(item.title, lang)} — ${c.study}`}
          onKeyDown={onKeyDown}
          onDoubleClick={() => setShowPlate((value) => !value)}
          onPointerDown={(event) => {
            const rect = event.currentTarget.getBoundingClientRect()
            event.currentTarget.setPointerCapture(event.pointerId)
            dragRef.current = { pointerId: event.pointerId, offsetX: event.clientX - rect.left, offsetY: event.clientY - rect.top }
          }}
          onPointerMove={(event) => {
            const drag = dragRef.current
            const stage = stageRef.current
            if (!drag || !stage || drag.pointerId !== event.pointerId) return
            const rect = stage.getBoundingClientRect()
            setObstacle((current) => clamp({ ...current, x: event.clientX - rect.left - drag.offsetX, y: event.clientY - rect.top - drag.offsetY }))
          }}
          onPointerUp={() => { dragRef.current = null }}
          onPointerCancel={() => { dragRef.current = null }}
        >
          <img src={asset(showPlate ? item.images.plate : item.images.figure)} alt="" draggable={false} />
          <span>{c.study}</span>
        </button>
        <div className="sr-only">
          <h3>{t(item.title, lang)}</h3>
          <p>{t(item.observed, lang)}</p><p>{t(item.context, lang)}</p><p>{t(item.interpretation, lang)}</p>
        </div>
      </div>
      <SourcePanel item={item} lang={lang} />
    </section>
  )
}

function Comparison({ items, lang, clear }: { items: ExhibitionItem[]; lang: Lang; clear: () => void }) {
  const c = copy[lang]
  return (
    <section className="comparison" id="comparison" aria-labelledby="comparison-title">
      <div className="comparison-head">
        <h2 id="comparison-title">{c.comparison}</h2>
        {items.length > 0 && <button type="button" onClick={clear}>{c.clear}</button>}
      </div>
      {items.length !== 2 ? <p>{c.emptyComparison}</p> : (
        <div className="comparison-grid">
          {items.map((item) => (
            <article key={item.id}>
              <img src={asset(item.images.figure)} alt={t(item.images.alt, lang)} />
              <h3>{t(item.title, lang)}</h3>
              <p className="eyebrow">{t(item.territory, lang)} · {item.date} · {t(item.medium, lang)}</p>
              <h4>{c.observed}</h4><p>{t(item.observed, lang)}</p>
              <h4>{c.interpretation}</h4><p>{t(item.interpretation, lang)}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default function App() {
  const { lang, setLang } = useLanguage()
  const c = copy[lang]
  const [mode, setMode] = useState<'reading' | 'explore'>('reading')
  const [theme, setTheme] = useState('all')
  const [activeExplore, setActiveExplore] = useState(data.items[0].id)
  const [comparison, setComparison] = useState<string[]>([])
  const themes = useMemo(() => Array.from(new Set(data.items.flatMap((item) => item.themes))), [])
  const visible = theme === 'all' ? data.items : data.items.filter((item) => item.themes.includes(theme))
  const exploreItem = data.items.find((item) => item.id === activeExplore) ?? visible[0] ?? data.items[0]
  const comparisonItems = comparison.map((id) => data.items.find((item) => item.id === id)).filter(Boolean) as ExhibitionItem[]

  const toggleComparison = (id: string) => setComparison((current) => {
    if (current.includes(id)) return current.filter((value) => value !== id)
    if (current.length === 2) return [current[1], id]
    return [...current, id]
  })

  return (
    <div className="exhibition">
      <header className="site-bar">
        <a href="/atlas/"><img src="/assets/sun-seal.svg" alt="" /> <b>ana vanzin</b><span>{c.atlas}</span></a>
        <nav aria-label="Idioma / Language">
          <button type="button" onClick={() => setLang('pt')} aria-pressed={lang === 'pt'}>PT</button>
          <button type="button" onClick={() => setLang('en')} aria-pressed={lang === 'en'}>EN</button>
        </nav>
      </header>

      <main>
        <a className="back-link" href="/atlas/">← {c.back}</a>
        <header className="hero">
          <p className="hero-kicker">ICONOCRACIA · exposição 01 · 2026</p>
          <h1>{c.title}</h1>
          <p className="hero-deck">{c.deck}</p>
          <p className="provenance-note">{c.note}</p>
          <div className="snapshot-grid" aria-label="Escopos documentais">
            <div><b>{data.metadata.canonicalCorpus.count}</b><span>{c.canonical}</span><small>{data.metadata.snapshotDate}</small></div>
            <div><b>{data.metadata.comparativeSurvey.female}/{data.metadata.comparativeSurvey.total}</b><span>{c.survey}</span><small>{data.metadata.snapshotDate}</small></div>
          </div>
          <p className="corpus-note">{c.corpusNote}</p>
        </header>

        <div className="toolbar" aria-label="Controles da exposição">
          <div className="mode-switch" role="group" aria-label="Modo de leitura">
            <button type="button" aria-pressed={mode === 'reading'} onClick={() => setMode('reading')}>{c.read}</button>
            <button type="button" aria-pressed={mode === 'explore'} onClick={() => setMode('explore')}>{c.explore}</button>
          </div>
          <div className="filter-list" role="group" aria-label="Filtrar por tema">
            <button type="button" aria-pressed={theme === 'all'} onClick={() => setTheme('all')}>{c.all}</button>
            {themes.map((value) => <button type="button" key={value} aria-pressed={theme === value} onClick={() => setTheme(value)}>{t(themeLabels[value], lang)}</button>)}
          </div>
          <a className="comparison-link" href="#comparison">{c.compare} · {comparison.length}/2</a>
        </div>

        {mode === 'reading' ? (
          <div className="objects">
            {visible.map((item, index) => <ReadingCard key={item.id} item={item} index={data.items.indexOf(item)} lang={lang} selected={comparison.includes(item.id)} onCompare={() => toggleComparison(item.id)} />)}
          </div>
        ) : (
          <div className="explore-mode">
            <nav className="object-tabs" aria-label="Objetos para explorar">
              {visible.map((item) => <button type="button" key={item.id} aria-pressed={exploreItem.id === item.id} onClick={() => setActiveExplore(item.id)}>{t(item.title, lang)}</button>)}
            </nav>
            <ExploreStage item={exploreItem} lang={lang} />
          </div>
        )}

        <Comparison items={comparisonItems} lang={lang} clear={() => setComparison([])} />
      </main>

      <footer>
        <p>Ana Vanzin · PPGD/UFSC · ICONOCRACIA</p>
        <a href="/atlas/">Atlas</a><a href="/iconocracia/">ICONOCRACIA</a><a href="/publicacoes/">{lang === 'pt' ? 'Publicações' : 'Publications'}</a>
      </footer>
    </div>
  )
}
