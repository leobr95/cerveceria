'use client';
import React from 'react';

/* ===================== THEME ===================== */

type Theme = 'light' | 'dark';
type ThemeCtx = { theme: Theme; toggle: () => void; ready: boolean };
const ThemeContext = React.createContext<ThemeCtx>({ theme: 'dark', toggle: () => {}, ready: false });
export const useTheme = () => React.useContext(ThemeContext);

/* ===================== I18N ===================== */

export type Lang = 'es' | 'en';
type I18nCtx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string; ready: boolean };
const I18nContext = React.createContext<I18nCtx>({ lang: 'es', setLang: () => {}, t: k => k, ready: false });
export const useI18n = () => React.useContext(I18nContext);

// Diccionario simple; si falta una key, t() devuelve la key
const dict: Record<Lang, Record<string, string>> = {
  es: {
    nav_home: 'Inicio',
    nav_services: 'Servicios',
    nav_contact: 'Contacto',
    whatsapp: 'WhatsApp',
  },
  en: {
    nav_home: 'Home',
    nav_services: 'Services',
    nav_contact: 'Contact',
    whatsapp: 'WhatsApp',
  },
};

/* ===================== PROVIDERS ===================== */

export default function Providers({ children }: { children: React.ReactNode }) {
  // THEME
  const [theme, setTheme] = React.useState<Theme>('dark');
  const [readyTheme, setReadyTheme] = React.useState(false);

  React.useEffect(() => {
    const saved = (typeof window !== 'undefined' && localStorage.getItem('theme')) as Theme | null;
    setTheme(saved ?? 'dark');
    setReadyTheme(true);
  }, []);

  React.useEffect(() => {
    if (!readyTheme) return;
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme, readyTheme]);

  const toggleTheme = React.useCallback(() => setTheme(t => (t === 'dark' ? 'light' : 'dark')), []);

  // I18N
  const [lang, setLangState] = React.useState<Lang>('es');
  const [readyI18n, setReadyI18n] = React.useState(false);

  React.useEffect(() => {
    const saved = (typeof window !== 'undefined' && localStorage.getItem('lang')) as Lang | null;
    setLangState(saved ?? 'es');
    setReadyI18n(true);
  }, []);

  const setLang = React.useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== 'undefined') localStorage.setItem('lang', l);
  }, []);

  const t = React.useCallback((k: string) => dict[lang][k] ?? k, [lang]);

  return (
    <ThemeContext.Provider value={{ theme, toggle: toggleTheme, ready: readyTheme }}>
      <I18nContext.Provider value={{ lang, setLang, t, ready: readyI18n }}>
        {children}
      </I18nContext.Provider>
    </ThemeContext.Provider>
  );
}
