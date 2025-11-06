'use client';

import React from 'react';

const FAQ = [
  {
    q: '¿Qué incluye un sitio web corporativo?',
    a: 'Arquitectura de contenidos, diseño visual, desarrollo en Next.js, SEO técnico base, optimización de velocidad y configuración de analítica. Además, integración con WhatsApp y formulario con envío por correo.'
  },
  {
    q: '¿Cuánto tarda un proyecto típico?',
    a: 'Un landing de campaña: 1–2 semanas. Un sitio corporativo: 2–4 semanas. E-commerce o reservas: 3–6 semanas, dependiendo del alcance y la cantidad de integraciones.'
  },
  {
    q: '¿Puedo empezar con algo pequeño e ir escalando?',
    a: 'Sí. Proponemos un MVP inicial con lo esencial para vender y luego iteramos: nuevas secciones, automatizaciones, y app móvil cuando haga sentido.'
  },
  {
    q: '¿Trabajan con pagos y envíos locales?',
    a: 'Claro. Integramos pasarelas locales y logística de envíos. También conectamos con facturación y reportes según tu operación.'
  },
  {
    q: '¿Ofrecen soporte y mantenimiento?',
    a: 'Tenemos planes mensuales con horas de mejora, monitoreo, backups, seguridad y soporte prioritario por WhatsApp/correo.'
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="container faq-wrap">
      <header className="faq-head">
        <h2 className="faq-title title">Preguntas frecuentes</h2>
        <p className="faq-sub">Todo lo esencial antes de iniciar tu proyecto.</p>
      </header>

      <div className="faq-list">
        {FAQ.map((item, idx) => (
          <details key={idx} className="faq-item">
            <summary>
              <span className="q">{item.q}</span>
              <span className="chev" aria-hidden>›</span>
            </summary>
            <div className="answer">
              <p>{item.a}</p>
            </div>
          </details>
        ))}
      </div>

      <style jsx>{`
        .faq-head{ margin-bottom: 12px; }
        .faq-title{
          font-size: clamp(22px, 3.2vw, 32px);
          font-weight: 900;
          background: var(--neo-grad);
          -webkit-background-clip: text; background-clip: text;
          color: transparent;
          margin: 0 0 4px;
        }
        .faq-sub{ color: var(--muted); margin: 0 0 6px; }

        .faq-list{
          display: grid;
          gap: 12px;
        }

        .faq-item{
          border-radius: var(--radius);
          background: var(--surface);
          box-shadow: var(--shadow-out-1), var(--shadow-out-2);
          overflow: clip;   /* para ocultar animación del contenido */
        }

        .faq-item summary{
          list-style: none;
          cursor: pointer;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 12px;
          padding: 16px 18px;
          font-weight: 800;
          color: var(--text);
          outline: none;
          user-select: none;
        }
        .faq-item summary::-webkit-details-marker{ display: none; }

        .q{ line-height: 1.25; }
        .chev{
          width: 28px; height: 28px;
          display: grid; place-items: center;
          border-radius: 50%;
          background: var(--surface);
          box-shadow: var(--shadow-in-1), var(--shadow-in-2);
          transform: rotate(90deg);
          transition: transform .35s ease;
          font-size: 20px;
        }

        /* Contenido con animación de altura */
        .answer{
          padding: 0 18px 16px 18px;
          color: var(--text);
          animation: accordion-close .35s ease forwards;
        }

        .faq-item[open] .answer{
          animation: accordion-open .35s ease forwards;
        }
        .faq-item[open] .chev{
          transform: rotate(270deg);
        }

        /* keyframes usando max-height para suavizar */
        @keyframes accordion-open {
          from { opacity: .0; max-height: 0;   }
          to   { opacity: 1;  max-height: 280px; }
        }
        @keyframes accordion-close {
          from { opacity: 1;  max-height: 280px; }
          to   { opacity: .0; max-height: 0;   }
        }

        /* Hover/focus */
        .faq-item summary:hover .chev{ transform: rotate(90deg) scale(1.05); }
        .faq-item[open] summary:hover .chev{ transform: rotate(270deg) scale(1.05); }
        .faq-item summary:focus-visible{
          box-shadow: 0 0 0 4px rgba(124,58,237,.12) inset;
        }

        /* Dark tweaks */
        :global(html.dark) .faq-item{
          background: #101322;
          box-shadow: var(--shadow-out-1), var(--shadow-out-2);
        }
        :global(html.dark) .chev{
          background: #0f1425;
        }
      `}</style>
    </section>
  );
}
