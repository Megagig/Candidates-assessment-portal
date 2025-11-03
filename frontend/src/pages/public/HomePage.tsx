import { Navigation } from '../../components/landing/Navigation';
import { HeroSection } from '../../components/landing/HeroSection';
import { TierShowcase } from '../../components/landing/TierShowcase';
import { Features } from '../../components/landing/Features';
import { Footer } from '../../components/landing/Footer';

export const HomePage = () => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Navigation />
      <HeroSection />
      <TierShowcase />
      <Features />
      <Footer />
    </div>
  );
};
