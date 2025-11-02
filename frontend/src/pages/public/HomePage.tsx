import React from 'react';
import {
  Navigation,
  HeroSection,
  HowItWorks,
  TierShowcase,
  FeaturesGrid,
  DashboardPreview,
  Testimonials,
  FAQ,
  CTASection,
  Footer,
} from '../../components/landing';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <HeroSection />
      <HowItWorks />
      <TierShowcase />
      <FeaturesGrid />
      <DashboardPreview />
      <Testimonials />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
};
