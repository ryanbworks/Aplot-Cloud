'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  HardDrive, 
  Wifi, 
  Shield, 
  Zap,
  Clock,
  CheckCircle,
  Sparkles,
  Award,
  Users
} from 'lucide-react';

const TechnicalFeatures = memo(() => {
  // Benefícios simples e diretos
  const mainFeatures = [
    {
      icon: Cpu,
      title: "Processamento Poderoso",
      description: "Processadores Intel XEON com 18 núcleos para rodar tudo que você precisa sem travamentos.",
      benefit: "Seu site sempre rápido",
      color: "from-green-500 to-green-600"
    },
    {
      icon: HardDrive,
      title: "Armazenamento Rápido",
      description: "Discos SSD ultra-rápidos que carregam suas páginas em milésimos de segundo.",
      benefit: "Carregamento instantâneo",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Wifi,
      title: "Internet Veloz",
      description: "Conexão de alta velocidade para seus visitantes acessarem seu site rapidamente.",
      benefit: "Visitantes satisfeitos",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Shield,
      title: "Proteção Total",
      description: "Segurança avançada que protege seu site contra ataques e mantém seus dados seguros.",
      benefit: "Durma tranquilo",
      color: "from-green-500 to-green-600"
    }
  ];

  // O que está incluso
  const includes = [
    { icon: CheckCircle, text: "Backup automático todos os dias" },
    { icon: CheckCircle, text: "Suporte técnico sempre que precisar" },
    { icon: CheckCircle, text: "99% de disponibilidade garantida" },
    { icon: CheckCircle, text: "Fácil de usar e configurar" },
    { icon: CheckCircle, text: "SSL/HTTPS grátis incluído" },
    { icon: CheckCircle, text: "Painel de controle simples" }
  ];

  // Estatísticas impressionantes
  const stats = [
    {
      icon: Zap,
      value: "Super",
      label: "Rápido",
      description: "Carregamento em milésimos de segundo"
    },
    {
      icon: Shield,
      value: "100%",
      label: "Seguro",
      description: "Proteção contra ataques"
    },
    {
      icon: Clock,
      value: "99%",
      label: "Online",
      description: "Seu site sempre disponível"
    },
    {
      icon: Users,
      value: "24/7",
      label: "Suporte",
      description: "Ajuda quando você precisar"
    }
  ];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-background to-green-500/5">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-green-500" />
            <span className="text-sm font-semibold text-green-500">Por que somos diferentes</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block text-foreground mb-2">Tudo que você precisa</span>
            <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
              em um só lugar
            </span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Servidores potentes, rápidos e seguros. 
            Tudo preparado para você focar no que realmente importa: seu negócio.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-card border border-green-500/20 rounded-xl p-6 text-center hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-green-500 mb-2">{stat.value}</div>
              <div className="text-sm font-semibold text-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="h-full bg-card border border-border rounded-2xl p-8 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className={`inline-flex w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl items-center justify-center shadow-lg shadow-green-500/20`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Benefit Badge */}
                <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-semibold text-green-500">
                    {feature.benefit}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* What's Included Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-green-500/5 to-green-500/10 border border-green-500/20 rounded-2xl p-8 md:p-12"
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              O que vem <span className="text-green-500">incluído</span>?
            </h3>
            <p className="text-muted-foreground">
              Tudo que você precisa, sem surpresas ou custos extras
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {includes.map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 bg-card/50 border border-border rounded-lg p-4 hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-200"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-foreground font-medium text-sm">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-4">
            <Award className="w-4 h-4 text-green-500" />
            <span className="text-sm font-semibold text-green-500">
              Qualidade Garantida
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Pronto para começar?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Escolha o plano ideal e tenha seu servidor rodando em minutos.
          </p>
        </motion.div>

      </div>
    </section>
  );
});

TechnicalFeatures.displayName = 'TechnicalFeatures';

export default TechnicalFeatures;
