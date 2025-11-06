'use client';
import React, { JSX } from 'react';
import '@/app/styles/ProvincesShowcase.css';
import { PROVINCES } from '../lib/beerData';

export default function ProvincesShowcase(): JSX.Element {
  const [active, setActive] = React.useState<string>('Guanentá');

  return (
    <section id="provincias" className="prov">
      <header className="prov-head">
        <h2>Provincias · 7 Estrellas</h2>
        <p>Cada cerveza representa una provincia de Santander. Selecciona una para inspirar tu receta.</p>
      </header>

      <div className="prov-grid">
        {PROVINCES.map((p) => (
          <button
            key={p}
            onClick={() => setActive(p)}
            className={`prov-card ${active === p ? 'is-active' : ''}`}
            aria-pressed={active === p}
          >
            <span className="prov-name">{p}</span>
          </button>
        ))}
      </div>

      <div className="prov-active">
        <h3>Seleccionada: {active}</h3>
        <p>
          Úsala como inspiración de tu receta: carácter, notas y maridajes que evoquen orgullo, valentía y fuerza.
        </p>
      </div>
    </section>
  );
}
