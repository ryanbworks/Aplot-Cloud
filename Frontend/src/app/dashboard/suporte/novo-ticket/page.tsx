'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '../../../../components/ui/textarea';
import { DashboardPageHeader } from '@/components/dashboard/DashboardPageHeader';
import { 
  Send, 
  CheckCircle,
  Clock,
  Sparkles,
  MessageSquarePlus
} from 'lucide-react';
import Link from 'next/link';

export default function NovoTicketPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [ticketCreated, setTicketCreated] = useState(false);
  
  // Estados do formulário
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: 'medium',
    description: ''
  });

  // Verificar se está logado
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/auth/login?message=Faça login antes para continuar');
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular criação do ticket
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setTicketCreated(true);
    
    // Redirecionar após 3 segundos
    setTimeout(() => {
      router.push('/dashboard');
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Se não estiver logado, não renderizar nada
  if (!isLoggedIn) {
    return null;
  }

  // Se ticket foi criado, mostrar sucesso
  if (ticketCreated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-green-500/5 flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <div className="bg-card border border-green-500/20 rounded-2xl p-6 sm:p-8 shadow-xl text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-14 h-14 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
            >
              <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </motion.div>
            
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">
              Ticket Criado! 🎉
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
              Nossa equipe irá responder em breve
            </p>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-2.5 sm:p-3 mb-4 sm:mb-6">
              <div className="flex items-center justify-center gap-2 text-green-500 text-xs sm:text-sm">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Redirecionando...</span>
              </div>
            </div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 3 }}
              className="h-1 bg-green-500 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-green-500/5">
      <DashboardPageHeader
        title="Novo Ticket"
        description="Descreva seu problema ou dúvida que nossa equipe irá te ajudar"
        icon={MessageSquarePlus}
        backHref="/dashboard/suporte/ticket"
      />

      {/* Formulário Compacto */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-4 sm:p-6 shadow-lg space-y-4 sm:space-y-6">
            {/* Título */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Título do Ticket *
              </label>
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Ex: Problema com servidor"
                className="w-full"
                required
              />
            </div>

            {/* Categoria e Prioridade */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                  Categoria *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full h-10 px-3 text-sm border border-border rounded-lg bg-background text-foreground focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                  required
                >
                  <option value="">Selecione</option>
                  <option value="technical">🔧 Técnico</option>
                  <option value="billing">💳 Faturamento</option>
                  <option value="general">💬 Geral</option>
                  <option value="bug">🐛 Bug</option>
                  <option value="feature">✨ Funcionalidade</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                  Prioridade
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="w-full h-10 px-3 text-sm border border-border rounded-lg bg-background text-foreground focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                >
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                Descrição *
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Descreva seu problema em detalhes..."
                rows={5}
                className="w-full resize-none text-sm"
                required
              />
            </div>

            {/* Dicas */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 sm:p-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">Dicas para um bom ticket:</p>
                  <ul className="text-xs text-muted-foreground space-y-0.5 sm:space-y-1">
                    <li>• Seja específico sobre o problema</li>
                    <li>• Inclua mensagens de erro se houver</li>
                    <li>• Mencione quando começou</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Botão */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 hover:bg-green-500/90 text-white font-semibold py-5 sm:py-6 rounded-lg shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 text-sm sm:text-base"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Criando...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  <span>Criar Ticket</span>
                </div>
              )}
            </Button>
          </form>

          {/* Info Card */}
          <div className="mt-3 sm:mt-4 bg-muted/50 border border-border rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-muted-foreground">Tempo de resposta médio:</span>
              <span className="font-medium text-green-500">12-24h</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
