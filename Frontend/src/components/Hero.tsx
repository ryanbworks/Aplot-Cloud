'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  Zap, 
  Shield, 
  Globe, 
  TrendingUp,
  CheckCircle,
  Server,
  Users,
  Award,
  Building2,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = memo(() => {
  const features = [
    { icon: Zap, text: "99.9% Uptime Garantido" },
    { icon: Shield, text: "Segurança Enterprise" },
    { icon: Globe, text: "CDN Global Premium" },
    { icon: TrendingUp, text: "Escalabilidade Ilimitada" }
  ];


  const capabilities = [
    { icon: Activity, label: "99.9% Uptime", description: "SLA Garantido" },
    { icon: Users, label: "Suporte 24/7", description: "Equipe especializada" },
    { icon: Award, label: "Tecnologia Premium", description: "Hardware de ponta" },
    { icon: Building2, label: "Escalabilidade", description: "Cresça sem limites" }
  ];

  return (
    <section className="relative py-12 md:py-20 flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-green-500/5">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Enterprise-grade Background Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-r from-green-500/20 to-green-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-green-500/15 to-green-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        
        {/* Enterprise Network Visualization */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-500/40 rounded-full"
            style={{
              left: `${20 + (i * 12)}%`,
              top: `${30 + (i * 8)}%`,
            }}
            animate={{
              y: [-15, -25, -15],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-4 md:space-y-6">
            {/* Technology Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/20 rounded-full px-3 py-1.5 md:px-4 md:py-2"
            >
              <Zap className="h-3 w-3 md:h-4 md:w-4 text-green-500" />
              <span className="text-xs md:text-sm font-semibold text-green-500">
                Tecnologia Cloud de Última Geração
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-3 md:space-y-4"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-foreground">Hospedagem</span>
                <br />
                <span className="bg-gradient-to-r from-green-500 to-green-400 bg-clip-text text-transparent">
                  Cloud Premium
                </span>
                <br />
                <span className="text-foreground">para</span>
                <br />
                <motion.span
                  className="text-green-500"
                  animate={{ 
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Seu Sucesso
                </motion.span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed"
            >
              Infraestrutura cloud enterprise construída com 
              <span className="text-green-500 font-semibold"> tecnologia de ponta</span> 
              e foco em performance, segurança e escalabilidade.
            </motion.p>

            {/* Enterprise Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="flex items-center space-x-2 md:space-x-3 group"
                >
                  <motion.div
                    className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 bg-gradient-to-r from-green-500/20 to-green-500/10 rounded-lg border border-green-500/20"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <feature.icon className="h-3.5 w-3.5 md:h-4 md:w-4 text-green-500" />
                  </motion.div>
                  <span className="text-xs md:text-sm font-semibold text-foreground group-hover:text-green-500 transition-colors">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Premium CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-500/90 hover:to-green-600/90 text-white font-bold px-6 py-3 md:px-8 md:py-4 text-base md:text-lg shadow-xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 w-full sm:w-auto"
                >
                  Começar Agora
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </motion.div>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  className="group border-green-500/30 hover:border-green-500/50 hover:bg-green-500/5 font-bold px-6 py-3 md:px-8 md:py-4 text-base md:text-lg w-full sm:w-auto"
                >
                  <Play className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Ver Demonstração
                </Button>
              </motion.div>
            </motion.div>

            {/* Technology Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-6 pt-4 md:pt-6"
            >
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-green-500/20 to-green-500/10 rounded-lg flex items-center justify-center border border-green-500/20">
                  <Shield className="h-3 w-3 md:h-4 md:w-4 text-green-500" />
                </div>
                <div>
                  <div className="text-xs md:text-sm font-semibold text-foreground">Segurança Enterprise</div>
                  <div className="text-xs text-muted-foreground">Criptografia de ponta a ponta</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-green-500/20 to-green-500/10 rounded-lg flex items-center justify-center border border-green-500/20">
                  <Zap className="h-3 w-3 md:h-4 md:w-4 text-green-500" />
                </div>
                <div>
                  <div className="text-xs md:text-sm font-semibold text-foreground">Performance Premium</div>
                  <div className="text-xs text-muted-foreground">Hardware de última geração</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Enterprise Dashboard */}
          <div className="relative lg:pl-8 mt-8 lg:mt-0">
            {/* Main Enterprise Dashboard */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative"
            >
              {/* Enterprise Dashboard */}
              <div className="relative bg-gradient-to-br from-card to-card/80 border border-green-500/20 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl shadow-green-500/10 backdrop-blur-sm">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <div className="flex items-center space-x-1.5 md:space-x-2">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-red-500 rounded-full"></div>
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-xs text-muted-foreground font-mono hidden sm:block">dashboard.aplotcloud.com</div>
                </div>

                {/* Technology Capabilities Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                  {capabilities.map((capability, index) => (
                    <motion.div
                      key={capability.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                      className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-lg md:rounded-xl p-3 md:p-4"
                    >
                      <div className="flex items-center space-x-2 mb-1.5 md:mb-2">
                        <div className="w-5 h-5 md:w-6 md:h-6 bg-green-500/20 rounded-md flex items-center justify-center">
                          <capability.icon className="h-2.5 w-2.5 md:h-3 md:w-3 text-green-500" />
                        </div>
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{capability.label}</span>
                      </div>
                      <div className="text-xs text-foreground font-medium">{capability.description}</div>
                    </motion.div>
                  ))}
                </div>


                {/* Performance Chart */}
                <div className="bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/20 rounded-lg md:rounded-xl p-3 md:p-4">
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <span className="text-sm md:text-base font-bold text-foreground">Monitoramento em Tempo Real</span>
                    <span className="text-xs text-green-500 font-semibold">Estável</span>
                  </div>
                  <div className="flex items-end space-x-0.5 md:space-x-1 h-12 md:h-16">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="bg-gradient-to-t from-green-500 to-green-400 rounded-sm flex-1"
                        initial={{ height: 0 }}
                        animate={{ height: `${60 + Math.random() * 40}%` }}
                        transition={{ duration: 0.5, delay: 2 + i * 0.05 }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Enterprise Elements */}
              <motion.div
                className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-gradient-to-r from-green-500 to-green-600 text-white p-2 md:p-3 rounded-lg md:rounded-xl shadow-xl"
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <CheckCircle className="h-4 w-4 md:h-6 md:w-6" />
              </motion.div>

              <motion.div
                className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 bg-card border border-green-500/30 rounded-lg md:rounded-xl p-2 md:p-3 shadow-xl"
                animate={{
                  y: [0, 8, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <Server className="h-4 w-4 md:h-6 md:w-6 text-green-500" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Enterprise Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/95 to-transparent"></div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
