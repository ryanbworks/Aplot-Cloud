'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ThumbsUp, ThumbsDown, Share2, BookOpen, ArrowLeft, Clock } from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';
import { Article } from '@/types/docs';

interface ArticleContentProps {
  article: Article;
  relatedArticles: Article[];
}

export function ArticleContent({ article, relatedArticles }: ArticleContentProps) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="prose prose-invert max-w-none">
              <MarkdownRenderer content={article.content} />
            </div>

            {/* Feedback Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="mt-12 p-6 bg-card/50 border border-border/40 rounded-xl"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Este artigo foi útil?
              </h3>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-lg border border-green-500/20 transition-all duration-200">
                  <ThumbsUp className="h-4 w-4" />
                  <span>Sim</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-muted/50 hover:bg-muted text-muted-foreground rounded-lg border border-border/40 transition-all duration-200">
                  <ThumbsDown className="h-4 w-4" />
                  <span>Não</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-muted/50 hover:bg-muted text-muted-foreground rounded-lg border border-border/40 transition-all duration-200">
                  <Share2 className="h-4 w-4" />
                  <span>Compartilhar</span>
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="sticky top-8 space-y-6">
            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="bg-gradient-to-br from-card/80 to-card/40 border border-green-500/20 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-green-400/10 rounded-xl flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    Artigos Relacionados
                  </h3>
                </div>
                <div className="space-y-4">
                  {relatedArticles.map((relatedArticle) => (
                    <Link
                      key={relatedArticle.slug}
                      href={`/suporte/base-conhecimento/${relatedArticle.category}/${relatedArticle.slug}`}
                      className="group block p-4 rounded-xl border border-green-500/10 hover:border-green-500/30 hover:bg-gradient-to-r hover:from-green-500/5 hover:to-green-400/5 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10"
                    >
                      <h4 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-green-400 transition-colors duration-200">
                        {relatedArticle.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {relatedArticle.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-green-400 font-medium">
                        <Clock className="h-3 w-3" />
                        <span>{relatedArticle.readTime} min de leitura</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="bg-gradient-to-br from-card/80 to-card/40 border border-green-500/20 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-green-400/10 rounded-xl flex items-center justify-center">
                  <ArrowLeft className="h-5 w-5 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Navegação
                </h3>
              </div>
              <div className="space-y-4">
                <Link
                  href={`/suporte/base-conhecimento/${article.category}`}
                  className="group flex items-center gap-3 p-4 rounded-xl border border-green-500/10 hover:border-green-500/30 hover:bg-gradient-to-r hover:from-green-500/5 hover:to-green-400/5 transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-green-400/10 rounded-lg flex items-center justify-center group-hover:from-green-500/30 group-hover:to-green-400/20 transition-all duration-200">
                    <ArrowLeft className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-foreground group-hover:text-green-400 transition-colors duration-200 font-medium">
                    Voltar para categoria
                  </span>
                </Link>
                <Link
                  href="/suporte/base-conhecimento"
                  className="group flex items-center gap-3 p-4 rounded-xl border border-green-500/10 hover:border-green-500/30 hover:bg-gradient-to-r hover:from-green-500/5 hover:to-green-400/5 transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-green-400/10 rounded-lg flex items-center justify-center group-hover:from-green-500/30 group-hover:to-green-400/20 transition-all duration-200">
                    <BookOpen className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-foreground group-hover:text-green-400 transition-colors duration-200 font-medium">
                    Todas as categorias
                  </span>
                </Link>
              </div>
            </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
