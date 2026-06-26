/*IIFE*/(function(){
/* Window contents for the ana vanzin desktop. Compose brand components.
   Bilingual: each component takes { lang } ('pt' | 'en'). */
const _DS = window.AnaVanzinDesignSystem_b45a86;
const {
  Eyebrow,
  RubricLink,
  PublicationEntry,
  FootnoteRef,
  Footnotes
} = _DS;
const L = (lang, pt, en) => lang === 'en' ? en : pt;
const win_h2 = {
  fontFamily: 'var(--font-display)',
  fontWeight: 600,
  fontSize: 26,
  lineHeight: 1.1,
  margin: 0
};
const win_lead = {
  fontSize: 16,
  lineHeight: 1.6,
  margin: 0,
  maxWidth: '60ch'
};
const win_p = {
  fontSize: 15,
  lineHeight: 1.62,
  margin: 0,
  color: 'var(--text-muted)',
  maxWidth: '60ch'
};
const stack = g => ({
  display: 'flex',
  flexDirection: 'column',
  gap: g
});
function WSobre({
  lang
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: stack(16)
  }, /*#__PURE__*/React.createElement(Eyebrow, null, L(lang, 'Sobre', 'About')), /*#__PURE__*/React.createElement("h2", {
    style: win_h2
  }, "ana vanzin"), /*#__PURE__*/React.createElement("p", {
    style: win_lead
  }, L(lang, 'Advogada e historiadora do direito. Doutoranda no PPGD/UFSC, com pesquisa em história e iconografia jurídica.', 'Lawyer and legal historian. PhD candidate at PPGD/UFSC, researching legal history and iconography.')), /*#__PURE__*/React.createElement("p", {
    style: win_p
  }, L(lang, /*#__PURE__*/React.createElement(React.Fragment, null, "A tese ", /*#__PURE__*/React.createElement("em", null, "Iconocracia"), " estuda as alegorias femininas do direito \u2014 Justitia, a Rep\xFAblica-como-mulher \u2014 entre o incun\xE1bulo e o constitucionalismo moderno."), /*#__PURE__*/React.createElement(React.Fragment, null, "The thesis ", /*#__PURE__*/React.createElement("em", null, "Iconocracy"), " studies the female allegories of law \u2014 Justitia, the Republic-as-woman \u2014 between the incunabulum and modern constitutionalism."))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--rule-hairline)',
      paddingTop: 14,
      ...stack(6)
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "ink",
    style: {
      fontSize: 11
    }
  }, L(lang, 'Atuação', 'Focus')), /*#__PURE__*/React.createElement("p", {
    style: {
      ...win_p,
      margin: 0
    }
  }, L(lang, 'Direito público · história constitucional · patrimônio cultural', 'Public law · constitutional history · cultural heritage'))));
}
function WTese({
  lang
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: stack(16)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--ink)',
      boxShadow: '3px 3px 0 0 var(--ink)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/banner.png",
    alt: L(lang, 'Alegoria Feminina na História da Cultura Jurídica — Projeto de Doutorado, PPGD/UFSC', 'Female Allegory in the History of Legal Culture — PhD Project, PPGD/UFSC'),
    style: {
      display: 'block',
      width: '100%'
    }
  })), /*#__PURE__*/React.createElement(Eyebrow, null, L(lang, 'Tese · Iconocracia', 'Thesis · Iconocracy')), /*#__PURE__*/React.createElement("h2", {
    style: win_h2
  }, L(lang, 'A venda como sátira', 'The blindfold as satire')), /*#__PURE__*/React.createElement("div", {
    style: stack(12)
  }, /*#__PURE__*/React.createElement("p", {
    style: win_lead
  }, L(lang, /*#__PURE__*/React.createElement(React.Fragment, null, "A primeira Justitia vendada n\xE3o nasceu como virtude \u2014 nasceu como s\xE1tira, na xilogravura de 1494 do ", /*#__PURE__*/React.createElement("em", null, "Narrenschiff"), /*#__PURE__*/React.createElement(FootnoteRef, {
    n: 1
  }), "."), /*#__PURE__*/React.createElement(React.Fragment, null, "The first blindfolded Justitia was not born as a virtue \u2014 it was born as satire, in the 1494 woodcut of the ", /*#__PURE__*/React.createElement("em", null, "Narrenschiff"), /*#__PURE__*/React.createElement(FootnoteRef, {
    n: 1
  }), "."))), /*#__PURE__*/React.createElement("p", {
    style: win_p
  }, L(lang, 'Investiga-se como a venda, o gume e a balança foram lidos, satirizados e normalizados na cultura jurídica europeia.', 'It investigates how the blindfold, the blade and the scales were read, satirised and normalised in European legal culture.')), /*#__PURE__*/React.createElement(Footnotes, {
    notes: ["Brant, Sebastian. Das Narrenschiff. Basel, 1494, fol. 22v."],
    style: {
      marginTop: 8
    }
  })));
}
function WPublicacoes({
  lang
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: stack(8)
  }, /*#__PURE__*/React.createElement(Eyebrow, null, L(lang, 'Comunicações & traduções', 'Talks & translations')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PublicationEntry, {
    year: "2024",
    title: "Images of the Nation in Modern Legal Iconography",
    meta: L(lang, 'Comunicação · Germania, Britannia, Marianne e o uso simbólico do feminino.', 'Talk · Germania, Britannia, Marianne and the symbolic use of the feminine.')
  }), /*#__PURE__*/React.createElement(PublicationEntry, {
    year: "2024",
    title: L(lang, 'História do Direito das Mulheres', 'The History of Women’s Legal Rights'),
    meta: L(lang, 'XIX Encontro de História do Direito · UFSC', '19th Meeting on Legal History · UFSC')
  }), /*#__PURE__*/React.createElement(PublicationEntry, {
    year: "2024",
    title: L(lang, 'Direito, fascismos e neofascismos entre Itália e Brasil', 'Law, Fascism and Neo-Fascism between Italy and Brazil'),
    meta: L(lang, 'XXI Encontro de História do Direito · UFSC', '21st Meeting on Legal History · UFSC')
  }), /*#__PURE__*/React.createElement(PublicationEntry, {
    year: "2024",
    title: L(lang, 'Monumentos do Direito Internacional (trad.)', 'Monuments of International Law (transl.)'),
    meta: L(lang, 'Tradução de Luigi Lacchè · Rev. Bras. de História e Ciências Sociais.', 'Translation of Luigi Lacchè · Braz. J. of History & Social Sciences.')
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 6
    }
  }, /*#__PURE__*/React.createElement(RubricLink, {
    href: "http://lattes.cnpq.br/9079096818962275",
    external: true
  }, L(lang, 'Currículo Lattes', 'Lattes CV'))));
}
function WIus({
  lang
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: stack(16)
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Ius Gentium"), /*#__PURE__*/React.createElement("h2", {
    style: win_h2
  }, L(lang, 'Grupo de pesquisa', 'Research group')), /*#__PURE__*/React.createElement("p", {
    style: win_lead
  }, L(lang, 'História da cultura jurídica, PPGD/UFSC. Linha: iconografia e iconologia do direito.', 'Legal-culture history, PPGD/UFSC. Strand: iconography and iconology of law.')), /*#__PURE__*/React.createElement("p", {
    style: win_p
  }, L(lang, 'Encontros quinzenais, abertos a graduação e pós-graduação.', 'Fortnightly meetings, open to undergraduate and graduate students.')), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 4
    }
  }, /*#__PURE__*/React.createElement(RubricLink, {
    href: "grupoiusgentium/"
  }, L(lang, 'Página do grupo', 'Group page'))));
}
function WContato({
  lang
}) {
  const [sent, setSent] = React.useState(false);
  const input = {
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    color: 'var(--ink)',
    background: 'var(--paper)',
    border: '1px solid var(--ink-50)',
    borderRadius: 0,
    padding: '8px 10px',
    outlineColor: 'var(--rubric)',
    width: '100%',
    boxSizing: 'border-box'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: stack(16)
  }, /*#__PURE__*/React.createElement(Eyebrow, null, L(lang, 'Contato', 'Contact')), /*#__PURE__*/React.createElement("p", {
    style: win_lead
  }, /*#__PURE__*/React.createElement(RubricLink, {
    href: "mailto:anavvanzin@outlook.com"
  }, "anavvanzin@outlook.com")), sent ? /*#__PURE__*/React.createElement("p", {
    style: {
      ...win_p,
      borderTop: '1px solid var(--rule-hairline)',
      paddingTop: 14
    }
  }, L(lang, 'Mensagem registrada. Resposta em até cinco dias úteis.', 'Message received. Reply within five business days.')) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    },
    style: {
      ...stack(12),
      maxWidth: 340
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: stack(6)
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "ink",
    style: {
      fontSize: 11
    }
  }, L(lang, 'Nome', 'Name')), /*#__PURE__*/React.createElement("input", {
    required: true,
    style: input
  })), /*#__PURE__*/React.createElement("label", {
    style: stack(6)
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "ink",
    style: {
      fontSize: 11
    }
  }, L(lang, 'Mensagem', 'Message')), /*#__PURE__*/React.createElement("textarea", {
    required: true,
    rows: "3",
    style: {
      ...input,
      resize: 'vertical'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      fontSize: 13,
      padding: '9px 20px',
      background: 'var(--ink)',
      color: 'var(--paper)',
      border: '1px solid var(--ink)',
      borderRadius: 0,
      cursor: 'pointer'
    }
  }, L(lang, 'Enviar', 'Send')))));
}
function WCv({
  lang
}) {
  const rows = L(lang, [['2022–24', 'Mestrado em Direito', 'PPGD/UFSC · Direito dos Grupos Vulneráveis'], ['2023–24', 'Especialização em Direito Público', 'FURB / ESMESC'], ['2017–22', 'Bacharelado em Direito', 'UFSC'], ['2018', 'Iniciação Científica (PIBIC)', 'CNPq/UFSC · Direito Internacional']], [['2022–24', 'Master in Law', 'PPGD/UFSC · Vulnerable Groups'], ['2023–24', 'Specialist in Public Law', 'FURB / ESMESC'], ['2017–22', 'Bachelor of Laws', 'UFSC'], ['2018', 'Research fellowship (PIBIC)', 'CNPq/UFSC · International Law']]);
  return /*#__PURE__*/React.createElement("div", {
    style: stack(14)
  }, /*#__PURE__*/React.createElement(Eyebrow, null, L(lang, 'Currículo', 'Curriculum')), /*#__PURE__*/React.createElement("div", null, rows.map(([y, t, m], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '72px 1fr',
      gap: 18,
      padding: '12px 0',
      borderTop: '1px solid var(--rule-hairline)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 18,
      color: 'var(--text-faint)'
    }
  }, y), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 18,
      lineHeight: 1.15
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, m))))), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 2
    }
  }, /*#__PURE__*/React.createElement(RubricLink, {
    href: "http://lattes.cnpq.br/9079096818962275",
    external: true
  }, L(lang, 'Currículo Lattes', 'Lattes CV'))));
}
function WJustitia({
  lang
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: stack(0)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ink)',
      padding: 12,
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/pixel-justitia-sky.png",
    alt: "Justitia, pixel art",
    style: {
      maxWidth: '100%',
      maxHeight: 420,
      imageRendering: 'pixelated',
      border: '1px solid var(--gold-2)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: '1px solid var(--rule-hairline)',
      paddingTop: 10,
      marginTop: 10,
      fontSize: 12,
      color: 'var(--text-faint)',
      letterSpacing: '0.04em'
    }
  }, /*#__PURE__*/React.createElement("span", null, "justitia.png"), /*#__PURE__*/React.createElement("span", null, "1086 \xD7 1448 \xB7 16-bit")));
}
function WVo({
  lang
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: stack(0)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--paper)',
      border: '1px solid var(--ink)',
      boxShadow: '3px 3px 0 0 var(--ink)',
      padding: '12px 12px 0'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/avo.png",
    alt: L(lang, 'Ana, ainda menina, com a avó e um troféu', 'Ana as a child, with her grandmother and a trophy'),
    style: {
      display: 'block',
      width: '100%',
      border: '1px solid var(--ink-30)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '13px 4px 16px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 16
    }
  }, L(lang, 'com a minha avó', 'with my grandmother')), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--text-faint)',
      marginTop: 3,
      letterSpacing: '0.04em'
    }
  }, L(lang, 'família · onde tudo começou', 'family · where it all began')))));
}
Object.assign(window.avapp = window.avapp || {}, {
  WSobre,
  WTese,
  WPublicacoes,
  WIus,
  WContato,
  WJustitia,
  WCv,
  WVo
});
})();