'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-b from-background via-background to-green-500/5">
      {/* Background decorativo com linhas */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent blur-3xl animate-pulse" />
        </div>
        
        {/* Linhas decorativas */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-green-500/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-green-500/20 to-transparent" />
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <div className="text-center space-y-8">
          {/* Código de erro 404 */}
          <div className="relative">
            <div className="text-[200px] md:text-[280px] font-black leading-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-green-500 via-green-400 to-emerald-500 drop-shadow-2xl">
                404
              </span>
            </div>
            
            {/* Linha decorativa abaixo do 404 */}
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-green-500 to-transparent rounded-full" />
          </div>

          {/* Título e descrição */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Página Não Encontrada
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              A página que você está procurando não existe ou foi removida.
              <br />
              Que tal voltar para uma página que existe?
            </p>
          </div>

          {/* Cards de navegação */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto pt-8">
            <Link href="/" className="group">
              <div className="relative h-full p-8 rounded-xl border border-border bg-card/30 backdrop-blur-sm transition-all duration-300 hover:border-green-500/50 hover:bg-green-500/5 hover:-translate-y-2 hover:shadow-xl hover:shadow-green-500/10">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-8 h-8 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-green-500 transition-colors">
                      Página Inicial
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Retorne para o início
                    </p>
                  </div>
                </div>
                
                {/* Indicador de hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-xl" />
              </div>
            </Link>

            <Link href="/dashboard" className="group">
              <div className="relative h-full p-8 rounded-xl border border-border bg-card/30 backdrop-blur-sm transition-all duration-300 hover:border-green-500/50 hover:bg-green-500/5 hover:-translate-y-2 hover:shadow-xl hover:shadow-green-500/10">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-8 h-8 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
                      />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-green-500 transition-colors">
                      Dashboard
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Acesse seu painel
                    </p>
                  </div>
                </div>
                
                {/* Indicador de hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-xl" />
              </div>
            </Link>

            <Link href="/status" className="group">
              <div className="relative h-full p-8 rounded-xl border border-border bg-card/30 backdrop-blur-sm transition-all duration-300 hover:border-green-500/50 hover:bg-green-500/5 hover:-translate-y-2 hover:shadow-xl hover:shadow-green-500/10">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-8 h-8 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-green-500 transition-colors">
                      Status
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Veja o status dos serviços
                    </p>
                  </div>
                </div>
                
                {/* Indicador de hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-xl" />
              </div>
            </Link>
          </div>

          {/* Botão principal */}
          <div className="pt-8">
            <Link href="/">
              <Button 
                size="lg"
                className="text-base px-8 py-6 bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Voltar para o Início
              </Button>
            </Link>
          </div>

          {/* Mensagem de ajuda */}
          <div className="max-w-xl mx-auto pt-8">
            <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/5 backdrop-blur-sm">
              <p className="text-sm text-muted-foreground">
                <span className="text-green-500 font-semibold">💡 Dica:</span> Verifique se o endereço está correto ou entre em contato com o suporte se o problema persistir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
