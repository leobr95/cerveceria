// app/ui/ServiceCardTall.tsx
type Variant = "mint" | "sunset" | "aqua" | "violet";

export type ServiceItem = {
  title: string;
  subtitle: string;
  points: string[];   // beneficios cortos
  variant?: Variant;
};

export default function ServiceCardTall({
  title,
  subtitle,
  points,
  variant = "mint",
}: ServiceItem) {
  return (
    <article className={`svcTall ${variant}`}>
      <h3 className="title">{title}</h3>
      <p className="subtitle">{subtitle}</p>

      <ul className="list">
        {points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>

      <a className="cta" href="#contact">Solicitar</a>

      {/* orbes decorativos */}
      <span className="orb orb1" />
      <span className="orb orb2" />

      <style jsx>{`
        .svcTall {
          position: relative;
          width: 280px;
          height: 440px;
          border-radius: 24px;
          padding: 22px 18px;
          color: #fff;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 28px 60px rgba(0, 0, 0, 0.18),
            0 8px 24px rgba(0, 0, 0, 0.1);
          user-select: none;
          scroll-snap-align: start;
          isolation: isolate;
        }
        /* Gradientes estilo pastel */
        .svcTall.mint {
          background: linear-gradient(180deg, #3ee7b6 0%, #50e3e6 100%);
        }
        .svcTall.sunset {
          background: linear-gradient(180deg, #ffb36c 0%, #ea6bae 100%);
        }
        .svcTall.aqua {
          background: linear-gradient(180deg, #47d4ff 0%, #8d6bff 100%);
        }
        .svcTall.violet {
          background: linear-gradient(180deg, #9b8cff 0%, #f58adf 100%);
        }

        .title {
          font-weight: 900;
          font-size: 1.55rem; /* grande y bonito */
          letter-spacing: 0.2px;
          margin: 4px 0 2px;
          text-shadow: 0 6px 14px rgba(0, 0, 0, 0.18);
        }
        .subtitle {
          opacity: 0.95;
          margin: 0 0 10px;
          font-weight: 600;
        }
        .list {
          margin: 8px 0 0 16px;
          padding: 0;
          list-style: disc;
        }
        .list li {
          margin-bottom: 6px;
          opacity: 0.96;
          line-height: 1.2;
        }
        .cta {
          margin-top: auto;
          align-self: flex-start;
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
          padding: 10px 14px;
          border-radius: 12px;
          font-weight: 700;
          letter-spacing: 0.3px;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.35);
        }

        /* Ondas y brillo inferior */
        .svcTall::before {
          content: "";
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml;utf8,\
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'>\
              <defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>\
                <stop offset='0%' stop-color='white' stop-opacity='0.22'/>\
                <stop offset='100%' stop-color='white' stop-opacity='0.00'/>\
              </linearGradient></defs>\
              <g fill='none' stroke='url(%23g)' stroke-width='2'>\
                <path d='M0 330 q 60 -40 120 0 t 120 0 t 120 0 t 120 0'/>\
                <path d='M0 360 q 60 -40 120 0 t 120 0 t 120 0 t 120 0'/>\
              </g>\
            </svg>"
          ) center 85% / 120% 60% no-repeat;
          mix-blend-mode: overlay;
          opacity: 0.9;
          z-index: 0;
        }
        .svcTall::after {
          content: "";
          position: absolute;
          left: 10%;
          right: 10%;
          bottom: -40px;
          height: 90px;
          filter: blur(28px);
          background: rgba(255, 255, 255, 0.55);
          z-index: -1;
        }

        /* Orbes */
        .orb {
          position: absolute;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: radial-gradient(
            circle at 30% 30%,
            #fff 0%,
            rgba(255, 255, 255, 0.6) 25%,
            rgba(255, 255, 255, 0.15) 60%,
            transparent 70%
          );
          filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.12));
          z-index: 1;
          animation: float 6s ease-in-out infinite;
        }
        .orb1 {
          top: -12px;
          left: 18px;
          animation-delay: 0.2s;
        }
        .orb2 {
          top: 14px;
          right: 18px;
          animation-delay: 1.1s;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(6px);
          }
        }
      `}</style>
    </article>
  );
}
