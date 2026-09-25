import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.resolve(appRoot, '../../atlas/nacao-como-mulher')
const data = JSON.parse(fs.readFileSync(path.join(appRoot, 'src/exhibition.json'), 'utf8'))
const htmlPath = path.join(outDir, 'index.html')
const escape = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const cards = data.items.map((item, index) => `
  <article class="object-card" id="${escape(item.id)}">
    <div class="folio">${String(index + 1).padStart(2, '0')}</div>
    <div class="object-visual">
      <span class="derivative-label">estudo interpretativo gerado por IA</span>
      <img src="/atlas/nacao-como-mulher/${escape(item.images.plate)}" alt="${escape(item.images.alt.pt)}">
    </div>
    <div class="object-copy">
      <div class="eyebrow">${escape(item.territory.pt)} · ${escape(item.date)} · ${escape(item.medium.pt)}</div>
      <h2>${escape(item.title.pt)}</h2>
      <p class="object-subtitle">${escape(item.subtitle.pt)}</p>
      <div class="scope-badge">${item.scope === 'canonical' ? 'objeto relacionado ao corpus canônico' : 'antecedente genealógico comparativo'}</div>
      <dl class="reading-layers">
        <div><dt>Descrição visível</dt><dd>${escape(item.observed.pt)}</dd></div>
        <div><dt>Contexto histórico-jurídico</dt><dd>${escape(item.context.pt)}</dd></div>
        <div><dt>Hipótese interpretativa</dt><dd>${escape(item.interpretation.pt)}</dd></div>
      </dl>
      <details class="source-panel" open><summary>Fonte e direitos</summary><div class="source-grid">
        <p><span>Registro</span><b>${escape(item.atlasId)}</b></p>
        <p><span>Direitos</span>${escape(item.source.rights.pt)}</p>
        <p class="citation">${escape(item.source.citation.pt)}</p>
        <a href="${escape(item.source.url)}">${escape(item.source.institution)} ↗</a>
      </div></details>
    </div>
  </article>`).join('')

const fallback = `<div class="exhibition prerendered">
  <header class="site-bar"><a href="/atlas/"><img src="/assets/sun-seal.svg" alt=""> <b>ana vanzin</b><span>atlas · exposição temática</span></a></header>
  <main>
    <a class="back-link" href="/atlas/">← voltar ao Atlas</a>
    <header class="hero"><p class="hero-kicker">ICONOCRACIA · exposição 01 · 2026</p><h1>A Nação como Mulher</h1><p class="hero-deck">Nove estudos sobre corpos femininos convocados para tornar território, República e soberania visíveis.</p><p class="provenance-note">As pranchas são estudos interpretativos gerados por IA a partir de objetos históricos identificados. Não são reproduções nem evidência do corpus.</p><div class="snapshot-grid"><div><b>${data.metadata.canonicalCorpus.count}</b><span>corpus canônico em expansão</span><small>${data.metadata.snapshotDate}</small></div><div><b>${data.metadata.comparativeSurvey.female}/${data.metadata.comparativeSurvey.total}</b><span>levantamento comparativo datado</span><small>${data.metadata.snapshotDate}</small></div></div></header>
    <div class="objects">${cards}</div>
  </main>
</div>`

let source = fs.readFileSync(htmlPath, 'utf8')
if (!source.includes('<!-- prerender:root -->')) throw new Error('missing prerender marker')
source = source.replace('<!-- prerender:root -->', fallback)
source = source.replace(/\s*<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/gi, '')
  .replace(/\s*<meta\b(?=[^>]*\bname=["']robots["'])[^>]*>/gi, '')
  .replace('  </head>', '<link rel="canonical" href="https://anavanzin.com/atlas/nacao-como-mulher/">\n<meta name="robots" content="index,follow">\n</head>')
fs.writeFileSync(htmlPath, source)
console.log(`Prerendered ${data.items.length} records into ${htmlPath}`)
