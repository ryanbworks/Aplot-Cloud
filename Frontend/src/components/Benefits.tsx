'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
// Optimized imports to reduce bundle size
import { 
  Rocket, 
  Shield, 
  Zap, 
  Globe, 
  TrendingUp,
  Clock,
  Award,
  Lock,
  RefreshCw,
  Headphones,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Target
} from 'lucide-react';

const Benefits = memo(() => {
  const mainBenefits = [
    {
      icon: Rocket,
      title: "Performance Extrema",
      description: "Servidores AMD EPYC de última geração com NVMe Gen4, RAM DDR5 e rede de 10Gbps para velocidade incomparável.",
      features: ["NVMe Gen4", "AMD EPYC", "10Gbps", "DDR5"],
      color: "from-blue-500 via-blue-600 to-cyan-500",
      bgGlow: "group-hover:shadow-blue-500/25",
      delay: 0.1
    },
    {
      icon: Shield,
      title: "Segurança Avançada",
      description: "Proteção multicamadas com DDoS Protection, WAF, SSL automático e monitoramento com IA 24/7.",
      features: ["DDoS Protection", "WAF", "SSL Auto", "IA Security"],
      color: "from-green-500 via-green-600 to-emerald-500",
      bgGlow: "group-hover:shadow-green-500/25",
      delay: 0.2
    },
    {
      icon: TrendingUp,
      title: "Auto-Scaling Inteligente",
      description: "Recursos que se expandem automaticamente baseado em machine learning para otimizar performance e custos.",
      features: ["Auto Scale", "ML Optimize", "Cost Smart", "Real-time"],
      color: "from-purple-500 via-purple-600 to-violet-500",
      bgGlow: "group-hover:shadow-purple-500/25",
      delay: 0.3
    },
    {
      icon: Headphones,
      title: "Suporte Premium 24/7",
      description: "Especialistas certificados disponíveis sempre, com SLA de 30 segundos para emergências críticas.",
      features: ["SLA 30s", "Certified", "WhatsApp", "Video Call"],
      color: "from-orange-500 via-orange-600 to-red-500",
      bgGlow: "group-hover:shadow-orange-500/25",
      delay: 0.4
    }
  ];

  const additionalBenefits = [
    {
      icon: Globe,
      title: "CDN Global",
      description: "300+ POPs mundiais com edge computing para latência ultra-baixa.",
      metric: "300+",
      unit: "POPs"
    },
    {
      icon: Lock,
      title: "SSL Grátis",
      description: "Certificados SSL wildcard automatizados com ECC e RSA.",
      metric: "100%",
      unit: "Automático"
    },
    {
      icon: RefreshCw,
      title: "Backup Inteligente",
      description: "Backups incrementais com IA e restore granular em segundos.",
      metric: "< 30s",
      unit: "Restore"
    },
    {
      icon: Clock,
      title: "99.99% Uptime",
      description: "SLA premium com infraestrutura multi-zona e failover automático.",
      metric: "99.99%",
      unit: "SLA"
    },
    {
      icon: Zap,
      title: "Edge Computing",
      description: "Processamento na borda para aplicações de baixa latência.",
      metric: "< 5ms",
      unit: "Latência"
    },
    {
      icon: Award,
      title: "Compliance Total",
      description: "Certificações ISO 27001, SOC 2, PCI DSS e conformidade LGPD.",
      metric: "4",
      unit: "Certificações"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-background via-background/95 to-muted/20 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Simplified Background - Reduced animations */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-green-500/10 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/8 to-purple-500/8 rounded-full blur-3xl opacity-30" />
        
        {/* Static Grid Pattern - Better performance */}
        <div className="absolute inset-0 opacity-3" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(16, 185, 129, 0.2) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center max-w-5xl mx-auto mb-20 lg:mb-28"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/10 to-green-500/10 border border-primary/30 rounded-full px-8 py-4 mb-8"
          >
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Por que 50.000+ empresas escolhem a AplotCloud?
            </span>
            <Target className="h-5 w-5 text-primary" />
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="block mb-2">Tecnologia que</span>
            <span className="block bg-gradient-to-r from-primary via-green-400 to-emerald-500 bg-clip-text text-transparent">
              transforma negócios
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
          >
            Infraestrutura cloud premium com tecnologia de ponta, segurança militar 
            e suporte especializado para acelerar o crescimento do seu negócio.
          </motion.p>
        </motion.div>

        {/* Main Benefits Grid - Enhanced */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-10 mb-24"
        >
          {mainBenefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={itemVariants}
              transition={{ delay: benefit.delay }}
              className="group relative"
            >
              <motion.div
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`relative bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-8 lg:p-10 hover:border-primary/40 transition-all duration-500 shadow-xl hover:shadow-2xl ${benefit.bgGlow}`}
              >
                {/* Background Glow Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
                  initial={false}
                />

                {/* Header Section */}
                <div className="flex items-start justify-between mb-6">
                  <motion.div
                    className={`relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${benefit.color} rounded-2xl shadow-lg`}
                    whileHover={{ 
                      rotate: [0, -8, 8, 0],
                      scale: 1.1
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <benefit.icon className="h-10 w-10 text-white" />
                    
                    {/* Icon Glow */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${benefit.color} rounded-2xl blur-md opacity-0 group-hover:opacity-50`}
                      initial={false}
                    />
                  </motion.div>

                  {/* Floating Badge */}
                  <motion.div
                    className="px-3 py-1 bg-gradient-to-r from-primary/10 to-green-500/10 border border-primary/20 rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: benefit.delay + 0.3 }}
                  >
                    <span className="text-xs font-semibold text-primary">Premium</span>
                  </motion.div>
                </div>

                {/* Content */}
                <motion.h3 
                  className="text-2xl lg:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: benefit.delay + 0.2 }}
                >
                  {benefit.title}
                </motion.h3>
                
                <motion.p 
                  className="text-muted-foreground leading-relaxed text-base lg:text-lg mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: benefit.delay + 0.3 }}
                >
                  {benefit.description}
                </motion.p>

                {/* Feature Tags */}
                <motion.div 
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: benefit.delay + 0.4 }}
                >
                  {benefit.features.map((feature, featureIndex) => (
                    <motion.span
                      key={feature}
                      className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-primary/10 to-green-500/10 border border-primary/20 rounded-full text-xs font-medium text-primary"
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: benefit.delay + 0.5 + featureIndex * 0.1 }}
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {feature}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Simplified Decorative Elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-primary to-green-500 rounded-full opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-r from-green-500 to-primary rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Benefits Section - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-6 py-3 mb-6"
          >
            <CheckCircle className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-semibold text-blue-500">
              Recursos Premium Inclusos
            </span>
          </motion.div>

          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            <span className="block">Tudo que você precisa,</span>
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              sem custos extras
            </span>
          </h3>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Recursos enterprise que outras empresas cobram a parte, aqui vêm incluídos 
            em todos os planos desde o básico.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {additionalBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              variants={itemVariants}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="group relative"
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-lg border border-border/40 rounded-2xl p-6 lg:p-8 hover:border-primary/40 transition-all duration-400 shadow-lg hover:shadow-xl hover:shadow-primary/10"
              >
                {/* Header with Icon and Metric */}
                <div className="flex items-start justify-between mb-6">
                  <motion.div
                    className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-primary/20 to-green-500/20 rounded-xl border border-primary/20"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <benefit.icon className="h-7 w-7 text-primary" />
                  </motion.div>

                  {/* Metric Badge */}
                  <motion.div
                    className="text-right"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className="text-2xl font-bold text-primary">{benefit.metric}</div>
                    <div className="text-xs text-muted-foreground">{benefit.unit}</div>
                  </motion.div>
                </div>

                {/* Content */}
                <motion.h4 
                  className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  {benefit.title}
                </motion.h4>
                
                <motion.p 
                  className="text-muted-foreground leading-relaxed text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  {benefit.description}
                </motion.p>

                {/* Check Icon */}
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                  initial={false}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircle className="h-4 w-4 text-white" />
                </motion.div>

                {/* Hover Glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/5 to-green-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  initial={false}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-center mt-20 lg:mt-32"
        >
          <div className="relative bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-lg border border-border/50 rounded-3xl p-10 lg:p-16 max-w-5xl mx-auto">
            {/* Static Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-green-500/3 to-primary/3 opacity-60" />
            
            {/* Static Decorative Elements */}
            <div className="absolute top-6 left-6 w-3 h-3 bg-gradient-to-r from-primary to-green-500 rounded-full opacity-70" />
            <div className="absolute bottom-6 right-6 w-2 h-2 bg-gradient-to-r from-green-500 to-primary rounded-full opacity-50" />

            <div className="relative z-10">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/20 to-green-500/20 border border-primary/30 rounded-full px-6 py-3 mb-8"
              >
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold text-primary">
                  Oferta Especial por Tempo Limitado
                </span>
              </motion.div>

              {/* Main Content */}
              <motion.h3 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <span className="block">Pronto para transformar</span>
                <span className="bg-gradient-to-r from-primary via-green-400 to-emerald-500 bg-clip-text text-transparent">
                  seu negócio?
                </span>
              </motion.h3>
              
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                Comece agora com <strong className="text-primary">30 dias grátis</strong> e 
                descubra por que mais de 50.000 empresas confiam na AplotCloud para 
                acelerar seus resultados.
              </motion.p>
              
              {/* Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative bg-gradient-to-r from-primary to-green-500 hover:from-primary/90 hover:to-green-500/90 text-white font-bold px-10 py-5 rounded-2xl shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-400 text-lg"
                >
                  <span className="relative z-10 flex items-center">
                    Começar Teste Grátis
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="border-2 border-primary/30 hover:border-primary/60 text-foreground hover:text-primary font-semibold px-8 py-4 rounded-2xl backdrop-blur-sm hover:bg-primary/5 transition-all duration-300 text-lg"
                >
                  Falar com Especialista
                </motion.button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                className="flex items-center justify-center space-x-8 mt-8 pt-8 border-t border-border/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">30 dias</div>
                  <div className="text-xs text-muted-foreground">Teste grátis</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">Sem</div>
                  <div className="text-xs text-muted-foreground">Cartão de crédito</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-xs text-muted-foreground">Suporte premium</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

Benefits.displayName = 'Benefits';

export default Benefits;
