import dynamic from 'next/dynamic';
import { generateMetadata as generateMetadataUtil } from '@/lib/metadata';
import type { Metadata } from 'next';
import Hero from '@/components/Hero';

// Lazy load componentes que não são críticos para above-the-fold
const Benefits = dynamic(() => import('@/components/Benefits'), {
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center bg-background">
      <div className="animate-pulse text-muted-foreground">Carregando benefícios...</div>
    </div>
  ),
});

const TechnicalFeatures = dynamic(() => import('@/components/TechnicalFeatures'), {
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center bg-background">
      <div className="animate-pulse text-muted-foreground">Carregando recursos...</div>
    </div>
  ),
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => null,
});

export const metadata: Metadata = generateMetadataUtil({
  title: 'Aplot Cloud - Hospedagem de Servidores de Minecraft, VPS e Discord Bots',
  description: 'Plataforma moderna e elegante para hospedagem de servidores de Minecraft, VPS, Discord Bots e muito mais. Performance, segurança e suporte 24/7.',
  url: '/',
  type: 'website',
});

/**
 * Página inicial da aplicação
 * Componentes pesados são carregados dinamicamente para otimizar performance
 */
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
