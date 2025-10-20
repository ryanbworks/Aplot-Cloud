'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { LoginForm } from '@/components/auth/LoginForm';
import { ArrowLeft, Sparkles, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Componente separado para usar useSearchParams com Suspense
function LoginMessage() {
  const searchParams = useSearchParams();
  const [showMessage, setShowMessage] = useState(false);
  const message = searchParams.get('message');

  useEffect(() => {
    if (message) {
      setShowMessage(true);
      // Esconder a mensagem após 5 segundos
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!showMessage || !message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative z-20 p-6"
    >
      <div className="container mx-auto">
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            {message}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-green-500/5 flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 p-6"
      >
        <div className="container mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-foreground hover:text-green-500 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Voltar para home</span>
          </Link>

          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
              AplotCloud
            </span>
          </Link>
        </div>
      </motion.header>

      {/* Message Alert with Suspense */}
      <Suspense fallback={null}>
        <LoginMessage />
      </Suspense>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2">
                <Sparkles className="w-4 h-4 text-green-500" />
                <span className="text-sm font-semibold text-green-500">Bem-vindo de volta</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block text-foreground mb-2">Acesse sua conta</span>
                <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                  AplotCloud
                </span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Continue gerenciando seus servidores de forma simples e poderosa.
                Tudo que você precisa em um só lugar.
              </p>

              {/* Features List */}
              <div className="space-y-4 pt-4">
                {[
                  { icon: '🚀', text: 'Servidores de alta performance' },
                  { icon: '🔒', text: 'Segurança avançada garantida' },
                  { icon: '⚡', text: 'Deploy em poucos minutos' },
                  { icon: '💚', text: 'Suporte técnico 24/7' },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <span className="text-foreground font-medium">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <div className="flex justify-center lg:justify-end">
            <LoginForm />
          </div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10 p-6 text-center"
      >
        <p className="text-sm text-muted-foreground">
          © 2024 AplotCloud. Todos os direitos reservados.
        </p>
      </motion.footer>
    </div>
  );
}
