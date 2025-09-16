'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import { 
  Gamepad2, 
  Zap, 
  Shield, 
  Users, 
  Clock, 
  HardDrive, 
  Cpu, 
  Wifi,
  Check,
  Star,
  Play,
  Server,
  Globe,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const MinecraftHostingPage = () => {
  const [selectedPlan, setSelectedPlan] = React.useState(9); // Nether plan selected by default
  const [selectedProcessor, setSelectedProcessor] = React.useState('intel');

  const plans = [
    {
      id: 1,
      name: "Básico",
      ram: 4,
      vcpu: 2,
      price: 22,
      period: "/mês",
      description: "Ideal para começar",
      icon: "🛠️",
      popular: false,
      slots: 10,
      storage: 10,
      features: ["Backup Diário", "Suporte 24/7", "Mods Básicos"]
    },
    {
      id: 2,
      name: "Casa",
      ram: 6,
      vcpu: 2,
      price: 36,
      period: "/mês",
      description: "Para pequenas comunidades",
      icon: "🏠",
      popular: false,
      slots: 15,
      storage: 15,
      features: ["Backup Diário", "Suporte 24/7", "Mods Ilimitados", "Plugins Básicos"]
    },
    {
      id: 3,
      name: "Forja",
      ram: 8,
      vcpu: 3,
      price: 52,
      period: "/mês",
      description: "Mods e plugins avançados",
      icon: "🔥",
      popular: true,
      slots: 25,
      storage: 20,
      features: ["Backup Diário", "Suporte 24/7", "Mods Ilimitados", "Plugins Ilimitados", "Painel Multicraft"]
    },
    {
      id: 4,
      name: "Aldeão",
      ram: 10,
      vcpu: 4,
      price: 66,
      period: "/mês",
      description: "Servidores médios",
      icon: "👨‍🌾",
      popular: false,
      slots: 30,
      storage: 25,
      features: ["Backup Diário", "Suporte 24/7", "Mods Ilimitados", "Plugins Ilimitados", "Painel Multicraft", "Instalação Gratuita"]
    },
    {
      id: 5,
      name: "Minerador",
      ram: 12,
      vcpu: 6,
      price: 82,
      period: "/mês",
      description: "Performance elevada",
      icon: "⛏️",
      popular: false,
      slots: 40,
      storage: 30,
      features: ["Backup Diário", "Suporte 24/7", "Mods Ilimitados", "Plugins Ilimitados", "Painel Multicraft", "Instalação Gratuita", "DDoS Protection"]
    },
    {
      id: 6,
      name: "Bioma",
      ram: 14,
      vcpu: 6,
      price: 96,
      period: "/mês",
      description: "Mundos expansivos",
      icon: "🌍",
      popular: false,
      slots: 50,
      storage: 35,
      features: ["Backup Diário", "Suporte 24/7", "Mods Ilimitados", "Plugins Ilimitados", "Painel Multicraft", "Instalação Gratuita", "DDoS Protection", "CDN Global"]
    },
    {
      id: 7,
      name: "Império",
      ram: 16,
      vcpu: 6,
      price: 110,
      period: "/mês",
      description: "Grandes projetos",
      icon: "🏰",
      popular: false,
      slots: 60,
      storage: 40,
      features: ["Backup Diário", "Suporte 24/7", "Mods Ilimitados", "Plugins Ilimitados", "Painel Multicraft", "Instalação Gratuita", "DDoS Protection", "CDN Global", "Priority Support"]
    },
    {
      id: 8,
      name: "Diamante",
      ram: 20,
      vcpu: 8,
      price: 140,
      period: "/mês",
      description: "Servidores premium",
      icon: "💎",
      popular: false,
      slots: 75,
      storage: 50,
      features: ["Backup Diário", "Suporte 24/7", "Mods Ilimitados", "Plugins Ilimitados", "Painel Multicraft", "Instalação Gratuita", "DDoS Protection", "CDN Global", "Priority Support", "Dedicated Resources"]
    },
    {
      id: 9,
      name: "Nether",
      ram: 32,
      vcpu: 12,
      price: 186,
      period: "/mês",
      description: "Máxima performance",
      icon: "🔥",
      popular: false,
      slots: 100,
      storage: 60,
      features: ["Backup Diário", "Suporte 24/7", "Mods Ilimitados", "Plugins Ilimitados", "Painel Multicraft", "Instalação Gratuita", "DDoS Protection", "CDN Global", "Priority Support", "Dedicated Resources", "White-label"]
    }
  ];

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan) || plans[8];

  const features = [
    {
      icon: Zap,
      title: "Performance Máxima",
      description: "SSDs NVMe e processadores Intel Xeon para latência ultra-baixa"
    },
    {
      icon: Shield,
      title: "DDoS Protection",
      description: "Proteção contra ataques DDoS incluída em todos os planos"
    },
    {
      icon: Clock,
      title: "Uptime 99.9%",
      description: "Garantia de disponibilidade com monitoramento 24/7"
    },
    {
      icon: Users,
      title: "Suporte Especializado",
      description: "Equipe técnica especializada em Minecraft disponível 24/7"
    },
    {
      icon: HardDrive,
      title: "Backups Automáticos",
      description: "Backups diários automáticos para proteger seu mundo"
    },
    {
      icon: Globe,
      title: "Localização Brasil",
      description: "Servidores localizados no Brasil para melhor ping"
    }
  ];

  const testimonials = [
    {
      name: "João Silva",
      avatar: "JS",
      server: "MineCraft BR",
      text: "Servidor perfeito! Ping baixo e zero lag. Recomendo demais!",
      rating: 5
    },
    {
      name: "Maria Santos",
      avatar: "MS",
      server: "Creative World",
      text: "Suporte incrível e instalação super fácil. Melhor hosting que já usei!",
      rating: 5
    },
    {
      name: "Pedro Costa",
      avatar: "PC",
      server: "PvP Arena",
      text: "Performance excelente mesmo com muitos jogadores online.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/20 rounded-full px-6 py-3 mb-8"
            >
              <Gamepad2 className="h-5 w-5 text-green-500" />
              <span className="text-sm font-semibold text-green-500">
                Hospedagem Minecraft Premium
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-foreground mb-6"
            >
              Seu servidor Minecraft com{' '}
              <span className="bg-gradient-to-r from-green-500 to-green-500/80 bg-clip-text text-transparent">
                performance máxima
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Servidores otimizados para Minecraft com SSD NVMe, proteção DDoS, 
              backups automáticos e suporte 24/7 especializado em gaming.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-500 to-green-500/90 hover:from-green-500/90 hover:to-green-500 px-8 py-4 text-lg rounded-xl"
                  onClick={() => {
                    document.querySelector('#pricing-section')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                  }}
                >
                  <Play className="h-5 w-5 mr-2" />
                  Começar Agora
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-4 text-lg rounded-xl border-2 hover:border-green-500 hover:text-green-500"
                  onClick={() => {
                    window.open('mailto:suporte@aplotcloud.com?subject=Suporte Minecraft - Dúvidas sobre Hospedagem', '_blank');
                  }}
                >
                  <Users className="h-5 w-5 mr-2" />
                  Contato Suporte
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-muted/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Por que escolher nossa hospedagem?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Infraestrutura premium otimizada especificamente para servidores Minecraft
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-card/50 to-card/30 border border-border/40 rounded-2xl p-6 hover:border-green-500/30 transition-all duration-300 group"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  <feature.icon className="h-6 w-6 text-green-500" />
                </motion.div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing-section" className="py-20 bg-gradient-to-b from-background via-muted/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Escolhendo meu plano
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Escolha uma região e a sua máquina
            </p>
          </motion.div>

          {/* Processor Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <div className="flex space-x-4">
              <motion.button
                onClick={() => setSelectedProcessor('intel')}
                className={`flex items-center space-x-2 rounded-full px-6 py-3 transition-all duration-300 ${
                  selectedProcessor === 'intel'
                    ? 'bg-green-500/10 border-2 border-green-500 text-green-500 shadow-lg'
                    : 'bg-muted/50 border-2 border-border text-muted-foreground hover:border-green-500/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">🇧🇷</span>
                <span className="font-medium">Intel Xeon E5-2699v3</span>
              </motion.button>
              <motion.button
                onClick={() => setSelectedProcessor('amd')}
                disabled={true}
                className="flex items-center space-x-2 rounded-full px-6 py-3 transition-all duration-300 bg-muted/30 border-2 border-red-500/50 text-red-500/70 cursor-not-allowed opacity-60 relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg">🇧🇷</span>
                <span className="font-medium">AMD Ryzen 9 9900X</span>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold ml-2">
                  Esgotado
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* Plans and Details Layout */}
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Plans Grid - 2 columns */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {plans.map((plan, index) => (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.03 }}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`relative bg-gradient-to-br from-card/80 to-card/60 border-2 rounded-2xl p-4 cursor-pointer transition-all duration-300 group ${
                        selectedPlan === plan.id
                          ? 'border-green-500 scale-105'
                          : plan.popular
                          ? 'border-green-500/50 hover:border-green-500/70 shadow-lg'
                          : 'border-border/40 hover:border-green-500/30 shadow-md hover:shadow-lg'
                      }`}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {plan.popular && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10"
                        >
                          <div className="bg-gradient-to-r from-green-500 to-green-500/80 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 shadow-lg">
                            <Star className="h-3 w-3 fill-current" />
                            <span>Popular</span>
                          </div>
                        </motion.div>
                      )}

                      {selectedPlan === plan.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6 }}
                          className="absolute -top-2 right-2 z-10"
                        >
                          <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                            <Check className="h-4 w-4" />
                          </div>
                        </motion.div>
                      )}

                      {/* Plan Header - Compact */}
                      <div className="text-center mb-4 pt-2">
                        <motion.div 
                          className="text-3xl mb-2"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          {plan.icon}
                        </motion.div>
                        <h3 className="text-lg font-bold text-foreground mb-1">
                          {plan.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-3">
                          {plan.description}
                        </p>
                        <div className="flex items-baseline justify-center">
                          <span className="text-2xl font-bold text-foreground">
                            R$ {plan.price}
                          </span>
                          <span className="text-muted-foreground ml-1 text-sm">
                            {plan.period}
                          </span>
                        </div>
                      </div>

                      {/* Specifications - Compact */}
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center p-2 bg-muted/30 rounded-lg">
                          <span className="text-xs text-muted-foreground">RAM:</span>
                          <span className="text-sm font-semibold text-foreground">{plan.ram}GB</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-muted/30 rounded-lg">
                          <span className="text-xs text-muted-foreground">vCPU:</span>
                          <span className="text-sm font-semibold text-foreground">{plan.vcpu}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-muted/30 rounded-lg">
                          <span className="text-xs text-muted-foreground">SSD:</span>
                          <span className="text-sm font-semibold text-foreground">{plan.storage}GB</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-muted/30 rounded-lg">
                          <span className="text-xs text-muted-foreground">Slots:</span>
                          <span className="text-sm font-semibold text-foreground">{plan.slots}</span>
                        </div>
                      </div>

                      {/* Action Button - Compact */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          size="sm"
                          className={`w-full py-2 rounded-lg font-medium transition-all duration-300 text-xs ${
                            selectedPlan === plan.id
                              ? 'bg-green-500 text-white shadow-lg'
                              : 'bg-gradient-to-r from-card to-card/80 border border-border hover:border-green-500 hover:bg-green-500/5 hover:text-green-500'
                          }`}
                          variant={selectedPlan === plan.id ? "default" : "outline"}
                        >
                          {selectedPlan === plan.id ? (
                            <>
                              <Check className="h-3 w-3 mr-1" />
                              Selecionado
                            </>
                          ) : (
                            'Selecionar'
                          )}
                        </Button>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Selected Plan Details - Side Panel */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="lg:col-span-1"
              >
                <div className="sticky top-8 bg-gradient-to-br from-card/80 to-card/60 border border-border/40 rounded-2xl p-6 shadow-2xl">
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                    <span className="text-2xl mr-2">{selectedPlanData.icon}</span>
                    {selectedPlanData.name}
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
                      <span className="text-sm text-muted-foreground">Processador:</span>
                      <span className="text-sm font-semibold text-foreground">
                        {selectedProcessor === 'intel' ? 'Intel Xeon' : 'AMD Ryzen'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
                      <span className="text-sm text-muted-foreground">vCPU:</span>
                      <span className="text-sm font-semibold text-foreground">{selectedPlanData.vcpu}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
                      <span className="text-sm text-muted-foreground">RAM:</span>
                      <span className="text-sm font-semibold text-foreground">{selectedPlanData.ram}GB</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
                      <span className="text-sm text-muted-foreground">SSD:</span>
                      <span className="text-sm font-semibold text-foreground">{selectedPlanData.storage}GB NVMe</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
                      <span className="text-sm text-muted-foreground">Slots:</span>
                      <span className="text-sm font-semibold text-foreground">{selectedPlanData.slots} jogadores</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
                      <span className="text-sm text-muted-foreground">DDoS Protection:</span>
                      <span className="text-sm font-semibold text-foreground">CloudFlare</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-foreground mb-3">Recursos Incluídos</h4>
                    <div className="space-y-2">
                      {selectedPlanData.features.map((feature, index) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center space-x-2"
                        >
                        <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 text-green-500" />
                          </div>
                          <span className="text-sm text-foreground">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border/40 pt-4">
                    <div className="text-center mb-4">
                      <div className="text-sm text-muted-foreground mb-1">Valor do Plano</div>
                      <div className="text-3xl font-bold text-green-500 mb-1">
                        R$ {selectedPlanData.price},00
                      </div>
                      <div className="text-sm text-muted-foreground">{selectedPlanData.period}</div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="w-full bg-green-500 hover:bg-green-500/90 text-white py-3 rounded-xl font-semibold shadow-lg">
                        <Play className="h-4 w-4 mr-2" />
                        Contratar Agora
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-muted/10 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Mais de 1000+ servidores confiam na nossa hospedagem
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-card/50 to-card/30 border border-border/40 rounded-2xl p-6 hover:border-green-500/30 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-500/80 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.server}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                
                <p className="text-muted-foreground italic">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/20 rounded-3xl p-12 text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-500/80 rounded-2xl mb-6"
            >
              <Sparkles className="h-8 w-8 text-white" />
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pronto para criar seu servidor?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Comece hoje mesmo e tenha seu servidor Minecraft online em minutos
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-500 to-green-500/90 hover:from-green-500/90 hover:to-green-500 px-8 py-4 text-lg rounded-xl"
              >
                <Play className="h-5 w-5 mr-2" />
                Criar Servidor Agora
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MinecraftHostingPage;
