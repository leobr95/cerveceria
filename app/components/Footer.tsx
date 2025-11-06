// app/components/Footer.tsx
'use client';

import { useMemo } from 'react';

type Lang = 'es' | 'en';

type Dict = {
  tagline: string;
  newsletterTitle: string;
  newsletterHint: string;
  newsletterCta: string;
  services: string;
  contact: string;
  quick: string;
  s1: string;
  s2: string;
  s3: string;
  s4: string;
  s5: string;
  writeUs: string;
  whatsapp: string;
  home: string;
  servicesLink: string;
  contactLink: string;
  rights: string;
  privacy: string;
  terms: string;
};

const T: Record<Lang, Dict> = {
  es: {
    tagline: 'Webs rápidas, apps listas para producción.',
    newsletterTitle: 'Suscríbete',
    newsletterHint: 'Tu correo',
    newsletterCta: 'Recibir novedades',
    services: 'Servicios',
    contact: 'Contacto',
    quick: 'Enlaces',
    s1: 'Sitio web corporativo',
    s2: 'Tienda online',
    s3: 'Reservas & citas',
    s4: 'Portal de clientes',
    s5: 'App móvil',
    writeUs: 'Escríbenos',
    whatsapp: 'WhatsApp',
    home: 'Inicio',
    servicesLink: 'Servicios',
    contactLink: 'Contacto',
    rights: 'Todos los derechos reservados',
    privacy: 'Privacidad',
    terms: 'Términos',
  },
  en: {
    tagline: 'Fast websites, production-ready apps.',
    newsletterTitle: 'Subscribe',
    newsletterHint: 'Your email',
    newsletterCta: 'Get updates',
    services: 'Services',
    contact: 'Contact',
    quick: 'Links',
    s1: 'Corporate website',
    s2: 'Online store',
    s3: 'Bookings & appointments',
    s4: 'Client portal',
    s5: 'Mobile app',
    writeUs: 'Write us',
    whatsapp: 'WhatsApp',
    home: 'Home',
    servicesLink: 'Services',
    contactLink: 'Contact',
    rights: 'All rights reserved',
    privacy: 'Privacy',
    terms: 'Terms',
  },
};

