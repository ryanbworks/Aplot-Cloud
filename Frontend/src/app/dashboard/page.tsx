'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { 
  Server, 
  Wallet, 
  Users, 
  Activity,
  Plus,
  Bell,
  Sparkles,
  TrendingUp,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageLoader } from '@/components/ui/PageLoader';
import Link from 'next/link';
import { useLoading } from '@/hooks/use-loading';

// Lazy load componentes pesados do dashboard
const StatsCard = dynamic(() => import('@/components/dashboard/StatsCard').then(mod => ({ default: mod.StatsCard })));
const ServiceCard = dynamic(() => import('@/components/dashboard/ServiceCard').then(mod => ({ default: mod.ServiceCard })));
const InvoiceCard = dynamic(() => import('@/components/dashboard/InvoiceCard').then(mod => ({ default: mod.InvoiceCard })));
const UserMenu = dynamic(() => import('@/components/dashboard/UserMenu').then(mod => ({ default: mod.UserMenu })));

/**
 * Página principal do dashboard
 * Exibe estatísticas, serviços ativos, faturas e ações rápidas
 */
export default function DashboardPage() {
  const { isLoading, setLoading } = useLoading({ dashboard: true });

  // Simular carregamento inicial do dashboard
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading('dashboard', false);
    }, 1000); // 1 segundo de loading para simular carregamento de dados

    return () => clearTimeout(timer);
  }, [setLoading]);

  // Mock data - em produção virá da API
  const stats = [
    {
      title: 'Serviços Ativos',
      value: '4',
      description: '2 Minecraft, 1 Discord Bot, 1 VPS',
      icon: Server,
      trend: { value: 25, isPositive: true },
    },
    {
      title: 'Gasto Mensal',
      value: 'R$ 248',
      description: 'Próximo vencimento em 12 dias',
      icon: Wallet,
    },
    {
      title: 'Uptime Médio',
      value: '99.8%',
      description: 'Últimos 30 dias',
      icon: Activity,
      trend: { value: 0.3, isPositive: true },
    },
    {
      title: 'Tickets Abertos',
      value: '1',
      description: 'Tempo médio: 2h',
      icon: Users,
    },
  ];

  const services = [
    {
      id: '1',
      name: 'Servidor Survival',
      type: 'minecraft' as const,
      status: 'online' as const,
      plan: 'Premium 4GB',
      expiryDate: '15/11/2024',
      ip: '192.168.1.100',
      port: '25565',
    },
    {
      id: '2',
      name: 'Bot Moderação',
      type: 'discord-bot' as const,
      status: 'online' as const,
      plan: 'Básico 512MB',
      expiryDate: '20/11/2024',
    },
    {
      id: '3',
      name: 'VPS Produção',
      type: 'vps' as const,
      status: 'online' as const,
      plan: 'VPS Pro 8GB',
      expiryDate: '25/11/2024',
      ip: '192.168.1.200',
      port: '22',
    },
    {
      id: '4',
      name: 'Servidor Criativo',
      type: 'minecraft' as const,
      status: 'offline' as const,
      plan: 'Básico 2GB',
      expiryDate: '10/11/2024',
      ip: '192.168.1.150',
      port: '25565',
    },
  ];

  const recentInvoices = [
    {
      id: '1',
      date: '01/10/2024',
      amount: 248.00,
      status: 'paid' as const,
      description: 'Mensalidade - Outubro 2024',
    },
    {
      id: '2',
      date: '15/10/2024',
      amount: 62.00,
      status: 'pending' as const,
      description: 'Upgrade - VPS Pro 8GB',
    },
    {
      id: '3',
      date: '01/09/2024',
      amount: 186.00,
      status: 'paid' as const,
      description: 'Mensalidade - Setembro 2024',
    },
  ];

  const notifications = [
    {
      type: 'warning' as const,
      message: 'Fatura de R$ 62,00 vence em 3 dias',
      time: 'Há 2 horas',
    },
    {
      type: 'info' as const,
      message: 'Backup automático concluído com sucesso',
      time: 'Há 5 horas',
    },
  ];

  if (isLoading('dashboard')) {
    return <PageLoader isLoading={true} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-green-500/5">
      {/* Header do Dashboard */}
      <div className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold text-foreground mb-2"
              >
                Olá, <span className="text-green-500">Ryan</span>! 👋
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground"
              >
                Bem-vindo ao seu painel de controle
              </motion.p>
            </div>

            <div className="flex items-center gap-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-500/30 hover:bg-green-500/10 hover:border-green-500/50 relative"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                    2
                  </span>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <UserMenu userName="Ryan" userEmail="ryan@aplotcloud.com" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notificações Importantes */}
        {notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 space-y-3"
          >
            {notifications.map((notification, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-3 p-4 rounded-lg border ${
                  notification.type === 'warning'
                    ? 'bg-yellow-500/10 border-yellow-500/20'
                    : 'bg-blue-500/10 border-blue-500/20'
                }`}
              >
                <AlertCircle
                  className={`w-5 h-5 ${
                    notification.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard key={stat.title} {...stat} index={index} />
          ))}
        </div>

        {/* Conteúdo Principal em 2 Colunas */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Coluna Esquerda - Serviços */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header de Serviços */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-between"
            >
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">
                  Meus Serviços
                </h2>
                <p className="text-sm text-muted-foreground">
                  Gerencie todos os seus serviços ativos
                </p>
              </div>
              <Link href="/dashboard/servicos/novo">
                <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/20">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Serviço
                </Button>
              </Link>
            </motion.div>

            {/* Grid de Serviços */}
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <ServiceCard key={service.id} {...service} index={index} />
              ))}
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-green-500" />
                <h3 className="text-lg font-bold text-foreground">Ações Rápidas</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: Plus, label: 'Novo Servidor', href: '/dashboard/servicos/novo' },
                  { icon: TrendingUp, label: 'Fazer Upgrade', href: '/dashboard/servicos' },
                  { icon: Wallet, label: 'Faturamento', href: '/dashboard/faturamento' },
                  { icon: Users, label: 'Suporte', href: '/dashboard/suporte' },
                ].map((action, index) => (
                  <Link key={action.label} href={action.href}>
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center gap-2 p-4 bg-card border border-border rounded-lg hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-200 w-full"
                    >
                      <action.icon className="w-6 h-6 text-green-500" />
                      <span className="text-xs font-medium text-foreground text-center">
                        {action.label}
                      </span>
                    </motion.button>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Coluna Direita - Faturas e Info */}
          <div className="space-y-6">
            {/* Faturas Recentes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">
                  Faturas Recentes
                </h2>
                <Link href="/dashboard/faturamento">
                  <button className="text-sm text-green-500 hover:text-green-400 font-medium transition-colors">
                    Ver todas →
                  </button>
                </Link>
              </div>
              <div className="space-y-3">
                {recentInvoices.map((invoice, index) => (
                  <InvoiceCard key={invoice.id} {...invoice} index={index} />
                ))}
              </div>
            </motion.div>

            {/* Card de Suporte */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-foreground mb-3">
                Precisa de ajuda?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Nossa equipe está pronta para te ajudar 24/7
              </p>
              <div className="space-y-2">
                <Link href="/dashboard/suporte/novo-ticket">
                  <Button
                    variant="outline"
                    className="w-full border-green-500/30 hover:bg-green-500/10 hover:border-green-500/50"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Novo Ticket
                  </Button>
                </Link>
                <Link href="/dashboard/suporte/ticket">
                  <Button
                    variant="ghost"
                    className="w-full text-green-500 hover:bg-green-500/10"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Meus Tickets
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Status do Sistema */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">
                  Status do Sistema
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-semibold text-green-500">
                    Operacional
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Servidores', status: 'online' },
                  { name: 'Painel de Controle', status: 'online' },
                  { name: 'API', status: 'online' },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="text-green-500 font-medium">✓ Online</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

