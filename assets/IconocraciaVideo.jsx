// IconocraciaVideo.jsx — cenas do explicador (motor: animations.jsx via window globals)
// Mantido fora do .dc.html porque .jsx é transpilado sob demanda pelo x-import.

const INK = '#211B16';
const PAPER = '#F2EAD9';
const RUBRIC = '#9B2C1C';
const GOLD = '#9C7C3D';
const REDDEEP = '#A23B2E';
const SERIF = "'Cormorant Garamond', Georgia, serif";
const SANS = "'Hanken Grotesk', system-ui, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, monospace";

// ── Caption: texto rico (aceita JSX) com entrada/saída tipo TextSprite ───────
function Caption({ children, x, y, w, size = 64, weight = 500, color = INK,
                  font = SERIF, italic = false, align = 'center', lh = 1.08,
                  ls = '0', entryDur = 0.55, exitDur = 0.4, rise = 22 }) {
  const { useSprite, Easing, clamp } = window;
  const { localTime, duration } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1, ty = 0;
  if (localTime < entryDur) {
    const t = Easing.easeOutCubic(clamp(localTime / entryDur, 0, 1));
    opacity = t; ty = (1 - t) * rise;
  } else if (localTime > exitStart) {
    const t = Easing.easeInCubic(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t; ty = -t * 10;
  }
  const tx = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: w, transform: `translate(${tx}, ${ty}px)`,
      opacity, textAlign: align,
      fontFamily: font, fontSize: size, fontWeight: weight,
      fontStyle: italic ? 'italic' : 'normal',
      color, lineHeight: lh, letterSpacing: ls,
      willChange: 'transform, opacity',
    }}>{children}</div>
  );
}

// ── RubricLine: filete que se desenha (scaleX 0→1) ──────────────────────────
function RubricLine({ x, y, w, color = RUBRIC, thickness = 2, origin = 'left',
                     drawDur = 0.9, exitDur = 0.4 }) {
  const { useSprite, Easing, clamp } = window;
  const { localTime, duration } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);
  let sx = 1, opacity = 1;
  if (localTime < drawDur) sx = Easing.easeInOutCubic(clamp(localTime / drawDur, 0, 1));
  if (localTime > exitStart) opacity = 1 - Easing.easeInCubic(clamp((localTime - exitStart) / exitDur, 0, 1));
  return (
    <div style={{
      position: 'absolute', left: x, top: y, width: w, height: thickness,
      background: color, transform: `scaleX(${sx})`, transformOrigin: origin,
      opacity, willChange: 'transform, opacity',
    }} />
  );
}

// ── Wash: véu de cor para mudar o clima de uma cena ─────────────────────────
function Wash({ color = INK, to = 0.28, fadeIn = 1.2, holdOut = 0.6 }) {
  const { useSprite, Easing, clamp } = window;
  const { localTime, duration } = useSprite();
  const outStart = Math.max(0, duration - holdOut);
  let op = to;
  if (localTime < fadeIn) op = to * Easing.easeOutCubic(clamp(localTime / fadeIn, 0, 1));
  else if (localTime > outStart) op = to * (1 - Easing.easeInCubic(clamp((localTime - outStart) / holdOut, 0, 1)));
  return <div style={{ position: 'absolute', inset: 0, background: color, opacity: op, pointerEvents: 'none' }} />;
}

// ── HeroImg: imagem grande de fundo, ken burns (zoom/pan) ───────────────────
function HeroImg({ src, x = 0, y = 0, w, h, fit = 'cover',
                  fromScale = 1.0, toScale = 1.06, panX = 0, panY = 0,
                  entryDur = 1.0, exitDur = 0.8, align = 'center' }) {
  const { useSprite, Easing, clamp } = window;
  const { localTime, duration } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1;
  const span = Math.max(0.001, exitStart - 0);
  const k = clamp(localTime / duration, 0, 1);
  const scale = fromScale + (toScale - fromScale) * Easing.easeInOutSine(clamp(localTime / Math.max(0.001, duration), 0, 1));
  const px = panX * k, py = panY * k;
  if (localTime < entryDur) opacity = Easing.easeOutCubic(clamp(localTime / entryDur, 0, 1));
  else if (localTime > exitStart) opacity = 1 - Easing.easeInCubic(clamp((localTime - exitStart) / exitDur, 0, 1));
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, opacity, overflow: 'hidden' }}>
      <img src={src} alt="" style={{
        width: '100%', height: '100%', objectFit: fit, objectPosition: align, display: 'block',
        transform: `scale(${scale}) translate(${px}px, ${py}px)`, transformOrigin: 'center',
        willChange: 'transform',
      }} />
    </div>
  );
}

