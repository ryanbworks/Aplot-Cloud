'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  HardDrive, 
  Wifi, 
  Shield, 
  Database,
  Cloud,
  Server,
  Zap,
  Globe,
  Lock,
  Activity,
  Gauge,
  Network,
  Terminal,
  Layers,
  BarChart3
} from 'lucide-react';

const TechnicalFeatures = memo(() => {
  const technicalSpecs = [
    {
      category: "Performance",
      icon: Cpu,
      color: "from-blue-500 to-cyan-500",
      features: [
        { label: "Processador", value: "AMD EPYC 7763", icon: Cpu },
        { label: "Arquitetura", value: "64-core 2.45GHz", icon: Gauge },
        { label: "Cache L3", value: "256MB", icon: Database },
        { label: "Threads", value: "128 Threads", icon: Activity }
      ]
    },
    {
      category: "Armazenamento",
      icon: HardDrive,
      color: "from-green-500 to-emerald-500",
      features: [
        { label: "SSD NVMe", value: "Gen4 PCIe 4.0", icon: HardDrive },
        { label: "IOPS", value: "1M+ IOPS", icon: BarChart3 },
        { label: "Throughput", value: "7GB/s", icon: Zap },
        { label: "Latência", value: "< 0.1ms", icon: Activity }
      ]
    },
    {
      category: "Rede",
      icon: Network,
      color: "from-purple-500 to-violet-500",
      features: [
        { label: "Largura de Banda", value: "100Gbps", icon: Wifi },
        { label: "CDN", value: "300+ POPs", icon: Globe },
        { label: "DDoS Protection", value: "Multi-Tbps", icon: Shield },
        { label: "Latência Global", value: "< 20ms", icon: Network }
      ]
    },
    {
      category: "Segurança",
      icon: Lock,
      color: "from-red-500 to-orange-500",
      features: [
        { label: "Criptografia", value: "AES-256", icon: Lock },
        { label: "SSL/TLS", value: "1.3 + HSTS", icon: Shield },
        { label: "Firewall", value: "WAF + Layer 7", icon: Server },
        { label: "Compliance", value: "SOC2 + ISO27001", icon: Database }
      ]
    }
  ];

  const infrastructureStats = [
    { label: "Uptime SLA", value: "99.99%", color: "text-green-500" },
    { label: "Data Centers", value: "15", color: "text-blue-500" },
    { label: "Países", value: "150+", color: "text-purple-500" },
    { label: "Clientes Ativos", value: "50K+", color: "text-orange-500" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-muted/20 via-background to-background overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/8 to-purple-500/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-green-500/8 to-cyan-500/8 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-6 py-3 mb-6"
          >
            <Terminal className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-semibold text-blue-500">
              Especificações Técnicas Enterprise
            </span>
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="block">Infraestrutura de</span>
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              última geração
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            Hardware premium, rede global e segurança militar para garantir máxima 
            performance e confiabilidade em todos os seus projetos.
          </motion.p>
        </motion.div>

        {/* Infrastructure Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {infrastructureStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div
                className={`text-4xl lg:text-5xl font-bold ${stat.color} mb-2`}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Technical Specifications Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-10 mb-20"
        >
          {technicalSpecs.map((spec, specIndex) => (
            <motion.div
              key={spec.category}
              variants={itemVariants}
              transition={{ delay: specIndex * 0.2 }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-lg border border-border/50 rounded-3xl p-8 hover:border-primary/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-primary/10"
              >
                {/* Header */}
                <div className="flex items-center space-x-4 mb-8">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${spec.color} flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <spec.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {spec.category}
                    </h3>
                    <div className="text-sm text-muted-foreground">Especificações Premium</div>
                  </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 gap-4">
                  {spec.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: specIndex * 0.2 + featureIndex * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-background/50 to-background/20 rounded-xl border border-border/30 hover:border-primary/20 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        <motion.div
                          className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary/20 to-green-500/20 flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                        >
                          <feature.icon className="h-4 w-4 text-primary" />
                        </motion.div>
                        <span className="text-sm font-medium text-foreground">{feature.label}</span>
                      </div>
                      <span className="text-sm font-bold text-primary">{feature.value}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Stack Tecnológico Completo
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Tecnologias enterprise integradas para máxima confiabilidade e performance.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: "Docker", icon: Layers, color: "from-blue-500 to-blue-600" },
              { name: "Kubernetes", icon: Network, color: "from-purple-500 to-purple-600" },
              { name: "Linux", icon: Terminal, color: "from-green-500 to-green-600" },
              { name: "Nginx", icon: Server, color: "from-orange-500 to-orange-600" },
              { name: "Redis", icon: Database, color: "from-red-500 to-red-600" },
              { name: "CloudFlare", icon: Cloud, color: "from-cyan-500 to-cyan-600" }
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-card/60 to-card/30 border border-border/30 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300">
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tech.color} flex items-center justify-center mx-auto mb-3`}
                    whileHover={{ rotate: 5 }}
                  >
                    <tech.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {tech.name}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-card/80 to-card/40 backdrop-blur-lg border border-border/50 rounded-3xl p-10 lg:p-12 max-w-4xl mx-auto">
            <motion.h3 
              className="text-2xl md:text-3xl font-bold text-foreground mb-4"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Quer conhecer nossa infraestrutura por dentro?
            </motion.h3>
            
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Agende uma visita técnica virtual e veja de perto como nossa infraestrutura 
              pode acelerar seus projetos.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg transition-all duration-300"
            >
              Agendar Tour Técnico
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

TechnicalFeatures.displayName = 'TechnicalFeatures';

export default TechnicalFeatures;
