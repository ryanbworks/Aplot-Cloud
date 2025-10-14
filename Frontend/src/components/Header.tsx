'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Server,
  Cloud,
  Users,
  Settings,
  LogIn,
  Menu,
  X,
  Ticket,
  Activity,
  BookOpen,
  Gamepad2,
  Bot,
  Globe,
  UserPlus,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isHostingOpen, setIsHostingOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const hostingOptions = [
    {
      title: 'Minecraft',
      description: 'Servidores de Minecraft com performance otimizada',
      icon: Gamepad2,
      href: '/hospedagem/minecraft',
    },
    {
      title: 'Bot Discord',
      description: 'Hospedagem especializada para bots do Discord',
      icon: Bot,
      href: '/hospedagem/discord-bot',
    },
    {
      title: 'Hospedagem de Site',
      description: 'Hospedagem web rápida e confiável',
      icon: Globe,
      href: '/hospedagem/site',
    },
    {
      title: 'VPS',
      description: 'Servidor virtual com recursos dedicados',
      icon: Server,
      href: '/hospedagem/vps',
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
        {(isHostingOpen || isSupportOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => {
              setIsHostingOpen(false);
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
              className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600"
              whileHover={{ 
                rotate: 360,
                scale: 1.1,
                boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)"
              }}
              animate={{
                boxShadow: [
                  "0 0 0px rgba(34, 197, 94, 0.0)",
                  "0 0 8px rgba(34, 197, 94, 0.3)",
                  "0 0 0px rgba(34, 197, 94, 0.0)"
                ],
                scale: [1, 1.02, 1],
                rotate: [0, 2, 0, -2, 0]
              }}
              transition={{
                // Animações contínuas
                boxShadow: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                scale: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotate: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                // Transições de hover
                default: { duration: 0.2, ease: "easeInOut" }
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
                textShadow: "0 0 8px rgba(34, 197, 94, 0.3)"
              }}
              animate={{
                y: [0, -1, 0],
                opacity: [0.9, 1, 0.9]
              }}
              transition={{
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                opacity: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                scale: { duration: 0.15 },
                textShadow: { duration: 0.15 }
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
                className="text-green-500"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.2 }}
                whileHover={{ 
                  scale: 1.1,
                  color: "#22c55e"
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
              className="relative text-muted-foreground hover:text-green-500 transition-colors duration-75 px-2 py-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Início</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-lg opacity-0"
                whileHover={{ opacity: 1, scale: 1.1 }}
                transition={{ duration: 0.05 }}
              />
            </motion.a>

            {/* Dropdown Hospedagem */}
            <div className="relative">
              <motion.button
                onClick={() => {
                  setIsHostingOpen(!isHostingOpen);
                  setIsSupportOpen(false);
                }}
                className="relative flex items-center space-x-1 text-muted-foreground hover:text-green-500 transition-colors duration-75 px-2 py-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Hospedagem</span>
                <motion.div
                  animate={{ rotate: isHostingOpen ? 180 : 0 }}
                  transition={{ duration: 0.05 }}
                  className="relative z-10"
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-lg opacity-0"
                  whileHover={{ opacity: 1, scale: 1.1 }}
                  transition={{ duration: 0.05 }}
                />
              </motion.button>

              <AnimatePresence>
                {isHostingOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.05 }}
                    className="absolute left-0 top-full mt-2 w-96 rounded-xl border border-green-500/20 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-xl p-4 shadow-2xl shadow-green-500/10"
                    onMouseLeave={() => setIsHostingOpen(false)}
                  >
                    <div className="grid gap-2">
                      <div className="mb-2">
                        <h3 className="text-sm font-semibold text-green-500 mb-1">Soluções de Hospedagem</h3>
                        <div className="h-px bg-gradient-to-r from-green-500/50 to-transparent"></div>
                      </div>
                      {hostingOptions.map((option, index) => (
                        <motion.a
                          key={option.href}
                          href={option.href}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.01 }}
                          className="group flex items-start space-x-4 rounded-xl p-4 hover:bg-gradient-to-r hover:from-green-500/5 hover:to-green-500/3 transition-all duration-75 border border-transparent hover:border-green-500/20"
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div 
                            className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 group-hover:from-green-500/20 group-hover:to-green-500/10 transition-all duration-75"
                            whileHover={{ rotate: 5, scale: 1.1 }}
                          >
                            <option.icon className="h-6 w-6 text-green-500 group-hover:text-green-400 transition-colors duration-75" />
                          </motion.div>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-foreground group-hover:text-green-500 transition-colors duration-75">
                              {option.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1 group-hover:text-foreground/80 transition-colors duration-75">
                              {option.description}
                            </p>
                            <div className="flex items-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-75">
                              <span className="text-xs text-green-500 font-medium">Saiba mais</span>
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
              className="relative text-muted-foreground hover:text-green-500 transition-colors duration-75 px-2 py-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Sobre</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-lg opacity-0"
                whileHover={{ opacity: 1, scale: 1.1 }}
                transition={{ duration: 0.05 }}
              />
            </motion.a>

            {/* Dropdown Suporte */}
            <div className="relative">
              <motion.button
                onClick={() => {
                  setIsSupportOpen(!isSupportOpen);
                  setIsHostingOpen(false);
                }}
                className="relative flex items-center space-x-1 text-muted-foreground hover:text-green-500 transition-colors duration-75 px-2 py-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Suporte</span>
                <motion.div
                  animate={{ rotate: isSupportOpen ? 180 : 0 }}
                  transition={{ duration: 0.05 }}
                  className="relative z-10"
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-lg opacity-0"
                  whileHover={{ opacity: 1, scale: 1.1 }}
                  transition={{ duration: 0.05 }}
                />
              </motion.button>

              <AnimatePresence>
                {isSupportOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.05 }}
                    className="absolute left-0 top-full mt-2 w-96 rounded-xl border border-green-500/20 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-xl p-4 shadow-2xl shadow-green-500/10"
                    onMouseLeave={() => setIsSupportOpen(false)}
                  >
                    <div className="grid gap-2">
                      <div className="mb-2">
                        <h3 className="text-sm font-semibold text-green-500 mb-1">Central de Suporte</h3>
                        <div className="h-px bg-gradient-to-r from-green-500/50 to-transparent"></div>
                      </div>
                      {supportOptions.map((option, index) => (
                        <motion.a
                          key={option.href}
                          href={option.href}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.01 }}
                          className="group flex items-start space-x-4 rounded-xl p-4 hover:bg-gradient-to-r hover:from-green-500/5 hover:to-green-500/3 transition-all duration-75 border border-transparent hover:border-green-500/20"
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div 
                            className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 group-hover:from-green-500/20 group-hover:to-green-500/10 transition-all duration-75"
                            whileHover={{ rotate: 5, scale: 1.1 }}
                          >
                            <option.icon className="h-6 w-6 text-green-500 group-hover:text-green-400 transition-colors duration-75" />
                          </motion.div>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-foreground group-hover:text-green-500 transition-colors duration-75">
                              {option.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1 group-hover:text-foreground/80 transition-colors duration-75">
                              {option.description}
                            </p>
                            <div className="flex items-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-75">
                              <span className="text-xs text-green-500 font-medium">Acessar</span>
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

          </nav>

          {/* Botões de Autenticação e Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Botões de Auth - Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              <Link href="/auth/login">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-green-500 hover:bg-green-500/10 transition-all duration-200"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Entrar
                  </Button>
                </motion.div>
              </Link>

              <Link href="/auth/register">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/20 transition-all duration-200"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Criar Conta
                  </Button>
                </motion.div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-md hover:bg-green-500/10 transition-colors duration-75"
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
                    transition={{ duration: 0.05 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.05 }}
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
              transition={{ duration: 0.1 }}
              className="md:hidden border-t border-green-500/20 overflow-hidden"
            >
              <div className="py-4 space-y-2">
                <motion.a
                  href="/"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                  className="block px-2 py-2 text-muted-foreground hover:text-green-500 transition-colors duration-75"
                >
                  Início
                </motion.a>

                {/* Mobile Hospedagem */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <button
                    onClick={() => {
                      setIsHostingOpen(!isHostingOpen);
                      setIsSupportOpen(false);
                    }}
                    className="flex w-full items-center justify-between px-2 py-2 text-muted-foreground hover:text-green-500 transition-colors duration-75"
                  >
                    <span>Hospedagem</span>
                    <motion.div
                      animate={{ rotate: isHostingOpen ? 180 : 0 }}
                      transition={{ duration: 0.05 }}
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
                            transition={{ delay: index * 0.01 }}
                            className="flex items-center space-x-3 px-2 py-3 text-sm text-muted-foreground hover:text-green-500 transition-colors duration-75"
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
                  transition={{ delay: 0.15 }}
                  className="block px-2 py-2 text-muted-foreground hover:text-green-500 transition-colors duration-75"
                >
                  Sobre
                </motion.a>

                {/* Mobile Suporte */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <button
                    onClick={() => {
                      setIsSupportOpen(!isSupportOpen);
                      setIsHostingOpen(false);
                    }}
                    className="flex w-full items-center justify-between px-2 py-2 text-muted-foreground hover:text-green-500 transition-colors duration-75"
                  >
                    <span>Suporte</span>
                    <motion.div
                      animate={{ rotate: isSupportOpen ? 180 : 0 }}
                      transition={{ duration: 0.05 }}
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
                            transition={{ delay: index * 0.01 }}
                            className="flex items-center space-x-3 px-2 py-3 text-sm text-muted-foreground hover:text-green-500 transition-colors duration-75"
                          >
                            <option.icon className="h-4 w-4" />
                            <span>{option.title}</span>
                          </motion.a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>


                {/* Mobile Auth Buttons */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="border-t border-green-500/20 pt-4 mt-4 space-y-3"
                >
                  <Link href="/auth/login">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-green-500/30 text-green-500 hover:bg-green-500/10 hover:border-green-500/50 transition-all duration-200"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Entrar
                    </Button>
                  </Link>

                  <Link href="/auth/register">
                    <Button
                      className="w-full justify-start bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/20 transition-all duration-200"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Criar Conta
                    </Button>
                  </Link>
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
