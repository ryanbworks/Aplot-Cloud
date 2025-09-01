'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/stores/use-app-store';
import { Cloud, Zap, Shield, Users } from 'lucide-react';
import Hero from '@/components/Hero';
import Benefits from '@/components/Benefits';
import TechnicalFeatures from '@/components/TechnicalFeatures';
import Footer from '@/components/Footer';

export default function Home() {
  const { theme, setTheme } = useAppStore();

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
