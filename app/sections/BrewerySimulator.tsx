'use client';
import React, { JSX } from 'react';
import '@/app/styles/BrewerySimulator.css';

import { MALTS, HOPS, YEASTS, PROVINCES } from '../lib/beerData';
import useRecipes from '../lib/useRecipes';
import type { Recipe } from '../lib/beerTypes';
import { estimateABV, estimateFG, estimateIBU, estimateOG } from '../lib/beerEstimates';

export default function BrewerySimulator(): JSX.Element {
  const { save } = useRecipes();

  const [name, setName] = React.useState('Mi Primera Estrella');
  const [province, setProvince] = React.useState('Guanentá');
  const [malts, setMalts] = React.useState<string[]>(['pale']);
  const [hops, setHops] = React.useState<string[]>(['cascade']);
  const [yeasts, setYeasts] = React.useState<string[]>(['us05']);
  const [mashTemp, setMashTemp] = React.useState(66);
  const [mashTime, setMashTime] = React.useState(60);
  const [boilTime, setBoilTime] = React.useState(60);
  const [fermentTemp, setFermentTemp] = React.useState(19);

  const estimates = React.useMemo(() => {
    const og = estimateOG(malts);
    const fg = estimateFG(yeasts);
    const abv = estimateABV(og, fg);
    const ibu = estimateIBU(hops, boilTime);
    return { og, fg, abv, ibu };
  }, [malts, yeasts, hops, boilTime]);

  const toggleSel = (arr: string[], set: (v: string[]) => void, id: string) => {
    set(arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);
  };

  const onSave = () => {
    const recipe: Recipe = {
      id: crypto.randomUUID(),
      name,
      province,
      malts,
      hops,
      yeasts,
      params: { mashTemp, mashTime, boilTime, fermentTemp },
      estimates,
      createdAt: Date.now(),
    };
    save(recipe);
    // feedback simple
     
    alert('Receta guardada en tu navegador (localStorage).');
  };

  return (
    <section id="simulador" className="brew">
      <header className="brew-head">
        <h2>Planta cervecera interactiva</h2>
        <p>Simula tu proceso: elige ingredientes, controla parámetros, ve estimaciones y guarda tu receta.</p>
      </header>

      <div className="brew-grid">
        <div className="brew-card">
          <h3>Ingredientes</h3>

          <div className="brew-row">
            <label className="brew-field">
              <span>Nombre de la receta</span>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label className="brew-field">
              <span>Provincia</span>
              <select value={province} onChange={(e) => setProvince(e.target.value)}>
                {PROVINCES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="brew-choice">
            <Choice title="Maltas" options={MALTS} selected={malts} onToggle={(id) => toggleSel(malts, setMalts, id)} />
            <Choice title="Lúpulos" options={HOPS} selected={hops} onToggle={(id) => toggleSel(hops, setHops, id)} />
            <Choice title="Levaduras" options={YEASTS} selected={yeasts} onToggle={(id) => toggleSel(yeasts, setYeasts, id)} />
          </div>
        </div>

        <div className="brew-card">
          <h3>Parámetros</h3>
          <div className="brew-row">
            <Range label={`Maceración ${mashTemp}°C`} value={mashTemp} onChange={setMashTemp} min={60} max={70} />
            <Range label={`Tiempo maceración ${mashTime} min`} value={mashTime} onChange={setMashTime} min={30} max={90} />
          </div>
          <div className="brew-row">
            <Range label={`Cocción ${boilTime} min`} value={boilTime} onChange={setBoilTime} min={30} max={120} />
            <Range label={`Fermentación ${fermentTemp}°C`} value={fermentTemp} onChange={setFermentTemp} min={16} max={24} />
          </div>

          <div className="brew-stats">
            <Stat label="OG" value={estimates.og.toFixed(3)} />
            <Stat label="FG" value={estimates.fg.toFixed(3)} />
            <Stat label="ABV" value={`${estimates.abv}%`} />
            <Stat label="IBU" value={`${estimates.ibu}`} />
          </div>

          <div className="brew-actions">
            <button className="btn-save" type="button" onClick={onSave}>Guardar receta</button>
            <a className="btn-ghost" href="#recetas">Ver biblioteca</a>
          </div>
        </div>
      </div>

      {/* etapas visuales (guía) */}
      <ol className="brew-stages">
        {[
          'Molienda',
          'Maceración',
          'Cocción',
          'Fermentación',
          'Maduración',
          'Embotellado',
        ].map((t, i) => (
          <li key={t}>
            <strong>{i + 1}. {t}</strong>
            <span>Controla temperaturas y tiempos según tu estilo.</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Choice(props: {
  title: string;
  options: { id: string; label: string }[];
  selected: string[];
  onToggle: (id: string) => void;
}): JSX.Element {
  const { title, options, selected, onToggle } = props;
  return (
    <div className="brew-choice-col">
      <div className="brew-choice-title">{title}</div>
      <div className="brew-tags">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onToggle(o.id)}
            className={`brew-tag ${selected.includes(o.id) ? 'is-on' : ''}`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Range(props: { label: string; value: number; onChange: (n: number) => void; min: number; max: number }): JSX.Element {
  const { label, value, onChange, min, max } = props;
  return (
    <label className="brew-field">
      <span>{label}</span>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  );
}

function Stat(props: { label: string; value: string }): JSX.Element {
  const { label, value } = props;
  return (
    <div className="brew-stat">
      <div className="k">{label}</div>
      <div className="v">{value}</div>
    </div>
  );
}
