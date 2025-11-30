'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DashboardPageHeader } from '@/components/dashboard/DashboardPageHeader';
import { 
  Search, 
  Plus, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  MoreHorizontal,
  Calendar,
  User,
  Tag,
  ArrowRight,
  RefreshCw,
  Eye,
  ChevronDown,
  Edit,
  Star,
  Copy,
  Download,
  Archive,
  Trash2
} from 'lucide-react';
import Link from 'next/link';

// Tipos para os tickets
interface Ticket {
  id: string;
  title: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'responded' | 'closed';
  description: string;
  createdAt: string;
  updatedAt: string;
  lastResponse?: string;
  responses: number;
  assignedTo?: string;
}

// Mock data - em produção virá da API
const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Servidor Minecraft não está respondendo',
    category: 'technical',
    priority: 'high',
    status: 'in_progress',
    description: 'O servidor está offline desde ontem à noite. Já tentei reiniciar mas não funcionou.',
    createdAt: '2024-12-15T10:30:00Z',
    updatedAt: '2024-12-15T14:20:00Z',
    lastResponse: '2024-12-15T14:20:00Z',
    responses: 3,
    assignedTo: 'Suporte Técnico'
  },
  {
    id: '2',
    title: 'Problema com faturamento',
    category: 'billing',
    priority: 'medium',
    status: 'responded',
    description: 'Minha fatura veio com valor incorreto. Gostaria de uma revisão.',
    createdAt: '2024-12-14T09:15:00Z',
    updatedAt: '2024-12-15T11:45:00Z',
    lastResponse: '2024-12-15T11:45:00Z',
    responses: 2
  },
  {
    id: '3',
    title: 'Solicitação de novo recurso',
    category: 'feature',
    priority: 'low',
    status: 'open',
    description: 'Gostaria de solicitar a implementação de um sistema de backup automático.',
    createdAt: '2024-12-13T16:20:00Z',
    updatedAt: '2024-12-13T16:20:00Z',
    responses: 0
  },
  {
    id: '4',
    title: 'Bug no painel de controle',
    category: 'bug',
    priority: 'urgent',
    status: 'closed',
    description: 'Não consigo acessar as configurações do servidor pelo painel.',
    createdAt: '2024-12-12T08:45:00Z',
    updatedAt: '2024-12-14T17:30:00Z',
    lastResponse: '2024-12-14T17:30:00Z',
    responses: 4
  },
  {
    id: '5',
    title: 'Dúvida sobre planos',
    category: 'general',
    priority: 'low',
    status: 'responded',
    description: 'Qual a diferença entre o plano básico e premium?',
    createdAt: '2024-12-11T13:10:00Z',
    updatedAt: '2024-12-12T09:30:00Z',
    lastResponse: '2024-12-12T09:30:00Z',
    responses: 1
  }
];

