'use client';

import Hero from '@/components/Hero';
import Benefits from '@/components/Benefits';
import TechnicalFeatures from '@/components/TechnicalFeatures';
import Footer from '@/components/Footer';

export default function Home() {

  return (
    <div className="bg-background">
      {/* 1. HERO - Apresentação inicial e proposta de valor */}
      <Hero />

      {/* 2. BENEFÍCIOS PRINCIPAIS - Por que escolher a AplotCloud */}
      <Benefits />

      {/* 3. CARACTERÍSTICAS TÉCNICAS - Detalhes técnicos e especificações */}
      <TechnicalFeatures />

      {/* 4. FOOTER - Informações de contato e links */}
      <Footer />
    </div>
  );
}
