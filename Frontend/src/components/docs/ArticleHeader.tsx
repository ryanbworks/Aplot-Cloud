'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, Calendar, User, Tag } from 'lucide-react';
import { Article } from '@/types/docs';

interface ArticleHeaderProps {
  article: Article;
  categoryName: string;
}

export function ArticleHeader({ article, categoryName }: ArticleHeaderProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="border-b border-green-500/20 bg-gradient-to-br from-background/95 via-background/90 to-green-500/5 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 text-sm mb-8"
        >
          <Link 
            href="/suporte/base-conhecimento" 
            className="flex items-center gap-2 px-3 py-1.5 text-muted-foreground hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all duration-200 font-medium"
          >
            <span>Base de Conhecimento</span>
          </Link>
          <div className="w-1 h-1 bg-green-500/40 rounded-full"></div>
          <Link 
            href={`/suporte/base-conhecimento/${article.category}`}
            className="flex items-center gap-2 px-3 py-1.5 text-muted-foreground hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all duration-200 font-medium"
          >
            <span>{categoryName}</span>
          </Link>
          <div className="w-1 h-1 bg-green-500/40 rounded-full"></div>
          <span className="text-foreground font-semibold px-3 py-1.5 bg-green-500/10 rounded-lg">{article.title}</span>
        </motion.div>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-card/60 to-card/40 border border-green-500/20 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight bg-gradient-to-r from-foreground to-green-400 bg-clip-text text-transparent">
              {article.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {article.description}
            </p>

            {/* Enhanced Metadata */}
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-green-500/10 to-green-400/5 rounded-xl border border-green-500/20">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-green-400/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-4 w-4 text-green-400" />
                </div>
                <span className="text-green-400 font-semibold">{article.readTime} min de leitura</span>
              </div>
              
              <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-blue-400/5 rounded-xl border border-blue-500/20">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-blue-400/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-blue-400 font-semibold">{formatDate(article.date)}</span>
              </div>
              
              {article.author && (
                <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-purple-400/5 rounded-xl border border-purple-500/20">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-purple-400/10 rounded-lg flex items-center justify-center">
                    <User className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="text-purple-400 font-semibold">{article.author}</span>
                </div>
              )}
            </div>

            {/* Enhanced Tags */}
            {article.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-wrap gap-3"
              >
                {article.tags.map((tag, index) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-green-300 bg-gradient-to-r from-green-500/20 to-green-400/10 rounded-xl border border-green-500/30 hover:border-green-400/50 hover:bg-gradient-to-r hover:from-green-500/30 hover:to-green-400/20 transition-all duration-200"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
