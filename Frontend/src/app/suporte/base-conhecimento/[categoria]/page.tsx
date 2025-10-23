import React from 'react';
import { notFound } from 'next/navigation';
import { CategoryHeader } from '@/components/docs/CategoryHeader';
import { ArticlesList } from '@/components/docs/ArticlesList';
import { getCategories, getArticlesByCategory } from '@/lib/docs-server';

interface CategoryPageProps {
  params: {
    categoria: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categories = await getCategories();
  const category = categories.find(cat => cat.id === params.categoria);
  
  if (!category) {
    notFound();
  }

  const articles = await getArticlesByCategory(params.categoria);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-green-500/5">
      <CategoryHeader category={category} articlesCount={articles.length} />
      <ArticlesList articles={articles} categoryName={category.name} />
    </div>
  );
}