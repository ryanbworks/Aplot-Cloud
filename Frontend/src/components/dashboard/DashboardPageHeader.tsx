'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface DashboardPageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ElementType;
  showBackButton?: boolean;
  backHref?: string;
  children?: React.ReactNode;
}

/**
 * Header para páginas internas do dashboard
 * Exibe título, descrição e botão de voltar
 */
export const DashboardPageHeader: React.FC<DashboardPageHeaderProps> = ({
  title,
  description,
  icon: Icon,
  showBackButton = true,
  backHref = '/dashboard',
  children,
}) => {
  return (
    <div className="border-b border-border/40 bg-background/95 backdrop-blur sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between gap-4">
          {/* Lado Esquerdo - Título e Navegação */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {showBackButton && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Link href={backHref}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-500/30 hover:bg-green-500/10 hover:border-green-500/50 gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Voltar</span>
                  </Button>
                </Link>
              </motion.div>
            )}

            <div className="flex items-center gap-3 flex-1 min-w-0">
              {Icon && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="w-10 h-10 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0"
                >
                  <Icon className="w-5 h-5 text-green-500" />
                </motion.div>
              )}
              
              <div className="min-w-0 flex-1">
                <motion.h1
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl font-bold text-foreground truncate"
                >
                  {title}
                </motion.h1>
                {description && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm text-muted-foreground truncate"
                  >
                    {description}
                  </motion.p>
                )}
              </div>
            </div>
          </div>

          {/* Lado Direito - Ações Customizadas */}
          {children && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              {children}
            </motion.div>
          )}

          {/* Botão Dashboard (se não houver children) */}
          {!children && backHref !== '/dashboard' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-500/30 hover:bg-green-500/10 hover:border-green-500/50 gap-2"
                >
                  <Home className="w-4 h-4" />
                  <span className="hidden md:inline">Dashboard</span>
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
