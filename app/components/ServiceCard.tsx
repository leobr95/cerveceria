"use client";

import React from "react";

type Variant = "mint" | "sunset" | "aqua" | "violet";

type Props = {
  title: string;
  desc: string;
  bullets: string[];
  variant?: Variant;
  tag?: string; // texto pequeño al pie (ej. "CHANGSHA" en tu referencia)
};

export const ServiceCard: React.FC<Props> = ({
  title,
  desc,
  bullets,
  variant = "mint",
  tag,
}) => {
  return (
    <article className={`svc-card ${variant}`}>
      <h3 className="svc-title">{title}</h3>
      <p className="svc-desc">{desc}</p>

      <ul className="svc-list">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>

      {tag && <div className="svc-tag">{tag}</div>}

      {/* orbes decorativos */}
      <span className="orb orb-1" />
      <span className="orb orb-2" />
      <span className="orb orb-3" />
    </article>
  );
};
