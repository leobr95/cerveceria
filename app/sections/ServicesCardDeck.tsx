'use client';

import React from 'react';
import '@/app/styles/ServicesCardDeck.css';

/** ---------- Tipos ---------- */
type Item = {
  title: string;
  subtitle: string;
  points: string[];
  image: string; // usamos URLs remotas (luego podrás cambiarlas por archivos locales)
};

/** ⏱️ Configuración */
const AUTOPLAY_MS = 3000;
const TRANSITION_MS = 1750;

/** 🎨 Paleta para modo listado */
const PALETTE: Array<[string, string]> = [
  ['#9B8CFF', '#F58ADF'],
  ['#47D4FF', '#8D6BFF'],
  ['#00D2A8', '#4ADE80'],
  ['#FF8A8A', '#FFB36B'],
  ['#8D74FF', '#B46BFF'],
  ['#FF6FD8', '#FFD26F'],
];

/** 🖼️ Imágenes demo (reemplaza por las tuyas cuando quieras) */
const DATA: Item[] = [
  {
    title: 'Sitio Web Corporativo',
    subtitle: 'Presencia que vende',
    points: ['Mensaje claro', 'SEO listo', 'Rápido y seguro'],
    image:
      'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Tienda Online',
    subtitle: 'Vende 24/7',
    points: ['Carrito & checkout', 'Pagos locales', 'Inventario simple'],
    image:
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Reservas & Citas',
    subtitle: 'Agenda y recordatorios',
    points: ['Calendario', 'Adelantos', 'WhatsApp + email'],
    image:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Portal de Clientes',
    subtitle: 'Autoservicio y fidelización',
    points: ['Historial', 'Tickets', 'Notificaciones'],
    image:
      'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'App Móvil de Negocio',
    subtitle: 'Android/iOS desde tu web',
    points: ['PWA + Push', 'Publicación', 'Un solo código'],
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop',
  },
];

/** ---------- Hook: reveal en scroll ---------- */
function useScrollReveal(selector = '.reveal') {
  React.useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            if (el.dataset.revealOnce === 'true') io.unobserve(el);
          } else {
            // si quieres que “se oculte” al salir, comenta la siguiente línea para hacerlo one-shot
            el.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.18 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector]);
}

/** ---------- Hook: parallax suave ---------- */
function useParallax(selector = '[data-parallax]') {
  React.useEffect(() => {
    let raf = 0;
    const handler = () => {
      const els = document.querySelectorAll<HTMLElement>(selector);
      const vh = window.innerHeight;
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const ratio = (mid - vh / 2) / (vh / 2); // -1 (arriba) a +1 (abajo)
        const strength = Number(el.dataset.parallax) || 8; // px por ratio
        el.style.setProperty('--parallax-y', `${-ratio * strength}px`);
      });
      raf = requestAnimationFrame(handler);
    };
    raf = requestAnimationFrame(handler);
    return () => cancelAnimationFrame(raf);
  }, [selector]);
}

