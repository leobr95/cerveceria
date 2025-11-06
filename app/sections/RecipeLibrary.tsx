'use client';
import React, { JSX } from 'react';
import '@/app/styles/RecipeLibrary.css';
import useRecipes from '../lib/useRecipes';

export default function RecipeLibrary(): JSX.Element {
  const { recipes, remove } = useRecipes();

  return (
    <section id="recetas" className="rlib">
      <header className="rlib-head">
        <h2>Recetas guardadas</h2>
        <p>Estas recetas viven en tu navegador (localStorage). Úsalas como base para maquila futura.</p>
      </header>

      {recipes.length === 0 ? (
        <p className="rlib-empty">Aún no hay recetas. Crea una en el simulador.</p>
      ) : (
        <ul className="rlib-grid">
          {recipes.map((r) => (
            <li key={r.id} className="rlib-card">
              <div className="rlib-top">
                <div>
                  <div className="rlib-name">{r.name}</div>
                  <div className="rlib-sub">Provincia: {r.province}</div>
                </div>
                <button className="rlib-del" type="button" onClick={() => remove(r.id)}>Eliminar</button>
              </div>

              <div className="rlib-body">
                <div><strong>Maltas:</strong> {r.malts.join(', ') || '-'}</div>
                <div><strong>Lúpulos:</strong> {r.hops.join(', ') || '-'}</div>
                <div><strong>Levaduras:</strong> {r.yeasts.join(', ') || '-'}</div>
              </div>

              <div className="rlib-metrics">
                <Metric label="OG" value={r.estimates.og.toFixed(3)} />
                <Metric label="FG" value={r.estimates.fg.toFixed(3)} />
                <Metric label="ABV" value={`${r.estimates.abv}%`} />
                <Metric label="IBU" value={`${r.estimates.ibu}`} />
              </div>

              <div className="rlib-foot">
                Maceración: {r.params.mashTemp}°C · {r.params.mashTime}min · Cocción: {r.params.boilTime}min · Fermentación: {r.params.fermentTemp}°C
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Metric(props: { label: string; value: string }): JSX.Element {
  const { label, value } = props;
  return (
    <div className="rlib-metric">
      <div className="k">{label}</div>
      <div className="v">{value}</div>
    </div>
  );
}