// ── Plate: imagem emoldurada (montagem) com rótulo ──────────────────────────
function Plate({ src, x, y, w, h, fit = 'cover', label, name, year }) {
  const { useSprite, Easing, clamp } = window;
  const { localTime, duration } = useSprite();
  const ent = 0.38, ex = 0.32;
  const exitStart = Math.max(0, duration - ex);
  let op = 1, sc = 1, ty = 0;
  if (localTime < ent) { const t = Easing.easeOutCubic(clamp(localTime / ent, 0, 1)); op = t; sc = 0.97 + 0.03 * t; ty = (1 - t) * 20; }
  else if (localTime > exitStart) { const t = Easing.easeInCubic(clamp((localTime - exitStart) / ex, 0, 1)); op = 1 - t; sc = 1 + 0.015 * t; ty = -t * 8; }
  else { const hs = exitStart - ent; const ht = hs > 0 ? (localTime - ent) / hs : 0; sc = 1 + 0.035 * ht; }
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, opacity: op,
      transform: `translateY(${ty}px) scale(${sc})`, transformOrigin: 'center', textAlign: 'center' }}>
      <div style={{ width: w, height: h, padding: 10, background: PAPER, border: `1px solid ${INK}`,
        boxShadow: '0 16px 36px rgba(33,27,22,0.20)', boxSizing: 'border-box' }}>
        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: fit, display: 'block' }} />
      </div>
      <div style={{ marginTop: 18 }}>
        <div style={{ fontFamily: MONO, fontSize: 17, letterSpacing: '0.22em', textTransform: 'uppercase', color: RUBRIC }}>{label}</div>
        <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 38, color: INK, marginTop: 4 }}>{name}{year ? <span style={{ color: GOLD, fontStyle: 'normal', fontSize: 24 }}> · {year}</span> : null}</div>
      </div>
    </div>
  );
}

// ── Reveal: clip-path L→R (para o friso) ────────────────────────────────────
function Reveal({ src, x, y, w, h, drawDur = 1.6, entryDur = 0.6, exitDur = 0.6 }) {
  const { useSprite, Easing, clamp } = window;
  const { localTime, duration } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);
  const p = Easing.easeInOutCubic(clamp(localTime / drawDur, 0, 1));
  let opacity = 1;
  if (localTime < entryDur) opacity = Easing.easeOutCubic(clamp(localTime / entryDur, 0, 1));
  else if (localTime > exitStart) opacity = 1 - Easing.easeInCubic(clamp((localTime - exitStart) / exitDur, 0, 1));
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, opacity,
      clipPath: `inset(0 ${(1 - p) * 100}% 0 0)` }}>
      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
    </div>
  );
}

// ── ZoomImg: imagem que faz zoom-OUT revelando o todo (atlas) ───────────────
function ZoomImg({ src, x, y, w, h, fromScale = 2.1, toScale = 1.0,
                  entryDur = 1.2, exitDur = 0.8 }) {
  const { useSprite, Easing, clamp } = window;
  const { localTime, duration } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);
  const t = Easing.easeInOutCubic(clamp(localTime / Math.max(0.001, duration), 0, 1));
  const scale = fromScale + (toScale - fromScale) * t;
  let opacity = 1;
  if (localTime < entryDur) opacity = Easing.easeOutCubic(clamp(localTime / entryDur, 0, 1));
  else if (localTime > exitStart) opacity = 1 - Easing.easeInCubic(clamp((localTime - exitStart) / exitDur, 0, 1));
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, opacity, overflow: 'hidden' }}>
      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block',
        transform: `scale(${scale})`, transformOrigin: 'center', willChange: 'transform' }} />
    </div>
  );
}

// ── Eyebrow persistente (rótulo mono no topo) ───────────────────────────────
function Eyebrow({ text, x = 110, y = 84 }) {
  const { useSprite, Easing, clamp } = window;
  const { localTime, duration } = useSprite();
  const ent = 0.6, ex = 0.5;
  const exitStart = Math.max(0, duration - ex);
  let op = 1;
  if (localTime < ent) op = Easing.easeOutCubic(clamp(localTime / ent, 0, 1));
  else if (localTime > exitStart) op = 1 - Easing.easeInCubic(clamp((localTime - exitStart) / ex, 0, 1));
  return (
    <div style={{ position: 'absolute', left: x, top: y, opacity: op, display: 'flex', alignItems: 'center', gap: 14 }}>
      <span style={{ width: 30, height: 2, background: RUBRIC, display: 'inline-block' }} />
      <span style={{ fontFamily: MONO, fontSize: 18, letterSpacing: '0.28em', textTransform: 'uppercase', color: INK }}>{text}</span>
    </div>
  );
}

// ── Timecode invisível: marca data-screen-label por segundo (p/ comentários) ─
function Timecode() {
  const t = window.useTime();
  const sec = Math.floor(t);
  React.useEffect(() => {
    const el = document.getElementById('icono-video-root');
    if (el) el.setAttribute('data-screen-label', 'Vídeo t=' + sec + 's');
  }, [sec]);
  return null;
}

const A = 'assets/video/';
const C = 'assets/corpus/';
const M = 'assets/marianne/';

