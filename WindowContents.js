/* Window contents for the ana vanzin desktop. Compose brand components.
   Bilingual: each component takes { lang } ('pt' | 'en'). */
const _DS = window.AnaVanzinDesignSystem_b45a86;
const { Eyebrow, RubricLink, PublicationEntry, FootnoteRef, Footnotes } = _DS;

const L = (lang, pt, en) => (lang === 'en' ? en : pt);

const win_h2 = { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 26, lineHeight: 1.1, margin: 0 };
const win_lead = { fontSize: 16, lineHeight: 1.6, margin: 0, maxWidth: '60ch' };
const win_p = { fontSize: 15, lineHeight: 1.62, margin: 0, color: 'var(--text-muted)', maxWidth: '60ch' };
const stack = (g) => ({ display: 'flex', flexDirection: 'column', gap: g });

function WSobre({ lang }) {
  return (
    <div style={stack(16)}>
      <Eyebrow>{L(lang, 'Sobre', 'About')}</Eyebrow>
      <h2 style={win_h2}>ana vanzin</h2>
      <p style={win_lead}>{L(lang,
        'Advogada e historiadora do direito. Doutoranda no PPGD/UFSC, com pesquisa em história e iconografia jurídica.',
        'Lawyer and legal historian. PhD candidate at PPGD/UFSC, researching legal history and iconography.')}</p>
      <p style={win_p}>{L(lang,
        <>A tese <em>Iconocracia</em> estuda as alegorias femininas do direito — Justitia, a República-como-mulher — entre o incunábulo e o constitucionalismo moderno.</>,
        <>The thesis <em>Iconocracy</em> studies the female allegories of law — Justitia, the Republic-as-woman — between the incunabulum and modern constitutionalism.</>)}</p>
      <div style={{ borderTop: '1px solid var(--rule-hairline)', paddingTop: 14, ...stack(6) }}>
        <Eyebrow color="ink" style={{ fontSize: 11 }}>{L(lang, 'Atuação', 'Focus')}</Eyebrow>
        <p style={{ ...win_p, margin: 0 }}>{L(lang,
          'Direito público · história constitucional · patrimônio cultural',
          'Public law · constitutional history · cultural heritage')}</p>
      </div>
    </div>
  );
}

function WTese({ lang }) {
  return (
    <div style={stack(16)}>
      <Eyebrow>{L(lang, 'Tese · Iconocracia', 'Thesis · Iconocracy')}</Eyebrow>
      <h2 style={win_h2}>{L(lang, 'A venda como sátira', 'The blindfold as satire')}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 116px', gap: 22, alignItems: 'start' }}>
        <div style={stack(12)}>
          <p style={win_lead}>{L(lang,
            <>A primeira Justitia vendada não nasceu como virtude — nasceu como sátira, na xilogravura de 1494 do <em>Narrenschiff</em><FootnoteRef n={1} />.</>,
            <>The first blindfolded Justitia was not born as a virtue — it was born as satire, in the 1494 woodcut of the <em>Narrenschiff</em><FootnoteRef n={1} />.</>)}</p>
          <p style={win_p}>{L(lang,
            'Investiga-se como a venda, o gume e a balança foram lidos, satirizados e normalizados na cultura jurídica europeia.',
            'It investigates how the blindfold, the blade and the scales were read, satirised and normalised in European legal culture.')}</p>
          <Footnotes notes={["Brant, Sebastian. Das Narrenschiff. Basel, 1494, fol. 22v."]} style={{ marginTop: 8 }} />
        </div>
        <div style={{ border: '1px solid var(--ink)', background: 'var(--paper-deep)', padding: 6, display: 'flex', justifyContent: 'center' }}>
          <img src="assets/pixel-justitia.png" alt="" style={{ width: '100%', imageRendering: 'pixelated' }} />
        </div>
      </div>
    </div>
  );
}

function WPublicacoes({ lang }) {
  return (
    <div style={stack(8)}>
      <Eyebrow>{L(lang, 'Publicações', 'Publications')}</Eyebrow>
      <div>
        <PublicationEntry year="2025" title="A venda de Justitia: sátira e virtude no Narrenschiff" href="publicacoes/vrouwe-justitia.html" meta="Revista Sequência, n. 96, p. 1–28." />
        <PublicationEntry year="2024" title="A República como mulher: alegoria e constituição" href="publicacoes/maria-marianne.html" meta="Direito e Práxis, v. 15, n. 2." />
        <PublicationEntry year="2023" title="Iconografia jurídica: um programa de pesquisa" meta={L(lang, 'Capítulo, Ed. UFSC.', 'Chapter, UFSC Press.')} note={L(lang, 'no prelo', 'in press')} />
      </div>
      <div style={{ paddingTop: 6 }}><RubricLink href="http://lattes.cnpq.br/9079096818962275" external>{L(lang, 'Currículo Lattes', 'Lattes CV')}</RubricLink></div>
    </div>
  );
}

