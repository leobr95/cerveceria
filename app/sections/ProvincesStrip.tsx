'use client';
import React from 'react';
import '@/app/styles/ProvincesStrip.css';

const PROVINCES = ['Vélez','Comunera','Guanentá','García Rovira','Mares','Soto','Yariguíes'];

export default function ProvincesStrip(): JSX.Element {
  const [active, setActive] = React.useState('Guanentá');

  return (
    <section id="provincias" className="pStrip">
      <header className="pStrip-head">
        <h2>Provincias de Santander</h2>
        <p>Cada estrella representa una provincia; cada receta, su historia.</p>
      </header>

      <div className="pStrip-row" role="tablist" aria-label="Provincias de Santander">
        {PROVINCES.map((p) => (
          <button
            key={p} role="tab" aria-selected={active===p}
            className={`pStrip-star ${active===p ? 'is-active' : ''}`}
            onClick={() => setActive(p)}
            title={`Seleccionar ${p}`}
          >
            ★ <span>{p}</span>
          </button>
        ))}
      </div>

      <div className="pStrip-info" role="region" aria-live="polite">
        <h3>{active}</h3>
        <p>
          Inspiración cervecera: notas y carácter asociadas a <strong>{active}</strong>. 
          Úsalo para nombrar o perfilar tu estilo — ¡y guárdalo en el simulador!
        </p>
      </div>
    </section>
  );
}
