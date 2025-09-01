'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { 
  Cloud,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Github,
  Send,
  ArrowRight,
  Heart,
  ExternalLink,
  FileText,
  Shield,
  Users,
  Settings,
  HelpCircle,
  Zap,
  Server,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = memo(() => {
  const footerSections = [
    {
      title: "Produtos",
      links: [
        { name: "Hospedagem Compartilhada", href: "/hospedagem/compartilhada", icon: Server },
        { name: "VPS Cloud", href: "/hospedagem/vps", icon: Cloud },
        { name: "Servidores Dedicados", href: "/hospedagem/dedicados", icon: Zap },
        { name: "Cloud Security", href: "/hospedagem/security", icon: Shield },
        { name: "CDN Global", href: "/cdn", icon: Globe }
      ]
    },
    {
      title: "Suporte",
      links: [
        { name: "Central de Ajuda", href: "/suporte", icon: HelpCircle },
        { name: "Documentação", href: "/docs", icon: FileText },
        { name: "Status dos Serviços", href: "/status", icon: Settings },
        { name: "Contato", href: "/contato", icon: Mail },
        { name: "Chat Online", href: "/chat", icon: Users }
      ]
    },
    {
      title: "Empresa",
      links: [
        { name: "Sobre Nós", href: "/sobre", icon: Users },
        { name: "Carreiras", href: "/carreiras", icon: ExternalLink },
        { name: "Blog", href: "/blog", icon: FileText },
        { name: "Imprensa", href: "/imprensa", icon: FileText },
        { name: "Parceiros", href: "/parceiros", icon: Users }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Termos de Uso", href: "/termos", icon: FileText },
        { name: "Política de Privacidade", href: "/privacidade", icon: Shield },
        { name: "SLA", href: "/sla", icon: Settings },
        { name: "LGPD", href: "/lgpd", icon: Shield },
        { name: "Compliance", href: "/compliance", icon: FileText }
      ]
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/aplotcloud", color: "hover:text-blue-500" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/aplotcloud", color: "hover:text-sky-500" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/aplotcloud", color: "hover:text-pink-500" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/aplotcloud", color: "hover:text-blue-600" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com/aplotcloud", color: "hover:text-red-500" },
    { name: "GitHub", icon: Github, href: "https://github.com/aplotcloud", color: "hover:text-gray-400" }
  ];

  const contactInfo = [
    { 
      icon: Phone, 
      label: "Telefone", 
      value: "+55 11 3000-0000",
      href: "tel:+5511300000000"
    },
    { 
      icon: Mail, 
      label: "Email", 
      value: "contato@aplotcloud.com",
      href: "mailto:contato@aplotcloud.com"
    },
    { 
      icon: MapPin, 
      label: "Endereço", 
      value: "São Paulo, SP - Brasil",
      href: "https://maps.google.com"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-background to-muted/20 border-t border-border/40">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/5 to-green-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-16 border-b border-border/30"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-green-500/10 border border-primary/20 rounded-full px-6 py-3 mb-6"
            >
              <Mail className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary">
                Newsletter AplotCloud
              </span>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Fique por dentro das novidades
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Receba updates sobre novas funcionalidades, dicas técnicas e ofertas exclusivas 
              diretamente no seu email.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Seu melhor email"
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                />
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-gradient-to-r from-primary to-green-500 hover:from-primary/90 hover:to-green-500/90 px-6 py-3 rounded-xl">
                  <Send className="h-4 w-4 mr-2" />
                  Assinar
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16"
        >
          <div className="grid lg:grid-cols-6 gap-12">
            {/* Company Info */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center space-x-3 mb-6"
              >
                <motion.div
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-green-600"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Cloud className="h-6 w-6 text-white" />
                </motion.div>
                <span className="text-2xl font-bold text-foreground">
                  Aplot<span className="text-primary">Cloud</span>
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-muted-foreground mb-6 leading-relaxed"
              >
                Infraestrutura cloud premium para empresas que buscam performance, 
                segurança e confiabilidade em seus projetos digitais.
              </motion.p>

              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((contact, index) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-200 group"
                  >
                    <motion.div
                      className="w-5 h-5 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <contact.icon className="h-4 w-4" />
                    </motion.div>
                    <span className="text-sm">{contact.value}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Footer Links */}
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                variants={itemVariants}
                transition={{ delay: sectionIndex * 0.1 }}
                className="lg:col-span-1"
              >
                <h4 className="text-lg font-semibold text-foreground mb-6">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: sectionIndex * 0.1 + linkIndex * 0.05 }}
                    >
                      <motion.a
                        href={link.href}
                        className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200 group"
                        whileHover={{ x: 4 }}
                      >
                        <link.icon className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        <span className="text-sm">{link.name}</span>
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-border/30 py-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center space-x-2 text-muted-foreground"
            >
              <span className="text-sm">
                © 2024 AplotCloud. Todos os direitos reservados.
              </span>
              <span className="text-sm">Feito com</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="h-4 w-4 text-red-500 fill-current" />
              </motion.div>
              <span className="text-sm">no Brasil</span>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center space-x-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 rounded-xl bg-gradient-to-r from-card/60 to-card/30 border border-border/30 flex items-center justify-center text-muted-foreground ${social.color} transition-all duration-200 hover:border-primary/30`}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
