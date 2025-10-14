'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { ArrowLeft, Sparkles, Zap, Shield, Clock, Award } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-green-500/5 flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
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
                <Sparkles className="w-4 h-4 text-green-500 animate-pulse" />
                <span className="text-sm font-semibold text-green-500">Comece grátis hoje</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block text-foreground mb-2">Junte-se à</span>
                <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                  AplotCloud
                </span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Crie sua conta e tenha acesso a servidores de alta performance, 
                com deploy em minutos e suporte técnico sempre disponível.
              </p>

              {/* Benefits Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { icon: Zap, title: 'Super Rápido', desc: 'Deploy em minutos' },
                  { icon: Shield, title: '100% Seguro', desc: 'Proteção total' },
                  { icon: Clock, title: '99% Uptime', desc: 'Sempre online' },
                  { icon: Award, title: 'Suporte 24/7', desc: 'Ajuda quando precisar' },
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="bg-card border border-green-500/20 rounded-xl p-4 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <benefit.icon className="w-5 h-5 text-green-500" />
                    </div>
                    <h3 className="text-foreground font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-xs text-muted-foreground">{benefit.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Testimonial */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-6 mt-8"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-green-500 text-lg">★</span>
                  ))}
                </div>
                <p className="text-foreground font-medium mb-3">
                  &quot;A melhor hospedagem que já usei! Rápida, confiável e com suporte excepcional.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 font-bold">
                    JD
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">João Desenvolvedor</p>
                    <p className="text-xs text-muted-foreground">Cliente desde 2023</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Register Form */}
          <div className="flex justify-center lg:justify-end">
            <RegisterForm />
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

