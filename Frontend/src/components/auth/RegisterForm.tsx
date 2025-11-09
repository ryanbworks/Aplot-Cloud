'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus, Eye, EyeOff, Sparkles, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '@/lib/validations/auth';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/lib/logger';
import { useRouter } from 'next/navigation';

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch('password');

  const passwordRequirements = [
    { text: 'Mínimo 8 caracteres', met: !password ? false : password.length >= 8 },
    { text: 'Uma letra maiúscula', met: !password ? false : /[A-Z]/.test(password) },
    { text: 'Uma letra minúscula', met: !password ? false : /[a-z]/.test(password) },
    { text: 'Um número', met: !password ? false : /\d/.test(password) },
  ];

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      
      // Simulação de registro
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      logger.info('Registro realizado:', { email: data.email });
      
      toast({
        variant: 'success',
        title: 'Conta criada com sucesso!',
        description: 'Bem-vindo à Aplot Cloud!',
      });
      
      // Redirecionar para login após registro bem-sucedido
      router.push('/auth/login');
    } catch (error) {
      logger.error('Erro ao registrar:', error);
      toast({
        variant: 'destructive',
        title: 'Erro ao criar conta',
        description: 'Ocorreu um erro ao criar sua conta. Tente novamente.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      {/* Card Principal */}
      <div className="bg-card border border-border rounded-2xl p-8 shadow-xl relative overflow-hidden">
        {/* Background Effect */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -z-10" />
        
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-4 shadow-lg shadow-green-500/30"
          >
            <UserPlus className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Crie sua conta
          </h2>
          <p className="text-muted-foreground">
            Comece sua jornada com a AplotCloud
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Nome Completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                className={`pl-11 ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                {...register('name')}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </motion.div>

          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className={`pl-11 ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                {...register('email')}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className={`pl-11 pr-11 ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-green-500 transition-colors"
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            
            {/* Password Requirements */}
            {password && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 space-y-2"
              >
                {passwordRequirements.map((req, index) => (
                  <motion.div
                    key={req.text}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                      req.met ? 'bg-green-500' : 'bg-muted'
                    }`}>
                      {req.met && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`text-xs transition-colors ${
                      req.met ? 'text-green-500' : 'text-muted-foreground'
                    }`}>
                      {req.text}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            )}
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </motion.div>

          {/* Confirm Password Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
              Confirmar Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className={`pl-11 pr-11 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                {...register('confirmPassword')}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-green-500 transition-colors"
                aria-label={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </motion.div>

          {/* Terms and Conditions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <label className="flex items-start space-x-2 cursor-pointer">
              <input
                type="checkbox"
                required
                className="w-4 h-4 mt-0.5 rounded border-border bg-card text-green-500 focus:ring-green-500/50 focus:ring-2 cursor-pointer"
              />
              <span className="text-sm text-muted-foreground">
                Concordo com os{' '}
                <Link href="/terms" className="text-green-500 hover:text-green-400 transition-colors">
                  termos de uso
                </Link>
                {' '}e a{' '}
                <Link href="/privacy" className="text-green-500 hover:text-green-400 transition-colors">
                  política de privacidade
                </Link>
              </span>
            </label>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Criando conta...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  <span>Criar conta</span>
                </div>
              )}
            </Button>
          </motion.div>
        </form>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="relative my-8"
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-card text-muted-foreground">ou continue com</span>
          </div>
        </motion.div>

        {/* Social Login */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="grid grid-cols-2 gap-4"
        >
          <button
            type="button"
            className="flex items-center justify-center gap-2 h-11 bg-card border border-border rounded-lg hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-sm font-medium">Google</span>
          </button>
          
          <button
            type="button"
            className="flex items-center justify-center gap-2 h-11 bg-card border border-border rounded-lg hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            <span className="text-sm font-medium">GitHub</span>
          </button>
        </motion.div>

        {/* Login Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Já tem uma conta?{' '}
            <Link
              href="/auth/login"
              className="text-green-500 hover:text-green-400 font-semibold transition-colors inline-flex items-center gap-1 group"
            >
              Entrar agora
              <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
            </Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

