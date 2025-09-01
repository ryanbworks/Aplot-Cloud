'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Server,
  Cloud,
  Database,
  Shield,
  Users,
  Settings,
  LogIn,
  User,
  Menu,
  X,
  Ticket,
  Activity,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isHostingOpen, setIsHostingOpen] = useState(false);
  const [isClientAreaOpen, setIsClientAreaOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const hostingOptions = [
    {
      title: 'Hospedagem Compartilhada',
      description: 'Ideal para sites pessoais e pequenos projetos',
      icon: Server,
      href: '/hospedagem/compartilhada',
    },
    {
      title: 'VPS Cloud',
      description: 'Servidor virtual com recursos dedicados',
      icon: Cloud,
      href: '/hospedagem/vps',
    },
    {
      title: 'Servidores Dedicados',
      description: 'Máxima performance e controle total',
      icon: Database,
      href: '/hospedagem/dedicados',
    },
    {
      title: 'Cloud Security',
      description: 'Proteção avançada para seus dados',
      icon: Shield,
      href: '/hospedagem/security',
    },
  ];

  const clientAreaOptions = [
    {
      title: 'Painel de Controle',
      description: 'Gerencie seus serviços',
      icon: Settings,
      href: '/cliente/painel',
    },
    {
      title: 'Suporte Técnico',
      description: 'Central de ajuda 24/7',
      icon: Users,
      href: '/cliente/suporte',
    },
  ];

  const supportOptions = [
    {
      title: 'Abrir Ticket',
      description: 'Solicite suporte técnico especializado',
      icon: Ticket,
      href: '/suporte/ticket',
    },
    {
      title: 'Status dos Servidores',
      description: 'Monitore a disponibilidade em tempo real',
      icon: Activity,
      href: '/status',
    },
    {
      title: 'Base de Conhecimento',
      description: 'Documentação e tutoriais completos',
      icon: BookOpen,
      href: '/suporte/base-conhecimento',
    },
  ];

  return (
    <>
      {/* Backdrop para dropdowns */}
      <AnimatePresence>
        {(isHostingOpen || isClientAreaOpen || isSupportOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => {
              setIsHostingOpen(false);
              setIsClientAreaOpen(false);
              setIsSupportOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      <header className="relative z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-green-600"
              whileHover={{ 
                rotate: 360,
                scale: 1.1,
                boxShadow: "0 0 20px rgba(16, 185, 129, 0.5)"
              }}
              animate={{
                boxShadow: [
                  "0 0 0px rgba(16, 185, 129, 0.0)",
                  "0 0 8px rgba(16, 185, 129, 0.3)",
                  "0 0 0px rgba(16, 185, 129, 0.0)"
                ],
                scale: [1, 1.02, 1],
                rotate: [0, 2, 0, -2, 0]
              }}
              transition={{
                // Animações contínuas
                boxShadow: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                scale: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotate: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                // Transições de hover
                default: { duration: 0.3, ease: "easeInOut" }
              }}
            >
              <motion.div
                animate={{ 
                  y: [0, -2, 0],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Cloud className="h-5 w-5 text-white" />
              </motion.div>
            </motion.div>
            <motion.span 
              className="text-xl font-bold text-foreground"
              whileHover={{ 
                scale: 1.02,
                textShadow: "0 0 8px rgba(16, 185, 129, 0.3)"
              }}
              animate={{
                y: [0, -1, 0],
                opacity: [0.9, 1, 0.9]
              }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                opacity: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                scale: { duration: 0.2 },
                textShadow: { duration: 0.2 }
              }}
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                Aplot
              </motion.span>
              <motion.span 
                className="text-primary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                whileHover={{ 
                  scale: 1.1,
                  color: "#10b981"
                }}
              >
                Cloud
              </motion.span>
            </motion.span>
          </motion.div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <motion.a
              href="/"
              className="relative text-muted-foreground hover:text-primary transition-colors duration-200 px-2 py-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Início</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-green-500/10 rounded-lg opacity-0"
                whileHover={{ opacity: 1, scale: 1.1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.a>

            {/* Dropdown Hospedagem */}
            <div className="relative">
              <motion.button
                onClick={() => {
                  setIsHostingOpen(!isHostingOpen);
                  setIsClientAreaOpen(false);
                  setIsSupportOpen(false);
                }}
                className="relative flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors duration-200 px-2 py-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Hospedagem</span>
                <motion.div
                  animate={{ rotate: isHostingOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10"
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-green-500/10 rounded-lg opacity-0"
                  whileHover={{ opacity: 1, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>

              <AnimatePresence>
                {isHostingOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full mt-2 w-96 rounded-xl border border-border/40 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-xl p-4 shadow-2xl shadow-primary/10"
                    onMouseLeave={() => setIsHostingOpen(false)}
                  >
                    <div className="grid gap-2">
                      <div className="mb-2">
                        <h3 className="text-sm font-semibold text-primary mb-1">Soluções de Hospedagem</h3>
                        <div className="h-px bg-gradient-to-r from-primary/50 to-transparent"></div>
                      </div>
                      {hostingOptions.map((option, index) => (
                        <motion.a
                          key={option.href}
                          href={option.href}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="group flex items-start space-x-4 rounded-xl p-4 hover:bg-gradient-to-r hover:from-primary/5 hover:to-green-500/5 transition-all duration-300 border border-transparent hover:border-primary/20"
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div 
                            className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-green-500/10 group-hover:from-primary/20 group-hover:to-green-500/20 transition-all duration-300"
                            whileHover={{ rotate: 5, scale: 1.1 }}
                          >
                            <option.icon className="h-6 w-6 text-primary group-hover:text-green-400 transition-colors duration-300" />
                          </motion.div>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                              {option.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1 group-hover:text-foreground/80 transition-colors duration-300">
                              {option.description}
                            </p>
                            <div className="flex items-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <span className="text-xs text-primary font-medium">Saiba mais</span>
                              <motion.div
                                initial={{ x: 0 }}
                                whileHover={{ x: 4 }}
                                className="ml-1"
                              >
                                →
                              </motion.div>
                            </div>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.a
              href="/sobre"
              className="relative text-muted-foreground hover:text-primary transition-colors duration-200 px-2 py-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Sobre</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-green-500/10 rounded-lg opacity-0"
                whileHover={{ opacity: 1, scale: 1.1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.a>

            {/* Dropdown Suporte */}
            <div className="relative">
              <motion.button
                onClick={() => {
                  setIsSupportOpen(!isSupportOpen);
                  setIsHostingOpen(false);
                  setIsClientAreaOpen(false);
                }}
                className="relative flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors duration-200 px-2 py-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Suporte</span>
                <motion.div
                  animate={{ rotate: isSupportOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10"
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-green-500/10 rounded-lg opacity-0"
                  whileHover={{ opacity: 1, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>

              <AnimatePresence>
                {isSupportOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full mt-2 w-96 rounded-xl border border-border/40 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-xl p-4 shadow-2xl shadow-primary/10"
                    onMouseLeave={() => setIsSupportOpen(false)}
                  >
                    <div className="grid gap-2">
                      <div className="mb-2">
                        <h3 className="text-sm font-semibold text-primary mb-1">Central de Suporte</h3>
                        <div className="h-px bg-gradient-to-r from-primary/50 to-transparent"></div>
                      </div>
                      {supportOptions.map((option, index) => (
                        <motion.a
                          key={option.href}
                          href={option.href}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="group flex items-start space-x-4 rounded-xl p-4 hover:bg-gradient-to-r hover:from-primary/5 hover:to-green-500/5 transition-all duration-300 border border-transparent hover:border-primary/20"
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div 
                            className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-green-500/10 group-hover:from-primary/20 group-hover:to-green-500/20 transition-all duration-300"
                            whileHover={{ rotate: 5, scale: 1.1 }}
                          >
                            <option.icon className="h-6 w-6 text-primary group-hover:text-green-400 transition-colors duration-300" />
                          </motion.div>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                              {option.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1 group-hover:text-foreground/80 transition-colors duration-300">
                              {option.description}
                            </p>
                            <div className="flex items-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <span className="text-xs text-primary font-medium">Acessar</span>
                              <motion.div
                                initial={{ x: 0 }}
                                whileHover={{ x: 4 }}
                                className="ml-1"
                              >
                                →
                              </motion.div>
                            </div>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.a
              href="/contato"
              className="relative text-muted-foreground hover:text-primary transition-colors duration-200 px-2 py-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Contato</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-green-500/10 rounded-lg opacity-0"
                whileHover={{ opacity: 1, scale: 1.1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.a>
          </nav>

          {/* Área do Cliente e Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Área do Cliente - Desktop */}
            <div className="hidden md:block relative">
              <motion.button
                onClick={() => {
                  setIsClientAreaOpen(!isClientAreaOpen);
                  setIsHostingOpen(false);
                  setIsSupportOpen(false);
                }}
                className="relative flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200 px-2 py-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="h-4 w-4 relative z-10" />
                <span className="relative z-10">Área do Cliente</span>
                <motion.div
                  animate={{ rotate: isClientAreaOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10"
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-green-500/10 rounded-lg opacity-0"
                  whileHover={{ opacity: 1, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>

              <AnimatePresence>
                {isClientAreaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-border/40 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-xl p-4 shadow-2xl shadow-primary/10"
                    onMouseLeave={() => setIsClientAreaOpen(false)}
                  >
                    <div className="grid gap-2">
                      <div className="mb-2">
                        <h3 className="text-sm font-semibold text-primary mb-1">Área do Cliente</h3>
                        <div className="h-px bg-gradient-to-r from-primary/50 to-transparent"></div>
                      </div>
                      {clientAreaOptions.map((option, index) => (
                        <motion.a
                          key={option.href}
                          href={option.href}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="group flex items-center space-x-4 rounded-xl p-4 hover:bg-gradient-to-r hover:from-primary/5 hover:to-green-500/5 transition-all duration-300 border border-transparent hover:border-primary/20"
                          whileHover={{ scale: 1.02, x: -4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div 
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-green-500/10 group-hover:from-primary/20 group-hover:to-green-500/20 transition-all duration-300"
                            whileHover={{ rotate: -5, scale: 1.1 }}
                          >
                            <option.icon className="h-5 w-5 text-primary group-hover:text-green-400 transition-colors duration-300" />
                          </motion.div>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                              {option.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1 group-hover:text-foreground/80 transition-colors duration-300">
                              {option.description}
                            </p>
                          </div>
                          <motion.div
                            initial={{ x: 0 }}
                            whileHover={{ x: -4 }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            ←
                          </motion.div>
                        </motion.a>
                      ))}
                      <div className="border-t border-primary/20 pt-4 mt-2">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-center bg-gradient-to-r from-primary/10 to-green-500/10 border-primary/30 hover:from-primary/20 hover:to-green-500/20 hover:border-primary/50 transition-all duration-300"
                          >
                            <LogIn className="h-4 w-4 mr-2" />
                            <span className="font-medium">Fazer Login</span>
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-md hover:bg-accent transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-border overflow-hidden"
            >
              <div className="py-4 space-y-2">
                <motion.a
                  href="/"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="block px-2 py-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Início
                </motion.a>

                {/* Mobile Hospedagem */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <button
                    onClick={() => {
                      setIsHostingOpen(!isHostingOpen);
                      setIsClientAreaOpen(false);
                      setIsSupportOpen(false);
                    }}
                    className="flex w-full items-center justify-between px-2 py-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    <span>Hospedagem</span>
                    <motion.div
                      animate={{ rotate: isHostingOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {isHostingOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-4 overflow-hidden"
                      >
                        {hostingOptions.map((option, index) => (
                          <motion.a
                            key={option.href}
                            href={option.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center space-x-3 px-2 py-3 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                          >
                            <option.icon className="h-4 w-4" />
                            <span>{option.title}</span>
                          </motion.a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.a
                  href="/sobre"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="block px-2 py-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Sobre
                </motion.a>

                {/* Mobile Suporte */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <button
                    onClick={() => {
                      setIsSupportOpen(!isSupportOpen);
                      setIsHostingOpen(false);
                      setIsClientAreaOpen(false);
                    }}
                    className="flex w-full items-center justify-between px-2 py-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    <span>Suporte</span>
                    <motion.div
                      animate={{ rotate: isSupportOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {isSupportOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-4 overflow-hidden"
                      >
                        {supportOptions.map((option, index) => (
                          <motion.a
                            key={option.href}
                            href={option.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center space-x-3 px-2 py-3 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                          >
                            <option.icon className="h-4 w-4" />
                            <span>{option.title}</span>
                          </motion.a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.a
                  href="/contato"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="block px-2 py-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Contato
                </motion.a>

                {/* Mobile Client Area */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                  className="border-t border-border pt-4 mt-4"
                >
                  <button
                    onClick={() => {
                      setIsClientAreaOpen(!isClientAreaOpen);
                      setIsHostingOpen(false);
                      setIsSupportOpen(false);
                    }}
                    className="flex w-full items-center justify-between px-2 py-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Área do Cliente</span>
                    </div>
                    <motion.div
                      animate={{ rotate: isClientAreaOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {isClientAreaOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-4 overflow-hidden"
                      >
                        {clientAreaOptions.map((option, index) => (
                          <motion.a
                            key={option.href}
                            href={option.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center space-x-3 px-2 py-3 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                          >
                            <option.icon className="h-4 w-4" />
                            <span>{option.title}</span>
                          </motion.a>
                        ))}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className="px-2 py-2"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start"
                          >
                            <LogIn className="h-4 w-4 mr-2" />
                            Fazer Login
                          </Button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
    </>
  );
};

export default Header;