/** ---------- Componente principal ---------- */
export default function ServicesCardDeck(): JSX.Element {
  useScrollReveal();
  useParallax();

  const [i, setI] = React.useState(1);
  const [dir, setDir] = React.useState<'left' | 'right'>('right');
  const [showAll, setShowAll] = React.useState(false);
  const len = DATA.length;

  const pausedRef = React.useRef(false);

  const go = React.useCallback(
    (n: number) => {
      setDir(n > 0 ? 'right' : 'left');
      setI((prev) => (prev + n + len) % len);
    },
    [len]
  );

  // autoplay (pausa si hover/touch o showAll)
  React.useEffect(() => {
    const id = window.setInterval(() => {
      if (!pausedRef.current && !showAll) go(1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [showAll, go]);

  // drag/touch
  const startX = React.useRef<number | null>(null);
  function onStart(x: number) {
    pausedRef.current = true;
    startX.current = x;
  }
  function onEnd(x: number) {
    if (startX.current == null) {
      pausedRef.current = false;
      return;
    }
    const dx = x - startX.current;
    if (dx > 50) go(-1);
    if (dx < -50) go(1);
    startX.current = null;
    pausedRef.current = false;
  }

  // índices carrusel 2+centro+2
  const idxPrev2 = (i - 2 + len) % len;
  const idxPrev1 = (i - 1 + len) % len;
  const idxNext1 = (i + 1) % len;
  const idxNext2 = (i + 2) % len;

  const styleVars: React.CSSProperties = { ['--tms' as any]: `${TRANSITION_MS}ms` };

  return (
    <section className="svc container reveal" style={styleVars} data-reveal-once="true">
      <div className="svc-head" data-parallax="10">
        <h2 className="svc-title">Soluciones destacadas</h2>
        <p className="svc-sub">
          {showAll ? 'Selecciona el servicio que necesitas.' : 'Consulta alguna de nuestras soluciones destacadas.'}
        </p>
      </div>

      <div
        className={`svc-stage ${showAll ? 'showAll' : ''}`}
        onMouseEnter={() => {
          pausedRef.current = true;
          setShowAll(true);
        }}
        onMouseLeave={() => {
          setShowAll(false);
          pausedRef.current = false;
        }}
        onMouseDown={(e) => onStart(e.clientX)}
        onMouseUp={(e) => onEnd(e.clientX)}
        onTouchStart={(e) => onStart(e.touches[0].clientX)}
        onTouchEnd={(e) => onEnd(e.changedTouches[0].clientX)}
      >
        {!showAll && (
          <>
            <Card key={`far-left-${i}-${dir}`} item={DATA[idxPrev2]} role="back" pos="farLeft" />
            <Card key={`left-${i}-${dir}`} item={DATA[idxPrev1]} role="back" pos="left" />
            <Card key={`center-${i}`} item={DATA[i]} role="focus" pos="center" dir={dir} />
            <Card key={`right-${i}-${dir}`} item={DATA[idxNext1]} role="back" pos="right" />
            <Card key={`far-right-${i}-${dir}`} item={DATA[idxNext2]} role="back" pos="farRight" />
          </>
        )}

        {showAll && (
          <div className="svc-listGrid">
            {DATA.map((it, idx) => {
              const [c1, c2] = PALETTE[idx % PALETTE.length];
              const style: React.CSSProperties = { ['--c1' as any]: c1, ['--c2' as any]: c2 };
              return <Card key={`grid-${idx}`} item={it} role="list" pos="list" styleOverride={style} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- Carta ---------- */
function Card(props: {
  item: Item;
  role: 'focus' | 'back' | 'list';
  pos: 'farLeft' | 'left' | 'center' | 'right' | 'farRight' | 'list';
  dir?: 'left' | 'right';
  styleOverride?: React.CSSProperties;
}): JSX.Element {
  const { item, role, pos, dir = 'right', styleOverride } = props;
  const { title, subtitle, points, image } = item;

  return (
    <article
      className={`svcCard ${role} ${pos} ${pos === 'center' ? (dir === 'right' ? 'inRight' : 'inLeft') : ''} reveal`}
      style={styleOverride}
      data-reveal-once="true"
    >
      {/* Lienzo superior con blobs + parallax */}
      <div className="svc-art" data-parallax="8" style={{ transform: 'translateY(var(--parallax-y, 0px))' }}>
        {/* Imagen centrada (URLs remotas) */}
        <div className="svc-illus">
          <img src={image} alt={title} className="svc-illus-img" loading="lazy" />
        </div>

        <span className="svc-blob b1" />
        <span className="svc-blob b2" />
        <span className="svc-blob b3" />
      </div>

      {/* Panel inferior con contenido */}
      <div className="svc-panel">
        <h3 className="svc-t">{title}</h3>
        <p className="svc-s">{subtitle}</p>
        <ul className="svc-lst">
          {points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>

        <div className="svc-dock">
          <button
            className="svc-roundCta"
            onClick={() => {
              window.location.assign('#contact');
            }}
            aria-label="Solicitar"
            type="button"
          >
            ➜
          </button>
        </div>
      </div>
    </article>
  );
}
