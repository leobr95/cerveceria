// app/lib/i18n.ts
export type Lang = 'es' | 'en';

type CommonTexts = {
  viewServices: string;
  contactUs: string;
  send: string;
  sending: string;
};

type HomeTexts = {
  title: string;
  subtitle: string;
};

type ServiceKey =
  | 'web'
  | 'custom'
  | 'integrations'
  | 'data'
  | 'devops'
  | 'mobile';

type ServiceItem = {
  title: string;
  desc: string;
};

type ServicesTexts = Record<ServiceKey, ServiceItem>;

type ContactTexts = {
  title: string;
  subtitle: string;
  name: string;
  phone: string;
  message: string;
  ok: string;
  err: string;
};

export type Texts = {
  common: CommonTexts;
  home: HomeTexts;
  services: ServicesTexts;
  contact: ContactTexts;
};

const dict: Record<Lang, Texts> = {
  es: {
    common: {
      viewServices: 'Ver servicios',
      contactUs: 'Contáctanos',
      send: 'Enviar',
      sending: 'Enviando…',
    },
    home: {
      title: 'Creamos productos digitales que convierten',
      subtitle: 'Sitios web veloces, APIs robustas y apps móviles con una sola base de código.',
    },
    services: {
      web: { title: 'Web Performance & Landing', desc: 'Diseño y desarrollo con foco en velocidad y SEO.' },
      custom: { title: 'Software a la medida', desc: 'Backends .NET, autenticación, roles y auditoría.' },
      integrations: { title: 'Integraciones', desc: 'SAP, SharePoint, KeyVaults y reporting SSRS.' },
      data: { title: 'Datos & Reporting', desc: 'SQL Server, procedimientos y paneles de negocio.' },
      devops: { title: 'DevOps & Entrega Continua', desc: 'Docker, CI/CD, observabilidad y calidad.' },
      mobile: { title: 'App Android/iOS', desc: 'De web a tiendas con Capacitor y PWA.' },
    },
    contact: {
      title: 'Cuéntanos sobre tu proyecto',
      subtitle: 'Respondemos en menos de 24 horas hábiles.',
      name: 'Nombre',
      phone: 'Teléfono (opcional)',
      message: '¿Qué necesitas construir?',
      ok: '¡Mensaje enviado! Te contactaremos pronto.',
      err: 'Algo falló al enviar. Intenta de nuevo.',
    },
  },
  en: {
    common: {
      viewServices: 'View services',
      contactUs: 'Contact us',
      send: 'Send',
      sending: 'Sending…',
    },
    home: {
      title: 'We build digital products that convert',
      subtitle: 'Fast websites, robust APIs and mobile apps from a single codebase.',
    },
    services: {
      web: { title: 'Web Performance & Landing', desc: 'Design & dev focused on speed and SEO.' },
      custom: { title: 'Custom Software', desc: '.NET backends, auth, roles & auditing.' },
      integrations: { title: 'Integrations', desc: 'SAP, SharePoint, KeyVaults & SSRS reporting.' },
      data: { title: 'Data & Reporting', desc: 'SQL Server, stored procedures and BI dashboards.' },
      devops: { title: 'DevOps & CI/CD', desc: 'Docker, pipelines, observability and quality.' },
      mobile: { title: 'Android/iOS App', desc: 'Web to stores with Capacitor and PWA.' },
    },
    contact: {
      title: 'Tell us about your project',
      subtitle: 'We usually reply within one business day.',
      name: 'Name',
      phone: 'Phone (optional)',
      message: 'What do you need to build?',
      ok: 'Message sent! We will get back to you soon.',
      err: 'Send failed. Please try again.',
    },
  },
};

export const getTexts = (l: Lang): Texts => dict[l];
