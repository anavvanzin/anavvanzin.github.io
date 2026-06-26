/*IIFE*/(function(){
/* Retro desktop icons for the ana vanzin OS — crisp, pixel-leaning, brand palette.
   Exposed on window for sibling babel scripts. */

const _crisp = {
  shapeRendering: 'crispEdges'
};
function FolderIcon({
  size = 46
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    style: _crisp,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "11",
    width: "22",
    height: "8",
    fill: "var(--gold)",
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "16",
    width: "40",
    height: "26",
    fill: "var(--gold-2)",
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "16",
    width: "40",
    height: "6",
    fill: "var(--gold)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "22",
    x2: "44",
    y2: "22",
    stroke: "var(--ink)",
    strokeWidth: "1.2"
  }));
}
function DocIcon({
  size = 46
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    style: _crisp,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M11 4 H32 L39 11 V44 H11 Z",
    fill: "var(--paper)",
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M32 4 V11 H39 Z",
    fill: "var(--paper-deep)",
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "20",
    x2: "34",
    y2: "20",
    stroke: "var(--rubric)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "26",
    x2: "34",
    y2: "26",
    stroke: "var(--ink-50)",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "31",
    x2: "34",
    y2: "31",
    stroke: "var(--ink-50)",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "36",
    x2: "28",
    y2: "36",
    stroke: "var(--ink-50)",
    strokeWidth: "1.4"
  }));
}
function MailIcon({
  size = 46
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    style: _crisp,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "5",
    y: "12",
    width: "38",
    height: "26",
    fill: "var(--paper)",
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 13 L24 28 L43 13",
    fill: "none",
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 37 L19 24 M43 37 L29 24",
    fill: "none",
    stroke: "var(--ink-50)",
    strokeWidth: "1.2"
  }));
}
function GroupIcon({
  size = 46
}) {
  /* Ius Gentium — a stacked-rings device echoing the seal */
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    style: _crisp,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "24",
    cy: "24",
    r: "18",
    fill: "var(--paper)",
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "24",
    cy: "24",
    r: "13",
    fill: "none",
    stroke: "var(--gold)",
    strokeWidth: "1.2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "22",
    r: "5",
    fill: "var(--rubric)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "29",
    cy: "22",
    r: "5",
    fill: "var(--ink)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11 34 q6 -8 13 -8 q7 0 13 8",
    fill: "none",
    stroke: "var(--ink)",
    strokeWidth: "1.4"
  }));
}
function ImageIcon({
  size = 46,
  src = '/assets/pixel-justitia.png'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      background: 'var(--paper)',
      border: '1.6px solid var(--ink)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    style: {
      height: '112%',
      width: 'auto',
      imageRendering: 'pixelated',
      marginBottom: '-4%'
    }
  }));
}
function SealIcon({
  size = 46,
  src = '/assets/sun-seal.svg'
}) {
  return /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    width: size,
    height: size,
    style: {
      display: 'block'
    }
  });
}
function QuoteIcon({
  size = 46
}) {
  /* Citações — open quotation marks over a citation rule */
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    style: _crisp,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "6",
    y: "8",
    width: "36",
    height: "32",
    fill: "var(--paper)",
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "6",
    y: "8",
    width: "36",
    height: "6",
    fill: "var(--gold)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "14",
    x2: "42",
    y2: "14",
    stroke: "var(--ink)",
    strokeWidth: "1.1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13 20 h6 v7 h-3 l-3 4 z",
    fill: "var(--rubric)",
    stroke: "var(--ink)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M23 20 h6 v7 h-3 l-3 4 z",
    fill: "var(--rubric)",
    stroke: "var(--ink)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "13",
    y1: "35",
    x2: "35",
    y2: "35",
    stroke: "var(--ink-50)",
    strokeWidth: "1.4"
  }));
}
function AtlasIcon({
  size = 46
}) {
  /* ICONOCRACIA atlas — a Warburg mounting board with specimen tiles */
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    style: _crisp,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "5",
    y: "6",
    width: "38",
    height: "36",
    fill: "var(--ink)",
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "10",
    width: "12",
    height: "11",
    fill: "var(--paper)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "27",
    y: "10",
    width: "12",
    height: "11",
    fill: "var(--gold-2)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "27",
    width: "12",
    height: "11",
    fill: "var(--paper-deep)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "27",
    y: "27",
    width: "12",
    height: "11",
    fill: "var(--paper)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "27",
    y: "10",
    width: "12",
    height: "11",
    fill: "none",
    stroke: "var(--rubric)",
    strokeWidth: "1.6"
  }));
}
function WorksIcon({
  size = 46
}) {
  /* Trabalhos — a dossier of stacked sheets with a rubric clip */
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    style: _crisp,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "10",
    width: "26",
    height: "31",
    fill: "var(--paper-deep)",
    stroke: "var(--ink)",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13",
    y: "7",
    width: "26",
    height: "31",
    fill: "var(--paper)",
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "22",
    y: "4",
    width: "8",
    height: "5",
    fill: "var(--rubric)",
    stroke: "var(--ink)",
    strokeWidth: "1.2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "17",
    x2: "34",
    y2: "17",
    stroke: "var(--ink-50)",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "22",
    x2: "34",
    y2: "22",
    stroke: "var(--ink-50)",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "27",
    x2: "30",
    y2: "27",
    stroke: "var(--ink-50)",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "32",
    x2: "34",
    y2: "32",
    stroke: "var(--gold)",
    strokeWidth: "1.6"
  }));
}
function CloseBox({
  active
}) {
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 13,
      height: 13,
      border: '1.5px solid var(--ink)',
      background: 'var(--paper)',
      display: 'inline-block',
      boxSizing: 'border-box',
      opacity: active ? 1 : 0.4
    }
  });
}
Object.assign(window.avapp = window.avapp || {}, {
  FolderIcon,
  DocIcon,
  MailIcon,
  GroupIcon,
  ImageIcon,
  SealIcon,
  QuoteIcon,
  AtlasIcon,
  WorksIcon,
  CloseBox
});
})();