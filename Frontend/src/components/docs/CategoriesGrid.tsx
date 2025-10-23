'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Clock, Users } from 'lucide-react';
import { CategoryCard } from './CategoryCard';
import { Category } from '@/types/docs';

interface CategoriesGridProps {
  categories: Category[];
}

export function CategoriesGrid({ categories }: CategoriesGridProps) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Explore por Categoria
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Organizamos todo o conteúdo em categorias para facilitar sua navegação e encontrar exatamente o que precisa.
        </p>
      </motion.div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {categories.map((category, index) => (
          <CategoryCard key={category.id} category={category} index={index} />
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-2xl p-8"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/10 border border-green-500/20 mb-4">
            <Sparkles className="h-6 w-6 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Ações Rápidas
          </h3>
          <p className="text-muted-foreground">
            Acesse rapidamente os recursos mais utilizados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: TrendingUp,
              title: 'Artigos Populares',
              description: 'Os mais acessados da semana',
              href: '/suporte/base-conhecimento?sort=popular'
            },
            {
              icon: Clock,
              title: 'Guias Rápidos',
              description: 'Tutoriais de 5 minutos',
              href: '/suporte/base-conhecimento?filter=quick'
            },
            {
              icon: Users,
              title: 'Suporte Técnico',
              description: 'Ajuda especializada 24/7',
              href: '/dashboard/suporte/novo-ticket'
            }
          ].map((action, index) => (
            <motion.a
              key={action.title}
              href={action.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group flex flex-col items-center text-center p-6 bg-card/50 border border-border/40 rounded-xl hover:border-green-500/30 hover:bg-card/80 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/10 border border-green-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <action.icon className="h-6 w-6 text-green-500" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-green-500 transition-colors duration-300">
                {action.title}
              </h4>
              <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                {action.description}
              </p>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
