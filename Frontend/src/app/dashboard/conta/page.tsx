'use client';

import { DashboardPageHeader } from '@/components/dashboard/DashboardPageHeader';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  Bell,
  Building,
  Calendar,
  Camera,
  Globe,
  Mail,
  MapPin,
  Phone,
  Save,
  Shield,
  Trash2,
  User,
} from 'lucide-react';
import { useState } from 'react';

/**
 * Página de Conta do Usuário
 * Permite gerenciar informações pessoais e preferências
 */
export default function ContaPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Mock data - em produção virá da API
  const [userData, setUserData] = useState({
    nome: 'Ryan Silva',
    email: 'ryan@aplotcloud.com',
    telefone: '+55 11 98765-4321',
    cpf: '123.456.789-00',
    dataNascimento: '1995-05-15',
    empresa: 'AplotCloud',
    cargo: 'Desenvolvedor Full Stack',
    endereco: 'São Paulo, SP',
    pais: 'Brasil',
    biografia: 'Desenvolvedor apaixonado por tecnologia e inovação.',
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simular salvamento
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    setIsEditing(false);
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

  return (
    <div className="from-background via-background min-h-screen bg-gradient-to-b to-green-500/5">
      <DashboardPageHeader
        title="Minha Conta"
        description="Gerencie suas informações pessoais e preferências"
        icon={User}
      >
        <Button
          variant="outline"
          className="border-green-500/30 hover:border-green-500/50 hover:bg-green-500/10"
          onClick={() => (window.location.href = '/dashboard/seguranca')}
        >
          <Shield className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Segurança</span>
        </Button>
      </DashboardPageHeader>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6 lg:px-8"
      >
        {' '}
        {/* Profile Picture Card */}
        <motion.div variants={itemVariants}>
          <div className="bg-card border-border rounded-2xl border p-8 transition-all duration-300 hover:border-green-500/30">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              {/* Avatar */}
              <div className="group relative">
                <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-green-500/30 bg-gradient-to-br from-green-500/20 to-green-500/10 text-4xl font-bold text-green-500">
                  {userData.nome
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <button className="absolute right-0 bottom-0 rounded-full bg-green-500 p-2 text-white shadow-lg transition-all duration-300 hover:bg-green-500/90">
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              {/* Info Rápida */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-foreground text-2xl font-bold">
                  {userData.nome}
                </h2>
                <p className="text-muted-foreground">
                  {userData.cargo} • {userData.empresa}
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-4 md:justify-start">
                  <span className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-green-500" />
                    {userData.email}
                  </span>
                  <span className="text-muted-foreground flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-green-500" />
                    {userData.endereco}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-green-500 text-white hover:bg-green-500/90"
              >
                {isEditing ? 'Cancelar' : 'Editar Perfil'}
              </Button>
            </div>
          </div>
        </motion.div>
        {/* Informações Pessoais */}
        <motion.div variants={itemVariants}>
          <div className="bg-card border-border rounded-2xl border p-6 transition-all duration-300 hover:border-green-500/30">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-foreground flex items-center gap-2 text-xl font-bold">
                <User className="h-5 w-5 text-green-500" />
                Informações Pessoais
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Nome Completo */}
              <div className="space-y-2">
                <label className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                  <User className="h-4 w-4 text-green-500" />
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={userData.nome}
                  onChange={(e) =>
                    setUserData({ ...userData, nome: e.target.value })
                  }
                  disabled={!isEditing}
                  className="bg-background border-border w-full rounded-lg border px-4 py-3 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                  <Mail className="h-4 w-4 text-green-500" />
                  Email
                </label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  disabled={!isEditing}
                  className="bg-background border-border w-full rounded-lg border px-4 py-3 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              {/* Telefone */}
              <div className="space-y-2">
                <label className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                  <Phone className="h-4 w-4 text-green-500" />
                  Telefone
                </label>
                <input
                  type="tel"
                  value={userData.telefone}
                  onChange={(e) =>
                    setUserData({ ...userData, telefone: e.target.value })
                  }
                  disabled={!isEditing}
                  className="bg-background border-border w-full rounded-lg border px-4 py-3 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              {/* CPF */}
              <div className="space-y-2">
                <label className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                  <Shield className="h-4 w-4 text-green-500" />
                  CPF
                </label>
                <input
                  type="text"
                  value={userData.cpf}
                  disabled
                  className="bg-background border-border w-full cursor-not-allowed rounded-lg border px-4 py-3 opacity-60"
                />
              </div>

              {/* Data de Nascimento */}
              <div className="space-y-2">
                <label className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                  <Calendar className="h-4 w-4 text-green-500" />
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  value={userData.dataNascimento}
                  onChange={(e) =>
                    setUserData({ ...userData, dataNascimento: e.target.value })
                  }
                  disabled={!isEditing}
                  className="bg-background border-border w-full rounded-lg border px-4 py-3 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              {/* País */}
              <div className="space-y-2">
                <label className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                  <Globe className="h-4 w-4 text-green-500" />
                  País
                </label>
                <input
                  type="text"
                  value={userData.pais}
                  onChange={(e) =>
                    setUserData({ ...userData, pais: e.target.value })
                  }
                  disabled={!isEditing}
                  className="bg-background border-border w-full rounded-lg border px-4 py-3 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>
          </div>
        </motion.div>
        {/* Informações Profissionais */}
        <motion.div variants={itemVariants}>
          <div className="bg-card border-border rounded-2xl border p-6 transition-all duration-300 hover:border-green-500/30">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-foreground flex items-center gap-2 text-xl font-bold">
                <Building className="h-5 w-5 text-green-500" />
                Informações Profissionais
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Empresa */}
              <div className="space-y-2">
                <label className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                  <Building className="h-4 w-4 text-green-500" />
                  Empresa
                </label>
                <input
                  type="text"
                  value={userData.empresa}
                  onChange={(e) =>
                    setUserData({ ...userData, empresa: e.target.value })
                  }
                  disabled={!isEditing}
                  className="bg-background border-border w-full rounded-lg border px-4 py-3 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              {/* Cargo */}
              <div className="space-y-2">
                <label className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                  <User className="h-4 w-4 text-green-500" />
                  Cargo
                </label>
                <input
                  type="text"
                  value={userData.cargo}
                  onChange={(e) =>
                    setUserData({ ...userData, cargo: e.target.value })
                  }
                  disabled={!isEditing}
                  className="bg-background border-border w-full rounded-lg border px-4 py-3 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              {/* Biografia */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-muted-foreground text-sm font-medium">
                  Biografia
                </label>
                <textarea
                  value={userData.biografia}
                  onChange={(e) =>
                    setUserData({ ...userData, biografia: e.target.value })
                  }
                  disabled={!isEditing}
                  rows={4}
                  className="bg-background border-border w-full resize-none rounded-lg border px-4 py-3 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>
          </div>
        </motion.div>
        {/* Preferências */}
        <motion.div variants={itemVariants}>
          <div className="bg-card border-border rounded-2xl border p-6 transition-all duration-300 hover:border-green-500/30">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-foreground flex items-center gap-2 text-xl font-bold">
                <Bell className="h-5 w-5 text-green-500" />
                Preferências de Notificação
              </h3>
            </div>

            <div className="space-y-4">
              {/* Notificações por Email */}
              <div className="bg-background border-border flex items-center justify-between rounded-lg border p-4 transition-all duration-300 hover:border-green-500/20">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-green-500/20 p-2">
                    <Mail className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">
                      Notificações por Email
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Receba atualizações no seu email
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    defaultChecked
                  />
                  <div className="bg-border peer h-6 w-11 rounded-full peer-checked:bg-green-500 peer-focus:ring-2 peer-focus:ring-green-500/20 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
                </label>
              </div>

              {/* Notificações Push */}
              <div className="bg-background border-border flex items-center justify-between rounded-lg border p-4 transition-all duration-300 hover:border-green-500/20">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-green-500/20 p-2">
                    <Bell className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">
                      Notificações Push
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Receba alertas no navegador
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    defaultChecked
                  />
                  <div className="bg-border peer h-6 w-11 rounded-full peer-checked:bg-green-500 peer-focus:ring-2 peer-focus:ring-green-500/20 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
                </label>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Zona de Perigo */}
        <motion.div variants={itemVariants}>
          <div className="bg-card rounded-2xl border border-red-500/30 p-6">
            <div className="mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <h3 className="text-foreground text-xl font-bold">
                Zona de Perigo
              </h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Ações irreversíveis que afetam permanentemente sua conta.
            </p>
            <Button
              variant="outline"
              className="border-red-500/30 text-red-500 hover:border-red-500 hover:bg-red-500/10"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir Conta
            </Button>
          </div>
        </motion.div>
        {/* Botão de Salvar */}
        {isEditing && (
          <motion.div
            variants={itemVariants}
            className="flex justify-end gap-3"
          >
            <Button
              onClick={() => setIsEditing(false)}
              variant="outline"
              className="border-border hover:bg-muted"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-green-500 text-white hover:bg-green-500/90"
            >
              {isSaving ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Alterações
                </>
              )}
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
