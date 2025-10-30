'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft,
  Shield,
  Lock,
  Key,
  Smartphone,
  Mail,
  Bell,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Plus,
  X,
  ChevronRight,
  RefreshCw,
  Database,
  Trash2,
  Download} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function SegurancaPage() {
  const [activeTab, setActiveTab] = useState<'geral' | 'senha' | 'dispositivos' | 'notificacoes' | 'sessoes' | 'avancado'>('geral');
  
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Mock data
  const securityStats = {
    accountScore: 85,
    lastActivity: 'Há 2 horas',
    loginAttempts: 3,
    devices: 2,
    sessions: 1
  };

  const twoFactorAuth = {
    enabled: true,
    type: 'app',
    backupCodesCount: 8,
    lastUsed: 'Há 5 dias'
  };

  const recoveryEmails = [
    {
      id: '1',
      email: 'ryan.silva@email.com',
      verified: true,
      primary: true,
      addedAt: '15/03/2024'
    },
    {
      id: '2',
      email: 'ryan.backup@gmail.com',
      verified: true,
      primary: false,
      addedAt: '10/05/2024'
    }
  ];

  const devices = [
    {
      id: '1',
      name: 'MacBook Pro 16"',
      type: 'desktop',
      os: 'macOS Sonoma',
      location: 'São Paulo, Brasil',
      lastActive: 'Hoje, 14:30',
      current: true,
      ip: '192.168.1.100'
    },
    {
      id: '2',
      name: 'iPhone 14 Pro',
      type: 'mobile',
      os: 'iOS 17.2',
      location: 'São Paulo, Brasil',
      lastActive: 'Hoje, 10:15',
      current: false,
      ip: '192.168.1.50'
    }
  ];

  const sessions = [
    {
      id: '1',
      device: 'Chrome no MacOS',
      location: 'São Paulo, Brasil',
      ip: '192.168.1.100',
      started: '29/11/2024 14:00',
      lastActive: 'há 5 minutos',
      active: true
    }
  ];

  const loginHistory = [
    {
      date: '29/11/2024 14:30',
      location: 'São Paulo, Brasil',
      device: 'MacBook Pro',
      ip: '192.168.1.100',
      status: 'success'
    },
    {
      date: '28/11/2024 20:15',
      location: 'São Paulo, Brasil',
      device: 'iPhone 14 Pro',
      ip: '192.168.1.50',
      status: 'success'
    },
    {
      date: '27/11/2024 09:45',
      location: 'Rio de Janeiro, Brasil',
      device: 'Chrome Desktop',
      ip: '200.150.100.50',
      status: 'failed',
      reason: 'Senha incorreta'
    }
  ];

  const sidebarItems = [
    { id: 'geral', icon: Shield, label: 'Visão Geral', count: null },
    { id: 'senha', icon: Lock, label: 'Senha', count: null },
    { id: 'dispositivos', icon: Smartphone, label: 'Dispositivos', count: securityStats.devices },
    { id: 'notificacoes', icon: Bell, label: 'Notificações', count: null },
    { id: 'sessoes', icon: Activity, label: 'Sessões Ativas', count: securityStats.sessions },
    { id: 'avancado', icon: Key, label: 'Avançado', count: null },
  ];

  const handleChangePassword = () => {
    setShowChangePasswordModal(true);
  };

  const handleEnable2FA = () => {
    // setShowTwoFactorModal(true); // This state was removed
  };

  const handleAddRecoveryEmail = () => {
    // setShowAddRecoveryEmailModal(true); // This state was removed
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // if (isLoading) { // This state was removed
  //   return <PageLoader isLoading={true} />;
  // }

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
                Segurança e Privacidade
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground"
              >
                Gerencie as configurações de segurança da sua conta
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
                    <Shield className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Central de Segurança</h3>
                    <p className="text-xs text-muted-foreground">Proteção da conta</p>
                  </div>
                </div>
              </div>

              {/* Sidebar Navigation */}
              <nav className="p-2 lg:p-3 space-y-1.5 lg:space-y-2">
                {sidebarItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as typeof activeTab)}
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
                        <span className="w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full text-xs flex items-center justify-center font-bold shadow-lg">
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
                <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-xs font-semibold text-foreground">Status de Segurança</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-green-600" style={{ width: `${securityStats.accountScore}%` }} />
                    </div>
                    <span className="text-xs font-bold text-green-500">{securityStats.accountScore}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Nível de proteção alto</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {/* Visão Geral */}
              {activeTab === 'geral' && (
                <motion.div
                  key="geral"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Security Score Card */}
                  <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 lg:mb-6">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Shield className="w-6 h-6 lg:w-8 lg:h-8 text-green-500" />
                      </div>
                      <div>
                        <h2 className="text-xl lg:text-2xl font-bold text-foreground">Nível de Segurança</h2>
                        <p className="text-sm lg:text-base text-muted-foreground">Sua conta está bem protegida</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">Progresso</span>
                          <span className="text-2xl font-bold text-green-500">{securityStats.accountScore}%</span>
                        </div>
                        <div className="h-4 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500" style={{ width: `${securityStats.accountScore}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Security Actions */}
                  <div className="bg-card border border-border rounded-xl p-4 lg:p-6">
                    <h3 className="text-lg lg:text-xl font-bold text-foreground mb-4">Ações Rápidas</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleChangePassword}
                        className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 border border-border rounded-xl hover:border-green-500/30 hover:bg-green-500/5 transition-all text-left group"
                      >
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 flex-shrink-0">
                          <Lock className="w-5 h-5 lg:w-6 lg:h-6 text-green-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm lg:text-base font-semibold text-foreground">Alterar Senha</h4>
                          <p className="text-xs lg:text-sm text-muted-foreground">Atualize sua senha regularmente</p>
                        </div>
                        <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground group-hover:text-green-500 flex-shrink-0" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleEnable2FA}
                        className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 border border-border rounded-xl hover:border-green-500/30 hover:bg-green-500/5 transition-all text-left group"
                      >
                        <div className={`w-10 h-10 lg:w-12 lg:h-12 border rounded-lg flex items-center justify-center group-hover:border-green-500/30 flex-shrink-0 ${
                          twoFactorAuth.enabled 
                            ? 'bg-green-500/10 border-green-500/20' 
                            : 'bg-yellow-500/10 border-yellow-500/20'
                        }`}>
                          <Smartphone className={`w-5 h-5 lg:w-6 lg:h-6 ${
                            twoFactorAuth.enabled ? 'text-green-500' : 'text-yellow-500'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h4 className="text-sm lg:text-base font-semibold text-foreground">Autenticação em 2 Fatores</h4>
                            {twoFactorAuth.enabled && (
                              <span className="px-2 py-0.5 bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-semibold rounded">
                                Ativo
                              </span>
                            )}
                          </div>
                          <p className="text-xs lg:text-sm text-muted-foreground">
                            {twoFactorAuth.enabled ? 'Proteção adicional habilitada' : 'Proteja sua conta'}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground group-hover:text-green-500 flex-shrink-0" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 border border-border rounded-xl hover:border-green-500/30 hover:bg-green-500/5 transition-all text-left group"
                      >
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 flex-shrink-0">
                          <Mail className="w-5 h-5 lg:w-6 lg:h-6 text-blue-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm lg:text-base font-semibold text-foreground">Emails de Recuperação</h4>
                          <p className="text-xs lg:text-sm text-muted-foreground">{recoveryEmails.length} emails configurados</p>
                        </div>
                        <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground group-hover:text-green-500 flex-shrink-0" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 border border-border rounded-xl hover:border-green-500/30 hover:bg-green-500/5 transition-all text-left group"
                      >
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/20 flex-shrink-0">
                          <Activity className="w-5 h-5 lg:w-6 lg:h-6 text-purple-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm lg:text-base font-semibold text-foreground">Atividade Recente</h4>
                          <p className="text-xs lg:text-sm text-muted-foreground">Último acesso: {securityStats.lastActivity}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground group-hover:text-green-500 flex-shrink-0" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Recent Login History */}
                  <div className="bg-card border border-border rounded-xl p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                      <h3 className="text-lg lg:text-xl font-bold text-foreground">Histórico de Acessos</h3>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        Ver Todos
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {loginHistory.slice(0, 3).map((login, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4 p-4 border border-border rounded-lg hover:border-green-500/30 hover:bg-green-500/5 transition-all"
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            login.status === 'success' 
                              ? 'bg-green-500/10 border border-green-500/20' 
                              : 'bg-red-500/10 border border-red-500/20'
                          }`}>
                            {login.status === 'success' ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-semibold text-foreground">{login.device}</span>
                              {login.status === 'failed' && (
                                <span className="text-xs text-red-500 font-medium">Falhou</span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span>{login.location}</span>
                              <span>•</span>
                              <span>{login.ip}</span>
                              <span>•</span>
                              <span>{login.date}</span>
                            </div>
                            {login.reason && (
                              <p className="text-xs text-red-500 mt-1">{login.reason}</p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Senha */}
              {activeTab === 'senha' && (
                <motion.div
                  key="senha"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-card border border-border rounded-xl p-4 lg:p-6">
                    <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4 lg:mb-6">Gerenciar Senha</h2>

                    {/* Current Password Info */}
                    <div className="mb-4 lg:mb-6 p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-green-500 flex-shrink-0" />
                        <h3 className="text-base lg:text-lg font-semibold text-foreground">Sua senha está segura</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Última alteração: 15 de outubro de 2024
                      </p>
                    </div>

                    {/* Change Password Button */}
                    <Button
                      onClick={handleChangePassword}
                      className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Alterar Senha
                    </Button>
                  </div>

                  {/* Password Requirements */}
                  <div className="bg-card border border-border rounded-xl p-4 lg:p-6">
                    <h3 className="text-lg lg:text-xl font-bold text-foreground mb-4">Requisitos de Senha Segura</h3>
                    <div className="space-y-3">
                      {[
                        'Pelo menos 8 caracteres',
                        'Combinação de letras maiúsculas e minúsculas',
                        'Incluir números',
                        'Incluir caracteres especiais (!@#$%^&*)',
                        'Não usar informações pessoais óbvias'
                      ].map((requirement, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-foreground">{requirement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Dispositivos */}
              {activeTab === 'dispositivos' && (
                <motion.div
                  key="dispositivos"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-card border border-border rounded-xl p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 lg:mb-6">
                      <h2 className="text-xl lg:text-2xl font-bold text-foreground">Dispositivos Autorizados</h2>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        Revogar Todos
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {devices.map((device, index) => (
                        <motion.div
                          key={device.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border border-border rounded-xl p-5 hover:border-green-500/30 transition-all"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start gap-4 flex-1">
                              <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center">
                                {device.type === 'mobile' ? (
                                  <Smartphone className="w-6 h-6 text-green-500" />
                                ) : (
                                  <Database className="w-6 h-6 text-green-500" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                  <h3 className="text-lg font-semibold text-foreground">{device.name}</h3>
                                  {device.current && (
                                    <span className="px-2 py-0.5 bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-semibold rounded">
                                      Este dispositivo
                                    </span>
                                  )}
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">{device.os}</p>
                                  <p className="text-sm text-muted-foreground">{device.location}</p>
                                  <p className="text-sm text-muted-foreground">IP: {device.ip}</p>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">Última atividade: {device.lastActive}</p>
                              </div>
                            </div>
                            {!device.current && (
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-500/10">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Remover
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Notificações */}
              {activeTab === 'notificacoes' && (
                <motion.div
                  key="notificacoes"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-card border border-border rounded-xl p-4 lg:p-6">
                    <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4 lg:mb-6">Notificações de Segurança</h2>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                          <Mail className="w-5 h-5 text-green-500" />
                          Notificações por Email
                        </h3>
                        <div className="space-y-3">
                          {[
                            { key: 'login', label: 'Novos logins', desc: 'Receba um email quando alguém fizer login na sua conta' },
                            { key: 'password', label: 'Alteração de senha', desc: 'Notificação quando sua senha for alterada' },
                            { key: '2fa', label: 'Autenticação em 2 fatores', desc: 'Alertas sobre tentativas de acesso' },
                            { key: 'unusual', label: 'Atividade suspeita', desc: 'Notificação sobre atividades incomuns' },
                          ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                              <div>
                                <p className="font-medium text-foreground">{item.label}</p>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                          <Bell className="w-5 h-5 text-green-500" />
                          Notificações Push
                        </h3>
                        <div className="space-y-3">
                          {[
                            { key: 'push', label: 'Notificações push', desc: 'Receba notificações no seu dispositivo móvel' },
                          ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                              <div>
                                <p className="font-medium text-foreground">{item.label}</p>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border flex justify-end">
                      <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                        Salvar Configurações
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Sessões */}
              {activeTab === 'sessoes' && (
                <motion.div
                  key="sessoes"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-card border border-border rounded-xl p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 lg:mb-6">
                      <h2 className="text-xl lg:text-2xl font-bold text-foreground">Sessões Ativas</h2>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        Encerrar Todas
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {sessions.map((session, index) => (
                        <motion.div
                          key={session.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border border-border rounded-xl p-5 hover:border-green-500/30 transition-all"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                              <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center">
                                <Activity className="w-6 h-6 text-green-500" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                  <h3 className="text-lg font-semibold text-foreground">{session.device}</h3>
                                  {session.active && (
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                  )}
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">{session.location}</p>
                                  <p className="text-sm text-muted-foreground">IP: {session.ip}</p>
                                  <p className="text-sm text-muted-foreground">Iniciada em: {session.started}</p>
                                </div>
                                <p className="text-xs text-green-500 font-medium mt-2">Última atividade: {session.lastActive}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-500/10">
                              Encerrar Sessão
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Avançado */}
              {activeTab === 'avancado' && (
                <motion.div
                  key="avancado"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Two Factor Authentication */}
                  <div className="bg-card border border-border rounded-xl p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 lg:mb-6">
                      <div>
                        <h2 className="text-xl lg:text-2xl font-bold text-foreground">Autenticação em 2 Fatores</h2>
                        <p className="text-sm lg:text-base text-muted-foreground">Adicione uma camada extra de segurança</p>
                      </div>
                      {twoFactorAuth.enabled && (
                        <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-semibold rounded">
                          Ativo
                        </span>
                      )}
                    </div>

                    {twoFactorAuth.enabled ? (
                      <div className="space-y-4">
                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <div className="flex items-center gap-3 mb-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <h3 className="font-semibold text-foreground">2FA Habilitado</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Tipo: Aplicativo Autenticador</p>
                          <p className="text-sm text-muted-foreground">Último uso: {twoFactorAuth.lastUsed}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Gerar Novos Códigos
                          </Button>
                          <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-500/10">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Desabilitar 2FA
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={handleEnable2FA}
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                      >
                        <Smartphone className="w-4 h-4 mr-2" />
                        Habilitar 2FA
                      </Button>
                    )}
                  </div>

                  {/* Recovery Emails */}
                  <div className="bg-card border border-border rounded-xl p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 lg:mb-6">
                      <div>
                        <h2 className="text-xl lg:text-2xl font-bold text-foreground">Emails de Recuperação</h2>
                        <p className="text-sm lg:text-base text-muted-foreground">Emails alternativos para recuperação de conta</p>
                      </div>
                      <Button variant="outline" onClick={handleAddRecoveryEmail} className="w-full sm:w-auto">
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Email
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {recoveryEmails.map((email) => (
                        <div key={email.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium text-foreground">{email.email}</p>
                              <div className="flex items-center gap-2 mt-1">
                                {email.verified && (
                                  <span className="px-2 py-0.5 bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-semibold rounded">
                                    Verificado
                                  </span>
                                )}
                                {email.primary && (
                                  <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-semibold rounded">
                                    Principal
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          {!email.primary && (
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-500/10">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="bg-card border border-red-500/20 rounded-xl p-4 lg:p-6">
                    <div className="flex items-center gap-3 mb-4 lg:mb-6">
                      <AlertTriangle className="w-5 h-5 lg:w-6 lg:h-6 text-red-500 flex-shrink-0" />
                      <h2 className="text-xl lg:text-2xl font-bold text-foreground">Zona de Perigo</h2>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <h3 className="font-semibold text-foreground mb-2">Excluir Conta Permanentemente</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Uma vez excluída, sua conta não poderá ser recuperada. Todos os dados serão permanentemente removidos.
                        </p>
                        <Button
                          variant="outline"
                          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                          // onClick={() => setShowDeleteAccountModal(true)} // This state was removed
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Excluir Minha Conta
                        </Button>
                      </div>

                      <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <h3 className="font-semibold text-foreground mb-2">Exportar Dados</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Baixe todos os seus dados em formato JSON.
                        </p>
                        <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white">
                          <Download className="w-4 h-4 mr-2" />
                          Exportar Dados
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Modal de Alterar Senha */}
      <AnimatePresence>
        {showChangePasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowChangePasswordModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-md p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Alterar Senha</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowChangePasswordModal(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Senha Atual
                  </label>
                  <div className="relative">
                    <Input
                      type={showPasswords.current ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Digite sua senha atual"
                      className="pr-10 border-border focus:border-green-500"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('current')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nova Senha
                  </label>
                  <div className="relative">
                    <Input
                      type={showPasswords.new ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Digite sua nova senha"
                      className="pr-10 border-border focus:border-green-500"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Confirmar Nova Senha
                  </label>
                  <div className="relative">
                    <Input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirme sua nova senha"
                      className="pr-10 border-border focus:border-green-500"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirm')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowChangePasswordModal(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                  >
                    Alterar Senha
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

