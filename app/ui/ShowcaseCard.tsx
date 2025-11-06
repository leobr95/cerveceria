"use client";

type Related = { label: string; emoji?: string };
type Option = { label: string };
export type ShowcaseService = {
  title: string;
  subtitle: string;
  bullets: string[];
  heroImg: string;        // /public/img/...
  related: Related[];     // panel izquierdo
  options: Option[];      // panel derecho (paquetes, duración, etc.)
  priceHint: string;      // "Desde $XXX"
  cta?: string;           // "Solicitar"
  gradient?: "mint" | "sunset" | "aqua" | "violet";
};

export default function ShowcaseCard({
  title,
  subtitle,
  bullets,
  heroImg,
  related,
  options,
  priceHint,
  cta = "Solicitar",
  gradient = "mint",
}: ShowcaseService) {
  return (
    <div className={`sx-wrap ${gradient}`}>
      {/* IZQUIERDA */}
      <aside className="sx-left">
        <div className="sx-left-head">TAMBIÉN CONTRATAN</div>
        <div className="sx-left-list">
          {related.map((r) => (
            <div key={r.label} className="sx-mini">
              <span className="sx-dot">{r.emoji ?? "•"}</span>
              <span className="sx-mini-text">{r.label}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* CENTRO */}
      <main className="sx-center">
        <h3 className="sx-title">{title}</h3>
        <div className="sx-sub">{subtitle}</div>

        <div className="sx-hero">
          <img src={heroImg} alt={title} />
        </div>

        <div className="sx-feats">
          {bullets.map((b) => (
            <div className="sx-pill" key={b}>{b}</div>
          ))}
        </div>

        <button className="sx-cta" onClick={() => location.assign("#contact")}>
          {cta}
        </button>
      </main>

      {/* DERECHA */}
      <aside className="sx-right">
        <div className="sx-price">{priceHint}</div>
        <div className="sx-right-head">SELECCIONA</div>
        <div className="sx-right-grid">
          {options.map((o) => (
            <button key={o.label} className="sx-opt">{o.label}</button>
          ))}
        </div>
      </aside>

      {/* decor */}
      <span className="sx-orb sx-orb-1" />
      <span className="sx-orb sx-orb-2" />

      <style jsx>{`
        .sx-wrap{
          --radius: 24px;
          position: relative;
          width: 920px;   /* tarjeta ancha como el ejemplo */
          min-height: 440px;
          padding: 22px;
          border-radius: calc(var(--radius) + 6px);
          display: grid;
          grid-template-columns: 1fr 1.6fr 1.2fr; /* izq-centro-der */
          gap: 16px;
          color: #0b0e15;
          box-shadow: var(--shadow-out-1), var(--shadow-out-2);
          background: var(--surface);
          overflow: hidden;
          scroll-snap-align: center;
        }
        .sx-wrap.mint   { background: linear-gradient(135deg, #7ee8d6 0%, #c1f0ff 100%); }
        .sx-wrap.sunset { background: linear-gradient(135deg, #ffd6a7 0%, #ffb3d2 100%); }
        .sx-wrap.aqua   { background: linear-gradient(135deg, #a9e6ff 0%, #c9bbff 100%); }
        .sx-wrap.violet { background: linear-gradient(135deg, #c4b9ff 0%, #ffc1ec 100%); }

        .sx-left, .sx-right, .sx-center{
          background: #ffffffc7;
          backdrop-filter: blur(4px);
          border-radius: var(--radius);
          box-shadow: var(--shadow-out-1), var(--shadow-out-2);
          padding: 18px;
          position: relative;
        }

        /* IZQUIERDA */
        .sx-left-head{ font-weight:800; font-size:.82rem; color:#3b3f50; letter-spacing:.14em; }
        .sx-left-list{ margin-top:12px; display:grid; gap:12px }
        .sx-mini{
          display:flex; align-items:center; gap:10px;
          background:#fff9; border-radius:18px; padding:10px 12px;
          box-shadow: var(--shadow-in-1), var(--shadow-in-2);
        }
        .sx-dot{ width:24px; height:24px; border-radius:50%; display:grid; place-items:center;
          background: var(--neo-grad-soft); font-weight:900; color:#6b21a8; }
        .sx-mini-text{ font-weight:700; color:#374151 }

        /* CENTRO */
        .sx-center{ text-align:center; display:flex; flex-direction:column; align-items:center; }
        .sx-title{
          font-size: clamp(24px, 3.2vw, 36px);
          font-weight: 900; letter-spacing:.3px; margin: 4px 0 0;
          color:#111827;
        }
        .sx-sub{ color:#4b5563; margin-bottom:6px; font-weight:600 }

        .sx-hero{
          width: 100%;
          height: 240px;
          border-radius: 18px;
          margin: 8px 0 10px;
          background: #fff;
          box-shadow: var(--shadow-in-1), var(--shadow-in-2);
          display:grid; place-items:center;
        }
        .sx-hero img{ max-height: 200px; object-fit: contain; filter: drop-shadow(0 18px 34px rgba(0,0,0,.18)); }

        .sx-feats{ display:flex; gap:8px; flex-wrap:wrap; justify-content:center; }
        .sx-pill{
          padding:8px 12px; border-radius:999px; background:#fff; box-shadow: var(--shadow-out-1), var(--shadow-out-2);
          font-weight:700; color:#374151; font-size:.9rem;
        }
        .sx-cta{
          margin-top: 12px;
          background: var(--neo-grad); color:#fff; border:0; cursor:pointer;
          padding: 12px 18px; border-radius: 14px; box-shadow: var(--halo); font-weight:800;
        }

        /* DERECHA */
        .sx-price{
          font-size: 28px; font-weight: 900; color:#0f172a; margin-bottom:8px;
        }
        .sx-right-head{ font-weight:800; font-size:.82rem; color:#3b3f50; letter-spacing:.14em; margin:8px 0 6px; }
        .sx-right-grid{
          display:grid; grid-template-columns: repeat(3, 1fr); gap:10px;
        }
        .sx-opt{
          height:42px; border-radius:14px; border:0; cursor:pointer;
          background: #fff; color:#111827; font-weight:800;
          box-shadow: var(--shadow-in-1), var(--shadow-in-2);
        }

        /* decor orbes */
        .sx-orb{
          position:absolute; width:46px; height:46px; border-radius:50%;
          background: radial-gradient(circle at 30% 30%, #fff 0%, rgba(255,255,255,.7) 22%, rgba(255,255,255,.15) 60%, transparent 70%);
          filter: drop-shadow(0 10px 18px rgba(0,0,0,.14));
        }
        .sx-orb-1{ left: calc(33% - 24px); top: 50%; transform: translate(-50%, -50%); }
        .sx-orb-2{ right: calc(33% - 24px); top: 50%; transform: translate(50%, -50%); }

        /* Dark tweaks */
        :global(html.dark) .sx-left,
        :global(html.dark) .sx-right,
        :global(html.dark) .sx-center{ background:#101322cc; color:#E8ECFF }
        :global(html.dark) .sx-hero{ background:#101322; }
        :global(html.dark) .sx-pill{ background:#0f1425; color:#E8ECFF; }
        :global(html.dark) .sx-opt{ background:#0f1425; color:#E8ECFF; }
      `}</style>
    </div>
  );
}
