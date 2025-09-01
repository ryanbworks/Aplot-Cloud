'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Server,
  Database,
  Cloud,
  Shield,
  Globe,
  Wifi,
  Activity,
  TrendingUp,
  RefreshCw,
  Calendar,
  MapPin,
  Zap,
  Monitor,
  HardDrive
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Tipos para o status dos serviços
type ServiceStatus = 'operational' | 'degraded' | 'outage' | 'maintenance';

interface Service {
  id: string;
  name: string;
  description: string;
  status: ServiceStatus;
  uptime: number;
  responseTime: number;
  icon: React.ComponentType<any>;
  location: string;
  lastChecked: Date;
}

interface Incident {
  id: string;
  title: string;
  description: string;
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved';
  severity: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Date;
  updatedAt: Date;
  affectedServices: string[];
}

const StatusPage = () => {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Dados mockados dos serviços
  const [services] = useState<Service[]>([
    {
      id: 'web-hosting',
      name: 'Hospedagem Web',
      description: 'Servidores de hospedagem compartilhada',
      status: 'operational',
      uptime: 99.98,
      responseTime: 245,
      icon: Server,
      location: 'São Paulo, BR',
      lastChecked: new Date()
    },
    {
      id: 'vps-cloud',
      name: 'VPS Cloud',
      description: 'Servidores virtuais privados',
      status: 'operational',
      uptime: 99.99,
      responseTime: 128,
      icon: Cloud,
      location: 'Rio de Janeiro, BR',
      lastChecked: new Date()
    },
    {
      id: 'database',
      name: 'Banco de Dados',
      description: 'MySQL e PostgreSQL',
      status: 'degraded',
      uptime: 99.85,
      responseTime: 456,
      icon: Database,
      location: 'São Paulo, BR',
      lastChecked: new Date()
    },
    {
      id: 'cdn',
      name: 'CDN Global',
      description: 'Rede de distribuição de conteúdo',
      status: 'operational',
      uptime: 99.97,
      responseTime: 89,
      icon: Globe,
      location: 'Global',
      lastChecked: new Date()
    },
    {
      id: 'security',
      name: 'Firewall & Segurança',
      description: 'Proteção DDoS e WAF',
      status: 'operational',
      uptime: 100.0,
      responseTime: 12,
      icon: Shield,
      location: 'Multi-região',
      lastChecked: new Date()
    },
    {
      id: 'api',
      name: 'API Gateway',
      description: 'Interface de programação',
      status: 'maintenance',
      uptime: 99.92,
      responseTime: 0,
      icon: Zap,
      location: 'São Paulo, BR',
      lastChecked: new Date()
    },
    {
      id: 'monitoring',
      name: 'Sistema de Monitoramento',
      description: 'Alertas e métricas',
      status: 'operational',
      uptime: 99.94,
      responseTime: 234,
      icon: Activity,
      location: 'São Paulo, BR',
      lastChecked: new Date()
    },
    {
      id: 'backup',
      name: 'Sistema de Backup',
      description: 'Backup automático diário',
      status: 'operational',
      uptime: 99.89,
      responseTime: 1200,
      icon: HardDrive,
      location: 'Multi-região',
      lastChecked: new Date()
    }
  ]);

  // Dados mockados de incidentes
  const [incidents] = useState<Incident[]>([
    {
      id: 'inc-001',
      title: 'Lentidão no Banco de Dados MySQL',
      description: 'Estamos investigando reports de lentidão nas consultas do banco de dados MySQL. A equipe técnica está trabalhando para identificar e resolver o problema.',
      status: 'investigating',
      severity: 'medium',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
      updatedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 min atrás
      affectedServices: ['database']
    },
    {
      id: 'inc-002',
      title: 'Manutenção Programada - API Gateway',
      description: 'Manutenção programada para atualização de segurança no API Gateway. Estimativa de conclusão: 30 minutos.',
      status: 'monitoring',
      severity: 'low',
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hora atrás
      updatedAt: new Date(Date.now() - 15 * 60 * 1000), // 15 min atrás
      affectedServices: ['api']
    }
  ]);

  const getStatusColor = (status: ServiceStatus) => {
    switch (status) {
      case 'operational':
        return 'text-green-400';
      case 'degraded':
        return 'text-yellow-400';
      case 'outage':
        return 'text-red-400';
      case 'maintenance':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: ServiceStatus) => {
    switch (status) {
      case 'operational':
        return CheckCircle;
      case 'degraded':
        return AlertTriangle;
      case 'outage':
        return XCircle;
      case 'maintenance':
        return Clock;
      default:
        return Clock;
    }
  };

  const getStatusText = (status: ServiceStatus) => {
    switch (status) {
      case 'operational':
        return 'Operacional';
      case 'degraded':
        return 'Degradado';
      case 'outage':
        return 'Fora do Ar';
      case 'maintenance':
        return 'Manutenção';
      default:
        return 'Desconhecido';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'high':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'critical':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simular atualização
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLastUpdate(new Date());
    setIsRefreshing(false);
  };

  const overallStatus = () => {
    const hasOutage = services.some(service => service.status === 'outage');
    const hasDegraded = services.some(service => service.status === 'degraded');
    const hasMaintenance = services.some(service => service.status === 'maintenance');

    if (hasOutage) return { status: 'outage', text: 'Problemas Detectados', color: 'text-red-400' };
    if (hasDegraded) return { status: 'degraded', text: 'Performance Degradada', color: 'text-yellow-400' };
    if (hasMaintenance) return { status: 'maintenance', text: 'Manutenção em Andamento', color: 'text-blue-400' };
    return { status: 'operational', text: 'Todos os Sistemas Operacionais', color: 'text-green-400' };
  };

  const calculateAverageUptime = () => {
    const total = services.reduce((sum, service) => sum + service.uptime, 0);
    return (total / services.length).toFixed(2);
  };

  const overall = overallStatus();

  return (
    <div className="min-h-screen bg-background">
      {/* Header da Página */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-green-500/5" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-green-500/20 mb-6"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Activity className="w-8 h-8 text-primary" />
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Status dos{' '}
              <span className="bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
                Serviços
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Monitore em tempo real o status de todos os nossos serviços de infraestrutura
            </p>

            {/* Status Geral */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center space-x-3 bg-card/50 backdrop-blur-sm border border-border/40 rounded-2xl px-6 py-4"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={overall.color}
              >
                {React.createElement(getStatusIcon(overall.status as ServiceStatus), { className: "w-6 h-6" })}
              </motion.div>
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Status Geral</p>
                <p className={`font-semibold ${overall.color}`}>{overall.text}</p>
              </div>
            </motion.div>

            {/* Métricas Gerais */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-6 mt-8"
            >
              <div className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl px-4 py-3">
                <p className="text-sm text-muted-foreground">Uptime Médio</p>
                <p className="text-2xl font-bold text-primary">{calculateAverageUptime()}%</p>
              </div>
              <div className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl px-4 py-3">
                <p className="text-sm text-muted-foreground">Serviços Ativos</p>
                <p className="text-2xl font-bold text-green-400">{services.filter(s => s.status === 'operational').length}/{services.length}</p>
              </div>
              <div className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl px-4 py-3">
                <p className="text-sm text-muted-foreground">Última Atualização</p>
                <p className="text-sm font-medium text-foreground">{lastUpdate.toLocaleTimeString('pt-BR')}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Botão de Atualizar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-end mb-8"
        >
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            variant="outline"
            className="group bg-card/50 backdrop-blur-sm border-border/40 hover:border-primary/50"
          >
            <motion.div
              animate={isRefreshing ? { rotate: 360 } : {}}
              transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: "linear" }}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
            </motion.div>
            {isRefreshing ? 'Atualizando...' : 'Atualizar Status'}
          </Button>
        </motion.div>

        {/* Lista de Serviços */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <Monitor className="w-6 h-6 mr-3 text-primary" />
            Serviços de Infraestrutura
          </h2>

          <div className="grid gap-4">
            {services.map((service, index) => {
              const StatusIcon = getStatusIcon(service.status);
              const ServiceIcon = service.icon;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="group bg-card/50 backdrop-blur-sm border border-border/40 rounded-xl p-6 hover:border-primary/30 transition-all duration-300"
                  whileHover={{ scale: 1.01, y: -2 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-green-500/10 group-hover:from-primary/20 group-hover:to-green-500/20 transition-all duration-300"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                      >
                        <ServiceIcon className="w-6 h-6 text-primary" />
                      </motion.div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                          {service.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {service.location}
                          </span>
                          <span>Uptime: {service.uptime}%</span>
                          {service.status !== 'maintenance' && (
                            <span>Resposta: {service.responseTime}ms</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <motion.div
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg bg-background/50 ${getStatusColor(service.status)}`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <motion.div
                          animate={service.status === 'operational' ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <StatusIcon className="w-5 h-5" />
                        </motion.div>
                        <span className="font-medium text-sm">
                          {getStatusText(service.status)}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Incidentes Ativos */}
        {incidents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-3 text-yellow-400" />
              Incidentes e Manutenções
            </h2>

            <div className="space-y-4">
              {incidents.map((incident, index) => (
                <motion.div
                  key={incident.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="bg-card/50 backdrop-blur-sm border border-border/40 rounded-xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getSeverityColor(incident.severity)}`}>
                          {incident.severity.toUpperCase()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {incident.createdAt.toLocaleString('pt-BR')}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{incident.title}</h3>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{incident.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Serviços afetados:</span>
                      {incident.affectedServices.map(serviceId => {
                        const service = services.find(s => s.id === serviceId);
                        return service ? (
                          <span key={serviceId} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">
                            {service.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Atualizado: {incident.updatedAt.toLocaleTimeString('pt-BR')}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Histórico de Uptime (Simulado) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-3 text-primary" />
            Histórico dos Últimos 90 Dias
          </h2>

          <div className="bg-card/50 backdrop-blur-sm border border-border/40 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-400">99.96%</p>
                <p className="text-sm text-muted-foreground">Uptime Geral</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-400">2</p>
                <p className="text-sm text-muted-foreground">Incidentes Resolvidos</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-400">18min</p>
                <p className="text-sm text-muted-foreground">Downtime Total</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StatusPage;
