'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  Key,
  Smartphone,
  Mail,
  Activity,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  X,
  RefreshCw,
  Trash2,
  Globe,
  Monitor,
  Clock,
  MapPin,
  QrCode,
  FileKey,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardPageHeader } from '@/components/dashboard/DashboardPageHeader';

export default function SegurancaPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [show2FAModal, setShow2FAModal] = useState(false);

  const securityScore = 85;
  const lastPasswordChange = '15/03/2024';
  
  const devices = [
    {
      id: '1',
      name: 'MacBook Pro 16"',
      type: 'desktop',
      os: 'macOS Sonoma',
      browser: 'Chrome',
      location: 'São Paulo, SP',
      lastActive: 'Agora',
      current: true,
      ip: '192.168.1.100',
    },
    {
      id: '2',
      name: 'iPhone 14 Pro',
      type: 'mobile',
      os: 'iOS 17.2',
      browser: 'Safari',
      location: 'São Paulo, SP',
      lastActive: 'Há 2 horas',
      current: false,
      ip: '192.168.1.50',
    },
  ];

  const loginHistory = [
    {
      id: '1',
      date: '12/11/2025 14:30',
      location: 'São Paulo, SP',
      device: 'MacBook Pro - Chrome',
      ip: '192.168.1.100',
      status: 'success',
    },
    {
      id: '2',
      date: '12/11/2025 10:15',
      location: 'São Paulo, SP',
      device: 'iPhone 14 Pro - Safari',
      ip: '192.168.1.50',
      status: 'success',
    },
    {
      id: '3',
      date: '11/11/2025 22:45',
      location: 'Rio de Janeiro, RJ',
      device: 'Windows - Firefox',
      ip: '200.150.100.50',
      status: 'failed',
    },
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-green-500/5">
      <DashboardPageHeader
        title="Segurança"
        description="Proteja sua conta e gerencie suas configurações de segurança"
        icon={Shield}
      />
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6"
      >
        <motion.div variants={itemVariants}>
          <div className="bg-card rounded-2xl border border-green-500/30 p-6 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-border"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - securityScore / 100)}`}
                    className="text-green-500 transition-all duration-1000"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-foreground">{securityScore}</p>
                    <p className="text-xs text-muted-foreground">Score</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Segurança Forte
                </h3>
                <p className="text-muted-foreground mb-4">
                  Sua conta está bem protegida, mas você pode melhorar ainda mais!
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-500 border border-green-500/30">
                    <CheckCircle className="w-3.5 h-3.5" />
                    2FA Ativado
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-500 border border-green-500/30">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Email Verificado
                  </span>
                </div>
              </div>
              <Button className="bg-green-500 hover:bg-green-500/90 text-white">
                <Shield className="w-4 h-4 mr-2" />
                Melhorar Segurança
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Seção: Autenticação */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Lock className="w-6 h-6 text-green-500" />
            Autenticação
          </h2>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="bg-card rounded-2xl border border-border p-6 hover:border-green-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Lock className="w-5 h-5 text-green-500" />
                  Alterar Senha
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Última alteração: {lastPasswordChange}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Senha Atual
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    placeholder="Digite sua senha atual"
                    className="w-full px-4 py-3 pr-12 bg-background rounded-lg border border-border focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                  />
                  <button
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-green-500 transition-colors"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Nova Senha
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Digite sua nova senha"
                    className="w-full px-4 py-3 pr-12 bg-background rounded-lg border border-border focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                  />
                  <button
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-green-500 transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirme sua nova senha"
                    className="w-full px-4 py-3 pr-12 bg-background rounded-lg border border-border focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                  />
                  <button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-green-500 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button className="bg-green-500 hover:bg-green-500/90 text-white">
                <Lock className="w-4 h-4 mr-2" />
                Alterar Senha
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="bg-card rounded-2xl border border-border p-6 hover:border-green-500/30 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Key className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    Autenticação de Dois Fatores (2FA)
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Adicione uma camada extra de segurança à sua conta
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={twoFactorEnabled}
                  onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                />
                <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
            {twoFactorEnabled && (
              <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">2FA Ativado</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Você está usando autenticação via aplicativo (Google Authenticator)
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-green-500/20 hover:bg-green-500/10 hover:border-green-500/30"
                        onClick={() => setShow2FAModal(true)}
                      >
                        <QrCode className="w-4 h-4 mr-2" />
                        Ver QR Code
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-green-500/20 hover:bg-green-500/10 hover:border-green-500/30"
                      >
                        <FileKey className="w-4 h-4 mr-2" />
                        Códigos de Backup (8)
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!twoFactorEnabled && (
              <div className="mt-6 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">2FA Desativado</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Sua conta está menos segura sem autenticação de dois fatores
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Seção: Dispositivos e Sessões */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-green-500" />
            Dispositivos e Sessões
          </h2>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-green-500" />
                Dispositivos Conectados
              </h3>
            </div>
            <div className="divide-y divide-border">
              {devices.map((device) => (
                <div key={device.id} className="p-6 hover:bg-green-500/5 transition-all duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${device.current ? 'bg-green-500/20' : 'bg-muted'}`}>
                        {device.type === 'desktop' ? (
                          <Monitor className={`w-6 h-6 ${device.current ? 'text-green-500' : 'text-muted-foreground'}`} />
                        ) : (
                          <Smartphone className={`w-6 h-6 ${device.current ? 'text-green-500' : 'text-muted-foreground'}`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-foreground">{device.name}</p>
                          {device.current && (
                            <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded-full">
                              Este dispositivo
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {device.os} • {device.browser}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {device.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {device.lastActive}
                          </span>
                          <span className="flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            {device.ip}
                          </span>
                        </div>
                      </div>
                    </div>
                    {!device.current && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-500/30 text-red-500 hover:bg-red-500/10 hover:border-red-500"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remover
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-500" />
                Histórico de Login
              </h3>
            </div>
            <div className="divide-y divide-border">
              {loginHistory.map((login) => (
                <div key={login.id} className="p-6 hover:bg-muted/50 transition-all duration-300">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`p-2 rounded-lg ${login.status === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                        {login.status === 'success' ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{login.device}</p>
                        <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {login.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {login.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            {login.ip}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      login.status === 'success'
                        ? 'bg-green-500/20 text-green-500 border-green-500/30'
                        : 'bg-red-500/20 text-red-500 border-red-500/30'
                    }`}>
                      {login.status === 'success' ? 'Sucesso' : 'Falhou'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Seção: Configurações Avançadas */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Key className="w-6 h-6 text-green-500" />
            Configurações Avançadas
          </h2>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="bg-card rounded-2xl border border-border p-6 hover:border-green-500/30 transition-all duration-300">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2 mb-6">
              <Key className="w-5 h-5 text-green-500" />
              Ações Avançadas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="p-4 bg-background rounded-lg border border-border hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-300 text-left group">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-all">
                    <RefreshCw className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Encerrar Todas as Sessões</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Desconectar de todos os dispositivos
                    </p>
                  </div>
                </div>
              </button>
              <button className="p-4 bg-background rounded-lg border border-border hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-300 text-left group">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-all">
                    <Mail className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email de Recuperação</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Adicionar email alternativo
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="bg-card rounded-2xl border border-red-500/30 p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <h3 className="text-xl font-bold text-foreground">Zona de Perigo</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Ações que requerem atenção especial e podem afetar o acesso à sua conta.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                className="border-red-500/30 text-red-500 hover:bg-red-500/10 hover:border-red-500"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Desativar 2FA
              </Button>
              <Button
                variant="outline"
                className="border-red-500/30 text-red-500 hover:bg-red-500/10 hover:border-red-500"
              >
                <X className="w-4 h-4 mr-2" />
                Revogar Todas as Permissões
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {show2FAModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShow2FAModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl border border-border p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-foreground">QR Code - 2FA</h3>
              <button
                onClick={() => setShow2FAModal(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-48 h-48 bg-white p-4 rounded-lg">
                <div className="w-full h-full bg-gradient-to-br from-green-500/20 to-green-500/10 rounded flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-green-500" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Escaneie este QR Code no seu aplicativo de autenticação
              </p>
              <Button
                onClick={() => setShow2FAModal(false)}
                className="w-full bg-green-500 hover:bg-green-500/90 text-white"
              >
                Fechar
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
