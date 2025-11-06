'use client';
import React from 'react';
import '@/app/styles/MascotLeopard.css';

type Vec = { x: number; y: number };

type Props = {
  /** tamaño del sprite en píxeles CSS (recomendado 128–196) */
  size?: number;
  /** velocidad base en px/frame aprox (0.4–1.2 recomendado) */
  speed?: number;
  /** cada cuántos segundos intentar esconderse */
  hideEverySec?: number;
  /** cuánto dura escondido (min, max) en segundos */
  hideForRangeSec?: [number, number];
};

const HIDE_TARGET_SELECTORS = ['.brew-card', '.prov-card', '.rlib-card', 'section', '.svcCard'];

export default function MascotLeopard({
  size = 176,
  speed = 0.7,
  hideEverySec = 12,
  hideForRangeSec = [1.8, 3.6],
}: Props): JSX.Element {
  const ref = React.useRef<HTMLDivElement>(null);
  const dirRef = React.useRef<1 | -1>(1);
  const pos = React.useRef<Vec>({ x: 48, y: 140 });
  const vel = React.useRef<Vec>({ x: speed, y: speed * 0.75 });
  const mouse = React.useRef<Vec | null>(null);
  const behind = React.useRef(false);
  const rafRef = React.useRef<number>(0);
  const chaseCooldown = React.useRef(0);

  // mouse tracking
  React.useEffect(() => {
    const onMove = (e: MouseEvent) => (mouse.current = { x: e.clientX, y: e.clientY });
    const onLeave = () => (mouse.current = null);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // esconderse detrás de un objetivo aleatorio
  React.useEffect(() => {
    let hideTimer: number;
    const schedule = () => {
      hideTimer = window.setTimeout(() => {
        goBehindRandomTarget();
        schedule();
      }, hideEverySec * 1000 + (Math.random() * 2000 - 1000));
    };
    schedule();
    return () => window.clearTimeout(hideTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hideEverySec]);

  function goBehindRandomTarget() {
    const el = ref.current;
    if (!el) return;
    const targets = document.querySelectorAll<HTMLElement>(HIDE_TARGET_SELECTORS.join(','));
    if (!targets.length) return;
    const pick = targets[Math.floor(Math.random() * targets.length)];
    const r = pick.getBoundingClientRect();

    const tx = r.left + r.width * (0.2 + Math.random() * 0.6);
    const ty = r.top + r.height * (0.3 + Math.random() * 0.5);

    pos.current.x = clamp(tx, 0, window.innerWidth - size);
    pos.current.y = clamp(ty, 0, window.innerHeight - size);

    el.classList.add('behind');
    behind.current = true;

    const [minS, maxS] = hideForRangeSec;
    const stayMs = (minS + Math.random() * (maxS - minS)) * 1000;
    window.setTimeout(() => {
      ref.current?.classList.remove('behind');
      behind.current = false;
    }, stayMs);
  }

  // animación principal
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // estilo base defensivo
    Object.assign(el.style, {
      position: 'fixed',
      left: '0px',
      top: '0px',
      width: `${size}px`,
      height: `${(size * 64) / 96}px`, // conserva aspecto 96×64
    });

    const SPR_W = size;
    const SPR_H = (size * 64) / 96;

    const step = () => {
      const ww = window.innerWidth;
      const wh = window.innerHeight;

      // comportamiento con el cursor
      if (mouse.current) {
        const dx = mouse.current.x - pos.current.x;
        const dy = mouse.current.y - pos.current.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 140) {
          // huir fuerte
          vel.current.x -= (dx / (dist || 1)) * 0.6;
          vel.current.y -= (dy / (dist || 1)) * 0.6;
          chaseCooldown.current = 60;
        } else if (chaseCooldown.current <= 0 && dist < 460 && Math.random() < 0.012) {
          // curiosidad ocasional
          vel.current.x += (dx / (dist || 1)) * 0.16;
          vel.current.y += (dy / (dist || 1)) * 0.16;
          chaseCooldown.current = 90;
        }
      }
      if (chaseCooldown.current > 0) chaseCooldown.current -= 1;

      // merodeo base
      vel.current.x += (Math.random() - 0.5) * 0.04;
      vel.current.y += (Math.random() - 0.5) * 0.04;

      pos.current.x += vel.current.x;
      pos.current.y += vel.current.y;

      // rebotes
      if (pos.current.x < 0 || pos.current.x + SPR_W > ww) vel.current.x *= -1;
      if (pos.current.y < 0 || pos.current.y + SPR_H > wh) vel.current.y *= -1;

      // clamp y freno
      pos.current.x = clamp(pos.current.x, 0, ww - SPR_W);
      pos.current.y = clamp(pos.current.y, 0, wh - SPR_H);
      vel.current.x *= 0.985;
      vel.current.y *= 0.985;

      // dirección (flip horizontal)
      dirRef.current = vel.current.x >= 0 ? 1 : -1;

      // aplicar transform
      el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) scaleX(${dirRef.current})`;

      // velocidad alimenta animaciones (piernas/cola)
      const spd = Math.min(1.7, Math.hypot(vel.current.x, vel.current.y));
      el.style.setProperty('--run-speed', `${0.7 + spd}`);

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [size]);

  // salto al click
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onClick = () => {
      el.classList.add('jump');
      vel.current.y -= 2.1;
      window.setTimeout(() => el.classList.remove('jump'), 360);
    };
    el.addEventListener('click', onClick);
    return () => el.removeEventListener('click', onClick);
  }, []);

  return (
    <div ref={ref} className="leopard" aria-hidden>
      {/* Sprite 96×64 “pixel grid”, escalado con pixelated */}
      <svg
        className="sprite"
        viewBox="0 0 96 64"
        width="96"
        height="64"
        shapeRendering="crispEdges"
        aria-hidden
      >
        {/* ===== PALETA ===== */}
        <defs>
          <style>{`
            .fur { fill: #C99A2E; }        /* dorado leopardo */
            .shade { fill: #B58722; }      /* sombra */
            .spot { fill: #3A2C0E; }       /* manchas */
            .muzzle { fill: #F3E0AD; }     /* hocico claro */
            .eyeW { fill: #FFFFFF; }
            .eyeB { fill: #111111; }
            .ear { fill: #7A5B20; }
            .pad { fill: #603A18; }        /* almohadillas patas */
          `}</style>
        </defs>

        {/* ===== COLA (segmentos animables con CSS) ===== */}
        <g className="tail">
          <rect x="6"  y="36" width="10" height="6"  className="fur" />
          <rect x="2"  y="34" width="8"  height="6"  className="fur" />
          <rect x="0"  y="31" width="6"  height="6"  className="fur" />
          <rect x="2"  y="28" width="6"  height="5"  className="fur" />
          <rect x="4"  y="26" width="5"  height="4"  className="fur" />
          <rect x="6"  y="24" width="4"  height="3"  className="fur" />
        </g>

        {/* ===== CUERPO ===== */}
        <rect x="18" y="26" width="46" height="24" className="fur" />
        <rect x="18" y="44" width="46" height="6"  className="shade" />   {/* barriguita sombreada */}
        {/* lomo "alto" */}
        <rect x="20" y="22" width="36" height="8"  className="fur" />

        {/* ===== CABEZA + OREJAS ===== */}
        <rect x="60" y="20" width="16" height="12" className="fur" />
        <rect x="76" y="22" width="4"  height="10" className="fur" />   {/* hocico adelanto */}
        {/* orejas */}
        <rect x="62" y="18" width="4"  height="4"  className="ear" />
        <rect x="72" y="18" width="4"  height="4"  className="ear" />
        {/* hocico claro */}
        <rect x="76" y="26" width="6" height="6" className="muzzle" />

        {/* ojos */}
        <rect x="66" y="24" width="3" height="2" className="eyeW" />
        <rect x="67" y="24" width="1" height="2" className="eyeB" />
        <rect x="72" y="24" width="3" height="2" className="eyeW" />
        <rect x="73" y="24" width="1" height="2" className="eyeB" />

        {/* ===== MANCHAS DEL CUERPO ===== */}
        ${[ // pares [x,y], mini patrones
          [24,28],[30,30],[36,28],[42,30],[48,28],[22,36],[28,38],[34,36],[40,38],[46,36]
        ].map(([x,y],i)=>`<rect x="${x}" y="${y}" width="3" height="3" class="spot" />`).join('')}
        ${[[54,34],[50,40],[38,42],[26,44]].map(([x,y])=>`<rect x="${x}" y="${y}" width="3" height="3" class="spot" />`).join('')}

        {/* ===== PATAS (animadas) ===== */}
        <g className="legs">
          {/* delanteras */}
          <g className="leg l1">
            <rect x="22" y="50" width="6" height="8" className="fur" />
            <rect x="22" y="56" width="6" height="2" className="pad" />
          </g>
          <g className="leg l2">
            <rect x="34" y="50" width="6" height="8" className="fur" />
            <rect x="34" y="56" width="6" height="2" className="pad" />
          </g>
          {/* traseras */}
          <g className="leg l3">
            <rect x="46" y="50" width="6" height="8" className="fur" />
            <rect x="46" y="56" width="6" height="2" className="pad" />
          </g>
          <g className="leg l4">
            <rect x="56" y="50" width="6" height="8" className="fur" />
            <rect x="56" y="56" width="6" height="2" className="pad" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}