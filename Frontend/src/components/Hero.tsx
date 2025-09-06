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
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = memo(() => {
  const features = [
    { icon: Zap, text: "99.9% Uptime Garantido" },
    { icon: Shield, text: "Segurança SSL Grátis" },
    { icon: Globe, text: "CDN Global Incluído" },
    { icon: TrendingUp, text: "Escalabilidade Automática" }
  ];

  const stats = [
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Suporte" },
    { number: "100%", label: "Brasil" },
    { number: "Premium", label: "Qualidade" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Optimized Animated Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary/15 to-green-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-green-500/10 to-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Animated Floating Particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${25 + (i * 15)}%`,
              top: `${35 + (i * 10)}%`,
            }}
            animate={{
              y: [-10, -20, -10],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-green-500/10 border border-primary/20 rounded-full px-4 py-2"
            >
              <Star className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                #1 em Cloud Computing no Brasil
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-foreground">Hospedagem</span>
                <br />
                <span className="bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
                  Cloud Premium
                </span>
                <br />
                <span className="text-foreground">para seu</span>
                <br />
                <motion.span
                  className="text-primary"
                  animate={{ 
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Sucesso
                </motion.span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
            >
              Transforme seu negócio com nossa infraestrutura cloud de última geração. 
              Performance excepcional, segurança avançada e suporte 24/7 para levar 
              seus projetos ao próximo nível.
            </motion.p>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="flex items-center space-x-3 group"
                >
                  <motion.div
                    className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-primary/20 to-green-500/20 rounded-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <feature.icon className="h-4 w-4 text-primary" />
                  </motion.div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-primary to-green-500 hover:from-primary/90 hover:to-green-500/90 text-white font-semibold px-8 py-6 text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
                >
                  Começar Agora
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
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
                  className="group border-primary/30 hover:border-primary/50 hover:bg-primary/5 font-semibold px-8 py-6 text-lg"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Ver Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex items-center space-x-6 pt-8"
            >
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-gradient-to-r from-primary to-green-500 rounded-full border-2 border-background"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-3">
                  Qualidade garantida
                </span>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">4.9/5</span>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Visual Elements */}
          <div className="relative lg:pl-8">
            {/* Main Visual Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative"
            >
              {/* Dashboard Mockup */}
              <div className="relative bg-gradient-to-br from-card to-card/50 border border-border/40 rounded-2xl p-6 shadow-2xl shadow-primary/10 backdrop-blur-sm">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-xs text-muted-foreground">dashboard.aplotcloud.com</div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                      className="bg-gradient-to-br from-primary/5 to-green-500/5 border border-primary/10 rounded-xl p-4"
                    >
                      <motion.div
                        className="text-2xl font-bold text-primary"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      >
                        {stat.number}
                      </motion.div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Performance Chart */}
                <div className="bg-gradient-to-r from-primary/10 to-green-500/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-foreground">Performance</span>
                    <span className="text-xs text-primary">↗ +15.3%</span>
                  </div>
                  <div className="flex items-end space-x-1 h-16">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="bg-gradient-to-t from-primary to-green-400 rounded-sm flex-1"
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.random() * 100}%` }}
                        transition={{ duration: 0.5, delay: 1.5 + i * 0.1 }}
                      />
                    ))}
                  </div>
                </div>
              </div>

                          {/* Animated Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 bg-gradient-to-r from-primary to-green-500 text-white p-3 rounded-xl shadow-lg"
              animate={{
                y: [0, -8, 0],
                rotate: [0, 3, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <CheckCircle className="h-6 w-6" />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl p-3 shadow-lg"
              animate={{
                y: [0, 8, 0],
                rotate: [0, -3, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <Zap className="h-6 w-6 text-primary" />
            </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
