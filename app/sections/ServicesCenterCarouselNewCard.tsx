// // app/sections/ServicesCardDeck.tsx
 'use client';

 import React from 'react';
 import Image, { StaticImageData } from 'next/image';
  import imgApp from '@/app/imagenes/app.png';
 import imgDeploy from '@/app/imagenes/ciclo.png';
 import imgWeb from '@/app/imagenes/web.png';
   import imgPhone from '@/app/imagenes/phone.png';

  import imgEscritorio from '@/app/imagenes/desktop.png';




 type Item = {
   title: string;
   subtitle: string;
   points: string[];
   image: StaticImageData;           // ✅ nueva ruta de imagen
 };

 /** ⏱️ Configuración */
 const AUTOPLAY_MS = 3000; // tiempo entre cambios automáticos
 const TRANSITION_MS = 1750; // duración de transiciones

 /** 🎨 Paleta para el modo listado (colores variados por tarjeta) */
 const PALETTE: Array<[string, string]> = [
   ['#9B8CFF', '#F58ADF'], // violeta → rosa
   ['#47D4FF', '#8D6BFF'], // aqua → violeta
   ['#00D2A8', '#4ADE80'], // teal → verde
   ['#FF8A8A', '#FFB36B'], // coral → naranja
   ['#8D74FF', '#B46BFF'], // violeta medio → magenta
   ['#FF6FD8', '#FFD26F'], // fucsia → dorado
 ];

 /* 👇 Usa tus propias rutas (public/... o remotas permitidas en next.config) */
 const DATA: Item[] = [
   {
     title: 'Sitio Web Corporativo',
     subtitle: 'Presencia que vende',
     points: ['Mensaje claro', 'SEO listo', 'Rápido y seguro'],
     image: imgDeploy,
   },
   {
     title: 'Tienda Online',
     subtitle: 'Vende 24/7',
     points: ['Carrito & checkout', 'Pagos locales', 'Inventario simple'],
     image: imgWeb,
   },
   {
     title: 'Reservas & Citas',
     subtitle: 'Agenda y recordatorios',
     points: ['Calendario', 'Adelantos', 'WhatsApp + email'],
     image: imgWeb,
   },
   {
     title: 'Portal de Clientes',
     subtitle: 'Autoservicio y fidelización',
     points: ['Historial', 'Tickets', 'Notificaciones'],
     image: imgEscritorio,
   },
   {
     title: 'App Móvil de Negocio',
     subtitle: 'Android/iOS desde tu web',
     points: ['PWA + Push', 'Publicación', 'Un solo código'],
     image: imgWeb,
   },
 ];

 /** Tipos para variables CSS personalizadas */
 type CSSVarKeys = '--tms' | '--c1' | '--c2';
 type CSSVars = React.CSSProperties & Partial<Record<CSSVarKeys, string>>;

 export default function ServicesCardDeck() {
   const [i, setI] = React.useState(1);
   const [dir, setDir] = React.useState<'left' | 'right'>('right');
   const [showAll, setShowAll] = React.useState(false);
   const len = DATA.length;

   const pausedRef = React.useRef(false);

   /** go() memoizado para satisfacer exhaustive-deps */
   const go = React.useCallback(
     (n: number) => {
       setDir(n > 0 ? 'right' : 'left');
       setI((prev) => (prev + n + len) % len);
     },
     [len]
   );

   // autoplay (pausa si hover/touch o showAll)
   React.useEffect(() => {
     const id = setInterval(() => {
       if (!pausedRef.current && !showAll) go(1);
     }, AUTOPLAY_MS);
     return () => clearInterval(id);
   }, [showAll, go]);

   // drag/touch
   const startX = React.useRef<number | null>(null);
   function onStart(x: number) {
     pausedRef.current = true;
     startX.current = x;
   }
   function onEnd(x: number) {
     if (startX.current == null) {
       pausedRef.current = false;
       return;
     }
     const dx = x - startX.current;
     if (dx > 50) go(-1);
     if (dx < -50) go(1);
     startX.current = null;
     pausedRef.current = false;
   }

   // índices carrusel 2+centro+2
   const idxPrev2 = (i - 2 + len) % len;
   const idxPrev1 = (i - 1 + len) % len;
   const idxNext1 = (i + 1) % len;
   const idxNext2 = (i + 2) % len;

   const styleVars: CSSVars = { '--tms': `${TRANSITION_MS}ms` };

   return (
     <section className="container" style={styleVars}>
       <div className="head">
         <h2 className="title">Soluciones destacadas</h2>
         <p className="sub">
           {showAll
             ? 'Selecciona el servicio que necesitas.'
             : `Consulta alguna de nuestras soluciones destacadas.`}
         </p>
       </div>

       <div
         className={`stage ${showAll ? 'showAll' : ''}`}
         onMouseEnter={() => {
           pausedRef.current = true;
           setShowAll(true);
         }}
         onMouseLeave={() => {
           setShowAll(false);
           pausedRef.current = false;
         }}
         onMouseDown={(e) => onStart(e.clientX)}
         onMouseUp={(e) => onEnd(e.clientX)}
         onTouchStart={(e) => onStart(e.touches[0].clientX)}
         onTouchEnd={(e) => onEnd(e.changedTouches[0].clientX)}
       >
         {!showAll && (
           <>
             <Card key={`far-left-${i}-${dir}`} item={DATA[idxPrev2]} role="back" pos="farLeft" />
             <Card key={`left-${i}-${dir}`} item={DATA[idxPrev1]} role="back" pos="left" />
             <Card key={`center-${i}`} item={DATA[i]} role="focus" pos="center" dir={dir} />
             <Card key={`right-${i}-${dir}`} item={DATA[idxNext1]} role="back" pos="right" />
             <Card key={`far-right-${i}-${dir}`} item={DATA[idxNext2]} role="back" pos="farRight" />

             {/* Flechas sobre las laterales cercanas */}
             {/* <button className="arrow over-left" onClick={() => go(-1)} aria-label="Anterior">
               ‹
             </button>
             <button className="arrow over-right" onClick={() => go(1)} aria-label="Siguiente">
               ›
             </button> */}
           </>
         )}

         {/* 🧩 Modo listado: grilla responsive 3/2/1 + colores variados */}
         {showAll && (
           <div className="listGrid">
             {DATA.map((it, idx) => {
               const [c1, c2] = PALETTE[idx % PALETTE.length];
               const override: CSSVars = { '--c1': c1, '--c2': c2 };
               return (
                 <Card key={`grid-${idx}`} item={it} role="list" pos="list" styleOverride={override} />
               );
             })}
           </div>
         )}
       </div>

       <style jsx>{`
         .head { margin-bottom: 10px }
         .title{
           font-size: clamp(22px, 3.6vw, 34px);
           font-weight: 900; letter-spacing:.3px;
           background: var(--neo-grad);
           -webkit-background-clip:text; background-clip:text; color:transparent;
           margin:0 0 4px;
         }
         .sub{ color: var(--muted); margin:0 0 6px }

         .stage{
           position: relative;
           height: 620px;
           display: grid;
           place-items: center;
           perspective: 1200px;
           overflow: visible;
           transition: height var(--tms, 550ms) ease-in-out;
         }
         .stage.showAll{
           height: auto;
           padding: 8px 12px 14px;
         }

         /* 🧱 Grilla 3/2/1 en listado */
         .listGrid{
           display: grid;
           gap: 28px;
           grid-template-columns: repeat(3, minmax(280px, 1fr));
           width: 100%;
           padding: 8px 4px;
         }
         @media (max-width: 1100px){
           .listGrid{ grid-template-columns: repeat(2, minmax(260px, 1fr)); }
         }
         @media (max-width: 700px){
           .listGrid{ grid-template-columns: 1fr; }
         }

         /* Flechas centradas sobre las cartas laterales cercanas */
         .arrow{
           position:absolute; top: 22px;
           width:56px;height:56px;border-radius:50%;border:0;cursor:pointer;
           background: rgba(255,255,255,.92);
           color:#111827;
           box-shadow: 0 10px 24px rgba(0,0,0,.18);
           font-size: 26px; display:grid; place-items:center; z-index:7;
           backdrop-filter: blur(4px);
           transition: transform var(--tms, 550ms) ease-in-out;
         }
         .stage.showAll .arrow{ display: none; }
         .over-left  { left: calc(50% - 240px - 28px); }
         .over-right { left: calc(50% + 240px - 28px); }
         .arrow:active{ transform: translateY(1px) }

         @media (max-width: 980px){
           :global(.svcCard){ width: 300px; height: 560px }
           .over-left  { left: calc(50% - 210px - 22px); width:44px; height:44px; font-size:22px }
           .over-right { left: calc(50% + 210px - 22px); width:44px; height:44px; font-size:22px }
         }
         @media (max-width: 760px){
           :global(.svcCard.farLeft), :global(.svcCard.farRight){ display:none }
           .over-left  { left: calc(50% - 170px - 22px); }
           .over-right { left: calc(50% + 170px - 22px); }
         }

         @media (prefers-reduced-motion: reduce){
           :global(.svcCard){ transition:none !important; animation:none !important; }
           .arrow{ transition:none !important; }
         }
       `}</style>
     </section>
   );
 }

 /* ---------- Carta estilo “app screen” (con imagen fija sobre art) ---------- */
 function Card({
   item,
   role,
   pos,
   dir = 'right',
   styleOverride,
 }: {
   item: Item;
   role: 'focus' | 'back' | 'list';
   pos: 'farLeft' | 'left' | 'center' | 'right' | 'farRight' | 'list';
   dir?: 'left' | 'right';
   styleOverride?: CSSVars;
 }) {
   const { title, subtitle, points, image } = item;

   return (
     <article
       className={`svcCard ${role} ${pos} ${pos === 'center' ? (dir === 'right' ? 'inRight' : 'inLeft') : ''
         }`}
       style={styleOverride}
     >
       {/* Lienzo superior con blobs/elementos flotantes */}
       <div className="art">
         {/* ✅ Ilustración con medidas fijas, centrada y sin recortes */}
         <div className="illus">
           <Image
             src={image}
             alt={title}
             width={0}                // ← requerido por Next, pero lo "anulamos"
             height={0}               // ← idem
             sizes="200px"            // ← di al optimizador el ancho que usas
             priority
             className="illus-img"
             style={{ width: 300, height: 'auto' }}   // ← mantiene el aspecto
           />
         </div>

         <span className="blob b1" />
         <span className="blob b2" />
         <span className="blob b3" />
       </div>

       {/* Tarjeta blanca inferior con contenido */}
       <div className="panel">
         <h3 className="t">{title}</h3>
         <p className="s">{subtitle}</p>
         <ul className="lst">
           {points.map((p) => <li key={p}>{p}</li>)}
         </ul>

         <div className="dock">
           <button className="roundCta" onClick={() => location.assign('#contact')} aria-label="Solicitar">➜</button>
         </div>
       </div>

       <style jsx>{`
         /* --- Contenedor base --- */
         .svcCard{
           position:absolute;
           width: 350px;
           height: 560px;
           border-radius: 36px;
           padding: 16px;
           display:flex; flex-direction:column;
           isolation:isolate; color:#0f172a;
           transition:
             transform var(--tms, 550ms) cubic-bezier(.2,.7,.2,1),
             opacity   var(--tms, 550ms) ease-in-out,
             filter    var(--tms, 550ms) ease-in-out,
             box-shadow var(--tms, 550ms) ease-in-out;

           background-image: linear-gradient(145deg, var(--c1, #6D5BFF) 0%, var(--c2, #B06CFF) 100%);
           box-shadow:
             0 32px 60px rgba(54,16,108,.35),
             inset 0 1px 0 rgba(255,255,255,.28);
         }
         .focus{ --c1:#6D5BFF; --c2:#B06CFF; z-index:6; }
         .back { --c1:#43C6FF; --c2:#7C5CFF; z-index:3; filter:saturate(.9) }

         /* Área superior */
         .art{
           position:relative;
           flex: 1 1 auto;
           border-radius: 28px;
           background:
             radial-gradient(80px 80px at 88% 10%, rgba(255,255,255,.35) 0%, rgba(255,255,255,0) 60%),
             linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.02));
           box-shadow:
             inset 8px 8px 18px rgba(0,0,0,.08),
             inset -8px -8px 18px rgba(255,255,255,.15);
           overflow:hidden;
         }

         /* Ilustración centrada con medidas fijas */
         .illus{
           position:absolute; left:40%; top:20%;
           transform: translate(-50%, -50%);
           width: 220px; height: 160px;     /* mismas medidas que la imagen */
           display:grid; place-items:center;
           z-index:2;
           /* pequeño flotar */
           animation: float 4s ease-in-out infinite;
            
           }

         @keyframes float{
           0%,100%{ transform: translate(-50%, -52%); }
           50%    { transform: translate(-50%, -48%); }
         }

         .blob{
           position:absolute; border-radius:24px; filter: drop-shadow(0 14px 24px rgba(0,0,0,.15));
           background: linear-gradient(145deg, #fff8, #fff0);
         }
         .b1{ width:88px; height:64px; left:18px; top:22px; transform: rotate(-8deg); }
         .b2{ width:64px; height:64px; right:20px; top:58px; border-radius:50%; }
         .b3{ width:120px; height:84px; right:12px; bottom:18px; transform: rotate(8deg); }

         /* Panel blanco inferior */
 .panel{
   position: relative;
   margin-top: 14px;
   padding: 18px 18px 52px;

   /* 👇 cristal translúcido */
   background: linear-gradient(180deg, rgba(255,255,255,.55), rgba(255,255,255,.32));
   border-radius: 28px;
   border: 1px solid rgba(255,255,255,.55);          /* borde brillante */
   box-shadow:
     0 18px 36px rgba(0,0,0,.18),                     /* sombra exterior suave */
     inset 0 1px 0 rgba(255,255,255,.9);              /* highlight superior */

   /* esmerilado */
   -webkit-backdrop-filter: blur(14px) saturate(140%);
   backdrop-filter: blur(14px) saturate(140%);

   /* pequeño brillo interior para relieve */
   background-clip: padding-box;
 }

 /* Opcional: versión dark, un poco más opaca para contraste */
 html.dark .panel{
   background: linear-gradient(180deg, rgba(17,24,39,.55), rgba(17,24,39,.35));
   border-color: rgba(255,255,255,.08);
   box-shadow:
     0 18px 36px rgba(0,0,0,.45),
     inset 0 1px 0 rgba(255,255,255,.06);
 }
         .dots{ display:flex; gap:6px; justify-content:center; margin-bottom:8px }
         .dots i{ width:8px; height:8px; border-radius:999px; background:#e5e7eb }
         .dots i:nth-child(2){ background:#c7c9d1 }
         .dots i:nth-child(3){ background:#e5e7eb }

         .t{ margin: 4px 0 2px; font-weight: 900; font-size: 1.35rem; color:#1f2937 }
         .s{ margin: 0 0 10px; font-weight: 600; color:#4b5563 }
         .lst{ margin: 8px 0 0 18px; color:#374151 }
         .lst li{ margin-bottom:6px; line-height:1.25 }

         /* Dock + botón circular */
         .dock{
           position:absolute; left:50%; bottom:-28px; transform:translateX(-50%);
           width:96px; height:56px; pointer-events:none;
         }
         .roundCta{
           pointer-events:auto; width:64px; height:64px; border-radius:999px; border:0; cursor:pointer;
           display:grid; place-items:center; font-size:22px; color:#fff;
           background: linear-gradient(145deg, #FF6FD8, #7C5CFF);
           box-shadow:
             0 18px 38px rgba(124,92,255,.35),
             0 6px 12px rgba(124,92,255,.45),
             inset 0 1px 0 rgba(255,255,255,.35);
         }

         /* Posiciones carrusel */
         .farLeft{ transform: translateX(-380px) translateZ(-140px) rotateY(22deg) scale(.9);  opacity:.82; filter: saturate(.9) blur(.25px); z-index:2; }
         .left   { transform: translateX(-220px) translateZ(-60px)  rotateY(16deg) scale(.95); opacity:.93; filter: saturate(.92) blur(.12px); z-index:4; }
         .center { transform: translateX(0) translateZ(0) rotateY(0deg) scale(1.06); box-shadow: 0 32px 80px rgba(0,0,0,.28), 0 16px 40px rgba(0,0,0,.18); z-index:5; }
         .right  { transform: translateX(220px) translateZ(-60px)  rotateY(-16deg) scale(.95); opacity:.93; filter: saturate(.92) blur(.12px); z-index:4; }
         .farRight{transform: translateX(380px) translateZ(-140px) rotateY(-22deg) scale(.9);  opacity:.82; filter: saturate(.9) blur(.25px); z-index:2; }

         /* Animación central */
         .inRight{ animation: centerFromRight var(--tms, 550ms) cubic-bezier(.2,.7,.2,1) }
         .inLeft { animation: centerFromLeft  var(--tms, 550ms) cubic-bezier(.2,.7,.2,1) }
         @keyframes centerFromRight{
           0%   { transform: translateX(22px) translateZ(-40px) scale(.98); opacity:.0; }
           60%  { transform: translateX(-4px) translateZ(-10px) scale(1.03); opacity:1; }
           100% { transform: translateX(0)    translateZ(0)     scale(1.06); }
         }
         @keyframes centerFromLeft{
           0%   { transform: translateX(-22px) translateZ(-40px) scale(.98); opacity:.0; }
           60%  { transform: translateX(4px)   translateZ(-10px) scale(1.03); opacity:1; }
           100% { transform: translateX(0)     translateZ(0)     scale(1.06); }
         }

         /* Modo listado */
         :global(.stage.showAll) :global(.svcCard.list){
           max-width: 95%;
           position:relative !important;
           transform:none !important; opacity:1 !important; filter:none !important;
           width: min(360px, 100%); height: 560px; border-radius:36px;
           box-shadow: 0 16px 34px rgba(0,0,0,.16);
         }
         :global(.stage.showAll) :global(.svcCard.list:hover){
           transform: translateY(-4px);
           box-shadow: 0 24px 46px rgba(0,0,0,.2);
         }
       
         @media (max-width: 980px){
           .svcCard{ width: 300px;}
           .illus, .illus-img{ width:200px; height:146px; }
          
         }
         @media (max-width: 760px){
           .svcCard{ width: 280px;  }
           .illus, .illus-img{ width:186px; height:136px; }
         }
       `}</style>
     </article>
   );
 }
