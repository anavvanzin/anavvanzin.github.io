#!/usr/bin/env python3
"""Converte Iconocracia - Apresentacao.dc.html em deck estático.

Fonte de verdade: assets/Iconocracia - Apresentacao.dc.html (export .dc.html).
Saída derivada: apresentacao/index.html. Edite a fonte e regenere — não
edite a saída à mão (é sobrescrita a cada execução).
"""
import re
from pathlib import Path

ROOT = Path("/Users/ana/Documents/GitHub/anavvanzin")
SRC = ROOT / "assets" / "Iconocracia - Apresentacao.dc.html"
DEST = ROOT / "apresentacao" / "index.html"

text = SRC.read_text(encoding="utf-8")

# Extraímos o conteúdo dentro de <x-import>...</x-import> -> as <section>
inner = re.search(r'<x-import[^>]*>(.*?)</x-import>', text, re.S)
sections = inner.group(1) if inner else ""

# Normaliza paths de assets
sections = sections.replace('src="assets/', 'src="../assets/')
sections = sections.replace('src="_ds/iconocracia-design-system-0cfd37b9-c47f-4f4e-96b5-a471fd5632bb/fonts/fonts.css"', 'href="../fonts/fonts.css"')
sections = sections.replace('href="_ds/iconocracia-design-system-0cfd37b9-c47f-4f4e-96b5-a471fd5632bb/', 'href="../')

# Adiciona classe .slide em cada section e remove display:flex inline (que sobrescreveria .slide{display:none})
sections = re.sub(r'(<section\b)', r'\1 class="slide"', sections)
sections = re.sub(r'(<section\b[^>]*?)style="display:\s*flex;?\s*"', r'\1', sections)
sections = re.sub(r'(<section\b[^>]*?)style="display:\s*flex;?\s*([^"]*)"', r'\1style="\2"', sections)

# Placeholder SVG "imagem em aquisição" para imagens ainda não disponíveis em full-res.
ACQUIRING_PLACEHOLDER = """data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%2310162b'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Georgia,serif' font-size='18' fill='%23b8924a'%3Eimagem em aquisição%3C/text%3E%3C/svg%3E"""

# Imagens marianne ainda não adquiridas.
for name in ['m-bardot-bust.png', 'm-bardot-photo.png', 'image8.jpeg', 'image9.png', 'm-stamp.png', 'm-inna.png']:
    sections = sections.replace(f'../assets/marianne/{name}', ACQUIRING_PLACEHOLDER)

# Imagens-símbolo truncadas no download (cap de 192KB; IDAT incompleto) — aguardando
# reaquisição em full-res. Ao receber versões íntegras: vendorizar em assets/, remover
# o nome desta lista e regenerar o deck.
for name in ['sym-chain.png', 'sym-crown.png', 'sym-eye.png', 'sym-scale.png', 'sym-sun.png', 'iustitia-velata.png']:
    sections = sections.replace(f'../assets/{name}', ACQUIRING_PLACEHOLDER)

# speaker-notes -> data-speaker-notes já está ok

