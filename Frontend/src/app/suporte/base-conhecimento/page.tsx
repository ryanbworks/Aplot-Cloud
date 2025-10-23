import React from 'react';
import { HeroSection } from '@/components/docs/HeroSection';
import { CategoriesGrid } from '@/components/docs/CategoriesGrid';
import { getCategories, getDocsStats } from '@/lib/docs-server';

export default async function BaseConhecimentoPage() {
  const categories = await getCategories();
  const stats = await getDocsStats();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-green-500/5">
      <HeroSection stats={stats} />
      <CategoriesGrid categories={categories} />
    </div>
  );
}
