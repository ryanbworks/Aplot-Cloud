'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Category } from '@/types/docs';
import { ArrowRight, BookOpen, Rocket, Gamepad2, Bot, Server, Wallet, HelpCircle } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  index: number;
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

export function CategoryCard({ category, index }: CategoryCardProps) {
  const Icon = iconMap[category.icon as keyof typeof iconMap] || HelpCircle;

  return (
    <Link href={`/suporte/base-conhecimento/${category.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.1,
          ease: "easeOut"
        }}
        whileHover={{ 
          scale: 1.02,
          y: -4,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.98 }}
        className="group relative overflow-hidden rounded-2xl border border-green-500/20 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 cursor-pointer"
      >
        {/* Background gradient overlay */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.1 }}
        />
        
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />

        <div className="relative p-8">
          {/* Header with icon and arrow */}
          <div className="flex items-start justify-between mb-6">
            <motion.div
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500/20 to-green-500/10 group-hover:from-green-500/30 group-hover:to-green-500/20 transition-all duration-300"
              whileHover={{ 
                rotate: 5,
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
            >
              <Icon className="h-8 w-8 text-green-500 group-hover:text-green-400 transition-colors duration-300" />
            </motion.div>
            
            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ x: 4 }}
            >
              <ArrowRight className="h-5 w-5 text-green-500" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-foreground group-hover:text-green-500 transition-colors duration-300 mb-2">
                {category.name}
              </h3>
              <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 leading-relaxed">
                {category.description}
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                <BookOpen className="h-4 w-4" />
                <span>{category.articleCount} artigos</span>
              </div>
              
              <motion.div
                className="flex items-center gap-1 text-sm text-green-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
              >
                <span>Explorar</span>
                <ArrowRight className="h-3 w-3" />
              </motion.div>
            </div>
          </div>

          {/* Hover effect line */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-400 rounded-full"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>
    </Link>
  );
}
