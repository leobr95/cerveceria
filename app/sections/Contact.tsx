import ContactForm from '@/app/ui/ContactForm';

export default function Contact() {
  return (
    <section id="contact" className="contact-wrap">
      <header className="head">
        <h2 className="title">Hablemos de tu proyecto</h2>
        <p className="muted">Cuéntame qué necesitas y te contacto con una propuesta.</p>
      </header>

      <ContactForm />

      <style jsx>{`
        .contact-wrap{
          margin-top:32px;
          padding: 22px;
          border-radius: 24px;
          background: var(--ui-bg, #edf1f6);
          box-shadow:
            14px 14px 28px rgba(163,177,198,.45),
            -14px -14px 28px rgba(255,255,255,.9);
        }
        .head{ margin-bottom: 14px }
        .title{
          margin:0 0 6px;
          font-weight:900;
          font-size: clamp(22px, 3.2vw, 32px);
          color:#1f2a44;
        }
        .muted{ margin:0; color:#6b7280 }
        :global(html.dark) .contact-wrap{
          --ui-bg: #0f1425;
          box-shadow:
            14px 14px 28px rgba(0,0,0,.55),
            -14px -14px 28px rgba(255,255,255,.04);
        }
        :global(html.dark) .title{ color:#e5e7eb }
        :global(html.dark) .muted{ color:#9ca3af }
      `}</style>
    </section>
  );
}
