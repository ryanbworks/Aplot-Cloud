'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
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
  Target,
  Users,
  BarChart3
} from 'lucide-react';

const Benefits = memo(() => {
  // 1. BENEFÍCIOS PRINCIPAIS - Por que escolher a AplotCloud
  const coreBenefits = [
    {
      icon: Rocket,
      title: "Performance Extrema",
      description: "Servidores AMD EPYC de última geração com NVMe Gen4, RAM DDR5 e rede de 10Gbps para velocidade incomparável.",
      features: ["NVMe Gen4", "AMD EPYC", "10Gbps", "DDR5"],
      color: "from-blue-500 to-cyan-500",
      bgGlow: "group-hover:shadow-blue-500/30",
      delay: 0.1
    },
    {
      icon: Shield,
      title: "Segurança Avançada",
      description: "Proteção multicamadas com DDoS Protection, WAF, SSL automático e monitoramento com IA 24/7.",
      features: ["DDoS Protection", "WAF", "SSL Auto", "IA Security"],
      color: "from-green-500 to-emerald-500",
      bgGlow: "group-hover:shadow-green-500/30",
      delay: 0.2
    },
    {
      icon: TrendingUp,
      title: "Auto-Scaling Inteligente",
      description: "Recursos que se expandem automaticamente baseado em machine learning para otimizar performance e custos.",
      features: ["Auto Scale", "ML Optimize", "Cost Smart", "Real-time"],
      color: "from-purple-500 to-violet-500",
      bgGlow: "group-hover:shadow-purple-500/30",
      delay: 0.3
    },
    {
      icon: Headphones,
      title: "Suporte Premium 24/7",
      description: "Especialistas certificados disponíveis sempre, com SLA de 30 segundos para emergências críticas.",
      features: ["SLA 30s", "Certified", "WhatsApp", "Video Call"],
      color: "from-orange-500 to-red-500",
      bgGlow: "group-hover:shadow-orange-500/30",
      delay: 0.4
    }
  ];

  // 2. RECURSOS INCLUSOS - O que vem junto sem custo extra
  const includedFeatures = [
    {
      icon: Globe,
      title: "CDN Global",
      description: "Infraestrutura de edge computing para latência ultra-baixa em todo o Brasil.",
      metric: "100%",
      unit: "Brasil"
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

  // 3. NOSSAS PROMESSAS - O que garantimos para você
  const ourPromises = [
    {
      icon: Users,
      title: "Suporte",
      subtitle: "Dedicado",
      description: "Equipe especializada focada no sucesso do seu negócio"
    },
    {
      icon: BarChart3,
      title: "99.99%",
      subtitle: "Uptime Garantido",
      description: "Disponibilidade premium com SLA documentado"
    },
    {
      icon: Globe,
      title: "100%",
      subtitle: "Brasil",
      description: "Infraestrutura local com data centers estratégicos"
    },
    {
      icon: Clock,
      title: "24/7",
      subtitle: "Suporte Premium",
      description: "Especialistas sempre disponíveis para você"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-background to-muted/20">
      {/* Background com brilho */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/8 to-green-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/6 to-purple-500/6 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SEÇÃO 1: HEADER PRINCIPAL - Por que escolher a AplotCloud */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/10 to-green-500/10 border border-primary/20 rounded-full px-6 py-3 mb-6"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Por que escolher a AplotCloud?
            </span>
            <Target className="h-4 w-4 text-primary" />
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
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
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
          >
            Infraestrutura cloud premium com tecnologia de ponta, segurança militar 
            e suporte especializado para acelerar o crescimento do seu negócio.
          </motion.p>
        </motion.div>

        {/* SEÇÃO 2: BENEFÍCIOS PRINCIPAIS - Os 4 pilares fundamentais */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-10 mb-20"
        >
          {coreBenefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={itemVariants}
              transition={{ delay: benefit.delay }}
              className="group relative"
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`relative bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary/40 transition-all duration-200 shadow-lg hover:shadow-2xl ${benefit.bgGlow}`}
              >
                {/* Background Glow Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-8 rounded-2xl transition-opacity duration-200`}
                  initial={false}
                />

                {/* Header com ícone brilhante */}
                <div className="flex items-start justify-between mb-6">
                  <motion.div
                    className={`relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-xl shadow-lg`}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -5, 5, 0]
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <benefit.icon className="h-8 w-8 text-white" />
                    
                    {/* Icon Glow */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${benefit.color} rounded-xl blur-md opacity-0 group-hover:opacity-40`}
                      initial={false}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>

                  <div className="px-3 py-1 bg-gradient-to-r from-primary/10 to-green-500/10 border border-primary/20 rounded-full">
                    <span className="text-xs font-semibold text-primary">Premium</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-200">
                  {benefit.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed text-base mb-6">
                  {benefit.description}
                </p>

                {/* Feature Tags com hover melhorado */}
                <div className="flex flex-wrap gap-2">
                  {benefit.features.map((feature) => (
                    <motion.span
                      key={feature}
                      className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-primary/10 to-green-500/10 border border-primary/20 rounded-full text-xs font-medium text-primary"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.15 }}
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {feature}
                    </motion.span>
                  ))}
                </div>

                {/* Elementos decorativos brilhantes */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-primary to-green-500 rounded-full opacity-0 group-hover:opacity-80 transition-opacity duration-200" />
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-r from-green-500 to-primary rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-200" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* SEÇÃO 3: RECURSOS INCLUSOS - O que vem junto sem custo extra */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-6 py-3 mb-6">
            <CheckCircle className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-semibold text-blue-500">
              Recursos Premium Inclusos
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
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
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20"
        >
          {includedFeatures.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              variants={itemVariants}
              transition={{ delay: 0.4 + index * 0.08 }}
              className="group relative"
            >
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/40 rounded-xl p-6 hover:border-primary/40 transition-all duration-200 shadow-md hover:shadow-xl hover:shadow-primary/10"
              >
                {/* Header with Icon and Metric */}
                <div className="flex items-start justify-between mb-6">
                  <motion.div
                    className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary/20 to-green-500/20 rounded-lg border border-primary/20"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </motion.div>

                  <div className="text-right">
                    <div className="text-xl font-bold text-primary">{benefit.metric}</div>
                    <div className="text-xs text-muted-foreground">{benefit.unit}</div>
                  </div>
                </div>

                {/* Content */}
                <h4 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                  {benefit.title}
                </h4>
                
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {benefit.description}
                </p>

                {/* Check Icon com brilho */}
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                  initial={false}
                  transition={{ duration: 0.2 }}
                >
                  <CheckCircle className="h-4 w-4 text-white" />
                </motion.div>

                {/* Hover Glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/5 to-green-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  initial={false}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* SEÇÃO 4: NOSSAS PROMESSAS - O que garantimos para você */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-full px-6 py-3 mb-6">
            <BarChart3 className="h-5 w-5 text-orange-500" />
            <span className="text-sm font-semibold text-orange-500">
              Nossas Promessas
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            <span className="block">Compromisso com</span>
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              a excelência
            </span>
          </h3>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Estamos comprometidos em oferecer o melhor serviço possível. 
            Estas são as promessas que fazemos para o seu negócio.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20"
        >
          {ourPromises.map((promise, index) => (
            <motion.div
              key={promise.title}
              variants={itemVariants}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="group relative text-center"
            >
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/40 rounded-xl p-6 hover:border-primary/40 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {/* Icon */}
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary/20 to-green-500/20 rounded-xl border border-primary/20 mb-4"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <promise.icon className="h-8 w-8 text-primary" />
                </motion.div>

                {/* Numbers */}
                <div className="mb-2">
                  <div className="text-3xl font-bold text-primary mb-1">{promise.title}</div>
                  <div className="text-sm font-semibold text-muted-foreground">{promise.subtitle}</div>
                </div>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {promise.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* SEÇÃO 5: CALL TO ACTION - Próximo passo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <div className="relative bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto">
            {/* Background com brilho */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-green-500/3 to-primary/3 opacity-40" />
            
            {/* Elementos decorativos */}
            <div className="absolute top-6 left-6 w-3 h-3 bg-gradient-to-r from-primary to-green-500 rounded-full opacity-70" />
            <div className="absolute bottom-6 right-6 w-2 h-2 bg-gradient-to-r from-green-500 to-primary rounded-full opacity-50" />

            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/20 to-green-500/20 border border-primary/30 rounded-full px-6 py-3 mb-6">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold text-primary">
                  Oferta Especial por Tempo Limitado
                </span>
              </div>

              {/* Main Content */}
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                <span className="block">Pronto para transformar</span>
                <span className="bg-gradient-to-r from-primary via-green-400 to-emerald-500 bg-clip-text text-transparent">
                  seu negócio?
                </span>
              </h3>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Descubra como a AplotCloud pode acelerar os resultados 
                do seu negócio com tecnologia de ponta.
              </p>
              
              {/* Buttons com hover melhorado */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="group relative bg-gradient-to-r from-primary to-green-500 hover:from-primary/90 hover:to-green-500/90 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-200 text-lg"
                >
                  <span className="flex items-center">
                    Começar Agora
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="border-2 border-primary/30 hover:border-primary/60 text-foreground hover:text-primary font-semibold px-6 py-4 rounded-xl backdrop-blur-sm hover:bg-primary/5 transition-all duration-200 text-lg"
                >
                  Falar com Especialista
                </motion.button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center space-x-8 pt-6 border-t border-border/30">
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">Sem</div>
                  <div className="text-xs text-muted-foreground">Cartão de crédito</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">24/7</div>
                  <div className="text-xs text-muted-foreground">Suporte premium</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">Setup</div>
                  <div className="text-xs text-muted-foreground">Instantâneo</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

Benefits.displayName = 'Benefits';

export default Benefits;
