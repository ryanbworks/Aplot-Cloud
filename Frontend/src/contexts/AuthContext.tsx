'use client';

/**
 * Contexto de autenticação
 * 
 * @module AuthContext
 * @description Gerencia o estado de autenticação do usuário, incluindo login, logout
 * e persistência de dados no localStorage. Em produção, considere usar httpOnly cookies
 * ao invés de localStorage para maior segurança.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { logger } from '@/lib/logger';

/**
 * Tipo do contexto de autenticação
 */
interface AuthContextType {
  /** Indica se o usuário está logado */
  isLoggedIn: boolean;
  /** Dados do usuário logado (null se não logado) */
  user: {
    name: string;
    email: string;
  } | null;
  /** Função para fazer login */
  login: (email: string, password: string) => void;
  /** Função para fazer logout */
  logout: () => void;
  /** Indica se os dados de autenticação estão sendo carregados */
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** Chave usada para armazenar dados de autenticação no localStorage */
const AUTH_STORAGE_KEY = 'aplotcloud-auth';

/**
 * Hook para acessar o contexto de autenticação
 * 
 * @returns Objeto com estado e funções de autenticação
 * @throws Error se usado fora do AuthProvider
 * 
 * @example
 * ```typescript
 * const { isLoggedIn, user, login, logout } = useAuth();
 * if (isLoggedIn) {
 *   console.log(`Usuário logado: ${user?.email}`);
 * }
 * ```
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Provider de autenticação
 * 
 * @param children - Componentes filhos que terão acesso ao contexto de autenticação
 * 
 * @example
 * ```tsx
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * ```
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Verifica se há dados de autenticação salvos no localStorage
   * Valida a estrutura dos dados e limpa dados inválidos ou corrompidos
   */
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedAuth) {
        const authData = JSON.parse(savedAuth);
        // Validar estrutura dos dados
        if (authData.isLoggedIn && authData.user && authData.user.email) {
          setIsLoggedIn(authData.isLoggedIn);
          setUser(authData.user);
        } else {
          // Dados inválidos, limpar
          localStorage.removeItem(AUTH_STORAGE_KEY);
          logger.warn('Dados de autenticação inválidos, limpando storage');
        }
      }
    } catch (error) {
      logger.error('Erro ao carregar dados de autenticação:', error);
      // Em caso de erro, limpar dados corrompidos
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Realiza login do usuário
   * 
   * @param email - Email do usuário
   * @param password - Senha do usuário (não é armazenada)
   * 
   * @throws Error se houver erro ao fazer login
   * 
   * @remarks
   * - Em produção, esta função deve fazer uma requisição ao backend
   * - A senha nunca é armazenada no localStorage
   * - Considere usar httpOnly cookies em produção
   */
  const login = useCallback((email: string, _password: string) => {
    try {
      // Simulação de login - aceita qualquer email/senha
      // EM PRODUÇÃO: Isso deve ser feito no backend
      const userData = {
        name: email.split('@')[0], // Usa a parte antes do @ como nome
        email: email
      };
      
      setUser(userData);
      setIsLoggedIn(true);
      
      // Salvar no localStorage
      // NOTA: Em produção, não armazenar dados sensíveis no localStorage
      // Preferir usar httpOnly cookies ou sessionStorage para dados temporários
      const authData = {
        isLoggedIn: true,
        user: userData,
        // Não armazenar a senha!
      };
      
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
      logger.info('Login realizado com sucesso:', { email });
    } catch (error) {
      logger.error('Erro ao fazer login:', error);
      throw error;
    }
  }, []);

  /**
   * Realiza logout do usuário
   * Remove dados de autenticação do estado e do localStorage
   */
  const logout = useCallback(() => {
    try {
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem(AUTH_STORAGE_KEY);
      logger.info('Logout realizado com sucesso');
    } catch (error) {
      logger.error('Erro ao fazer logout:', error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
