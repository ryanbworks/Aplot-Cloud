'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/stores/use-app-store';
import { Cloud, Zap, Shield, Users } from 'lucide-react';

export default function Home() {
  const { theme, setTheme } = useAppStore();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <Cloud className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Aplot Cloud</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <Button
              variant="ghost"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </Button>
            <Button>Entrar</Button>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-foreground mb-6"
          >
            Plataforma{' '}
            <span className="text-primary">Modern</span>
            <br />
            para seus Projetos
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Desenvolva, gerencie e escale seus projetos com a mais avançada 
            tecnologia do mercado. Interface elegante e performance excepcional.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="text-lg px-8 py-6">
              Começar Agora
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Ver Demo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid md:grid-cols-3 gap-8"
        >
          <div className="text-center p-6 rounded-lg border border-border/40 hover:border-primary/40 transition-colors">
            <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Performance
            </h3>
            <p className="text-muted-foreground">
              Otimizado para máxima velocidade e eficiência em todos os dispositivos.
            </p>
          </div>
          
          <div className="text-center p-6 rounded-lg border border-border/40 hover:border-primary/40 transition-colors">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Segurança
            </h3>
            <p className="text-muted-foreground">
              Proteção avançada para seus dados e projetos com criptografia de ponta.
            </p>
          </div>
          
          <div className="text-center p-6 rounded-lg border border-border/40 hover:border-primary/40 transition-colors">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Colaboração
            </h3>
            <p className="text-muted-foreground">
              Trabalhe em equipe com ferramentas de colaboração integradas.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Aplot Cloud. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
