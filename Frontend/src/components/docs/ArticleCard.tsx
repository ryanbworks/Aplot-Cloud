'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Article } from '@/types/docs';
import { Clock, Calendar, Tag, ArrowRight, User } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  index: number;
  showCategory?: boolean;
}

export function ArticleCard({ article, index, showCategory = false }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Link href={`/suporte/base-conhecimento/${article.category}/${article.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.4, 
          delay: index * 0.05,
          ease: "easeOut"
        }}
        whileHover={{ 
          scale: 1.01,
          y: -2,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.99 }}
        className="group relative overflow-hidden rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm hover:border-green-500/30 hover:bg-card/80 transition-all duration-300 cursor-pointer"
      >
        {/* Background gradient on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-500/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />

        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground group-hover:text-green-500 transition-colors duration-300 mb-2 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 line-clamp-2">
                {article.description}
              </p>
            </div>
            
            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-4"
              whileHover={{ x: 2 }}
            >
              <ArrowRight className="h-4 w-4 text-green-500" />
            </motion.div>
          </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.slice(0, 3).map((tag, tagIndex) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (index * 0.05) + (tagIndex * 0.02) }}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-500 bg-green-500/10 rounded-full border border-green-500/20"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </motion.span>
              ))}
              {article.tags.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{article.tags.length - 3} mais
                </span>
              )}
            </div>
          )}

          {/* Footer with metadata */}
          <div className="flex items-center justify-between text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{article.readTime} min</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(article.date)}</span>
              </div>
              
              {article.author && (
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{article.author}</span>
                </div>
              )}
            </div>

            {showCategory && (
              <div className="px-2 py-1 bg-green-500/10 text-green-500 rounded-full border border-green-500/20">
                {article.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </div>
            )}
          </div>

          {/* Hover effect line */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-500 to-green-400 rounded-full"
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
      </motion.article>
    </Link>
  );
}
