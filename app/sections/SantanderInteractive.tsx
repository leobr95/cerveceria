'use client';
import React, { JSX } from 'react';
import '@/app/styles/SantanderInteractive.css';

type Topic = { id: string; title: string; blurb: string; image: string };

const TOPICS: Topic[] = [
  {
    id: 'chicamocha',
    title: 'Cañón del Chicamocha',
    blurb: 'Parapente, viento y paisajes grandiosos. Libertad y valentía.', 
    image: 'https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'guane',
    title: 'Herencia Guane',
    blurb: 'Artesanía, identidad y tradición que inspiran nombres y etiquetas.',
    image: 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'barichara',
    title: 'Barichara',
    blurb: 'Piedra, calma y orgullo. Marida bien con estilos limpios y dorados.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'cafe',
    title: 'Café y Mesa de los Santos',
    blurb: 'Notas tostadas y maltas oscuras; equilibrio y fuerza.',
    image: 'https://images.unsplash.com/photo-1459755486867-b55449bb39ff?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'panela',
    title: 'Caña y Panela',
    blurb: 'Dulzor natural para jugar con caramelo y cuerpo.',
    image: 'https://images.unsplash.com/photo-1544377750-9360849a72fd?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'aventure',
    title: 'Aventura y Ríos',
    blurb: 'Rafting y caminos. Frescura: lúpulos cítricos y amargos medidos.',
    image: 'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?q=80&w=1600&auto=format&fit=crop'
  },
];

export default function SantanderInteractive(): JSX.Element {
  const [active, setActive] = React.useState<Topic>(TOPICS[0]);

  return (
    <section id="santander" className="sant">
      <header className="sant-head">
        <h2>Identidad regional · Santander</h2>
        <p>Pasa el cursor por un tema (o tócala en móvil) para inspirar tu receta y storytelling.</p>
      </header>

      <div className="sant-grid">
        <aside className="sant-hero">
          <div className="sant-photo" style={{ backgroundImage: `url(${active.image})` }} />
          <div className="sant-caption">
            <strong>{active.title}</strong>
            <span>{active.blurb}</span>
          </div>
        </aside>

        <div className="sant-list" role="list">
          {TOPICS.map((t) => (
            <button
              key={t.id}
              role="listitem"
              className={`sant-item ${active.id===t.id ? 'is-active' : ''}`}
              onMouseEnter={() => setActive(t)}
              onFocus={() => setActive(t)}
              onClick={() => setActive(t)}
            >
              <span className="sant-dot">★</span>
              <div className="sant-text">
                <strong>{t.title}</strong>
                <span>{t.blurb}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
