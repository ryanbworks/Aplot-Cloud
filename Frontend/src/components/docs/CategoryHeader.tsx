'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, BookOpen, Rocket, Gamepad2, Bot, Server, Wallet, HelpCircle } from 'lucide-react';
import { Category } from '@/types/docs';

interface CategoryHeaderProps {
  category: Category;
  articlesCount: number;
}

// Mapeamento de strings para componentes Lucide
const iconMap = {
  'Rocket': Rocket,
  'Gamepad2': Gamepad2,
  'Bot': Bot,
  'Server': Server,
  'Wallet': Wallet,
  'HelpCircle': HelpCircle,
};

export function CategoryHeader({ category, articlesCount }: CategoryHeaderProps) {
  const Icon = iconMap[category.icon as keyof typeof iconMap] || HelpCircle;
  return (
    <div className="border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
        >
          <Link 
            href="/suporte/base-conhecimento" 
            className="hover:text-green-500 transition-colors duration-200"
          >
            Base de Conhecimento
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">{category.name}</span>
        </motion.div>

        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-500/10 border border-green-500/20 mb-6"
            >
              <Icon className="h-8 w-8 text-green-500" />
            </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {category.name}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {category.description}
          </p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex items-center justify-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>{articlesCount} artigos</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Tempo de leitura variável</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
