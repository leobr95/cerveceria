'use client';
import React, { JSX } from 'react';
import Image from 'next/image';
import '@/app/styles/BeersShowcase.css';

type Beer = {
  name: string;
  style: string;
  img: string;
};

const BEERS: Beer[] = [
  {
    name: 'Puerta de Oro',
    style: 'Belgian Blonde Ale',
    img: 'https://cerveceria7estrellas.com/wp-content/uploads/2025/04/puerta-de-oro-etiqueta-521x1024.png',
  },
  {
    name: 'Citeña',
    style: 'Dark Mild',
    img: 'https://cerveceria7estrellas.com/wp-content/uploads/2025/04/mcitena-521x1024.png',
  },
  {
    name: "Mono Pa' El",
    style: 'Belgian Blonde Ale',
    img: 'https://cerveceria7estrellas.com/wp-content/uploads/2025/04/m-mono-pa-ella-521x1024.png',
  },
  {
    name: "Mono Pa' Ella",
    style: 'Belgian Blonde Ale',
    img: 'https://cerveceria7estrellas.com/wp-content/uploads/2025/04/m-mono-pa-ella-1-521x1024.png',
  },
];

export default function BeersShowcase(): JSX.Element {
  return (
    <section id="cervezas" className="beers">
      <header className="beers-head">
        <h2>Nuestras Cervezas</h2>
        <p>
          Descubre nuestra exclusiva selección de cervezas artesanales, elaboradas con
          ingredientes de calidad y técnicas tradicionales que realzan cada sabor. Desde las
          ligeras y refrescantes hasta las robustas y complejas, tenemos la opción perfecta
          para cada paladar.
        </p>
      </header>

      <ul className="beers-grid" role="list">
        {BEERS.map((b) => (
          <li key={b.name} className="beer-card">
            <div className="beer-bottle">
              {/* img normal para evitar configurar dominios; si prefieres next/image, ver nota abajo */}
              <Image
                src={b.img}
                alt={`${b.name} - ${b.style}`}
                loading="lazy"
                decoding="async"
                width={521}
                height={1024}
              />
            </div>

            <div className="beer-info">
              <h3 className="beer-name">{b.name}</h3>
              <span className="beer-style">{b.style}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