function IconocraciaVideo() {
  const [ready, setReady] = React.useState(!!window.Stage);
  React.useEffect(() => {
    if (window.Stage) { setReady(true); return; }
    const id = setInterval(() => { if (window.Stage) { setReady(true); clearInterval(id); } }, 30);
    return () => clearInterval(id);
  }, []);
  if (!ready) {
    return <div style={{ position: 'absolute', inset: 0, background: PAPER, display: 'flex',
      alignItems: 'center', justifyContent: 'center', fontFamily: SERIF, fontStyle: 'italic',
      fontSize: 40, color: INK }}>Iconocracia…</div>;
  }
  const { Stage, Sprite } = window;
  const DUR = 188;

  return (
    <div id="icono-video-root" style={{ position: 'absolute', inset: 0 }} data-screen-label="Vídeo t=0s">
      <Stage width={1920} height={1080} duration={DUR} background={PAPER} persistKey="iconocracia-video">
        <Timecode />

        {/* ───────── S1 · A PERGUNTA (0–18) ───────── */}
        <Sprite start={0} end={18.4}>
          <HeroImg src={A + 'justitia-trono.png'} x={210} y={40} w={1500} h={643}
            fit="contain" fromScale={1.0} toScale={1.07} panY={-8} entryDur={1.4} exitDur={1.0} />
        </Sprite>
        <Sprite start={3.4} end={18.2}>
          <RubricLine x={460} y={742} w={1000} thickness={2} drawDur={1.0} exitDur={0.6} />
        </Sprite>
        <Sprite start={5} end={10}>
          <Caption x={960} y={772} w={1200} align="center" italic size={62} color={INK}>
            O poder precisa de um rosto.
          </Caption>
        </Sprite>
        <Sprite start={10.6} end={18}>
          <Caption x={960} y={772} w={1300} align="center" italic size={72} color={INK}>
            Esse rosto é de <span style={{ color: RUBRIC }}>mulher</span>.
          </Caption>
        </Sprite>

        {/* ───────── S2 · OS ROSTOS (18–47) ───────── */}
        <Sprite start={18.3} end={36.6}>
          <Eyebrow text="os rostos do Estado" />
        </Sprite>
        <Sprite start={18.6} end={22.0}>
          <Plate src={C + 'fr-clesinger-republique-1900.jpg'} x={700} y={150} w={520} h={700}
            label="França" name="Marianne" year="1900" />
        </Sprite>
        <Sprite start={22.0} end={25.4}>
          <Plate src={C + 'uk-britannia-penny-1912.jpg'} x={660} y={185} w={600} h={600}
            label="Reino Unido" name="Britannia" year="1912" />
        </Sprite>
        <Sprite start={25.4} end={28.8}>
          <Plate src={C + 'us-educational-1896-c.png'} x={550} y={300} w={820} h={360}
            fit="contain" label="Estados Unidos" name="Columbia" year="1896" />
        </Sprite>
        <Sprite start={28.8} end={32.2}>
          <Plate src={C + 'br-villares-republica.jpg'} x={700} y={150} w={520} h={700}
            label="Brasil" name="A República" />
        </Sprite>
        <Sprite start={32.2} end={36.4}>
          <Plate src={C + 'fr-bruegel-justicia-1559.jpg'} x={610} y={210} w={700} h={600}
            fit="cover" label="Justiça" name="Iustitia" year="1559" />
        </Sprite>
        <Sprite start={37.0} end={41.6}>
          <Caption x={960} y={430} w={1400} align="center" italic size={96} color={INK}>
            Sempre uma mulher.
          </Caption>
        </Sprite>
        <Sprite start={42.0} end={47}>
          <Caption x={960} y={560} w={1400} align="center" italic size={96} color={RUBRIC}>
            Nunca uma cidadã.
          </Caption>
        </Sprite>

        {/* ───────── S3 · O PARADOXO / A LEI (47–75) ───────── */}
        <Sprite start={47} end={75.3}>
          <HeroImg src={A + 'natureza-morta.png'} x={235} y={-30} w={1450} h={1140}
            fit="contain" fromScale={1.02} toScale={1.16} panX={-10} panY={6} entryDur={1.2} exitDur={1.0} />
        </Sprite>
        <Sprite start={53} end={75.3}>
          <Wash color={INK} to={0.34} fadeIn={2.2} holdOut={1.0} />
        </Sprite>
        <Sprite start={48.4} end={53.4}>
          <Caption x={960} y={120} w={1300} align="center" italic size={70} color={INK}>
            Na imagem, ela reina.
          </Caption>
        </Sprite>
        <Sprite start={55} end={62}>
          <Caption x={960} y={120} w={1300} align="center" italic size={78} color={PAPER}>
            Na lei, ela <span style={{ color: '#E2786A' }}>desaparece</span>.
          </Caption>
        </Sprite>
        <Sprite start={62.6} end={75}>
          <div>
            <Caption x={960} y={836} w={1500} align="center" font={MONO} size={20} weight={500}
              color={'rgba(242,234,217,0.7)'} ls="0.18em">
              <span>1804 — 1957</span>
            </Caption>
            <Caption x={960} y={876} w={1500} align="center" italic size={52} color={PAPER}>
              A mulher casada perdia a própria nacionalidade.
            </Caption>
          </div>
        </Sprite>

        {/* ───────── S4 · ICONOCRACIA (75–96) ───────── */}
        <Sprite start={75.4} end={96.2}>
          <Reveal src={A + 'friso-divisor.png'} x={110} y={300} w={1700} h={480}
            drawDur={2.0} entryDur={0.6} exitDur={0.7} />
        </Sprite>
        <Sprite start={78} end={82.6}>
          <Caption x={960} y={150} w={1300} align="center" italic size={60} color={INK}>
            As imagens não ilustram o poder.
          </Caption>
        </Sprite>
        <Sprite start={83.2} end={88.4}>
          <Caption x={960} y={150} w={1300} align="center" italic size={66} color={INK}>
            Elas o <span style={{ color: RUBRIC }}>fabricam</span>.
          </Caption>
        </Sprite>
        <Sprite start={89} end={96}>
          <div>
            <Caption x={960} y={800} w={1400} align="center" italic size={120} weight={600} color={INK} ls="0.01em">
              Iconocracia
            </Caption>
            <Caption x={960} y={952} w={1400} align="center" font={MONO} size={20} color={RUBRIC} ls="0.26em">
              <span>O GOVERNO PELO VISÍVEL</span>
            </Caption>
          </div>
        </Sprite>

        {/* ───────── S5 · ENDURECIMENTO (96–118) ───────── */}
        <Sprite start={96.2} end={118.2}>
          <Eyebrow text="endurecimento" />
        </Sprite>
        <Sprite start={97.6} end={118}>
          <Plate src={C + 'fr-rops-republique-1871.jpg'} x={300} y={170} w={420} h={640}
            label="viva" name="encarnada" year="1871" />
        </Sprite>
        <Sprite start={101.4} end={118}>
          <Plate src={C + 'fr-ceres-5f-1849-c.png'} x={1200} y={250} w={420} h={420}
            fit="contain" label="emblema" name="serial" year="1849" />
        </Sprite>
        <Sprite start={100.6} end={118}>
          <div>
            <Caption x={960} y={446} w={360} align="center" italic size={120} color={GOLD}>→</Caption>
          </div>
        </Sprite>
        <Sprite start={108} end={113}>
          <Caption x={960} y={900} w={1500} align="center" italic size={58} color={INK}>
            O corpo vivo torna-se emblema.
          </Caption>
        </Sprite>
        <Sprite start={113.4} end={118}>
          <Caption x={960} y={900} w={1500} align="center" italic size={64} color={RUBRIC}>
            Quanto mais símbolo — menos sujeito.
          </Caption>
        </Sprite>

        {/* ───────── S5.5 · MARIANNE ENCARNADA (118–146) ───────── */}
        <Sprite start={118.2} end={146.2}>
          <Eyebrow text="marianne encarnada" />
        </Sprite>
        {/* beat 1 — Bardot: a alegoria ganha rosto real */}
        <Sprite start={118.6} end={124.6}>
          <Plate src={M + 'm-bardot-bust.png'} x={560} y={196} w={380} h={500}
            fit="cover" label="busto oficial" name="Bardot" year="1969" />
        </Sprite>
        <Sprite start={119.1} end={124.6}>
          <Plate src={M + 'm-bardot-photo.png'} x={985} y={196} w={375} h={500}
            fit="cover" label="a atriz" name="Brigitte" />
        </Sprite>
        <Sprite start={120.6} end={124.6}>
          <Caption x={960} y={846} w={1500} align="center" italic size={56} color={INK}>
            A alegoria ganha um rosto — sempre o de uma beldade.
          </Caption>
        </Sprite>
        {/* beat 2 — a irmã tropical */}
        <Sprite start={124.6} end={130.6}>
          <Plate src={M + 'image8.jpeg'} x={420} y={392} w={640} h={290}
            fit="cover" label="1 real" name="a República" year="cédula" />
        </Sprite>
        <Sprite start={125.0} end={130.6}>
          <Plate src={M + 'image9.png'} x={1120} y={150} w={340} h={600}
            fit="cover" label="monumento" name="Villares" />
        </Sprite>
        <Sprite start={126.4} end={130.6}>
          <Caption x={960} y={846} w={1500} align="center" italic size={56} color={INK}>
            A irmã tropical — circula nas mãos de todos.
          </Caption>
        </Sprite>
        {/* beat 3 — o corpo que protestou vira o rosto do Estado */}
        <Sprite start={130.6} end={138.4}>
          <Plate src={M + 'm-stamp.png'} x={585} y={206} w={340} h={470}
            fit="contain" label="selo · 2013" name="Marianne" />
        </Sprite>
        <Sprite start={131.1} end={138.4}>
          <Plate src={M + 'm-inna.png'} x={995} y={206} w={360} h={470}
            fit="cover" label="FEMEN · Inna" name="Shevchenko" />
        </Sprite>
        <Sprite start={130.9} end={138.4}>
          <Caption x={960} y={812} w={1500} align="center" italic size={52} color={INK}>
            Em 2013, o corpo que <span style={{ color: RUBRIC }}>protestou</span>
          </Caption>
        </Sprite>
        <Sprite start={134.0} end={138.4}>
          <Caption x={960} y={886} w={1500} align="center" italic size={58} color={INK}>
            foi escolhido como o rosto oficial do Estado.
          </Caption>
        </Sprite>
        {/* beat 4 — fecho (linha do PPTX) */}
        <Sprite start={138.4} end={146.2}>
          <Caption x={960} y={404} w={1500} align="center" italic size={62} color={INK} entryDur={0.9}>
            Talvez a República nunca tenha sido esculpida em mármore.
          </Caption>
        </Sprite>
        <Sprite start={140.8} end={146.2}>
          <Caption x={960} y={560} w={1500} align="center" italic size={76} color={RUBRIC} entryDur={0.9}>
            Talvez sempre tenha sido escrita na pele.
          </Caption>
        </Sprite>
        <Sprite start={139.2} end={146.2}>
          <RubricLine x={960} y={520} w={760} thickness={2} origin="center" drawDur={1.0} exitDur={0.5} />
        </Sprite>

        {/* ───────── S6 · O ATLAS (146–166) ───────── */}
        <Sprite start={146.2} end={166.3}>
          <ZoomImg src={A + 'atlas-constelacao.png'} x={420} y={20} w={1080} h={1040}
            fromScale={2.2} toScale={1.0} entryDur={1.4} exitDur={1.0} />
        </Sprite>
        <Sprite start={149} end={154}>
          <Caption x={960} y={92} w={1200} align="center" italic size={62} color={INK}>
            Tudo se conecta.
          </Caption>
        </Sprite>
        <Sprite start={158.5} end={166}>
          <Caption x={960} y={968} w={1500} align="center" italic size={62} color={INK}>
            Uma <span style={{ color: RUBRIC }}>gramática inteira</span> do poder.
          </Caption>
        </Sprite>

        {/* ───────── S7 · A FISSURA (166–178) ───────── */}
        <Sprite start={166.3} end={178.3}>
          <HeroImg src={A + 'justitia-trono.png'} x={210} y={40} w={1500} h={643}
            fit="contain" fromScale={1.08} toScale={1.18} panX={6} entryDur={1.0} exitDur={0.9} />
        </Sprite>
        <Sprite start={167.2} end={178.2}>
          <RubricLine x={960} y={540} w={900} thickness={3} origin="center" drawDur={1.1} exitDur={0.6} />
        </Sprite>
        <Sprite start={168.4} end={173.4}>
          <Caption x={960} y={788} w={1500} align="center" italic size={62} color={INK}>
            Mas toda imagem pode ser virada do avesso.
          </Caption>
        </Sprite>
        <Sprite start={173.8} end={178}>
          <Caption x={960} y={788} w={1500} align="center" italic size={70} color={RUBRIC}>
            Nomear é começar a recusar.
          </Caption>
        </Sprite>

        {/* ───────── S8 · CARTELA (178–188) ───────── */}
        <Sprite start={178.3} end={188}>
          <div>
            <Caption x={960} y={372} w={1500} align="center" italic size={170} weight={600} color={INK} ls="0.01em" entryDur={1.0}>
              Iconocracia
            </Caption>
          </div>
        </Sprite>
        <Sprite start={179.4} end={188}>
          <RubricLine x={660} y={596} w={600} thickness={2} origin="center" drawDur={1.1} exitDur={0.3} />
        </Sprite>
        <Sprite start={180} end={188}>
          <Caption x={960} y={628} w={1400} align="center" italic size={44} color={GOLD} entryDur={0.9}>
            a alegoria feminina na história da cultura jurídica
          </Caption>
        </Sprite>
        <Sprite start={180.8} end={188}>
          <Caption x={960} y={712} w={1400} align="center" font={MONO} size={20} color={INK} ls="0.24em" entryDur={0.9}>
            <span>SÉCULOS XIX–XX · SEIS NAÇÕES · UM CORPO SOBERANO</span>
          </Caption>
        </Sprite>
        <Sprite start={181.6} end={188}>
          <Caption x={960} y={868} w={1400} align="center" font={MONO} size={19} color={'rgba(33,27,22,0.6)'} ls="0.2em" entryDur={0.9}>
            <span>ANA VANZIN · PPGD / UFSC</span>
          </Caption>
        </Sprite>
      </Stage>
    </div>
  );
}

