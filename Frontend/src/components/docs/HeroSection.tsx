'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search } from 'lucide-react';
import { SearchBar } from './SearchBar';

interface HeroSectionProps {
  stats: {
    totalArticles: number;
    totalCategories: number;
    averageReadTime: number;
    totalWords: number;
  };
}

export function HeroSection({ stats }: HeroSectionProps) {
  return (
    <div className="border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-500/10 border border-green-500/20 mb-6"
          >
            <BookOpen className="h-8 w-8 text-green-500" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Base de <span className="text-green-500">Conhecimento</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Encontre respostas rápidas, guias detalhados e tudo que você precisa para aproveitar ao máximo nossos serviços.
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <SearchBar placeholder="Buscar artigos, tutoriais e guias..." />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500 mb-1">{stats.totalArticles}</div>
              <div className="text-sm text-muted-foreground">Artigos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500 mb-1">{stats.totalCategories}</div>
              <div className="text-sm text-muted-foreground">Categorias</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500 mb-1">{stats.averageReadTime}</div>
              <div className="text-sm text-muted-foreground">Min médio</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500 mb-1">{stats.totalWords.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Palavras</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
