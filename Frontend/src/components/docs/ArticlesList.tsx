'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Tag, ArrowLeft } from 'lucide-react';
import { ArticleCard } from './ArticleCard';
import { SearchBar } from './SearchBar';
import { Article } from '@/types/docs';

interface ArticlesListProps {
  articles: Article[];
  categoryName: string;
}

export function ArticlesList({ articles, categoryName }: ArticlesListProps) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="max-w-2xl mx-auto mb-12"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Buscar nesta categoria
          </h2>
          <p className="text-muted-foreground">
            Encontre rapidamente o que você procura
          </p>
        </div>
        <SearchBar placeholder={`Buscar em ${categoryName.toLowerCase()}...`} />
      </motion.div>

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              Todos os Artigos
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Tag className="h-4 w-4" />
              <span>Ordenados por data</span>
            </div>
          </div>

          <div className="grid gap-6">
            {articles.map((article, index) => (
              <ArticleCard 
                key={article.slug} 
                article={article} 
                index={index}
                showCategory={false}
              />
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="text-center py-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted/50 border border-border/40 mb-6">
            <Tag className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Nenhum artigo encontrado
          </h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Esta categoria ainda não possui artigos. Volte em breve para novos conteúdos!
          </p>
          <Link
            href="/suporte/base-conhecimento"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para categorias
          </Link>
        </motion.div>
      )}

      {/* Back to Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-16 text-center"
      >
        <Link
          href="/suporte/base-conhecimento"
          className="inline-flex items-center gap-2 px-6 py-3 border border-border/40 hover:border-green-500/30 hover:bg-green-500/5 text-foreground hover:text-green-500 rounded-xl font-medium transition-all duration-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Ver todas as categorias
        </Link>
      </motion.div>
    </div>
  );
}
