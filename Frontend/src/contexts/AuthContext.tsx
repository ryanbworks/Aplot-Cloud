'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  user: {
    name: string;
    email: string;
  } | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Verificar se há dados salvos no localStorage
  useEffect(() => {
    const savedAuth = localStorage.getItem('aplotcloud-auth');
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      setIsLoggedIn(authData.isLoggedIn);
      setUser(authData.user);
    }
  }, []);

  const login = (email: string) => {
    // Simulação de login - aceita qualquer email/senha
    const userData = {
      name: email.split('@')[0], // Usa a parte antes do @ como nome
      email: email
    };
    
    setUser(userData);
    setIsLoggedIn(true);
    
    // Salvar no localStorage
    localStorage.setItem('aplotcloud-auth', JSON.stringify({
      isLoggedIn: true,
      user: userData
    }));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('aplotcloud-auth');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
