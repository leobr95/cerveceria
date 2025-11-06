'use client';
import { useMemo, useState } from 'react';

type Payload = {
  name: string; email: string; phone?: string; service?: string;
  message: string; company?: string; // honeypot
};

const SERVICES = [
  'Sitio web corporativo',
  'Tienda online',
  'Reservas & citas',
  'Portal de clientes',
  'App móvil',
  'Otro / Consultoría'
] as const;

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [errMsg, setErrMsg] = useState<string>("");

  const whatsappUrl = useMemo(() => {
    const base ='https://wa.me/+573236504428?text=Hola%2C%20quiero%20una%20cotizaci%C3%B3n%20de%20desarrollo%20de%20software.%0AMi%20nombre%3A%20%5BTu%20nombre%5D%0ANecesito%3A%20%5BWeb%20%7C%20App%20%7C%20Automatizaci%C3%B3n%5D%0APlazo%20estimado%3A%20%5B%5D';
    return base;
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setOk(null); setErrMsg("");

    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as unknown as Payload;

    // honeypot
    if (data.company && String(data.company).trim() !== '') {
      setLoading(false); setOk(true);
      (e.currentTarget as HTMLFormElement).reset();
      return;
    }

    if (!data.name || !data.email || !data.message) {
      setLoading(false); setOk(false); setErrMsg('Por favor completa nombre, email y mensaje.');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      setOk(res.ok);
      if (res.ok) (e.currentTarget as HTMLFormElement).reset();
      else setErrMsg('No se pudo enviar. Intenta nuevamente.');
    } catch {
      setOk(false); setErrMsg('Ocurrió un error de red. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} className="form" noValidate>
        {/* honeypot */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hp" aria-hidden />

        <div className="row">
          <NeumInput name="name"  label="Nombre"  required />
          <NeumInput name="email" type="email" label="Correo" required />
        </div>

        <div className="row">
          <NeumInput name="phone" label="Teléfono (opcional)" />
          <NeumSelect name="service" label="Servicio" options={[...SERVICES]} />
        </div>

        <NeumTextArea name="message" label="¿Qué necesitas construir?" required rows={5} />

        <div className="actions">
          <button disabled={loading} className="btn-primary">{loading ? 'Enviando…' : 'Enviar'}</button>
          <a className="btn-soft" href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>

        <div className="status" aria-live="polite" role="status">
          {ok === true && <p className="ok">¡Enviado! Te escribiré pronto.</p>}
          {ok === false && <p className="err">{errMsg || 'No se pudo enviar. Intenta nuevamente.'}</p>}
        </div>
      </form>

      <style jsx>{`
        .hp{ position:absolute; left:-9999px; opacity:0; width:1px; height:1px; }

        .form{ display:grid; gap:16px; }
        .row{
          display:grid; grid-template-columns: 1fr 1fr; gap:16px;
        }
        @media (max-width: 720px){ .row{ grid-template-columns: 1fr; } }

        .actions{ display:flex; gap:12px; flex-wrap:wrap; align-items:center; margin-top:4px; }

        /* Botones estilo neumórfico */
        .btn-primary{
          appearance:none; border:0; cursor:pointer;
          padding:12px 18px; border-radius:16px; font-weight:900;
          color:#fff; background: linear-gradient(135deg,#6c7bff,#8e6bff 60%,#ff6fd8);
          
        }
        .btn-primary:active{ transform: translateY(1px); }
        .btn-primary:disabled{ opacity:.75; cursor:default; }

        .btn-soft{
          padding:12px 18px; border-radius:16px; font-weight:800; color:#1f2a44; text-decoration:none;
          background: var(--ui-bg, #edf1f6);

        }

        .status{ min-height:22px; }
        .ok{ color:#16a34a; font-weight:700 }
        .err{ color:#ef4444; font-weight:700 }

        :global(html.dark) .btn-soft{
          color:#e5e7eb; background:#0f1425;

        }
      `}</style>
    </>
  );
}

/* ---------- Controles neumórficos ---------- */

function NeumInput({ name, label, type = 'text', required }:{
  name: string; label: string; type?: string; required?: boolean;
}) {
  return (
    <label className="wrap">
      <input className="inp" type={type} name={name} required={required} placeholder=" " />
      <span className="lab">{label}{required ? ' *' : ''}</span>

      <style jsx>{`
        .wrap{
          position:relative; border-radius:20px; padding:18px 16px 10px;
          background: var(--ui-bg, #edf1f6);
          box-shadow:
            inset 6px 6px 12px rgba(163,177,198,.35),
            inset -6px -6px 12px rgba(255,255,255,.95);
        }
        .inp{
          width:100%; border:0; outline:none; background:transparent;
          color:#1f2a44; font: inherit; height:28px;
        }
        .lab{
          position:absolute; left:16px; top:12px; font-size:12px; color:#7b869a; pointer-events:none;
          transition: opacity .15s ease;
        }
        .inp:placeholder-shown + .lab{ opacity:.85; }
        :global(html.dark) .wrap{
          background:#0f1425;
          box-shadow:
            inset 6px 6px 12px rgba(0,0,0,.6),
            inset -6px -6px 12px rgba(255,255,255,.05);
        }
        :global(html.dark) .inp{ color:#e5e7eb }
        :global(html.dark) .lab{ color:#9ca3af }
      `}</style>
    </label>
  );
}

function NeumSelect({ name, label, options }:{
  name: string; label: string; options: string[];
}) {
  return (
    <label className="wrap">
      <select className="inp sel" name={name} defaultValue="">
        <option value="" disabled>Selecciona una opción</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <span className="lab">{label}</span>

      <style jsx>{`
        .wrap{
          position:relative; border-radius:20px; padding:18px 16px 10px;
          background: var(--ui-bg, #edf1f6);
          box-shadow:
            inset 6px 6px 12px rgba(163,177,198,.35),
            inset -6px -6px 12px rgba(255,255,255,.95);
        }
        .sel{ width:100%; border:0; outline:none; background:transparent; color:#1f2a44; font:inherit; height:28px; }
        .lab{ position:absolute; left:16px; top:12px; font-size:12px; color:#7b869a; pointer-events:none; }
        :global(html.dark) .wrap{
          background:#0f1425;
          box-shadow:
            inset 6px 6px 12px rgba(0,0,0,.6),
            inset -6px -6px 12px rgba(255,255,255,.05);
        }
        :global(html.dark) .sel{ color:#e5e7eb }
        :global(html.dark) .lab{ color:#9ca3af }
      `}</style>
    </label>
  );
}

function NeumTextArea({ name, label, required, rows = 4 }:{
  name: string; label: string; required?: boolean; rows?: number;
}) {
  return (
    <label className="wrap">
      <textarea className="inp ta" name={name} required={required} placeholder=" " rows={rows} />
      <span className="lab">{label}{required ? ' *' : ''}</span>

      <style jsx>{`
        .wrap{
          position:relative; border-radius:20px; padding:18px 16px 10px;
          background: var(--ui-bg, #edf1f6);
          box-shadow:
            inset 6px 6px 12px rgba(163,177,198,.35),
            inset -6px -6px 12px rgba(255,255,255,.95);
        }
        .ta{ width:100%; border:0; outline:none; background:transparent; color:#1f2a44; font:inherit; min-height:120px; resize:vertical; }
        .lab{ position:absolute; left:16px; top:12px; font-size:12px; color:#7b869a; pointer-events:none; }
        :global(html.dark) .wrap{
          background:#0f1425;
          box-shadow:
            inset 6px 6px 12px rgba(0,0,0,.6),
            inset -6px -6px 12px rgba(255,255,255,.05);
        }
        :global(html.dark) .ta{ color:#e5e7eb }
        :global(html.dark) .lab{ color:#9ca3af }
      `}</style>
    </label>
  );
}
