'use client';
import React, { JSX } from 'react';
import '@/app/styles/Hero.css';

export default function Hero(): JSX.Element {
  return (
    <section className="hero">
      <div className="hero-inner">
        <h1 className="hero-title">
          Cervecería Artesanal <span>Siete Estrellas</span>
        </h1>
        <p className="hero-sub">
          Orgullo, valentía y fuerza Santandereana. Cada estrella, una provincia; cada cerveza, una historia.
        </p>
        <div className="hero-cta">
          <a href="#simulador" className="btn-primary">Probar simulador</a>
          <a href="#recetas" className="btn-ghost">Ver recetas</a>
        </div>
      </div>

      {/* Bandera 7 estrellas en parallax suave */}
      <div className="hero-stars" aria-hidden>
        {Array.from({ length: 7 }).map((_, i) => (
          <i key={i} style={{ left: `${12 + i * 12}%`, top: i % 2 === 0 ? '18%' : '26%' }} />
        ))}
      </div>
    </section>
  );
}