function WIus({ lang }) {
  return (
    <div style={stack(16)}>
      <Eyebrow>Ius Gentium</Eyebrow>
      <h2 style={win_h2}>{L(lang, 'Grupo de pesquisa', 'Research group')}</h2>
      <p style={win_lead}>{L(lang,
        'História da cultura jurídica, PPGD/UFSC. Linha: iconografia e iconologia do direito.',
        'Legal-culture history, PPGD/UFSC. Strand: iconography and iconology of law.')}</p>
      <p style={win_p}>{L(lang,
        'Encontros quinzenais, abertos a graduação e pós-graduação.',
        'Fortnightly meetings, open to undergraduate and graduate students.')}</p>
      <div style={{ paddingTop: 4 }}><RubricLink href="grupoiusgentium/">{L(lang, 'Página do grupo', 'Group page')}</RubricLink></div>
    </div>
  );
}

function WContato({ lang }) {
  const [sent, setSent] = React.useState(false);
  const input = { fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink)', background: 'var(--paper)',
    border: '1px solid var(--ink-50)', borderRadius: 0, padding: '8px 10px', outlineColor: 'var(--rubric)', width: '100%', boxSizing: 'border-box' };
  return (
    <div style={stack(16)}>
      <Eyebrow>{L(lang, 'Contato', 'Contact')}</Eyebrow>
      <p style={win_lead}><RubricLink href="mailto:ana@anavanzin.com">ana@anavanzin.com</RubricLink></p>
      {sent ? (
        <p style={{ ...win_p, borderTop: '1px solid var(--rule-hairline)', paddingTop: 14 }}>{L(lang,
          'Mensagem registrada. Resposta em até cinco dias úteis.',
          'Message received. Reply within five business days.')}</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ ...stack(12), maxWidth: 340 }}>
          <label style={stack(6)}><Eyebrow color="ink" style={{ fontSize: 11 }}>{L(lang, 'Nome', 'Name')}</Eyebrow><input required style={input} /></label>
          <label style={stack(6)}><Eyebrow color="ink" style={{ fontSize: 11 }}>{L(lang, 'Mensagem', 'Message')}</Eyebrow><textarea required rows="3" style={{ ...input, resize: 'vertical' }}></textarea></label>
          <div><button type="submit" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', fontSize: 13, padding: '9px 20px', background: 'var(--ink)', color: 'var(--paper)', border: '1px solid var(--ink)', borderRadius: 0, cursor: 'pointer' }}>{L(lang, 'Enviar', 'Send')}</button></div>
        </form>
      )}
    </div>
  );
}

function WCv({ lang }) {
  const rows = L(lang, [
    ['2023–', 'Doutorado em Direito', 'PPGD/UFSC · história e iconografia jurídica'],
    ['2021', 'Mestrado em Direito', 'PPGD/UFSC · cultura jurídica'],
    ['2018', 'Graduação em Direito', 'UFSC'],
    ['2019', 'Inscrição na OAB', 'OAB/SC'],
  ], [
    ['2023–', 'PhD in Law', 'PPGD/UFSC · legal history & iconography'],
    ['2021', 'Master in Law', 'PPGD/UFSC · legal culture'],
    ['2018', 'LL.B. in Law', 'UFSC'],
    ['2019', 'Bar admission (OAB)', 'OAB/SC'],
  ]);
  return (
    <div style={stack(14)}>
      <Eyebrow>{L(lang, 'Currículo', 'Curriculum')}</Eyebrow>
      <div>
        {rows.map(([y, t, m], i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: 18, padding: '12px 0',
            borderTop: '1px solid var(--rule-hairline)' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 18, color: 'var(--text-faint)' }}>{y}</span>
            <div><div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, lineHeight: 1.15 }}>{t}</div>
              <div style={{ fontSize: 13.5, color: 'var(--text-muted)', marginTop: 2 }}>{m}</div></div>
          </div>
        ))}
      </div>
      <div style={{ paddingTop: 2 }}><RubricLink href="http://lattes.cnpq.br/9079096818962275" external>{L(lang, 'Currículo Lattes', 'Lattes CV')}</RubricLink></div>
    </div>
  );
}

function WJustitia({ lang }) {
  return (
    <div style={stack(0)}>
      <div style={{ background: 'var(--ink)', padding: 12, display: 'flex', justifyContent: 'center' }}>
        <img src="assets/pixel-justitia-sky.png" alt="Justitia, pixel art" style={{ maxWidth: '100%', maxHeight: 420, imageRendering: 'pixelated', border: '1px solid var(--gold-2)' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--rule-hairline)', paddingTop: 10, marginTop: 10, fontSize: 12, color: 'var(--text-faint)', letterSpacing: '0.04em' }}>
        <span>justitia.png</span><span>1086 × 1448 · 16-bit</span>
      </div>
    </div>
  );
}

Object.assign(window, { WSobre, WTese, WPublicacoes, WIus, WContato, WJustitia, WCv });
