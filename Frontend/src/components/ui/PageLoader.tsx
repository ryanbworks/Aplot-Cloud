'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Sparkles } from 'lucide-react';

interface PageLoaderProps {
  isLoading?: boolean;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ isLoading = true }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-md"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"
            />
          </div>

          {/* Loader Content */}
          <div className="relative flex flex-col items-center gap-6">
            {/* Logo Animado */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="relative"
            >
              {/* Círculo externo girando */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 w-24 h-24 border-4 border-green-500/20 border-t-green-500 rounded-full"
              />

              {/* Círculo do meio girando no sentido contrário */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-2 w-20 h-20 border-4 border-green-500/30 border-r-green-500 rounded-full"
              />

              {/* Logo no centro */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40"
              >
                <Cloud className="w-12 h-12 text-white" />
              </motion.div>

              {/* Partículas ao redor */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.25,
                    ease: "easeInOut",
                  }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * 45}deg) translateY(-60px)`,
                  }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
              ))}
            </motion.div>

            {/* Texto de Loading */}
            <div className="flex flex-col items-center gap-3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2"
              >
                <span className="text-xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                  AplotCloud
                </span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="w-5 h-5 text-green-500" />
                </motion.div>
              </motion.div>

              {/* Pontos de loading animados */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2"
              >
                <span className="text-sm text-muted-foreground">Carregando</span>
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                      className="w-1.5 h-1.5 bg-green-500 rounded-full"
                    />
                  ))}
                </div>
              </motion.div>

              {/* Barra de progresso */}
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 200 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="h-1 bg-border rounded-full overflow-hidden"
              >
                <motion.div
                  animate={{
                    x: [-200, 200],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="h-full w-1/2 bg-gradient-to-r from-transparent via-green-500 to-transparent"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;

