'use client';

import * as React from 'react';
import type { StaticImageData } from 'next/image';
import {
  IoBusinessOutline,
  IoBagHandleOutline,
  IoCalendarOutline,
  IoPersonCircleOutline,
  IoPhonePortraitOutline,
  IoGitNetworkOutline,
} from 'react-icons/io5';
import type { IconType } from 'react-icons';

type Item = {
  title: string;
  subtitle?: string;
  image?: StaticImageData; // por si luego quieres un ícono/imagen propio
  icon: IconType;
};

/** Datos (puedes editar títulos/subtítulos si quieres) */
const ITEMS: ReadonlyArray<Item> = [
  { title: 'Sitio Web Corporativo', subtitle: 'Presencia & SEO', icon: IoBusinessOutline },
  { title: 'Tienda Online', subtitle: 'Ventas 24/7', icon: IoBagHandleOutline },
  { title: 'Reservas & Citas', subtitle: 'Agendamiento fácil', icon: IoCalendarOutline },
  { title: 'Portal de Clientes', subtitle: 'Autoservicio', icon: IoPersonCircleOutline },
  { title: 'App Móvil de Negocio', subtitle: 'Android & iOS', icon: IoPhonePortraitOutline },
  { title: 'Integraciones & Datos', subtitle: 'ERP/BI/ETL', icon: IoGitNetworkOutline },
] as const;

/** Gradientes para el fondo del chip del ícono */
const PALETTE: ReadonlyArray<readonly [string, string]> = [
  ['#7C3AED', '#EC4899'], // morado → rosa
  ['#47D4FF', '#8B5CF6'], // aqua → violeta
  ['#FF8A8A', '#FFB36B'], // coral → naranja
  ['#00C9A7', '#34D399'], // teal → verde
  ['#6B75FF', '#9E77ED'], // violeta
  ['#29D3E8', '#6B8BFF'], // aqua → violeta
] as const;

/** CSS custom props tipadas */
type CSSVars = React.CSSProperties & { '--g1'?: string; '--g2'?: string };

export default function ServicesTilesMobile(): React.JSX.Element | null {
  const [isMobile, setIsMobile] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  if (!isMobile) return null;

  return (
    <section className="svc-tiles" aria-labelledby="svc-tiles-heading">
      <h2 id="svc-tiles-heading" className="heading">
        Servicios destacados
      </h2>

      <div className="grid">
        {ITEMS.map((it, i) => {
          const [g1, g2] = PALETTE[i % PALETTE.length];
          const Icon = it.icon;
          const style: CSSVars = { '--g1': g1, '--g2': g2 };
          return (
            <a
              key={it.title}
              href="#contact"
              className="tile"
              style={style}
              aria-label={it.title}
            >
              <span className="iconWrap" aria-hidden>
                <span className="chipBg" />
                <Icon className="icon" />
              </span>

              <div className="txt">
                <span className="title">{it.title}</span>
                {it.subtitle ? <span className="sub">{it.subtitle}</span> : null}
              </div>
            </a>
          );
        })}
      </div>

      <style jsx>{`
        .svc-tiles {
          margin-top: 18px;
        }

        .heading {
          margin: 0 4px 12px;
          font-size: clamp(20px, 6vw, 24px);
          font-weight: 900;
          letter-spacing: 0.3px;
          background: var(--neo-grad, linear-gradient(135deg, #ec4899, #7c3aed));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        /* 2 columnas en móvil; 1 en pantallas muy angostas */
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 380px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }

        /* Tarjeta neumórfica blanca */
        .tile {
          display: grid;
          grid-template-columns: auto 1fr;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          min-height: 92px;
          border-radius: 16px;
          text-decoration: none;
          color: #1f2a44;

          background: var(--ui-bg, #edf1f6);
          box-shadow:
            10px 10px 22px rgba(163, 177, 198, 0.45),
            -10px -10px 22px rgba(255, 255, 255, 0.95);

          transition: transform 0.12s ease, box-shadow 0.18s ease;
        }
        .tile:active {
          transform: translateY(1px);
          box-shadow:
            8px 8px 18px rgba(163, 177, 198, 0.4),
            -8px -8px 18px rgba(255, 255, 255, 0.92);
        }

        /* Chip de ícono con degradé + sombras tipo neo */
        .iconWrap {
          position: relative;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: var(--ui-bg, #edf1f6);
          box-shadow:
            6px 6px 12px rgba(163, 177, 198, 0.35),
            -6px -6px 12px rgba(255, 255, 255, 0.95);
          isolation: isolate;
        }
        .chipBg {
          position: absolute;
          inset: 4px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--g1), var(--g2));
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25);
          z-index: -1;
        }
        .icon {
          color: #fff;
          font-size: 18px;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.18));
        }

        .txt {
          display: grid;
          gap: 2px;
        }
        .title {
          font-weight: 900;
          line-height: 1.15;
          font-size: 14px;
          letter-spacing: 0.2px;
        }
        .sub {
          font-size: 12px;
          color: #5b6a92;
          letter-spacing: 0.1px;
        }

        /* Dark mode */
        :global(html.dark) .tile {
          color: #dbe0ea;
          background: #0f1425;
          box-shadow:
            10px 10px 22px rgba(0, 0, 0, 0.6),
            -10px -10px 22px rgba(255, 255, 255, 0.06);
        }
        :global(html.dark) .sub {
          color: #9ca3af;
        }
        :global(html.dark) .iconWrap {
          background: #0f1425;
          box-shadow:
            6px 6px 12px rgba(0, 0, 0, 0.6),
            -6px -6px 12px rgba(255, 255, 255, 0.06);
        }
      `}</style>
    </section>
  );
}
