'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  IoTrophyOutline,
  IoCodeSlashOutline,
  IoVideocamOutline,
  IoPeopleOutline,
  IoClose,
  IoChevronBack,
  IoChevronForward,
} from 'react-icons/io5';
import type { IconType } from 'react-icons';

/* ================== Tipos ================== */
type MediaImage = { kind: 'image'; src: string; alt?: string; width?: number; height?: number };
type MediaYouTube = { kind: 'youtube'; url: string; title?: string };
type Media = MediaImage | MediaYouTube;

type ServiceItem = {
  title: string;
  desc: string;
  icon: IconType;
  media?: Media[]; // opcional
};

type CSSVars = React.CSSProperties & { ['--g1']?: string; ['--g2']?: string };

/* ====== Util: placeholder SVG por si no tienes imágenes aún ====== */
const placeholderSvg =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#e6ecf7"/>
          <stop offset="1" stop-color="#f7f9ff"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <g fill="#9aa6bf" font-family="Inter, Arial" font-size="32">
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle">Imagen de ejemplo</text>
      </g>
    </svg>`
  );

/* ================== Datos internos ================== */
const SERVICES: ServiceItem[] = [
  {
    title: 'Diseñado por expertos',
    desc: 'Arquitecturas modernas, rendimiento real y mejores prácticas desde el día uno.',
    icon: IoTrophyOutline,
    media: [
      { kind: 'image', src: placeholderSvg, alt: 'Arquitectura' },
      { kind: 'youtube', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Demo breve' },
    ],
  },
  {
    title: 'Basado en proyectos',
    desc: 'Entregamos funcionalidades medibles con foco en impacto de negocio.',
    icon: IoCodeSlashOutline,
    media: [{ kind: 'image', src: placeholderSvg, alt: 'Tablero de proyecto' }],
  },
  {
    title: 'Clases online y en vivo',
    desc: 'Acompañamiento, demos y feedback en tiempo real durante el desarrollo.',
    icon: IoVideocamOutline,
    media: [{ kind: 'youtube', url: 'https://www.youtube.com/embed/aqz-KE-bpKQ', title: 'Streaming 4K' }],
  },
  {
    title: 'Cursada personalizada',
    desc: 'Trabajo cercano con tu equipo y alcance alineado a tus objetivos.',
    icon: IoPeopleOutline,
    media: [{ kind: 'image', src: placeholderSvg, alt: 'Sesión 1:1' }],
  },
];

/** Paleta de degradé para el fondo del ícono (por índice) */
const PALETTE: Array<[string, string]> = [
  ['#7C3AED', '#EC4899'], // morado → rosa
  ['#47D4FF', '#8B5CF6'], // aqua → violeta
  ['#FF8A8A', '#FFB36B'], // coral → naranja
  ['#00C9A7', '#34D399'], // teal → verde
];

/* ================== Componente ================== */
export default function ServicesNeumorphicGrid(): React.JSX.Element {
  // Modal state
  const [open, setOpen] = React.useState(false);
  const [svcIndex, setSvcIndex] = React.useState<number>(0);
  const [mediaIndex, setMediaIndex] = React.useState<number>(0);

  const currentMedia = open ? SERVICES[svcIndex]?.media ?? [] : [];
  const hasMedia = (i: number) => (SERVICES[i].media?.length ?? 0) > 0;

  // Bloquear scroll del body cuando modal está abierto
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Cerrar con ESC
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowRight') nextMedia();
      if (e.key === 'ArrowLeft') prevMedia();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, mediaIndex, svcIndex]);

  function openGallery(index: number) {
    setSvcIndex(index);
    setMediaIndex(0);
    setOpen(true);
  }
  function closeGallery() {
    setOpen(false);
  }
  function nextMedia() {
    const m = SERVICES[svcIndex].media ?? [];
    if (m.length < 2) return;
    setMediaIndex((v) => (v + 1) % m.length);
  }
  function prevMedia() {
    const m = SERVICES[svcIndex].media ?? [];
    if (m.length < 2) return;
    setMediaIndex((v) => (v - 1 + m.length) % m.length);
  }

  return (
    <section className="svc-why">
      <h2 className="svc-title">Servicios destacados</h2>

      <div className="svc-grid">
        {SERVICES.map((it, i) => {
          const [g1, g2] = PALETTE[i % PALETTE.length];
          const Icon = it.icon;
          const style: CSSVars = { '--g1': g1, '--g2': g2 };
          return (
            <article key={it.title} className="svc-card" style={style}>
              <div className="svc-header">
                <h3 className="svc-h3">{it.title}</h3>
                <span className="svc-iconWrap" aria-hidden>
                  <span className="svc-iconBg" />
                  <Icon className="svc-icon" />
                </span>
              </div>

              <span className="svc-divider" aria-hidden />

              <p className="svc-desc">{it.desc}</p>

              {hasMedia(i) && (
                <div className="svc-actions">
                  <button
                    type="button"
                    className="btn-soft"
                    onClick={() => openGallery(i)}
                    aria-label={`Ver detalles de ${it.title}`}
                  >
                    Ver detalle
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* ===== Modal Galería ===== */}
      {open && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            // Cerrar solo si clic fuera del cuadro
            if (e.target === e.currentTarget) closeGallery();
          }}
        >
          <div className="modal-card">
            <button className="modal-close" onClick={closeGallery} aria-label="Cerrar">
              <IoClose size={22} />
            </button>

            {/* Marco neumórfico del contenido */}
            <div className="media-frame">
              {currentMedia[mediaIndex]?.kind === 'image' && (
                <figure className="media-figure">
                  <Image
                    src={(currentMedia[mediaIndex] as MediaImage).src}
                    alt={(currentMedia[mediaIndex] as MediaImage).alt ?? 'Imagen de servicio'}
                    width={(currentMedia[mediaIndex] as MediaImage).width ?? 1280}
                    height={(currentMedia[mediaIndex] as MediaImage).height ?? 800}
                    sizes="(max-width: 800px) 90vw, 800px"
                    className="media-img"
                    style={{ width: '100%', height: 'auto' }}
                    priority
                  />
                </figure>
              )}

              {currentMedia[mediaIndex]?.kind === 'youtube' && (
                <div className="media-yt">
                  <iframe
                    className="media-yt-iframe"
                    src={(currentMedia[mediaIndex] as MediaYouTube).url}
                    title={(currentMedia[mediaIndex] as MediaYouTube).title ?? 'Video de detalle'}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              )}
            </div>

            {/* Controles siguiente/anterior si hay varias piezas */}
            {currentMedia.length > 1 && (
              <div className="media-nav">
                <button type="button" className="nav-btn" onClick={prevMedia} aria-label="Anterior">
                  <IoChevronBack size={22} />
                </button>
                <span className="nav-indicator">
                  {mediaIndex + 1} / {currentMedia.length}
                </span>
                <button type="button" className="nav-btn" onClick={nextMedia} aria-label="Siguiente">
                  <IoChevronForward size={22} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===== Estilos ===== */}
      <style jsx>{`
        .svc-why {
          margin: 34px 0 16px;
        }

        .svc-title {
          font-size: clamp(22px, 4.6vw, 42px);
          font-weight: 900;
          letter-spacing: 0.2px;
          margin: 0 0 18px;
          background: var(--neo-grad, linear-gradient(135deg, #ec4899, #7c3aed));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-fill-color: transparent;
        }

        /* Grilla 4 / 2 / 1 -> visible también en móviles */
        .svc-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }
        @media (max-width: 1024px) {
          .svc-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 500px) {
          .svc-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Tarjeta neumórfica */
        .svc-card {
          border-radius: 20px;
          padding: 18px;
          background: var(--ui-bg, #edf1f6);
          box-shadow:
            12px 12px 24px rgba(163, 177, 198, 0.45),
            -12px -12px 24px rgba(255, 255, 255, 0.95);
          transition: transform 0.15s ease, box-shadow 0.2s ease;
        }
        .svc-card:hover {
          transform: translateY(-2px);
          box-shadow:
            16px 16px 32px rgba(163, 177, 198, 0.45),
            -16px -16px 32px rgba(255, 255, 255, 0.96);
        }

        .svc-header {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 12px;
        }
        .svc-h3 {
          margin: 0;
          font-size: clamp(18px, 2.4vw, 22px);
          font-weight: 900;
          color: #1f2a44;
        }

        /* Ícono con degradé y sombra neumórfica */
        .svc-iconWrap {
          position: relative;
          width: 64px;
          height: 64px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          isolation: isolate;
          background: var(--ui-bg, #edf1f6);
          box-shadow:
            6px 6px 14px rgba(163, 177, 198, 0.35),
            -6px -6px 14px rgba(255, 255, 255, 0.95);
        }
        .svc-iconBg {
          position: absolute;
          inset: 6px;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--g1), var(--g2));
          filter: saturate(1.05);
          z-index: -1;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.28);
        }
        .svc-icon {
          font-size: 28px;
          color: #ffffff;
          filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.18));
        }

        .svc-divider {
          display: block;
          height: 1px;
          margin: 14px 0 12px;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.08),
            rgba(0, 0, 0, 0.06),
            rgba(0, 0, 0, 0.04),
            rgba(0, 0, 0, 0)
          );
        }

        .svc-desc {
          margin: 0;
          color: #475569;
          line-height: 1.45;
          font-size: 15px;
          font-weight: 500;
        }

        .svc-actions {
          margin-top: 14px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .btn-soft {
          border: 0;
          cursor: pointer;
          padding: 10px 14px;
          border-radius: 14px;
          font-weight: 900;
          background: var(--ui-bg, #edf1f6);
          color: #1f2a44;
          box-shadow:
            8px 8px 18px rgba(163, 177, 198, 0.35),
            -8px -8px 18px rgba(255, 255, 255, 0.95);
        }

        /* Dark */
        :global(html.dark) .svc-card {
          background: #0f1425;
          box-shadow:
            12px 12px 24px rgba(0, 0, 0, 0.6),
            -12px -12px 24px rgba(255, 255, 255, 0.06);
        }
        :global(html.dark) .svc-h3 {
          color: #e5e7eb;
        }
        :global(html.dark) .svc-desc {
          color: #9ca3af;
        }
        :global(html.dark) .svc-iconWrap {
          background: #0f1425;
          box-shadow:
            6px 6px 14px rgba(0, 0, 0, 0.6),
            -6px -6px 14px rgba(255, 255, 255, 0.06);
        }
        :global(html.dark) .svc-divider {
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.08),
            rgba(255, 255, 255, 0.06),
            rgba(255, 255, 255, 0.04),
            rgba(255, 255, 255, 0)
          );
        }
        :global(html.dark) .btn-soft {
          color: #e5e7eb;
          background: #0f1425;
          box-shadow:
            8px 8px 18px rgba(0, 0, 0, 0.6),
            -8px -8px 18px rgba(255, 255, 255, 0.06);
        }

        /* ===== Modal ===== */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 90;
          background: rgba(0, 0, 0, 0.35);
          display: grid;
          place-items: center;
          padding: 16px;
        }
        .modal-card {
          position: relative;
          max-width: min(920px, 96vw);
          width: 100%;
          border-radius: 22px;
          padding: 16px;
          background: var(--ui-bg, #edf1f6);
          box-shadow:
            16px 16px 32px rgba(163, 177, 198, 0.45),
            -16px -16px 32px rgba(255, 255, 255, 0.95);
        }
        :global(html.dark) .modal-card {
          background: #0f1425;
          box-shadow:
            16px 16px 32px rgba(0, 0, 0, 0.6),
            -16px -16px 32px rgba(255, 255, 255, 0.06);
        }

        .modal-close {
          position: absolute;
          top: 10px;
          right: 10px;
          border: 0;
          cursor: pointer;
          background: var(--ui-bg, #edf1f6);
          color: inherit;
          border-radius: 12px;
          padding: 8px;
          box-shadow:
            6px 6px 12px rgba(163, 177, 198, 0.25),
            -6px -6px 12px rgba(255, 255, 255, 0.92);
        }
        :global(html.dark) .modal-close {
          background: #0f1425;
          box-shadow:
            6px 6px 12px rgba(0, 0, 0, 0.6),
            -6px -6px 12px rgba(255, 255, 255, 0.06);
        }

        /* Marco neumórfico para media */
        .media-frame {
          border-radius: 18px;
          padding: 12px;
          background: var(--ui-bg, #edf1f6);
          box-shadow:
            inset 8px 8px 16px rgba(163, 177, 198, 0.35),
            inset -8px -8px 16px rgba(255, 255, 255, 0.95);
        }
        :global(html.dark) .media-frame {
          background: #0f1425;
          box-shadow:
            inset 8px 8px 16px rgba(0, 0, 0, 0.6),
            inset -8px -8px 16px rgba(255, 255, 255, 0.06);
        }

        .media-figure {
          margin: 0;
        }
        .media-img {
          border-radius: 12px;
          display: block;
        }

        .media-yt {
          position: relative;
          width: 100%;
          /* relación 16:9 */
          padding-top: 56.25%;
          border-radius: 12px;
          overflow: hidden;
        }
        .media-yt-iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        .media-nav {
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .nav-btn {
          border: 0;
          cursor: pointer;
          padding: 8px 10px;
          border-radius: 12px;
          background: var(--ui-bg, #edf1f6);
          box-shadow:
            6px 6px 12px rgba(163, 177, 198, 0.25),
            -6px -6px 12px rgba(255, 255, 255, 0.92);
        }
        :global(html.dark) .nav-btn {
          background: #0f1425;
          box-shadow:
            6px 6px 12px rgba(0, 0, 0, 0.6),
            -6px -6px 12px rgba(255, 255, 255, 0.06);
        }
        .nav-indicator {
          font-weight: 800;
          color: #384260;
        }
        :global(html.dark) .nav-indicator {
          color: #dbe0ea;
        }
      `}</style>
    </section>
  );
}
