import fs from 'node:fs';
import path from 'node:path';

const today = new Date().toISOString().slice(0,10);
const records = JSON.parse(fs.readFileSync('data/corpus.json', 'utf8'));


const required = ['id','slug','title','dateText','dateStart','dateEnd','country','city','author','collection','sourceInstitution','shortDescription','longDescription','symbols','tags','concepts','bibliography','rights','license','credit','files','derivatives','ocrText','language','curatorialNotes','editorialStatus','provenance','externalIdentifiers','iiifManifest','seo'];
const schema = {
  '$schema':'https://json-schema.org/draft/2020-12/schema',
  '$id':'https://anavanzin.com/schema/corpus.schema.json',
  title:'ICONOCRACIA corpus record', type:'array', items:{ type:'object', required,
    properties:Object.fromEntries(required.map(k=>[k,{}])),
    allOf:[
      { properties:{ slug:{type:'string', minLength:1}, title:{type:'string', minLength:1}, rights:{type:'string', minLength:1}, credit:{type:'string', minLength:1}, shortDescription:{type:'string', minLength:1}, files:{type:'array', minItems:1, contains:{type:'object', required:['role','path'], properties:{role:{const:'primary'}, path:{type:'string', minLength:1}}}} } }
    ], additionalProperties:true }
};
fs.writeFileSync('schema/corpus.schema.json', JSON.stringify(schema, null, 2) + '\n');

function esc(s){return String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
for (let idx=0; idx<records.length; idx++) {
 const r=records[idx], prev=records[idx-1], next=records[idx+1], img=r.files.find(f=>f.role==='primary');
 const html=`<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(r.seo.title)}</title>
<meta name="description" content="${esc(r.seo.description)}" />
<link rel="stylesheet" href="../styles.css" />
<link rel="stylesheet" href="ficha.css" />
<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'VisualArtwork',name:r.title,url:`https://anavanzin.com/corpus/${r.slug}.html`,description:r.shortDescription,image:{'@type':'ImageObject',url:`https://anavanzin.com${img.path}`,caption:r.title}},null,2)}</script>
</head>
<body>
<header class="chrome"><a class="home" href="/">anavanzin.com</a><span class="sep"></span><span class="mark">ICONOCRACIA</span><a class="crumb" href="../iconocracia/atlas/#corpus">· corpus</a><div class="nav"><span class="counter">placa ${String(idx+1).padStart(2,'0')} / ${records.length}</span>${prev?`<a class="pgbtn" href="${prev.slug}.html">‹ anterior</a>`:''}${next?`<a class="pgbtn" href="${next.slug}.html">próxima ›</a>`:''}</div></header>
<main class="wrap"><div class="grid"><section class="platecol"><div class="plate"><img src="..${img.path}" alt="${esc(img.alt)}" /></div><div class="platecap"><span class="src">${esc(r.countryCode)} · ${esc(r.dateText)}</span><span>${esc(r.title)} · ${esc(r.support)}.</span></div></section><section class="recordcol"><span class="regime">Regime ${esc(String(r.regime).toLowerCase().replace('_','-'))}</span><div class="meta">${esc(r.country)} · ${esc(r.dateText)} · ${esc(r.support)} · ID ${esc(r.id)}</div><h1 class="ttl">${esc(r.title)}</h1><hr class="gold-rule" /><h2>Descrição curta</h2><p>${esc(r.shortDescription)}</p><h2>Descrição longa</h2><p>${esc(r.longDescription)}</p><h2>Fonte & proveniência</h2><dl><dt>Crédito</dt><dd>${esc(r.credit)}</dd><dt>Direitos</dt><dd>${esc(r.rights)}</dd><dt>Licença</dt><dd>${esc(r.license)}</dd></dl><h2>Dados canônicos</h2><p>Esta ficha é gerada a partir de <code>data/corpus.json</code>. Última geração: ${today}.</p></section></div></main><script src="ficha.js"></script></body></html>
`;
 fs.writeFileSync(path.join('corpus',`${r.slug}.html`), html);
}
const atlasCorpus = records.map(r=>({id:r.id,title:r.title,country:r.countryCode,year:r.year,regime:r.regime,support:r.support,img:r.files[0].path,slug:r.slug,shortDescription:r.shortDescription,rights:r.rights,credit:r.credit}));
const atlasJs = fs.readFileSync('iconocracia/atlas/data.js','utf8');
let out = atlasJs.replace(/corpus:\s*\[[\s\S]*?\n  \],\n\n  panels:/, `corpus: ${JSON.stringify(atlasCorpus,null,4)},\n\n  panels:`);
fs.writeFileSync('iconocracia/atlas/data.js', out);
const gen = `// Generated from data/corpus.json by scripts/build-corpus.mjs.\nwindow.IconocracyCorpus = ${JSON.stringify(atlasCorpus,null,2)};\n`;
fs.writeFileSync('iconocracia/atlas/corpus.generated.js', gen);
fs.writeFileSync('iconocracia/atlas-lab/corpus.generated.js', gen);
