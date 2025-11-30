'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { DashboardPageHeader } from '@/components/dashboard/DashboardPageHeader';
import { 
  Send, 
  Paperclip, 
  Smile, 
  MoreHorizontal,
  Clock,
  User,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Tag,
  Calendar,
  Star,
  Copy,
  Download,
  Archive,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';

// Tipos para mensagens
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'support';
  senderName: string;
  timestamp: string;
  attachments?: string[];
  isRead?: boolean;
}

// Mock data para o ticket
const mockTicket = {
  id: '1',
  title: 'Servidor Minecraft não está respondendo',
  category: 'technical',
  priority: 'high',
  status: 'in_progress',
  description: 'O servidor está offline desde ontem à noite. Já tentei reiniciar mas não funcionou.',
  createdAt: '2024-12-15T10:30:00Z',
  updatedAt: '2024-12-15T14:20:00Z',
  assignedTo: 'Suporte Técnico',
  responses: 3
};

// Mock data para mensagens
const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Olá! Criei este ticket porque meu servidor Minecraft está offline desde ontem à noite. Já tentei reiniciar mas não funcionou. Pode me ajudar?',
    sender: 'user',
    senderName: 'Ryan',
    timestamp: '2024-12-15T10:30:00Z',
    isRead: true
  },
  {
    id: '2',
    content: 'Olá Ryan! Obrigado por entrar em contato. Vou verificar o status do seu servidor agora mesmo. Pode me informar o ID do servidor?',
    sender: 'support',
    senderName: 'Suporte Técnico',
    timestamp: '2024-12-15T11:15:00Z',
    isRead: true
  },
  {
    id: '3',
    content: 'O ID é #MC-2024-001. O servidor estava funcionando normalmente até ontem à noite.',
    sender: 'user',
    senderName: 'Ryan',
    timestamp: '2024-12-15T11:45:00Z',
    isRead: true
  },
  {
    id: '4',
    content: 'Perfeito! Identifiquei o problema. Há uma falha no sistema de backup que está causando o travamento. Estou reiniciando o servidor agora. Deve estar online em alguns minutos.',
    sender: 'support',
    senderName: 'Suporte Técnico',
    timestamp: '2024-12-15T14:20:00Z',
    isRead: false
  }
];

export default function TicketDetailPage() {
  const { isLoggedIn, user } = useAuth();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  // Verificar se está logado
  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = '/auth/login?message=Faça login antes para continuar';
    }
  }, [isLoggedIn]);

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

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      senderName: user?.name || 'Usuário',
      timestamp: new Date().toISOString(),
      isRead: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setIsTyping(true);

    // Simular resposta do suporte
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Obrigado pela sua mensagem! Nossa equipe irá analisar e responder em breve.',
        sender: 'support',
        senderName: 'Suporte Técnico',
        timestamp: new Date().toISOString(),
        isRead: false
      };
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  const statusInfo = getStatusInfo(mockTicket.status);
  const priorityInfo = getPriorityInfo(mockTicket.priority);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-green-500/5">
      <DashboardPageHeader
        title={mockTicket.title}
        description={`Ticket #${mockTicket.id} • ${statusInfo.label} • ${priorityInfo.label}`}
        icon={MessageSquare}
        backHref="/dashboard/suporte/ticket"
      >
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-green-500/30 hover:bg-green-500/10 hover:border-green-500/50">
            <Star className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Marcar</span>
          </Button>
          <Button variant="outline" className="border-green-500/30 hover:bg-green-500/10 hover:border-green-500/50">
            <Archive className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Arquivar</span>
          </Button>
        </div>
      </DashboardPageHeader>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status e Prioridade Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
              <span className="text-xs text-muted-foreground">Status</span>
            </div>
            <span className={`text-sm font-bold ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Tag className={`w-4 h-4 ${priorityInfo.color}`} />
              <span className="text-xs text-muted-foreground">Prioridade</span>
            </div>
            <span className={`text-sm font-bold ${priorityInfo.color}`}>
              {priorityInfo.label}
            </span>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Criado</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {new Date(mockTicket.createdAt).toLocaleDateString('pt-BR')}
            </span>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Atribuído</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {mockTicket.assignedTo}
            </span>
          </div>
        </div>
        
        {/* Messages and Sidebar */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden">
              {/* Chat Header */}
              <div className="border-b border-border p-4 bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Conversa do Ticket</h3>
                      <p className="text-sm text-muted-foreground">
                        {messages.length} mensagem(s) • Criado em {formatDate(mockTicket.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Atribuído a: {mockTicket.assignedTo}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-green-500 text-white'
                        : 'bg-muted text-foreground'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold">
                          {message.senderName}
                        </span>
                        <span className="text-xs opacity-70">
                          {formatDate(message.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                      {message.sender === 'support' && !message.isRead && (
                        <div className="flex items-center gap-1 mt-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-xs">Nova resposta</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-muted text-foreground px-4 py-3 rounded-2xl">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Suporte Técnico está digitando</span>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Message Input */}
              <div className="border-t border-border p-4">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Digite sua mensagem..."
                      className="resize-none min-h-[60px]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <Smile className="w-4 h-4" />
                    </Button>
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-green-500 hover:bg-green-600 text-white disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ticket Info */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Informações do Ticket</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Categoria</div>
                    <div className="font-medium text-foreground">{getCategoryLabel(mockTicket.category)}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Criado em</div>
                    <div className="font-medium text-foreground">{formatDate(mockTicket.createdAt)}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Atribuído a</div>
                    <div className="font-medium text-foreground">{mockTicket.assignedTo}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-green-500/30 text-green-500 hover:bg-green-500/10">
                  <Star className="w-4 h-4 mr-2" />
                  Favoritar Ticket
                </Button>
                <Button variant="outline" className="w-full justify-start border-green-500/30 text-green-500 hover:bg-green-500/10">
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Link
                </Button>
                <Button variant="outline" className="w-full justify-start border-green-500/30 text-green-500 hover:bg-green-500/10">
                  <Download className="w-4 h-4 mr-2" />
                  Baixar Conversa
                </Button>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Histórico</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Ticket criado</div>
                    <div className="text-xs text-muted-foreground">{formatDate(mockTicket.createdAt)}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-yellow-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Em andamento</div>
                    <div className="text-xs text-muted-foreground">{formatDate(mockTicket.updatedAt)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