# Cria o HTML final
html = f"""<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Apresentação · Iconocracia · ana vanzin</title>
<meta name="description" content="Slides da apresentação da tese Iconocracia — alegoria feminina na história da cultura jurídica.">
<link rel="icon" type="image/png" href="../assets/favicon-32.png">
<link rel="stylesheet" href="../fonts/fonts.css">
<link rel="stylesheet" href="../tokens/colors.css">
<link rel="stylesheet" href="../tokens/typography.css">
<link rel="stylesheet" href="../tokens/spacing.css">
<link rel="stylesheet" href="../tokens/base.css">
<style>
:root{{
  --t-hero:128px; --t-title:76px; --t-display:96px; --t-subtitle:44px;
  --t-lead:36px; --t-body:28px; --t-small:24px; --t-mono:24px;
  --pad-x:120px; --pad-y:92px;
  --serif:var(--font-display); --prose:var(--font-body); --mono:var(--font-mono);
}}
*{{ box-sizing:border-box; }}
html,body{{ margin:0; height:100%; background:#060913; color:var(--ivory); }}
@keyframes lineGrow{{ from{{ transform:scaleX(0);}} to{{ transform:scaleX(1);}} }}

.topbar{{
  position:fixed; top:0; left:0; right:0; z-index:100;
  display:flex; align-items:center; justify-content:space-between;
  padding:10px 18px; font-family:var(--font-mono); font-size:12px;
  text-transform:uppercase; letter-spacing:2px;
  background:rgba(6,9,19,.85); backdrop-filter:blur(6px); border-bottom:1px solid rgba(184,146,74,.25);
}}
.topbar a{{ color:var(--gold-bright); text-decoration:none; }}
.topbar a:hover{{ color:var(--ivory); }}
.topbar .meta{{ color:var(--faded); }}

.deck{{
  position:fixed; inset:0; display:flex; align-items:center; justify-content:center;
  overflow:hidden; padding-top:44px;
}}
.viewport{{
  width:1920px; height:1080px;
  flex:none;  /* impede o flex container .deck de encolher o palco no eixo principal (bug do sliver mobile) */
  transform-origin:center center;
  position:relative;
}}
.slide{{
  position:absolute; inset:0;
  display:none;
  width:1920px; height:1080px;
}}
.slide.active{{ display:flex; }}

.controls{{
  position:fixed; bottom:18px; right:22px; z-index:100;
  display:flex; align-items:center; gap:10px;
  font-family:var(--font-mono); font-size:12px;
}}
.controls button{{
  background:rgba(6,9,19,.8); border:1px solid rgba(184,146,74,.4);
  color:var(--ivory); cursor:pointer; padding:8px 12px;
  text-transform:uppercase; letter-spacing:1px;
}}
.controls button:hover{{ background:var(--gold); color:#060913; }}
.controls .counter{{ color:var(--faded); padding:0 8px; }}

.dots{{
  position:fixed; bottom:18px; left:50%; transform:translateX(-50%); z-index:100;
  display:flex; gap:6px; max-width:60vw; flex-wrap:wrap; justify-content:center;
}}
.dots button{{
  width:8px; height:8px; border-radius:50%; border:none; padding:0;
  background:rgba(184,146,74,.35); cursor:pointer;
}}
.dots button.active{{ background:var(--gold); }}

.notes{{
  position:fixed; left:0; right:0; bottom:54px; z-index:90;
  display:none; max-width:960px; margin:0 auto; padding:14px 18px;
  background:rgba(6,9,19,.92); border:1px solid rgba(184,146,74,.3);
  color:var(--faded-on-dark); font-family:var(--font-body); font-size:16px; line-height:1.5;
}}
.notes.visible{{ display:block; }}

@media (max-width: 768px){{
  .viewport{{ width:1080px; height:1920px; }}
  .slide{{ width:1080px; height:1920px; }}
}}
</style>
</head>
<body>
<header class="topbar">
  <a href="../">← ana vanzin</a>
  <span class="meta">Iconocracia · Apresentação</span>
  <a href="#" id="toggle-notes" style="color:var(--faded);">notas</a>
</header>

<div class="deck">
  <div class="viewport" id="viewport">
{sections}
  </div>
</div>

<div class="controls">
  <button id="prev">‹ ant</button>
  <span class="counter" id="counter">1 / 1</span>
  <button id="next">próx ›</button>
</div>

<div class="dots" id="dots"></div>
<div class="notes" id="notes"></div>

<script>
const slides = Array.from(document.querySelectorAll('.slide'));
const notesEl = document.getElementById('notes');
let idx = 0;

function update(){{
  slides.forEach((s,i)=>{{ s.classList.toggle('active', i===idx); }});
  document.getElementById('counter').textContent = (idx+1) + ' / ' + slides.length;
  const note = slides[idx]?.dataset.speakerNotes || '';
  notesEl.textContent = note;
  document.querySelectorAll('#dots button').forEach((b,i)=> b.classList.toggle('active', i===idx));
}}

function next(){{ idx = (idx + 1) % slides.length; update(); }}
function prev(){{ idx = (idx - 1 + slides.length) % slides.length; update(); }}

document.getElementById('next').addEventListener('click', next);
document.getElementById('prev').addEventListener('click', prev);
document.getElementById('toggle-notes').addEventListener('click', e=>{{
  e.preventDefault(); notesEl.classList.toggle('visible');
}});

document.addEventListener('keydown', e=>{{
  if (e.key === 'ArrowRight' || e.key === ' ') {{ e.preventDefault(); next(); }}
  if (e.key === 'ArrowLeft') {{ e.preventDefault(); prev(); }}
}});

let touchStartX = 0;
document.addEventListener('touchstart', e=>{{ touchStartX = e.touches[0].clientX; }});
document.addEventListener('touchend', e=>{{
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (dx < -50) next(); else if (dx > 50) prev();
}});

const dots = document.getElementById('dots');
slides.forEach((_,i)=>{{
  const b = document.createElement('button');
  b.addEventListener('click', ()=>{{ idx=i; update(); }});
  dots.appendChild(b);
}});

function fit(){{
  const vp = document.getElementById('viewport');
  const bar = 44;
  const ww = window.innerWidth;
  const wh = window.innerHeight - bar;
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const sw = isMobile ? 1080 : 1920;
  const sh = isMobile ? 1920 : 1080;
  const scale = Math.min(ww/sw, wh/sh);
  vp.style.transform = 'scale(' + scale + ')';
}}
window.addEventListener('resize', fit);
fit();
update();
</script>
</body>
</html>
"""

DEST.write_text(html, encoding="utf-8")
print(f"Wrote {DEST} ({len(html)} bytes) with {len(re.findall(r'<section', sections))} slides")