module.exports = { IconocraciaVideo, IconocraciaVideoVertical };

// ════════════════════════════════════════════════════════════════════════════
//  VERTICAL 9:16 (1080×1920) — mesma narrativa, re-disposta para stories/reels
// ════════════════════════════════════════════════════════════════════════════
function IconocraciaVideoVertical() {
  const [ready, setReady] = React.useState(!!window.Stage);
  React.useEffect(() => {
    if (window.Stage) { setReady(true); return; }
    const id = setInterval(() => { if (window.Stage) { setReady(true); clearInterval(id); } }, 30);
    return () => clearInterval(id);
  }, []);
  if (!ready) {
    return <div style={{ position: 'absolute', inset: 0, background: PAPER, display: 'flex',
      alignItems: 'center', justifyContent: 'center', fontFamily: SERIF, fontStyle: 'italic',
      fontSize: 40, color: INK }}>Iconocracia…</div>;
  }
  const { Stage, Sprite } = window;
  const DUR = 188;
  const CX = 540; // centro horizontal

  return (
    <div id="icono-video-root" style={{ position: 'absolute', inset: 0 }} data-screen-label="Vídeo 9:16 t=0s">
      <Stage width={1080} height={1920} duration={DUR} background={PAPER} persistKey="iconocracia-video-v">
        <Timecode />

        {/* ───────── S1 · A PERGUNTA ───────── */}
        <Sprite start={0} end={18.4}>
          <HeroImg src={A + 'justitia-trono.png'} x={40} y={420} w={1000} h={429}
            fit="contain" fromScale={1.0} toScale={1.07} panY={-8} entryDur={1.4} exitDur={1.0} />
        </Sprite>
        <Sprite start={3.4} end={18.2}>
          <RubricLine x={190} y={980} w={700} thickness={2} drawDur={1.0} exitDur={0.6} />
        </Sprite>
        <Sprite start={5} end={10}>
          <Caption x={CX} y={1040} w={900} align="center" italic size={62} color={INK}>
            O poder precisa de um rosto.
          </Caption>
        </Sprite>
        <Sprite start={10.6} end={18}>
          <Caption x={CX} y={1030} w={960} align="center" italic size={74} color={INK}>
            Esse rosto é de <span style={{ color: RUBRIC }}>mulher</span>.
          </Caption>
        </Sprite>

        {/* ───────── S2 · OS ROSTOS ───────── */}
        <Sprite start={18.3} end={36.6}><Eyebrow text="os rostos do Estado" x={70} y={150} /></Sprite>
        <Sprite start={18.6} end={22.0}>
          <Plate src={C + 'fr-clesinger-republique-1900.jpg'} x={290} y={470} w={500} h={760}
            label="França" name="Marianne" year="1900" />
        </Sprite>
        <Sprite start={22.0} end={25.4}>
          <Plate src={C + 'uk-britannia-penny-1912.jpg'} x={240} y={540} w={600} h={600}
            label="Reino Unido" name="Britannia" year="1912" />
        </Sprite>
        <Sprite start={25.4} end={28.8}>
          <Plate src={C + 'us-educational-1896-c.png'} x={90} y={640} w={900} h={400}
            fit="contain" label="Estados Unidos" name="Columbia" year="1896" />
        </Sprite>
        <Sprite start={28.8} end={32.2}>
          <Plate src={C + 'br-villares-republica.jpg'} x={290} y={470} w={500} h={760}
            label="Brasil" name="A República" />
        </Sprite>
        <Sprite start={32.2} end={36.4}>
          <Plate src={C + 'fr-bruegel-justicia-1559.jpg'} x={240} y={520} w={600} h={640}
            fit="cover" label="Justiça" name="Iustitia" year="1559" />
        </Sprite>
        <Sprite start={37.0} end={41.6}>
          <Caption x={CX} y={820} w={1000} align="center" italic size={104} color={INK}>
            Sempre uma mulher.
          </Caption>
        </Sprite>
        <Sprite start={42.0} end={47}>
          <Caption x={CX} y={1020} w={1000} align="center" italic size={104} color={RUBRIC}>
            Nunca uma cidadã.
          </Caption>
        </Sprite>

        {/* ───────── S3 · O PARADOXO / A LEI ───────── */}
        <Sprite start={47} end={75.3}>
          <HeroImg src={A + 'natureza-morta.png'} x={20} y={500} w={1040} h={818}
            fit="contain" fromScale={1.02} toScale={1.16} panX={-8} panY={6} entryDur={1.2} exitDur={1.0} />
        </Sprite>
        <Sprite start={53} end={75.3}><Wash color={INK} to={0.36} fadeIn={2.2} holdOut={1.0} /></Sprite>
        <Sprite start={48.4} end={53.4}>
          <Caption x={CX} y={300} w={1000} align="center" italic size={76} color={INK}>
            Na imagem, ela reina.
          </Caption>
        </Sprite>
        <Sprite start={55} end={62}>
          <Caption x={CX} y={300} w={1000} align="center" italic size={84} color={PAPER}>
            Na lei, ela <span style={{ color: '#E2786A' }}>desaparece</span>.
          </Caption>
        </Sprite>
        <Sprite start={62.6} end={75}>
          <div>
            <Caption x={CX} y={1520} w={1000} align="center" font={MONO} size={22} weight={500}
              color={'rgba(242,234,217,0.7)'} ls="0.18em"><span>1804 — 1957</span></Caption>
            <Caption x={CX} y={1566} w={1000} align="center" italic size={56} color={PAPER}>
              A mulher casada perdia a própria nacionalidade.
            </Caption>
          </div>
        </Sprite>

        {/* ───────── S4 · ICONOCRACIA ───────── */}
        <Sprite start={75.4} end={96.2}>
          <Reveal src={A + 'friso-divisor.png'} x={20} y={820} w={1040} h={294}
            drawDur={2.0} entryDur={0.6} exitDur={0.7} />
        </Sprite>
        <Sprite start={78} end={82.6}>
          <Caption x={CX} y={460} w={1000} align="center" italic size={64} color={INK}>
            As imagens não ilustram o poder.
          </Caption>
        </Sprite>
        <Sprite start={83.2} end={88.4}>
          <Caption x={CX} y={460} w={1000} align="center" italic size={70} color={INK}>
            Elas o <span style={{ color: RUBRIC }}>fabricam</span>.
          </Caption>
        </Sprite>
        <Sprite start={89} end={96}>
          <div>
            <Caption x={CX} y={1240} w={1040} align="center" italic size={128} weight={600} color={INK} ls="0.01em">
              Iconocracia
            </Caption>
            <Caption x={CX} y={1410} w={1040} align="center" font={MONO} size={22} color={RUBRIC} ls="0.26em">
              <span>O GOVERNO PELO VISÍVEL</span>
            </Caption>
          </div>
        </Sprite>

        {/* ───────── S5 · ENDURECIMENTO ───────── */}
        <Sprite start={96.2} end={118.2}><Eyebrow text="endurecimento" x={70} y={150} /></Sprite>
        <Sprite start={97.6} end={118}>
          <Plate src={C + 'fr-rops-republique-1871.jpg'} x={330} y={300} w={420} h={620}
            label="viva" name="encarnada" year="1871" />
        </Sprite>
        <Sprite start={100.6} end={118}>
          <Caption x={CX} y={1010} w={360} align="center" size={110} color={GOLD}>↓</Caption>
        </Sprite>
        <Sprite start={101.4} end={118}>
          <Plate src={C + 'fr-ceres-5f-1849-c.png'} x={340} y={1160} w={400} h={400}
            fit="contain" label="emblema" name="serial" year="1849" />
        </Sprite>
        <Sprite start={108} end={113}>
          <Caption x={CX} y={1700} w={1000} align="center" italic size={58} color={INK}>
            O corpo vivo torna-se emblema.
          </Caption>
        </Sprite>
        <Sprite start={113.4} end={118}>
          <Caption x={CX} y={1700} w={1000} align="center" italic size={62} color={RUBRIC}>
            Quanto mais símbolo — menos sujeito.
          </Caption>
        </Sprite>

        {/* ───────── S5.5 · MARIANNE ENCARNADA ───────── */}
        <Sprite start={118.2} end={146.2}><Eyebrow text="marianne encarnada" x={70} y={150} /></Sprite>
        {/* beat 1 — Bardot */}
        <Sprite start={118.6} end={124.6}>
          <Plate src={M + 'm-bardot-bust.png'} x={85} y={520} w={440} h={580}
            fit="cover" label="busto oficial" name="Bardot" year="1969" />
        </Sprite>
        <Sprite start={119.1} end={124.6}>
          <Plate src={M + 'm-bardot-photo.png'} x={555} y={520} w={440} h={580}
            fit="cover" label="a atriz" name="Brigitte" />
        </Sprite>
        <Sprite start={120.6} end={124.6}>
          <Caption x={CX} y={1280} w={1000} align="center" italic size={56} color={INK}>
            A alegoria ganha um rosto — sempre o de uma beldade.
          </Caption>
        </Sprite>
        {/* beat 2 — a irmã tropical */}
        <Sprite start={124.6} end={130.6}>
          <Plate src={M + 'image8.jpeg'} x={140} y={500} w={800} h={363}
            fit="cover" label="1 real" name="a República" year="cédula" />
        </Sprite>
        <Sprite start={125.0} end={130.6}>
          <Plate src={M + 'image9.png'} x={360} y={960} w={360} h={600}
            fit="cover" label="monumento" name="Villares" />
        </Sprite>
        <Sprite start={126.4} end={130.6}>
          <Caption x={CX} y={1700} w={1000} align="center" italic size={56} color={INK}>
            A irmã tropical — circula nas mãos de todos.
          </Caption>
        </Sprite>
        {/* beat 3 — o corpo que protestou vira o rosto do Estado */}
        <Sprite start={130.6} end={138.4}>
          <Plate src={M + 'm-stamp.png'} x={95} y={540} w={420} h={580}
            fit="contain" label="selo · 2013" name="Marianne" />
        </Sprite>
        <Sprite start={131.1} end={138.4}>
          <Plate src={M + 'm-inna.png'} x={565} y={540} w={420} h={580}
            fit="cover" label="FEMEN · Inna" name="Shevchenko" />
        </Sprite>
        <Sprite start={130.9} end={138.4}>
          <Caption x={CX} y={1300} w={1000} align="center" italic size={54} color={INK}>
            Em 2013, o corpo que <span style={{ color: RUBRIC }}>protestou</span>
          </Caption>
        </Sprite>
        <Sprite start={134.0} end={138.4}>
          <Caption x={CX} y={1392} w={1000} align="center" italic size={60} color={INK}>
            foi escolhido como o rosto oficial do Estado.
          </Caption>
        </Sprite>
        {/* beat 4 — fecho */}
        <Sprite start={138.4} end={146.2}>
          <Caption x={CX} y={760} w={1000} align="center" italic size={68} color={INK} entryDur={0.9}>
            Talvez a República nunca tenha sido esculpida em mármore.
          </Caption>
        </Sprite>
        <Sprite start={139.2} end={146.2}>
          <RubricLine x={CX} y={1000} w={760} thickness={2} origin="center" drawDur={1.0} exitDur={0.5} />
        </Sprite>
        <Sprite start={140.8} end={146.2}>
          <Caption x={CX} y={1060} w={1000} align="center" italic size={82} color={RUBRIC} entryDur={0.9}>
            Talvez sempre tenha sido escrita na pele.
          </Caption>
        </Sprite>

        {/* ───────── S6 · O ATLAS ───────── */}
        <Sprite start={146.2} end={166.3}>
          <ZoomImg src={A + 'atlas-constelacao.png'} x={20} y={460} w={1040} h={1000}
            fromScale={2.2} toScale={1.0} entryDur={1.4} exitDur={1.0} />
        </Sprite>
        <Sprite start={149} end={154}>
          <Caption x={CX} y={320} w={1000} align="center" italic size={66} color={INK}>
            Tudo se conecta.
          </Caption>
        </Sprite>
        <Sprite start={158.5} end={166}>
          <Caption x={CX} y={1540} w={1000} align="center" italic size={66} color={INK}>
            Uma <span style={{ color: RUBRIC }}>gramática inteira</span> do poder.
          </Caption>
        </Sprite>

        {/* ───────── S7 · A FISSURA ───────── */}
        <Sprite start={166.3} end={178.3}>
          <HeroImg src={A + 'justitia-trono.png'} x={40} y={560} w={1000} h={429}
            fit="contain" fromScale={1.08} toScale={1.18} panX={6} entryDur={1.0} exitDur={0.9} />
        </Sprite>
        <Sprite start={167.2} end={178.2}>
          <RubricLine x={CX} y={1050} w={760} thickness={3} origin="center" drawDur={1.1} exitDur={0.6} />
        </Sprite>
        <Sprite start={168.4} end={173.4}>
          <Caption x={CX} y={1180} w={1000} align="center" italic size={64} color={INK}>
            Mas toda imagem pode ser virada do avesso.
          </Caption>
        </Sprite>
        <Sprite start={173.8} end={178}>
          <Caption x={CX} y={1180} w={1000} align="center" italic size={72} color={RUBRIC}>
            Nomear é começar a recusar.
          </Caption>
        </Sprite>

        {/* ───────── S8 · CARTELA ───────── */}
        <Sprite start={178.3} end={188}>
          <Caption x={CX} y={760} w={1040} align="center" italic size={150} weight={600} color={INK} ls="0.01em" entryDur={1.0}>
            Iconocracia
          </Caption>
        </Sprite>
        <Sprite start={179.4} end={188}>
          <RubricLine x={CX} y={960} w={560} thickness={2} origin="center" drawDur={1.1} exitDur={0.3} />
        </Sprite>
        <Sprite start={180} end={188}>
          <Caption x={CX} y={1000} w={1000} align="center" italic size={46} color={GOLD} entryDur={0.9}>
            a alegoria feminina na história da cultura jurídica
          </Caption>
        </Sprite>
        <Sprite start={180.8} end={188}>
          <Caption x={CX} y={1110} w={1040} align="center" font={MONO} size={20} color={INK} ls="0.2em" entryDur={0.9}>
            <span>SÉCULOS XIX–XX · SEIS NAÇÕES · UM CORPO SOBERANO</span>
          </Caption>
        </Sprite>
        <Sprite start={181.6} end={188}>
          <Caption x={CX} y={1260} w={1040} align="center" font={MONO} size={19} color={'rgba(33,27,22,0.6)'} ls="0.2em" entryDur={0.9}>
            <span>ANA VANZIN · PPGD / UFSC</span>
          </Caption>
        </Sprite>
      </Stage>
    </div>
  );
}
