import React from 'react';
import { notFound } from 'next/navigation';
import { ArticleHeader } from '@/components/docs/ArticleHeader';
import { ArticleContent } from '@/components/docs/ArticleContent';
import { getArticle, getCategories, getRelatedArticles } from '@/lib/docs-server';

interface ArticlePageProps {
  params: Promise<{
    categoria: string;
    slug: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { categoria, slug } = await params;
  const article = await getArticle(categoria, slug);
  
  if (!article) {
    notFound();
  }

  const categories = await getCategories();
  const category = categories.find(cat => cat.id === categoria);
  const relatedArticles = await getRelatedArticles(article, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-green-500/5">
      <ArticleHeader article={article} categoryName={category?.name || ''} />
      <ArticleContent article={article} relatedArticles={relatedArticles} />
    </div>
  );
}
