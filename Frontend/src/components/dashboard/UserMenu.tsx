'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  CreditCard, 
  HelpCircle, 
  LogOut, 
  ChevronDown,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface UserMenuProps {
  userName?: string;
  userEmail?: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({ 
  userName = "Ryan", 
  userEmail = "ryan@example.com" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fechar menu quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    {
      icon: User,
      label: 'Conta e Perfil',
      href: '/dashboard/conta',
      description: 'Informações pessoais e preferências'
    },
    {
      icon: CreditCard,
      label: 'Faturamento e Pagamentos',
      href: '/dashboard/faturamento',
      description: 'Faturas, pagamentos e custos'
    },
    {
      icon: Shield,
      label: 'Segurança',
      href: '/dashboard/seguranca',
      description: 'Autenticação e logs de acesso'
    },
    {
      icon: HelpCircle,
      label: 'Suporte',
      href: '/dashboard/suporte',
      description: 'Tickets e base de conhecimento'
    }
  ];

  const handleLogout = () => {
    // Implementar lógica de logout
    console.log('Logout realizado');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Botão do Menu */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="flex items-center gap-3 px-4 py-2 border-border hover:bg-muted hover:border-green-500/50 transition-all duration-200"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-foreground">{userName}</p>
            <p className="text-xs text-muted-foreground">{userEmail}</p>
          </div>
        </div>
        <ChevronDown 
          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </Button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden"
          >
            {/* Header do Menu */}
            <div className="p-4 border-b border-border bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{userName}</p>
                  <p className="text-sm text-muted-foreground">{userEmail}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              {menuItems.map((item, index) => (
                <Link key={item.label} href={item.href}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                  >
                    <div className="w-8 h-8 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                      <item.icon className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Footer com Logout */}
            <div className="p-2">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: menuItems.length * 0.05 }}
                onClick={handleLogout}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer w-full text-left group"
              >
                <div className="w-8 h-8 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                  <LogOut className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <p className="font-medium text-red-500">Sair da Conta</p>
                  <p className="text-xs text-muted-foreground">Fazer logout do sistema</p>
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
