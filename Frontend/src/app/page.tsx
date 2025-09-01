'use client';

import Hero from '@/components/Hero';
import Benefits from '@/components/Benefits';
import TechnicalFeatures from '@/components/TechnicalFeatures';
import Footer from '@/components/Footer';

export default function Home() {

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <Hero />

      {/* Benefits Section */}
      <Benefits />

      {/* Technical Features Section */}
      <TechnicalFeatures />

      {/* Footer */}
      <Footer />
    </div>
  );
}