export function Footer({ locale = 'es' as Lang }: { locale?: Lang }) {
  const t = T[locale];

  const whatsappUrl = useMemo<string>(
    () => process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/+573236504428?text=Hola%2C%20quiero%20una%20cotizaci%C3%B3n%20de%20desarrollo%20de%20software.%0AMi%20nombre%3A%20%5BTu%20nombre%5D%0ANecesito%3A%20%5BWeb%20%7C%20App%20%7C%20Automatizaci%C3%B3n%5D%0APlazo%20estimado%3A%20%5B%5D',
    []
  );
  const mail = useMemo<string>(
    () => process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'mailto:hello@example.com',
    []
  );

  return (
    <footer className="ft">
      <div className="grid">
        {/* Marca */}
        <div className="brand card">
          <div className="logo">lb.codeworks</div>
          <p className="tagline">{t.tagline}</p>
        </div>

        {/* Servicios */}
        <nav className="links card" aria-label={t.services}>
          <h4 className="h4">{t.services}</h4>
     

          </nav>

          {/* Contacto */}
          <div className="contact card">
            <h4 className="h4">{t.contact}</h4>
            <div className="btns">
              <a className="btn-primary" href={mail}>{t.writeUs}</a>
              <a className="btn-soft" href={whatsappUrl} target="_blank" rel="noreferrer">{t.whatsapp}</a>
            </div>
          </div>

          {/* Newsletter */}
    
      </div>


      <style jsx>{`
        .ft{
          margin-top: 40px;
          padding: 28px 22px 18px;
          border-radius: 26px;
          background: var(--ui-bg, #edf1f6);
          box-shadow:
            16px 16px 32px rgba(163,177,198,.45),
            -16px -16px 32px rgba(255,255,255,.95);
        }

        .grid{
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr 1.2fr;
          gap: 18px;
        }
        @media (max-width: 1024px){
          .grid{ grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px){
          .grid{ grid-template-columns: 1fr; }
        }

        .card{
          background: var(--ui-bg, #edf1f6);
          border-radius: 20px;
          padding: 18px;
          box-shadow:
            inset 7px 7px 14px rgba(163,177,198,.35),
            inset -7px -7px 14px rgba(255,255,255,.95);
        }

        .logo{
          font-size: clamp(20px, 3.2vw, 28px);
          font-weight: 900;
          letter-spacing: .2px;
          color:#1f2a44;
        }
        .tagline{ margin: 6px 0 0; color:#6b7280 }

        .h4{
          margin:0 0 10px; font-weight: 900; color:#1f2a44;
        }
        .links ul{ list-style:none; padding:0; margin:0; display:grid; gap:8px; }
        .links a{
          color:#384260; text-decoration:none; font-weight:700;
          padding:10px 12px; border-radius:14px; display:inline-block;
          background: var(--ui-bg, #edf1f6);
          box-shadow:
            6px 6px 12px rgba(163,177,198,.25),
            -6px -6px 12px rgba(255,255,255,.9),
            inset 0 0 0 rgba(0,0,0,0);
          transition: transform .12s ease, box-shadow .18s ease;
        }
        .links a:hover{
          transform: translateY(-1px);
          box-shadow:
            10px 10px 18px rgba(163,177,198,.35),
            -10px -10px 18px rgba(255,255,255,.95);
        }
 
        .btns{ display:flex; gap:12px; flex-wrap:wrap }
        .btn-primary{
          padding:12px 16px; border-radius:16px; font-weight:900; color:#fff; text-decoration:none;
          background: linear-gradient(135deg,#6c7bff,#8e6bff 60%,#ff6fd8);
         
        }
        .btn-soft{
          padding:12px 16px; border-radius:16px; font-weight:800; text-decoration:none; color:#1f2a44;
          background: var(--ui-bg, #edf1f6);
          
        }

        .nl-form{
          display:flex; gap:10px; align-items:center; flex-wrap:wrap;
          background: var(--ui-bg, #edf1f6);
          padding: 10px; border-radius:16px;
          box-shadow:
            inset 6px 6px 12px rgba(163,177,198,.35),
            inset -6px -6px 12px rgba(255,255,255,.95);
        }
        .nl-form input{
          border:0; outline:none; background:transparent; padding:10px 12px; border-radius:12px;
          color:#1f2a44; min-width: 220px;
        }
        .nl-form button{
          border:0; padding:10px 14px; border-radius:12px; font-weight:900; cursor:pointer;
          color:#fff; background: linear-gradient(135deg,#6c7bff,#8e6bff 60%,#ff6fd8);

        }

        .bottom{
          margin-top: 18px; display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap;
          padding-top: 12px;
        }
        .small{ color:#6b7280; display:flex; gap:8px; align-items:center; flex-wrap:wrap }
        .small a{ color:#5b6a92; text-decoration:none; font-weight:800 }
        .dot{ opacity:.6 }

        /* Dark */
        :global(html.dark) .ft{
          --ui-bg: #0f1425;
          box-shadow:
            16px 16px 32px rgba(0,0,0,.6),
            -16px -16px 32px rgba(255,255,255,.05);
        }
        :global(html.dark) .card{
          background:#0f1425;
          box-shadow:
            inset 7px 7px 14px rgba(0,0,0,.6),
            inset -7px -7px 14px rgba(255,255,255,.05);
        }
        :global(html.dark) .logo{ color:#e5e7eb }
        :global(html.dark) .tagline{ color:#9ca3af }
        :global(html.dark) .h4{ color:#e5e7eb }
        :global(html.dark) .links a{ color:#dbe0ea; }
        :global(html.dark) .btn-soft{ color:#e5e7eb; background:#0f1425;

        }
        :global(html.dark) .nl-form{
          background:#0f1425;
          box-shadow:
            inset 6px 6px 12px rgba(0,0,0,.6),
            inset -6px -6px 12px rgba(255,255,255,.05);
        }
        :global(html.dark) .nl-form input{ color:#e5e7eb }
        :global(html.dark) .small{ color:#9ca3af }
        :global(html.dark) .small a{ color:#cfd6ff }
      `}</style>
    </footer>
  );
}

export default Footer;
