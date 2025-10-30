'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Globe,
  Clock,
  Calendar,
  DollarSign,
  Bell,
  Save,
  ArrowLeft,
  Settings,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function ContaPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'perfil' | 'preferencias' | 'notificacoes'>('perfil');

  // Dados do usuário (em produção virá da API)
  const [userData, setUserData] = useState({
    name: 'Ryan Silva',
    email: 'ryan@aplotcloud.com',
    phone: '+55 11 99999-9999',
    company: 'Gaming Studio',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    dateFormat: 'DD/MM/YYYY',
    currency: 'BRL'
  });

  const [notifications, setNotifications] = useState({
    email: {
      serverDown: false,
      maintenance: true,
      billing: true,
      security: true
    }
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simular salvamento
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    // Em produção, aqui seria feita a chamada para a API
  };

  const handleInputChange = (field: string, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateNotification = (path: string, value: boolean) => {
    setNotifications((prev) => {
      const keys = path.split('.');
      // Estrutura imutável (somente para email neste caso):
      if (keys[0] === 'email' && keys.length === 2) {
        return {
          ...prev,
          email: {
            ...prev.email,
            [keys[1]]: value
          }
        };
      }
      return prev;
    });
  };

  const sidebarItems = [
    { id: 'perfil', icon: User, label: 'Perfil' },
    { id: 'preferencias', icon: Settings, label: 'Preferências' },
    { id: 'notificacoes', icon: Bell, label: 'Notificações' },
  ];

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
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold text-foreground mb-2"
              >
                Conta e Perfil
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground"
              >
                Gerencie suas informações pessoais e preferências
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
                    <User className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Menu de Conta</h3>
                    <p className="text-xs text-muted-foreground">Perfil e configurações</p>
                  </div>
                </div>
              </div>

              {/* Sidebar Navigation */}
              <nav className="p-2 lg:p-3 space-y-1.5 lg:space-y-2">
                {sidebarItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as 'perfil' | 'preferencias' | 'notificacoes')}
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
                    <ChevronRight 
                      className={`w-3 h-3 lg:w-4 lg:h-4 transition-all ${
                        activeTab === item.id ? 'text-green-500 rotate-90' : 'text-muted-foreground group-hover:text-green-500'
                      }`} 
                    />
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
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-semibold text-foreground">Dica</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Mantenha suas informações atualizadas para melhor experiência
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {/* Perfil Tab */}
              {activeTab === 'perfil' && (
                <motion.div
                  key="perfil"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Avatar Section */}
                  <div className="bg-card border border-border rounded-xl p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl lg:text-2xl flex-shrink-0">
                        {userData.name.charAt(0)}
                      </div>
                      <div className="flex-1 w-full sm:w-auto">
                        <h3 className="text-base lg:text-lg font-semibold text-foreground mb-1">Foto do Perfil</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Avatar gerado automaticamente com suas iniciais
                        </p>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto border-green-500/30 hover:bg-green-500/10">
                          Alterar Avatar
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Informações Pessoais */}
                  <div className="bg-card border border-border rounded-xl p-4 lg:p-6">
            <h3 className="text-base lg:text-lg font-semibold text-foreground mb-4 lg:mb-6 flex items-center gap-2">
              <User className="w-4 h-4 lg:w-5 lg:h-5 text-green-500" />
              Informações Pessoais
            </h3>
            
            <div className="grid gap-4 lg:gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nome Completo
                </label>
                <Input
                  value={userData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Seu nome completo"
                  className="border-border focus:border-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={userData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="seu@email.com"
                    className="pl-10 border-border focus:border-green-500"
                    type="email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Telefone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={userData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+55 11 99999-9999"
                    className="pl-10 border-border focus:border-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Empresa/Organização
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={userData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="Nome da sua empresa"
                    className="pl-10 border-border focus:border-green-500"
                  />
                </div>
              </div>
            </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end pt-4 lg:pt-6">
                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 lg:px-8 py-2.5 lg:py-3"
                    >
                      {isSaving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Salvar Alterações
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Preferências Tab */}
              {activeTab === 'preferencias' && (
                <motion.div
                  key="preferencias"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-card border border-border rounded-xl p-4 lg:p-6">
            <h3 className="text-base lg:text-lg font-semibold text-foreground mb-4 lg:mb-6 flex items-center gap-2">
              <Settings className="w-4 h-4 lg:w-5 lg:h-5 text-green-500" />
              Preferências
            </h3>
            
            <div className="grid gap-4 lg:gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Idioma
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <select
                    value={userData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground focus:border-green-500 appearance-none"
                  >
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Español</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Fuso Horário
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <select
                    value={userData.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground focus:border-green-500 appearance-none"
                  >
                    <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                    <option value="America/New_York">New York (GMT-5)</option>
                    <option value="Europe/London">London (GMT+0)</option>
                    <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Formato de Data
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <select
                    value={userData.dateFormat}
                    onChange={(e) => handleInputChange('dateFormat', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground focus:border-green-500 appearance-none"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Moeda
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <select
                    value={userData.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground focus:border-green-500 appearance-none"
                  >
                    <option value="BRL">Real (R$)</option>
                    <option value="USD">Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                  </select>
                </div>
              </div>
            </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end pt-4 lg:pt-6">
                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 lg:px-8 py-2.5 lg:py-3"
                    >
                      {isSaving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Salvar Alterações
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Notificações Tab */}
              {activeTab === 'notificacoes' && (
                <motion.div
                  key="notificacoes"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-card border border-border rounded-xl p-4 lg:p-6">
            <h3 className="text-base lg:text-lg font-semibold text-foreground mb-4 lg:mb-6 flex items-center gap-2">
              <Bell className="w-4 h-4 lg:w-5 lg:h-5 text-green-500" />
              Notificações
            </h3>
            
            {/* Email Notifications */}
            <div className="mb-6">
              <h4 className="text-sm lg:text-md font-medium text-foreground mb-4 flex items-center gap-2">
                <Mail className="w-3 h-3 lg:w-4 lg:h-4 text-green-500" />
                Notificações por Email
              </h4>
              <div className="space-y-3">
                {[
                  { key: 'serverDown', label: 'Servidores Offline', desc: 'Receber email quando seus servidores ficarem offline' },
                  { key: 'maintenance', label: 'Alertas de Manutenção', desc: 'Notificações sobre manutenção programada' },
                  { key: 'billing', label: 'Lembretes de Faturamento', desc: 'Notificações sobre faturas pendentes' },
                  { key: 'security', label: 'Alertas de Segurança', desc: 'Notificações importantes sobre segurança' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.email[item.key as keyof typeof notifications.email] as boolean}
                        onChange={(e) => updateNotification(`email.${item.key}`, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end pt-4 lg:pt-6">
                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 lg:px-8 py-2.5 lg:py-3"
                    >
                      {isSaving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Salvar Alterações
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
