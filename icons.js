/* Retro desktop icons for the ana vanzin OS — crisp, pixel-leaning, brand palette.
   Exposed on window for sibling babel scripts. */

const _crisp = { shapeRendering: 'crispEdges' };

function FolderIcon({ size = 46 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" style={_crisp} aria-hidden="true">
      <rect x="4" y="11" width="22" height="8" fill="var(--gold)" stroke="var(--ink)" strokeWidth="1.6" />
      <rect x="4" y="16" width="40" height="26" fill="var(--gold-2)" stroke="var(--ink)" strokeWidth="1.6" />
      <rect x="4" y="16" width="40" height="6" fill="var(--gold)" />
      <line x1="4" y1="22" x2="44" y2="22" stroke="var(--ink)" strokeWidth="1.2" />
    </svg>
  );
}

function DocIcon({ size = 46 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" style={_crisp} aria-hidden="true">
      <path d="M11 4 H32 L39 11 V44 H11 Z" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.6" />
      <path d="M32 4 V11 H39 Z" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="1.6" />
      <line x1="16" y1="20" x2="34" y2="20" stroke="var(--rubric)" strokeWidth="1.6" />
      <line x1="16" y1="26" x2="34" y2="26" stroke="var(--ink-50)" strokeWidth="1.4" />
      <line x1="16" y1="31" x2="34" y2="31" stroke="var(--ink-50)" strokeWidth="1.4" />
      <line x1="16" y1="36" x2="28" y2="36" stroke="var(--ink-50)" strokeWidth="1.4" />
    </svg>
  );
}

function MailIcon({ size = 46 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" style={_crisp} aria-hidden="true">
      <rect x="5" y="12" width="38" height="26" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.6" />
      <path d="M5 13 L24 28 L43 13" fill="none" stroke="var(--ink)" strokeWidth="1.6" />
      <path d="M5 37 L19 24 M43 37 L29 24" fill="none" stroke="var(--ink-50)" strokeWidth="1.2" />
    </svg>
  );
}

function GroupIcon({ size = 46 }) {
  /* Ius Gentium — a stacked-rings device echoing the seal */
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" style={_crisp} aria-hidden="true">
      <circle cx="24" cy="24" r="18" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.6" />
      <circle cx="24" cy="24" r="13" fill="none" stroke="var(--gold)" strokeWidth="1.2" />
      <circle cx="18" cy="22" r="5" fill="var(--rubric)" />
      <circle cx="29" cy="22" r="5" fill="var(--ink)" />
      <path d="M11 34 q6 -8 13 -8 q7 0 13 8" fill="none" stroke="var(--ink)" strokeWidth="1.4" />
    </svg>
  );
}

function ImageIcon({ size = 46, src = 'assets/pixel-justitia.png' }) {
  return (
    <div style={{ width: size, height: size, background: 'var(--paper)', border: '1.6px solid var(--ink)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden', boxSizing: 'border-box' }}>
      <img src={src} alt="" style={{ height: '112%', width: 'auto', imageRendering: 'pixelated', marginBottom: '-4%' }} />
    </div>
  );
}

function SealIcon({ size = 46, src = 'assets/sun-seal.svg' }) {
  return <img src={src} alt="" width={size} height={size} style={{ display: 'block' }} />;
}

function QuoteIcon({ size = 46 }) {
  /* Citações — open quotation marks over a citation rule */
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" style={_crisp} aria-hidden="true">
      <rect x="6" y="8" width="36" height="32" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.6" />
      <rect x="6" y="8" width="36" height="6" fill="var(--gold)" />
      <line x1="6" y1="14" x2="42" y2="14" stroke="var(--ink)" strokeWidth="1.1" />
      <path d="M13 20 h6 v7 h-3 l-3 4 z" fill="var(--rubric)" stroke="var(--ink)" strokeWidth="1" />
      <path d="M23 20 h6 v7 h-3 l-3 4 z" fill="var(--rubric)" stroke="var(--ink)" strokeWidth="1" />
      <line x1="13" y1="35" x2="35" y2="35" stroke="var(--ink-50)" strokeWidth="1.4" />
    </svg>
  );
}

function CloseBox({ active }) {
  return (
    <span aria-hidden="true" style={{ width: 13, height: 13, border: '1.5px solid var(--ink)',
      background: 'var(--paper)', display: 'inline-block', boxSizing: 'border-box',
      opacity: active ? 1 : 0.4 }}></span>
  );
}

Object.assign(window, { FolderIcon, DocIcon, MailIcon, GroupIcon, ImageIcon, SealIcon, QuoteIcon, CloseBox });
