'use client';
import React, { JSX } from 'react';
import Image from 'next/image';

import '@/app/styles/HeroBrand.css';
import logo from '@/app/logos/logo-siete-estrellas.png';

export default function HeroBrand(): JSX.Element {
  return (
    <section className="heroB">
      <div className="heroB-left">
      <Image
        src={logo}
        alt="lb.codeworks"
        fill
        priority
        sizes="(max-width:560px) 160px, 200px"
        style={{ objectFit: 'contain' }}
      />      
      </div>

      <div className="heroB-right">
        <h1 className="heroB-title">
          Cervecería Artesanal <span>Siete Estrellas</span>
        </h1>
        <p className="heroB-sub">
          Orgullo, valentía y fuerza Santandereana — cada cerveza, una provincia.
        </p>

        <div className="heroB-cta">
          <a href="#santander" className="btn-outline">Identidad regional</a>
          <a href="#simulador" className="btn-gold">Probar simulador</a>
        </div>
      </div>
    </section>
  );
}
