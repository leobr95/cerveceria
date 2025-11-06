'use client';
import React from 'react';
import Image from 'next/image';
import '@/app/styles/HeaderBar.css';
import logo from '@/app/logos/logo-siete-estrellas.png';


export default function HeaderBar(): JSX.Element {
  return (
    <header className="hb">
      <div className="hb-inner">
        <div className="hb-brand">
 <Image
        src={logo}
        alt="lb.codeworks"
        fill
        priority
        sizes="(max-width:560px) 160px, 200px"
        style={{ objectFit: 'contain' }}
      />                <div className="hb-txt">
            <strong>Siete Estrellas</strong>
            <span>Cervecería Artesanal</span>
          </div>
        </div>

        <nav className="hb-links" aria-label="Secciones principales">
          <a href="#provincias">Provincias</a>
          <a href="#santander">Santander</a>
          <a href="#simulador">Simulador</a>
          <a href="#recetas" className="btn-primary">Recetas</a>
        </nav>
      </div>
    </header>
  );
}
