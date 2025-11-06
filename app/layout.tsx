// app/layout.tsx
import './globals.css';
import '@/app/styles/neumorphism.css';
import type { Metadata } from 'next';
import Providers from './providers';
import Topbar from './topbar';
import Footer from './footer';

export const metadata: Metadata = {
  title: 'lb.codeworks',
  description: 'Desarrollo de software a la medida.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
