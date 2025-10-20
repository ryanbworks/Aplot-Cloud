'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-background to-green-500/5">
      {/* Background decorativo minimalista */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-2xl w-full relative z-10 text-center">
        {/* Código 404 */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-green-600 mb-4">
            404
          </div>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-green-500 to-transparent rounded-full" />
        </div>

        {/* Título e descrição */}
        <div className="space-y-4 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Página não encontrada
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            A página que você está procurando não existe ou foi removida.
          </p>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link href="/">
            <Button 
              size="lg"
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300"
            >
              <Home className="w-5 h-5 mr-2" />
              Página Inicial
            </Button>
          </Link>
          
          <Link href="/dashboard">
            <Button 
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-green-500/30 text-green-500 hover:bg-green-500/10 hover:border-green-500/50 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Dashboard
            </Button>
          </Link>
        </div>

        {/* Mensagem de ajuda */}
        <div className="max-w-md mx-auto">
          <div className="p-4 rounded-lg border border-green-500/20 bg-green-500/5">
            <p className="text-sm text-muted-foreground">
              <span className="text-green-500 font-semibold">💡 Dica:</span> Verifique se o endereço está correto ou volte para o início.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}