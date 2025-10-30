'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft,
  CreditCard,
  FileText,
  History,
  Download,
  Plus,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Wallet,
  Banknote,
  Bell,
  Eye,
  ChevronRight,
  Edit3,
  Trash2,
  X,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function FaturamentoPage() {
  const [activeTab, setActiveTab] = useState<'faturas' | 'metodos' | 'historico' | 'configuracoes'>('faturas');
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showEditCardModal, setShowEditCardModal] = useState(false);
  const [editingCard, setEditingCard] = useState<typeof paymentMethods[0] | null>(null);

  // Mock data - em produção virá da API
  const financialSummary = {
    totalPaid: 2480.00,
    monthlySpending: 248.00,
    nextDueDate: '15/11/2024',
    nextAmount: 248.00,
    pendingInvoices: 1,
    overdueInvoices: 0
  };

  const invoices = [
    {
      id: 'INV-2024-001',
      date: '01/11/2024',
      dueDate: '10/11/2024',
      amount: 248.00,
      status: 'pending',
      description: 'Mensalidade - Novembro 2024',
      items: [
        { name: 'Servidor Survival', plan: 'Premium 4GB', price: 89.00 },
        { name: 'Bot Moderação', plan: 'Básico 512MB', price: 29.00 },
        { name: 'VPS Produção', plan: 'VPS Pro 8GB', price: 120.00 },
        { name: 'Servidor Criativo', plan: 'Básico 2GB', price: 10.00 },
      ]
    },
    {
      id: 'INV-2024-002',
      date: '01/10/2024',
      dueDate: '10/10/2024',
      amount: 248.00,
      status: 'paid',
      description: 'Mensalidade - Outubro 2024',
      items: [
        { name: 'Servidor Survival', plan: 'Premium 4GB', price: 89.00 },
        { name: 'Bot Moderação', plan: 'Básico 512MB', price: 29.00 },
        { name: 'VPS Produção', plan: 'VPS Pro 8GB', price: 120.00 },
        { name: 'Servidor Criativo', plan: 'Básico 2GB', price: 10.00 },
      ]
    },
    {
      id: 'INV-2024-003',
      date: '15/09/2024',
      dueDate: '20/09/2024',
      amount: 120.00,
      status: 'paid',
      description: 'Upgrade - VPS Pro 8GB',
      items: [
        { name: 'Upgrade VPS', plan: 'Básico → Pro', price: 120.00 },
      ]
    },
    {
      id: 'INV-2024-004',
      date: '01/09/2024',
      dueDate: '10/09/2024',
      amount: 186.00,
      status: 'paid',
      description: 'Mensalidade - Setembro 2024',
      items: [
        { name: 'Servidor Survival', plan: 'Premium 4GB', price: 89.00 },
        { name: 'Bot Moderação', plan: 'Básico 512MB', price: 29.00 },
        { name: 'VPS Produção', plan: 'VPS Básico 4GB', price: 68.00 },
      ]
    },
  ];

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: '1',
      type: 'credit_card',
      brand: 'Visa',
      last4: '4242',
      expiryDate: '12/26',
      isDefault: true,
      holder: 'Ryan Silva'
    },
  ]);

  const paymentHistory = [
    {
      id: 'PMT-001',
      date: '01/10/2024',
      amount: 248.00,
      method: 'Cartão Visa •••• 4242',
      invoice: 'INV-2024-002',
      status: 'completed'
    },
    {
      id: 'PMT-002',
      date: '15/09/2024',
      amount: 120.00,
      method: 'Cartão Visa •••• 4242',
      invoice: 'INV-2024-003',
      status: 'completed'
    },
    {
      id: 'PMT-003',
      date: '01/09/2024',
      amount: 186.00,
      method: 'PIX',
      invoice: 'INV-2024-004',
      status: 'completed'
    },
  ];

  const statusConfig: Record<'pending' | 'paid' | 'overdue', {
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bg: string;
    border: string;
    label: string;
  }> = {
    pending: {
      icon: Clock,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/20',
      label: 'Pendente',
    },
    paid: {
      icon: CheckCircle,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
      label: 'Pago',
    },
    overdue: {
      icon: XCircle,
      color: 'text-red-500',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
      label: 'Vencida',
    },
  };

  const sidebarItems = [
    { id: 'faturas', icon: FileText, label: 'Faturas & Boletos', count: financialSummary.pendingInvoices },
    { id: 'metodos', icon: CreditCard, label: 'Métodos de Pagamento', count: null },
    { id: 'historico', icon: History, label: 'Histórico de Pagamentos', count: null },
    { id: 'configuracoes', icon: Bell, label: 'Configurações', count: null },
  ];

  const handleAddCard = () => {
    setShowAddCardModal(true);
  };

  const handleEditCard = (card: typeof paymentMethods[0]) => {
    setEditingCard(card);
    setShowEditCardModal(true);
  };

  const handleRemoveCard = (cardId: string) => {
    setPaymentMethods(prev => prev.filter(card => card.id !== cardId));
  };

  const handleSetDefault = (cardId: string) => {
    setPaymentMethods(prev => prev.map(card => ({
      ...card,
      isDefault: card.id === cardId
    })));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-green-500/5">
      {/* Header */}
      <div className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="border-border hover:bg-muted">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div className="flex-1">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold text-foreground mb-2"
              >
                Faturamento e Pagamentos
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground"
              >
                Gerencie suas faturas, pagamentos e métodos de pagamento
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-72 flex-shrink-0"
          >
            <div className="bg-gradient-to-b from-card to-card/50 backdrop-blur border border-border rounded-xl lg:rounded-2xl shadow-lg lg:sticky lg:top-8 overflow-hidden">
              {/* Sidebar Header */}
              <div className="bg-gradient-to-r from-green-500/10 to-green-500/5 p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Menu de Faturamento</h3>
                    <p className="text-xs text-muted-foreground">Gerencie pagamentos</p>
                  </div>
                </div>
              </div>

              {/* Sidebar Navigation */}
              <nav className="p-2 lg:p-3 space-y-1.5 lg:space-y-2">
                {sidebarItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as 'faturas' | 'metodos' | 'historico' | 'configuracoes')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center justify-between p-2.5 lg:p-3.5 rounded-lg lg:rounded-xl transition-all group relative ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/30 shadow-md'
                        : 'hover:bg-muted/50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2 lg:gap-3">
                      <div className={`w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-lg lg:rounded-xl transition-all ${
                        activeTab === item.id
                          ? 'bg-green-500/20 shadow-lg'
                          : 'bg-muted/50 group-hover:bg-green-500/10'
                      }`}>
                        <item.icon className={`w-4 h-4 lg:w-5 lg:h-5 transition-all ${
                          activeTab === item.id ? 'text-green-500' : 'text-muted-foreground group-hover:text-green-500'
                        }`} />
                      </div>
                      <div className="text-left">
                        <span className={`font-semibold text-xs lg:text-sm block ${
                          activeTab === item.id ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                        }`}>
                          {item.label}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.count !== null && item.count > 0 && (
                        <span className="w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full text-xs flex items-center justify-center font-bold shadow-lg">
                          {item.count}
                        </span>
                      )}
                      <ChevronRight 
                        className={`w-3 h-3 lg:w-4 lg:h-4 transition-all ${
                          activeTab === item.id ? 'text-green-500 rotate-90' : 'text-muted-foreground group-hover:text-green-500'
                        }`} 
                      />
                    </div>
                    {activeTab === item.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-green-600 rounded-r-full"
                      />
                    )}
                  </motion.button>
                ))}
              </nav>

              {/* Sidebar Footer */}
              <div className="p-4 pt-3 border-t border-border">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-semibold text-foreground">Dica</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Configure pagamento automático para nunca perder uma fatura
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {/* Faturas & Boletos */}
              {activeTab === 'faturas' && (
                <motion.div
                  key="faturas"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-card border border-border rounded-xl p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 lg:mb-6">
                      <h2 className="text-xl lg:text-2xl font-bold text-foreground">Faturas & Boletos</h2>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                          Filtrar
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                          Exportar
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {invoices.map((invoice, index) => {
                        const status = invoice.status as 'pending' | 'paid' | 'overdue';
                        const StatusIcon = statusConfig[status].icon;
                        return (
                          <motion.div
                            key={invoice.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="border border-border rounded-lg overflow-hidden hover:border-green-500/30 transition-all"
                          >
                            <div className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-lg font-semibold text-foreground">{invoice.description}</h3>
                                    <div className={`inline-flex items-center gap-1 ${statusConfig[status].bg} ${statusConfig[status].border} border rounded-full px-3 py-1`}>
                                      <StatusIcon className={`w-4 h-4 ${statusConfig[status].color}`} />
                                      <span className={`text-xs font-semibold ${statusConfig[status].color}`}>
                                        {statusConfig[status].label}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span>#{invoice.id}</span>
                                    <span>Emissão: {invoice.date}</span>
                                    <span>Vencimento: {invoice.dueDate}</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-2xl font-bold text-foreground mb-1">R$ {invoice.amount.toFixed(2)}</p>
                                  <p className="text-xs text-muted-foreground">Total</p>
                                </div>
                              </div>

                              <div className="border-t border-border pt-4 mt-4">
                                <h4 className="text-sm font-semibold text-foreground mb-3">Itens da Fatura</h4>
                                <div className="space-y-2">
                                  {invoice.items.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-sm">
                                      <div>
                                        <span className="text-foreground font-medium">{item.name}</span>
                                        <span className="text-muted-foreground ml-2">({item.plan})</span>
                                      </div>
                                      <span className="text-foreground font-medium">R$ {item.price.toFixed(2)}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="flex flex-col sm:flex-row gap-2 mt-4 pt-4 border-t border-border">
                                <Button variant="outline" size="sm" className="flex-1">
                                  <Eye className="w-4 h-4 mr-2" />
                                  Ver Detalhes
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1">
                                  <Download className="w-4 h-4 mr-2" />
                                  Baixar PDF
                                </Button>
                                {invoice.status === 'pending' && (
                                  <Button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                                    Pagar Agora
                                  </Button>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Métodos de Pagamento */}
              {activeTab === 'metodos' && (
                <motion.div
                  key="metodos"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-card border border-border rounded-xl p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 lg:mb-6">
                      <h2 className="text-xl lg:text-2xl font-bold text-foreground">Métodos de Pagamento</h2>
                      <Button 
                        onClick={handleAddCard}
                        className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Cartão
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      {paymentMethods.map((method, index) => (
                        <motion.div
                          key={method.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="border border-border rounded-xl p-6 relative hover:border-green-500/30 transition-all group"
                        >
                          {method.isDefault && (
                            <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                              Padrão
                            </div>
                          )}
                          
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl flex items-center justify-center">
                              <CreditCard className="w-8 h-8 text-green-500" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-foreground mb-1">
                                {method.brand} •••• {method.last4}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                {method.holder}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Válido até {method.expiryDate}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="w-full"
                              onClick={() => handleEditCard(method)}
                            >
                              <Edit3 className="w-4 h-4 mr-2" />
                              Editar
                            </Button>
                            {!method.isDefault && (
                              <div className="grid grid-cols-2 gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                  onClick={() => handleRemoveCard(method.id)}
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Remover
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleSetDefault(method.id)}
                                >
                                  Padrão
                                </Button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Histórico de Pagamentos */}
              {activeTab === 'historico' && (
                <motion.div
                  key="historico"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-card border border-border rounded-xl p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 lg:mb-6">
                      <h2 className="text-xl lg:text-2xl font-bold text-foreground">Histórico de Pagamentos</h2>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                          Filtrar
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                          Exportar
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {paymentHistory.map((payment, index) => (
                        <motion.div
                          key={payment.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-green-500/30 hover:bg-green-500/5 transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-center">
                              <CheckCircle className="w-6 h-6 text-green-500" />
                            </div>
                            <div>
                              <h3 className="text-sm font-semibold text-foreground">Pagamento #{payment.id}</h3>
                              <p className="text-xs text-muted-foreground mt-1">
                                {payment.date} • {payment.method}
                              </p>
                              <p className="text-xs text-muted-foreground">Fatura: {payment.invoice}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-500">R$ {payment.amount.toFixed(2)}</p>
                            <div className="inline-flex items-center gap-1 bg-green-500/10 border border-green-500/20 rounded-full px-2 py-0.5 mt-1">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              <span className="text-xs font-semibold text-green-500">Completo</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Configurações */}
              {activeTab === 'configuracoes' && (
                <motion.div
                  key="configuracoes"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Configurações de Faturamento</h2>

                    <div className="space-y-6">
                      {/* Notificações por Email */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                          <Bell className="w-5 h-5 text-green-500" />
                          Notificações por Email
                        </h3>
                        <div className="space-y-3">
                          {[
                            { key: 'invoice', label: 'Nova fatura disponível', desc: 'Receba email quando uma nova fatura for gerada' },
                            { key: 'due', label: 'Lembrete de vencimento', desc: 'Receba email antes da data de vencimento' },
                            { key: 'paid', label: 'Pagamento confirmado', desc: 'Receba email quando seus pagamentos forem confirmados' },
                            { key: 'failed', label: 'Falha no pagamento', desc: 'Receba email se houver falha no processamento' },
                          ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                              <div>
                                <p className="font-medium text-foreground">{item.label}</p>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  defaultChecked
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Configurações Adicionais */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                          <Banknote className="w-5 h-5 text-green-500" />
                          Preferências de Pagamento
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Método de Pagamento Padrão
                            </label>
                            <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                              <option>Cartão Visa •••• 4242</option>
                              <option>PIX</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Cobrança Automática
                            </label>
                            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                              <div>
                                <p className="font-medium text-foreground">Pagamento Automático</p>
                                <p className="text-sm text-muted-foreground">Configure pagamentos automáticos das faturas</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border flex justify-end">
                      <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                        Salvar Alterações
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Modal de Adicionar Cartão */}
      <AnimatePresence>
        {showAddCardModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddCardModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-md p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Adicionar Cartão</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddCardModal(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nome no Cartão
                  </label>
                  <Input
                    placeholder="Seu nome completo"
                    className="border-border focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Número do Cartão
                  </label>
                  <div className="relative">
                    <Input
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      className="pl-10 border-border focus:border-green-500"
                    />
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Validade
                    </label>
                    <Input
                      placeholder="MM/AA"
                      maxLength={5}
                      className="border-border focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      CVV
                    </label>
                    <Input
                      placeholder="123"
                      maxLength={4}
                      type="password"
                      className="border-border focus:border-green-500"
                    />
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-start gap-3">
                  <Lock className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Seus dados são criptografados e seguros. Nunca armazenamos seu CVV completo.
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowAddCardModal(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                  >
                    Adicionar Cartão
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Editar Cartão */}
      <AnimatePresence>
        {showEditCardModal && editingCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowEditCardModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-md p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Editar Cartão</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowEditCardModal(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nome no Cartão
                  </label>
                  <Input
                    placeholder="Seu nome completo"
                    defaultValue={editingCard.holder}
                    className="border-border focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Número do Cartão
                  </label>
                  <div className="relative">
                    <Input
                      placeholder="0000 0000 0000 0000"
                      defaultValue={`•••• •••• •••• ${editingCard.last4}`}
                      disabled
                      className="pl-10 border-border bg-muted/30"
                    />
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Validade
                    </label>
                    <Input
                      placeholder="MM/AA"
                      defaultValue={editingCard.expiryDate}
                      className="border-border focus:border-green-500"
                    />
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-start gap-3">
                  <Lock className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Por segurança, não é possível alterar o número do cartão. Se necessário, remova e adicione um novo cartão.
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowEditCardModal(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                  >
                    Salvar Alterações
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

