// app/page.tsx
'use client';

import Hero from '@/app/sections/Hero';
import Contact from '@/app/sections/Contact';
import ServicesCenterCarousel from '@/app/sections/ServicesCenterCarouselNewCard';
import ServicesTilesMobile from '@/app/sections/ServicesTilesMobile';
import FAQSection from '@/app/sections/FAQ';
import Footer from '@/app/components/Footer';
import { FaWhatsapp } from 'react-icons/fa';
import ServicesNeumorphicGrid from './sections/ServicesNeumorphicGrid';
import ProvincesShowcase from './sections/ProvincesShowcase';
import BrewerySimulator from './sections/BrewerySimulator';
import RecipeLibrary from './sections/RecipeLibrary';
import MascotLeopard from './sections/MascotLeopard';
import HeaderBar from './sections/HeaderBar';
import HeroBrand from './sections/HeroBrand';
import ProvincesStrip from './sections/ProvincesStrip';
import SantanderInteractive from './sections/SantanderInteractive';
import BeersShowcase from './sections/BeersShowcase';

export default function Home() {
  return (
    <>
      <HeaderBar />
      <HeroBrand />
      <ProvincesStrip />
      <SantanderInteractive />
            <BeersShowcase />

      <BrewerySimulator />
      <RecipeLibrary />
      <MascotLeopard size={192} />
    </>

  
  );
}
