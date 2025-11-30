'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Wallet,
  Download,
  FileText,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Filter,
  Search,
  ChevronDown,
  ExternalLink,
  Plus,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardPageHeader } from '@/components/dashboard/DashboardPageHeader';

type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'cancelled';

interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  amount: number;
  status: InvoiceStatus;
  description: string;
  service: string;
}

/**
 * Página de Faturamento
 * Exibe faturas, histórico de pagamentos e estatísticas financeiras
 */
export default function FaturamentoPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - em produção virá da API
  const invoices: Invoice[] = [
    {
      id: '1',
      number: 'INV-2024-001',
      date: '2024-01-15',
      dueDate: '2024-01-25',
      amount: 149.90,
      status: 'paid',
      description: 'Servidor Minecraft - Plano Premium',
      service: 'Minecraft',
    },
    {
      id: '2',
      number: 'INV-2024-002',
      date: '2024-02-15',
      dueDate: '2024-02-25',
      amount: 89.90,
      status: 'paid',
      description: 'VPS - 4GB RAM',
      service: 'VPS',
    },
    {
      id: '3',
      number: 'INV-2024-003',
      date: '2024-03-15',
      dueDate: '2024-03-25',
      amount: 149.90,
      status: 'pending',
      description: 'Servidor Minecraft - Plano Premium',
      service: 'Minecraft',
    },
    {
      id: '4',
      number: 'INV-2024-004',
      date: '2024-03-20',
      dueDate: '2024-03-10',
      amount: 49.90,
      status: 'overdue',
      description: 'Discord Bot - Plano Básico',
      service: 'Discord Bot',
    },
  ];

  const stats = {
    totalPendente: 149.90,
    totalVencido: 49.90,
    proximaFatura: '2024-04-15',
  };

  const getStatusBadge = (status: InvoiceStatus) => {
    const badges = {
      paid: {
        icon: CheckCircle,
        text: 'Pago',
        className: 'bg-green-500/20 text-green-500 border-green-500/30',
      },
      pending: {
        icon: Clock,
        text: 'Pendente',
        className: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
      },
      overdue: {
        icon: AlertCircle,
        text: 'Vencido',
        className: 'bg-red-500/20 text-red-500 border-red-500/30',
      },
      cancelled: {
        icon: XCircle,
        text: 'Cancelado',
        className: 'bg-gray-500/20 text-gray-500 border-gray-500/30',
      },
    };

    const badge = badges[status];
    const Icon = badge.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${badge.className}`}>
        <Icon className="w-3.5 h-3.5" />
        {badge.text}
      </span>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesStatus = selectedStatus === 'all' || invoice.status === selectedStatus;
    const matchesSearch = invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-green-500/5">
      <DashboardPageHeader
        title="Faturamento"
        description="Gerencie suas faturas e histórico de pagamentos"
        icon={Wallet}
      >
        <Button
          variant="outline"
          className="border-green-500/30 hover:bg-green-500/10 hover:border-green-500/50"
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Relatórios</span>
        </Button>
        <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
          <Plus className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline">Adicionar Créditos</span>
        </Button>
      </DashboardPageHeader>
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6"
      >
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div variants={itemVariants}>
            <div className="bg-card rounded-2xl border border-border p-6 hover:border-yellow-500/30 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-500/20 rounded-xl">
                  <Clock className="w-6 h-6 text-yellow-500" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Pendente</p>
              <p className="text-2xl font-bold text-foreground">
                R$ {stats.totalPendente.toFixed(2)}
              </p>
              <p className="text-xs text-yellow-500 mt-2">1 fatura pendente</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-card rounded-2xl border border-border p-6 hover:border-red-500/30 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-red-500/20 rounded-xl">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Vencido</p>
              <p className="text-2xl font-bold text-foreground">
                R$ {stats.totalVencido.toFixed(2)}
              </p>
              <p className="text-xs text-red-500 mt-2">1 fatura vencida</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-card rounded-2xl border border-border p-6 hover:border-green-500/30 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <Calendar className="w-6 h-6 text-green-500" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Próxima Fatura</p>
              <p className="text-2xl font-bold text-foreground">
                {new Date(stats.proximaFatura).toLocaleDateString('pt-BR')}
              </p>
              <p className="text-xs text-muted-foreground mt-2">Renovação automática</p>
            </div>
          </motion.div>
        </div>

        {/* Métodos de Pagamento */}
        <motion.div variants={itemVariants}>
          <div className="bg-card rounded-2xl border border-border p-6 hover:border-green-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-green-500" />
                Métodos de Pagamento
              </h3>
              <Button
                variant="outline"
                size="sm"
                className="border-green-500/20 hover:bg-green-500/10 hover:border-green-500/30"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Cartão de Crédito */}
              <div className="relative p-6 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-xl border border-green-500/30 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-green-500/30 rounded-lg">
                    <CreditCard className="w-5 h-5 text-green-500" />
                  </div>
                  <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                    Principal
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Cartão de Crédito</p>
                <p className="text-lg font-bold text-foreground mb-1">•••• •••• •••• 4242</p>
                <p className="text-xs text-muted-foreground">Expira em 12/2026</p>
              </div>

              {/* PIX */}
              <div className="p-6 bg-background rounded-xl border border-border hover:border-green-500/20 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <DollarSign className="w-5 h-5 text-green-500" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">PIX</p>
                <p className="text-lg font-bold text-foreground mb-1">Disponível</p>
                <p className="text-xs text-muted-foreground">Pagamento instantâneo</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filtros e Busca */}
        <motion.div variants={itemVariants}>
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Busca */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar por número ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background rounded-lg border border-border focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                />
              </div>

              {/* Filtro de Status */}
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="appearance-none px-4 py-3 pr-10 bg-background rounded-lg border border-border focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300 cursor-pointer"
                >
                  <option value="all">Todos os Status</option>
                  <option value="paid">Pago</option>
                  <option value="pending">Pendente</option>
                  <option value="overdue">Vencido</option>
                  <option value="cancelled">Cancelado</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>

              {/* Filtro de Período */}
              <div className="relative">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="appearance-none px-4 py-3 pr-10 bg-background rounded-lg border border-border focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300 cursor-pointer"
                >
                  <option value="all">Todos os Períodos</option>
                  <option value="30">Últimos 30 dias</option>
                  <option value="90">Últimos 90 dias</option>
                  <option value="180">Últimos 6 meses</option>
                  <option value="365">Último ano</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Lista de Faturas */}
        <motion.div variants={itemVariants}>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-500" />
                Faturas Recentes
              </h3>
            </div>

            <div className="divide-y divide-border">
              {filteredInvoices.length === 0 ? (
                <div className="p-12 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">Nenhuma fatura encontrada</p>
                </div>
              ) : (
                filteredInvoices.map((invoice) => (
                  <motion.div
                    key={invoice.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6 hover:bg-green-500/5 transition-all duration-300 group"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Info da Fatura */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-all duration-300">
                            <FileText className="w-4 h-4 text-green-500" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{invoice.number}</p>
                            <p className="text-sm text-muted-foreground">{invoice.description}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground ml-11">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(invoice.date).toLocaleDateString('pt-BR')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            Vence: {new Date(invoice.dueDate).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>

                      {/* Status e Valor */}
                      <div className="flex items-center gap-4">
                        {getStatusBadge(invoice.status)}
                        <div className="text-right">
                          <p className="text-2xl font-bold text-foreground">
                            R$ {invoice.amount.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Ações */}
                      <div className="flex items-center gap-2">
                        {invoice.status === 'paid' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-green-500/20 hover:bg-green-500/10 hover:border-green-500/30"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Baixar
                          </Button>
                        )}
                        {(invoice.status === 'pending' || invoice.status === 'overdue') && (
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-500/90 text-white"
                          >
                            <CreditCard className="w-4 h-4 mr-2" />
                            Pagar
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-border hover:bg-muted"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </motion.div>

        {/* Footer com informações */}
        <motion.div variants={itemVariants}>
          <div className="bg-card rounded-2xl border border-green-500/20 p-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Informações Importantes</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• As faturas são geradas automaticamente no início de cada período de cobrança</li>
                  <li>• Você pode baixar uma cópia em PDF de todas as faturas pagas</li>
                  <li>• Em caso de dúvidas sobre faturamento, entre em contato com o suporte</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
