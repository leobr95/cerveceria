// app/topbar.tsx
'use client';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { useTheme, useI18n } from '@/app/providers';
import { FiSun, FiMoon } from 'react-icons/fi';

// ÚNICO LOGO PNG (2738×494 aprox, sin fondo)
import logo from '@/app/logos/logo_sin_fondo.png';

export default function Topbar() {
  const { theme, toggle: toggleTheme, ready } = useTheme();
  const { lang, setLang } = useI18n();

  const [open, setOpen] = React.useState(false);
  const toggleLang = () => setLang(lang === 'es' ? 'en' : 'es');

  // URL de WhatsApp (env o fallback)
  const whatsappHref =
    process.env.NEXT_PUBLIC_WHATSAPP_URL ??
    'https://wa.me/+573236504428?text=Hola%2C%20quiero%20una%20cotizaci%C3%B3n%20de%20desarrollo%20de%20software.%0AMi%20nombre%3A%20%5BTu%20nombre%5D%0ANecesito%3A%20%5BWeb%20%7C%20App%20%7C%20Automatizaci%C3%B3n%5D%0APlazo%20estimado%3A%20%5B%5D';

  // Abrir WhatsApp en móvil y cerrar overlay
  const openWhatsApp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(whatsappHref, '_blank', 'noopener,noreferrer');
    setOpen(false);
  };

  // Bloquea scroll del body cuando el overlay está abierto
  React.useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  // Fallback para alto de viewport móvil (cuando 100dvh no esté disponible)
  React.useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);
    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, []);

  const Logo = () => {
    if (!ready) return <span className="logo-placeholder" aria-hidden />;
    return (
      <Image
        src={logo}
        alt="lb.codeworks"
        fill
        priority
        sizes="(max-width:560px) 160px, 200px"
        style={{ objectFit: 'contain' }}
      />
    );
  };

  return (
    <>
      <header className="nav">
        {/* Marca */}
        <Link className="brand" href="/" aria-label={lang === 'es' ? 'Ir al inicio' : 'Go home'}>
          <span className="logo-wrap"><Logo /></span>
        </Link>

        {/* Desktop links */}
        <nav className="links">
          <a href="#top">{lang === 'es' ? 'Inicio' : 'Home'}</a>
          <a href="#services">{lang === 'es' ? 'Servicios' : 'Services'}</a>
          <a href="#contact">{lang === 'es' ? 'Contacto' : 'Contact'}</a>
          <a href={whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a>

          <div className="toggles">
            <button
              className="pill"
              onClick={toggleLang}
              aria-label={lang === 'es' ? 'Cambiar idioma' : 'Change language'}
            >
              {lang.toUpperCase()}
            </button>

            {/* ===== Botón tema con icono en chip redondo y fondo de color ===== */}
            <button
              className="pill icon-pill"
              onClick={toggleTheme}
              aria-label={lang === 'es' ? 'Cambiar tema' : 'Toggle theme'}
              aria-pressed={theme === 'dark'}
            >
              <span className="icon-chip" aria-hidden>
                {theme === 'dark' ? <FiSun className="ico" /> : <FiMoon className="ico" />}
              </span>
              <span className="sr-only">{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
            </button>
          </div>
        </nav>

        {/* Botón hamburguesa (solo móvil) */}
        <button
          className="hamb"
          onClick={() => setOpen(true)}
          aria-label={lang === 'es' ? 'Abrir menú' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {hambIcon()}
        </button>
      </header>

      {/* Overlay móvil pantalla completa SIN SCROLL */}
      <div id="mobile-menu" className={`overlay ${open ? 'show' : ''}`} role="dialog" aria-modal="true">
        <div className="ov-head">
          <span className="ov-logo"><Logo /></span>
          <button className="ov-close" onClick={() => setOpen(false)} aria-label={lang === 'es' ? 'Cerrar menú' : 'Close menu'}>
            {closeIcon()}
          </button>
        </div>

        {/* Links móviles */}
        <nav className="ov-nav">
          <a href="#top" onClick={() => setOpen(false)}>
            {lang === 'es' ? 'Inicio' : 'Home'}
          </a>
          <a href="#services" onClick={() => setOpen(false)}>
            {lang === 'es' ? 'Servicios' : 'Services'}
          </a>
          <a href="#contact" onClick={() => setOpen(false)}>
            {lang === 'es' ? 'Contacto' : 'Contact'}
          </a>
          <a href={whatsappHref} onClick={openWhatsApp}>
            WhatsApp
          </a>
        </nav>

        <div className="ov-actions">
          <button className="pill big" onClick={toggleLang} aria-label={lang === 'es' ? 'Cambiar idioma' : 'Change language'}>
            {lang.toUpperCase()}
          </button>

          {/* Switch tema también en overlay con el mismo chip redondo */}
          <button
            className="pill big icon-pill"
            onClick={toggleTheme}
            aria-label={lang === 'es' ? 'Cambiar tema' : 'Toggle theme'}
            aria-pressed={theme === 'dark'}
          >
            <span className="icon-chip big" aria-hidden>
              {theme === 'dark' ? <FiSun className="ico" /> : <FiMoon className="ico" />}
            </span>
            <span className="sr-only">{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .sr-only{
          position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;
        }

        /* ====== Topbar (desktop) ====== */
        .nav{
          position: sticky; top: 0; z-index: 60;
          margin: 8px 0 6px;
          padding: 10px 14px;
          border-radius: 20px;
          background: var(--ui-bg, #edf1f6);
          display:flex; align-items:center; justify-content:space-between; gap:12px;
          box-shadow:
            12px 12px 24px rgba(163,177,198,.45),
            -12px -12px 24px rgba(255,255,255,.95);
        }
        .brand{ display:flex; align-items:center; text-decoration:none; }
        .logo-wrap{
          position:relative;
          width:200px;  /* ancho desktop */
          height:48px;  /* altura barra */
          display:block;
        }
        .logo-placeholder{ display:block; width:200px; height:48px; }

        .links{ display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
        .links a{
          text-decoration:none; font-weight:800; color:#384260;
          padding:10px 12px; border-radius:14px;
          background: var(--ui-bg, #edf1f6);
          box-shadow:
            6px 6px 12px rgba(163,177,198,.25),
            -6px -6px 12px rgba(255,255,255,.92);
          transition: transform .12s ease, box-shadow .18s ease;
        }
        .links a:hover{
          transform: translateY(-1px);
          box-shadow:
            10px 10px 18px rgba(163,177,198,.35),
            -10px -10px 18px rgba(255,255,255,.96);
        }

        .toggles{ display:flex; gap:8px; margin-left:8px; }
        .pill{
          border:0; cursor:pointer; font-weight:900;
          padding:10px 12px; border-radius:14px;
          background: var(--ui-bg, #edf1f6);
          color:#1f2a44;
          box-shadow:
            6px 6px 12px rgba(163,177,198,.25),
            -6px -6px 12px rgba(255,255,255,.92);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        /* ===== Botón tema: chip redondo con degradé morado + marco ===== */
        .icon-pill{
          padding: 8px 10px;
        }
        .icon-chip{
          width:32px; height:32px; border-radius:9999px;
          display:grid; place-items:center;
          background: linear-gradient(135deg,#6D5BFF,#B06CFF);
          border: 1px solid rgba(255,255,255,.45);
          box-shadow:
            6px 6px 12px rgba(163,177,198,.30),
            -6px -6px 12px rgba(255,255,255,.90),
            inset 0 1px 0 rgba(255,255,255,.45);
        }
        .icon-chip.big{ width:38px; height:38px; }
        .ico{
          width:18px; height:18px; color:#fff;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,.18));
        }

        .hamb{
          display:none; /* visible solo en móvil */
          border:0; background: var(--ui-bg, #edf1f6); border-radius:12px; padding:8px;
          box-shadow:
            6px 6px 12px rgba(163,177,198,.25),
            -6px -6px 12px rgba(255,255,255,.92);
        }

        /* Dark */
        :global(html.dark) .nav{
          --ui-bg: #0f1425;
          box-shadow:
            12px 12px 24px rgba(0,0,0,.6),
            -12px -12px 24px rgba(255,255,255,.06);
        }
        :global(html.dark) .links a,
        :global(html.dark) .pill,
        :global(html.dark) .hamb{
          color:#dbe0ea; background:#0f1425;
          box-shadow:
            6px 6px 12px rgba(0,0,0,.6),
            -6px -6px 12px rgba(255,255,255,.06);
        }
        :global(html.dark) .icon-chip{
          background: linear-gradient(135deg,#5B4FE6,#8A5BFF);
          border: 1px solid rgba(255,255,255,.10);
          box-shadow:
            6px 6px 12px rgba(0,0,0,.60),
            -6px -6px 12px rgba(255,255,255,.06),
            inset 0 1px 0 rgba(255,255,255,.10);
        }

        /* ====== Overlay móvil ====== */
        .overlay{
          position: fixed; inset: 0; z-index: 80;
          display: flex; flex-direction: column;
          justify-content: space-between;
          height: 100dvh;
          height: calc(var(--vh, 1vh) * 100); /* fallback */
          background: var(--ui-bg, #edf1f6);
          transform: translateY(-102%);
          opacity: 0;
          pointer-events: none;
          transition: transform .28s cubic-bezier(.2,.7,.2,1), opacity .28s ease;
          padding: env(safe-area-inset-top) 16px env(safe-area-inset-bottom);
          overflow: hidden;
          max-width: 95vw;
        }
        .overlay.show{
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        .ov-head{
          display:flex; align-items:center; justify-content:space-between;
          padding: 8px 0 6px;
        }
        .ov-logo{
          position:relative; width:160px; height:40px; display:block;
          border-radius: 12px;
          flex: 0 0 auto;
        }
        .ov-close{
          border:0; background: var(--ui-bg, #edf1f6); border-radius:12px; padding:10px; cursor:pointer;
          box-shadow:
            6px 6px 12px rgba(163,177,198,.25),
            -6px -6px 12px rgba(255,255,255,.92);
          flex: 0 0 auto;
        }

        .ov-nav{
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          gap: 14px;
          padding: 6px 0;
          flex: 1 1 auto;
          min-height: 0;
        }
        .ov-nav a{
          text-decoration:none; font-weight:900;
          font-size: clamp(22px, 7vh, 34px);
          line-height: 1.15;
          color:#1f2a44;
          padding: 10px 14px; border-radius: 16px;
          background: var(--ui-bg, #edf1f6);
          box-shadow:
            8px 8px 18px rgba(163,177,198,.35),
            -8px -8px 18px rgba(255,255,255,.95);
        }

        .ov-actions{
          display:flex; gap:10px; justify-content:center; padding: 10px 0 12px;
          flex: 0 0 auto;
        }
        .pill.big{ padding:10px 14px; font-size: 15px; }

        /* Ajustes para pantallas "bajitas" */
        @media (max-height: 740px){
          .ov-logo{ width:150px; height:36px; }
          .ov-nav{ gap: 12px; }
          .ov-nav a{ font-size: clamp(20px, 6.6vh, 32px); padding: 10px 12px; }
          .ov-actions .pill.big{ padding: 9px 12px; font-size: 14px; }
        }
        @media (max-height: 640px){
          .ov-logo{ width:140px; height:34px; }
          .ov-nav{ gap: 10px; }
          .ov-nav a{ font-size: clamp(18px, 6vh, 28px); padding: 8px 10px; }
          .ov-actions .pill.big{ padding: 8px 10px; font-size: 13px; }
        }

        :global(html.dark) .overlay{
          --ui-bg: #0f1425;
          box-shadow: none;
        }
        :global(html.dark) .ov-close,
        :global(html.dark) .ov-nav a,
        :global(html.dark) .ov-actions .pill{
          color:#dbe0ea; background:#0f1425;
          box-shadow:
            8px 8px 18px rgba(0,0,0,.6),
            -8px -8px 18px rgba(255,255,255,.06);
        }

        /* ====== Responsivo ====== */
        @media (max-width: 900px){
          .links{ display:none; }
          .hamb{ display:inline-grid; place-items:center; }
          .logo-wrap{ width:180px; height:44px; }
          .logo-placeholder{ width:180px; height:44px; }
        }
        @media (max-width: 560px){
          .logo-wrap{ width:160px; height:40px; }
          .logo-placeholder{ width:160px; height:40px; }
        }
      `}</style>
    </>
  );
}

/* ====== Iconos mínimos (SVG inline) ====== */
function hambIcon(){
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
    </svg>
  );
}
function closeIcon(){
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.3 5.71L12 12.01l-6.29-6.3-1.41 1.42 6.3 6.29-6.3 6.29 1.41 1.42L12 14.85l6.29 6.28 1.41-1.41-6.28-6.29 6.28-6.29z"/>
    </svg>
  );
}