export default function TicketManagerPage() {
  const { isLoggedIn } = useAuth();
  const [tickets] = useState<Ticket[]>(mockTickets);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>(mockTickets);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Verificar se está logado
  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = '/auth/login?message=Faça login antes para continuar';
    }
  }, [isLoggedIn]);

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = () => {
      if (openDropdown) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openDropdown]);

  // Filtrar tickets
  useEffect(() => {
    let filtered = tickets;

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(ticket => 
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }

    // Filtro por prioridade
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.priority === priorityFilter);
    }

    // Filtro por categoria
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.category === categoryFilter);
    }

    setFilteredTickets(filtered);
  }, [tickets, searchTerm, statusFilter, priorityFilter, categoryFilter]);

  const getStatusInfo = (status: string) => {
    const statusMap = {
      open: { label: 'Aberto', color: 'text-blue-500', bg: 'bg-blue-500/10', icon: AlertCircle },
      in_progress: { label: 'Em Andamento', color: 'text-yellow-500', bg: 'bg-yellow-500/10', icon: Clock },
      responded: { label: 'Respondido', color: 'text-green-500', bg: 'bg-green-500/10', icon: MessageSquare },
      closed: { label: 'Finalizado', color: 'text-gray-500', bg: 'bg-gray-500/10', icon: CheckCircle }
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.open;
  };

  const getPriorityInfo = (priority: string) => {
    const priorityMap = {
      low: { label: 'Baixa', color: 'text-green-500', bg: 'bg-green-500/10' },
      medium: { label: 'Média', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
      high: { label: 'Alta', color: 'text-orange-500', bg: 'bg-orange-500/10' },
      urgent: { label: 'Urgente', color: 'text-red-500', bg: 'bg-red-500/10' }
    };
    return priorityMap[priority as keyof typeof priorityMap] || priorityMap.medium;
  };

  const getCategoryLabel = (category: string) => {
    const categoryMap = {
      technical: 'Suporte Técnico',
      billing: 'Faturamento',
      general: 'Geral',
      bug: 'Bug/Problema',
      feature: 'Funcionalidade'
    };
    return categoryMap[category as keyof typeof categoryMap] || category;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStats = () => {
    return {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'open').length,
      inProgress: tickets.filter(t => t.status === 'in_progress').length,
      responded: tickets.filter(t => t.status === 'responded').length,
      closed: tickets.filter(t => t.status === 'closed').length
    };
  };

  const stats = getStats();

  // Funções para ações do dropdown
  const handleTicketAction = (ticketId: string, action: string) => {
    console.log(`Ação ${action} no ticket ${ticketId}`);
    setOpenDropdown(null);
    
    // Aqui você pode implementar as ações específicas
    switch (action) {
      case 'edit':
        // Implementar edição do ticket
        break;
      case 'archive':
        // Implementar arquivamento
        break;
      case 'star':
        // Implementar favoritar
        break;
      case 'copy':
        // Implementar cópia do link
        navigator.clipboard.writeText(`${window.location.origin}/dashboard/suporte/ticket/${ticketId}`);
        break;
      case 'download':
        // Implementar download do ticket
        break;
      case 'delete':
        // Implementar exclusão
        break;
      case 'view':
        // Implementar visualização detalhada
        break;
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-green-500/5">
      <DashboardPageHeader
        title="Meus Tickets"
        description="Gerencie todos os seus tickets de suporte"
        icon={MessageSquare}
      >
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <RefreshCw className="w-4 h-4" />
        </Button>
        <Link href="/dashboard/suporte/novo-ticket">
          <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/20">
            <Plus className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Novo Ticket</span>
          </Button>
        </Link>
      </DashboardPageHeader>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 sm:gap-4 mb-4 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-lg sm:rounded-xl p-3 sm:p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-foreground">{stats.total}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Total</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-500">{stats.open}</div>
                <div className="text-sm text-muted-foreground">Abertos</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-500">{stats.inProgress}</div>
                <div className="text-sm text-muted-foreground">Em Andamento</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`bg-card border rounded-xl p-6 hover:shadow-lg transition-all duration-300 ${
              stats.responded > 0 
                ? 'border-green-500/40 bg-green-500/5 shadow-lg shadow-green-500/10' 
                : 'border-border'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                stats.responded > 0 ? 'bg-green-500/20' : 'bg-green-500/10'
              }`}>
                <MessageSquare className={`w-5 h-5 ${
                  stats.responded > 0 ? 'text-green-500' : 'text-green-500'
                }`} />
              </div>
              <div>
                <div className={`text-2xl font-bold ${
                  stats.responded > 0 ? 'text-green-500' : 'text-green-500'
                }`}>
                  {stats.responded}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stats.responded > 0 ? 'Respondidos!' : 'Respondidos'}
                </div>
              </div>
            </div>
            {stats.responded > 0 && (
              <div className="text-xs text-green-600 font-medium animate-pulse">
                🎉 Você tem {stats.responded} resposta(s) nova(s)!
              </div>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gray-500/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-500">{stats.closed}</div>
                <div className="text-sm text-muted-foreground">Finalizados</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-border rounded-lg sm:rounded-xl p-3 sm:p-6 mb-4 sm:mb-8"
        >
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Search */}
            <div className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 text-xs sm:text-sm border border-border rounded-lg bg-background text-foreground focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              >
                <option value="all">Todos os Status</option>
                <option value="open">Aberto</option>
                <option value="in_progress">Em Andamento</option>
                <option value="responded">Respondido</option>
                <option value="closed">Finalizado</option>
              </select>

              {/* Priority Filter */}
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 text-xs sm:text-sm border border-border rounded-lg bg-background text-foreground focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              >
                <option value="all">Prioridades</option>
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
                <option value="urgent">Urgente</option>
              </select>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 text-xs sm:text-sm border border-border rounded-lg bg-background text-foreground focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              >
                <option value="all">Categorias</option>
                <option value="technical">Técnico</option>
                <option value="billing">Faturamento</option>
                <option value="general">Geral</option>
                <option value="bug">Bug</option>
                <option value="feature">Funcionalidade</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Tickets List */}
        <div className="space-y-6">
          {filteredTickets.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Nenhum ticket encontrado
              </h3>
              <p className="text-muted-foreground mb-6">
                Tente ajustar os filtros ou criar um novo ticket.
              </p>
              <Link href="/dashboard/suporte/novo-ticket">
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Primeiro Ticket
                </Button>
              </Link>
            </motion.div>
          ) : (
            filteredTickets.map((ticket, index) => {
              const statusInfo = getStatusInfo(ticket.status);
              const priorityInfo = getPriorityInfo(ticket.priority);
              const StatusIcon = statusInfo.icon;
              const isClosed = ticket.status === 'closed';
              const hasNewResponse = ticket.responses > 0 && ticket.status !== 'closed';
              const hasBeenResponded = ticket.responses > 0; // Qualquer ticket com respostas

              return (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-card border border-border rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all duration-300 ${
                    isClosed
                      ? 'border-gray-500/30 bg-gray-500/5'
                      : 'hover:border-green-500/30 hover:shadow-lg'
                  }`}
                >
                  {/* Indicador de Nova Resposta */}
                  {hasNewResponse && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <MessageSquare className="w-3 h-3 text-white" />
                    </div>
                  )}

                  {/* Badge de Status Respondido - Mais sutil */}
                  {hasBeenResponded && (
                    <div className="absolute -top-2 -left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-md">
                      ✓
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="flex-1 w-full sm:w-auto">
                      {/* Header com Título e Badges */}
                      <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className="flex-1">
                          <h3 className="text-base sm:text-lg font-semibold mb-2 text-foreground">
                            {ticket.title}
                          </h3>
                          
                          {/* Status e Prioridade com design melhorado */}
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            {/* Status Badge - Maior e mais visível */}
                            <div className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2 shadow-md ${
                              statusInfo.bg
                            } ${statusInfo.color} border-2 ${
                              statusInfo.color === 'text-blue-500' ? 'border-blue-500/30' :
                              statusInfo.color === 'text-yellow-500' ? 'border-yellow-500/30' :
                              statusInfo.color === 'text-green-500' ? 'border-green-500/30' :
                              'border-gray-500/30'
                            }`}>
                              <StatusIcon className="w-4 h-4" />
                              {statusInfo.label}
                            </div>
                            
                            {/* Prioridade Badge */}
                            <div className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold ${
                              priorityInfo.bg
                            } ${priorityInfo.color} border ${
                              priorityInfo.color === 'text-green-500' ? 'border-green-500/30' :
                              priorityInfo.color === 'text-yellow-500' ? 'border-yellow-500/30' :
                              priorityInfo.color === 'text-orange-500' ? 'border-orange-500/30' :
                              priorityInfo.color === 'text-red-500' ? 'border-red-500/30' :
                              'border-gray-500/30'
                            }`}>
                              {priorityInfo.label}
                            </div>

                            {/* Indicador sutil para tickets respondidos */}
                            {hasBeenResponded && (
                              <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                                Respondido
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Descrição */}
                      <p className="mb-3 sm:mb-4 line-clamp-2 text-sm sm:text-base text-muted-foreground">
                        {ticket.description}
                      </p>

                      {/* Informações do Ticket */}
                      <div className="bg-muted/30 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                              <Tag className="w-4 h-4 text-blue-500" />
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground">Categoria</div>
                              <div className="font-medium text-foreground">{getCategoryLabel(ticket.category)}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                              <Calendar className="w-4 h-4 text-purple-500" />
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground">Criado em</div>
                              <div className="font-medium text-foreground">{formatDate(ticket.createdAt)}</div>
                            </div>
                          </div>
                          
                          <div className={`flex items-center gap-2 ${
                            hasNewResponse ? 'text-green-600' : 'text-muted-foreground'
                          }`}>
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              hasNewResponse ? 'bg-green-500/20' : 'bg-muted'
                            }`}>
                              <MessageSquare className={`w-4 h-4 ${
                                hasNewResponse ? 'text-green-500' : 'text-muted-foreground'
                              }`} />
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground">Respostas</div>
                              <div className={`font-medium ${
                                hasNewResponse ? 'text-green-600' : 'text-foreground'
                              }`}>
                                {ticket.responses} resposta(s)
                                {hasNewResponse && <span className="text-green-500 ml-1">●</span>}
                              </div>
                            </div>
                          </div>
                          
                          {ticket.assignedTo && (
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
                                <User className="w-4 h-4 text-orange-500" />
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">Atribuído a</div>
                                <div className="font-medium text-foreground">{ticket.assignedTo}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Última resposta se houver - Mais sutil */}
                      {ticket.lastResponse && (
                        <div className="mt-3 p-3 bg-green-500/5 border border-green-500/10 rounded-lg">
                          <div className="flex items-center gap-2 text-sm text-green-500 font-medium">
                            <MessageSquare className="w-4 h-4" />
                            Última resposta em {formatDate(ticket.lastResponse)}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Ações */}
                    <div className="flex flex-col sm:flex-col gap-2 sm:gap-3 w-full sm:w-auto sm:ml-6">
                      <Link href={`/dashboard/suporte/ticket/${ticket.id}`} className="w-full sm:w-auto">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={`w-full sm:w-auto text-xs sm:text-sm font-semibold transition-all duration-300 ${
                            hasBeenResponded 
                              ? 'border border-green-500 text-green-500 hover:bg-green-500 hover:text-white shadow-lg hover:shadow-xl' 
                              : 'border border-green-500/30 text-green-500 hover:bg-green-500/10 hover:border-green-500/50'
                          }`}
                        >
                          <span className="sm:hidden">{hasBeenResponded ? 'Ver' : 'Detalhes'}</span>
                          <span className="hidden sm:inline">{hasBeenResponded ? 'Ver Resposta' : 'Ver Detalhes'}</span>
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                        </Button>
                      </Link>
                      
                      <div className="relative">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-muted-foreground hover:text-foreground"
                          onClick={() => setOpenDropdown(openDropdown === ticket.id ? null : ticket.id)}
                        >
                          <MoreHorizontal className="w-4 h-4 mr-2" />
                          Mais opções
                          <ChevronDown className="w-3 h-3 ml-1" />
                        </Button>
                        
                        {/* Dropdown Menu */}
                        {openDropdown === ticket.id && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-xl z-50"
                          >
                            <div className="py-2">
                              {/* Ver detalhes */}
                              <Link href={`/dashboard/suporte/ticket/${ticket.id}`}>
                                <button
                                  onClick={() => setOpenDropdown(null)}
                                  className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted flex items-center gap-2"
                                >
                                  <Eye className="w-4 h-4" />
                                  Ver detalhes
                                </button>
                              </Link>
                              
                              {/* Editar */}
                              {!isClosed && (
                                <button
                                  onClick={() => handleTicketAction(ticket.id, 'edit')}
                                  className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted flex items-center gap-2"
                                >
                                  <Edit className="w-4 h-4" />
                                  Editar ticket
                                </button>
                              )}
                              
                              {/* Favoritar */}
                              <button
                                onClick={() => handleTicketAction(ticket.id, 'star')}
                                className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted flex items-center gap-2"
                              >
                                <Star className="w-4 h-4" />
                                Favoritar
                              </button>
                              
                              {/* Copiar link */}
                              <button
                                onClick={() => handleTicketAction(ticket.id, 'copy')}
                                className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted flex items-center gap-2"
                              >
                                <Copy className="w-4 h-4" />
                                Copiar link
                              </button>
                              
                              {/* Download */}
                              <button
                                onClick={() => handleTicketAction(ticket.id, 'download')}
                                className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted flex items-center gap-2"
                              >
                                <Download className="w-4 h-4" />
                                Baixar ticket
                              </button>
                              
                              {/* Separador */}
                              <div className="border-t border-border my-1" />
                              
                              {/* Arquivar */}
                              {!isClosed && (
                                <button
                                  onClick={() => handleTicketAction(ticket.id, 'archive')}
                                  className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted flex items-center gap-2"
                                >
                                  <Archive className="w-4 h-4" />
                                  Arquivar
                                </button>
                              )}
                              
                              {/* Excluir */}
                              {isClosed && (
                                <button
                                  onClick={() => handleTicketAction(ticket.id, 'delete')}
                                  className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-500/10 flex items-center gap-2"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Excluir
                                </button>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
