'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Shield, 
  Zap, 
  Globe, 
  Clock,
  Award,
  Lock,
  RefreshCw,
  Sparkles,
  Users,
  Server,
  TrendingUp,
  Activity
} from 'lucide-react';

const Benefits = memo(() => {
  // Dados dos benefícios principais
  const mainBenefits = [
    {
      icon: Cpu,
      title: "Intel XEON 2699V3",
      subtitle: "Processadores de Alta Performance",
      description: "18 cores e 36 threads de pura potência. Processadores Intel XEON E5-2699V3 com frequência base de 2.3GHz e turbo de até 3.6GHz.",
      specs: [
        { label: "Cores", value: "18" },
        { label: "Threads", value: "36" },
        { label: "Base", value: "2.3GHz" },
        { label: "Turbo", value: "3.6GHz" }
      ],
      gradient: "from-green-500/20 via-green-500/10 to-transparent"
    },
    {
      icon: Shield,
      title: "Segurança Avançada",
      subtitle: "Proteção em Múltiplas Camadas",
      description: "Firewall de última geração, SSL automático, monitoramento 24/7 e backups automáticos para garantir total segurança.",
      specs: [
        { label: "Firewall", value: "Ativo" },
        { label: "SSL", value: "Auto" },
        { label: "Monitor", value: "24/7" },
        { label: "Backup", value: "Diário" }
      ],
      gradient: "from-green-500/20 via-green-500/10 to-transparent"
    },
    {
      icon: Server,
      title: "Infraestrutura Robusta",
      subtitle: "Servidores Dedicados Confiáveis",
      description: "Infraestrutura 100% nacional com alta disponibilidade, redundância completa e uptime garantido de 99%.",
      specs: [
        { label: "Uptime", value: "99%" },
        { label: "Rede", value: "1Gbps" },
        { label: "Storage", value: "SSD" },
        { label: "Backup", value: "Auto" }
      ],
      gradient: "from-green-500/20 via-green-500/10 to-transparent"
    }
  ];

  // Recursos inclusos
  const features = [
    { icon: Globe, title: "Conectividade Alta", description: "Conexão de alta velocidade" },
    { icon: Lock, title: "SSL Incluído", description: "Certificados automáticos" },
    { icon: RefreshCw, title: "Backup Diário", description: "Proteção automática" },
    { icon: Clock, title: "99% Uptime", description: "Disponibilidade garantida" },
    { icon: Zap, title: "Performance", description: "Máxima otimização" },
    { icon: Award, title: "Suporte 24/7", description: "Equipe especializada" }
  ];

  // Estatísticas
  const stats = [
    { icon: Activity, value: "18", label: "Cores", sublabel: "Processamento" },
    { icon: Users, value: "24/7", label: "Suporte", sublabel: "Sempre ativo" },
    { icon: TrendingUp, value: "99%", label: "Uptime", sublabel: "Garantido" },
    { icon: Globe, value: "100%", label: "Brasil", sublabel: "Nacional" }
  ];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-background via-background to-background">
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
            <span className="text-sm font-semibold text-green-500">Tecnologia Premium</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block text-foreground mb-2">Potência e Confiabilidade</span>
            <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
              que seu projeto merece
            </span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Servidores equipados com processadores Intel XEON 2699V3, 
            infraestrutura robusta e suporte especializado.
          </p>
        </motion.div>

        {/* Main Benefits - Card Style Melhorado */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {mainBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group relative h-full"
              >
                {/* Card Background com Gradiente */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Card Content */}
                <div className="relative bg-card border border-border rounded-2xl p-8 h-full hover:border-green-500/50 transition-all duration-300">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg shadow-green-500/20">
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-green-500 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-green-500 font-medium mb-4">
                    {benefit.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {benefit.description}
                  </p>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {benefit.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="bg-muted/50 border border-border rounded-lg p-3 text-center"
                      >
                        <div className="text-lg font-bold text-green-500">{spec.value}</div>
                        <div className="text-xs text-muted-foreground">{spec.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Features Grid - Estilo Compacto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Recursos <span className="text-green-500">Inclusos</span>
            </h3>
            <p className="text-muted-foreground">
              Tudo que você precisa, sem custos adicionais
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="bg-card border border-border rounded-xl p-6 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-green-500" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section - Estilo Moderno */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-green-500/5 via-green-500/10 to-green-500/5 border border-green-500/20 rounded-2xl p-8 md:p-12">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-green-500/10 border border-green-500/20 rounded-xl mb-4">
                    <stat.icon className="w-7 h-7 text-green-500" />
                  </div>
                  <div className="text-4xl font-bold text-green-500 mb-2">{stat.value}</div>
                  <div className="text-sm font-semibold text-foreground mb-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
});

Benefits.displayName = 'Benefits';

export default Benefits;
