// app/page.tsx
'use client';
import HeaderBar from './sections/HeaderBar';
import HeroBrand from './sections/HeroBrand';
import ProvincesStrip from './sections/ProvincesStrip';
import SantanderInteractive from './sections/SantanderInteractive';
import BeersShowcase from './sections/BeersShowcase';
import BrewerySimulator from './sections/BrewerySimulator';
import RecipeLibrary from './sections/RecipeLibrary';
import MascotLeopard from './sections/MascotLeopard';

export default function HomePage() {
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