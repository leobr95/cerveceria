import ContactForm from '@/app/components/ContactForm';

export const metadata = { title: 'Contacto — lb.codeworks' };

export default function ContactPage() {
  return (
    <section className="card-neu p-8 mt-8">
      <h1 className="title">Contáctanos</h1>
      <p className="muted">Respondemos en menos de 24 horas hábiles.</p>
      <ContactForm />
    </section>
  );
}
