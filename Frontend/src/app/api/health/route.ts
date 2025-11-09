import { NextResponse } from 'next/server';
import { serverLogger } from '@/lib/logger-server';

/**
 * Handler GET para rota de health check
 * Retorna status de saúde da aplicação
 */
export async function GET() {
  try {
    // Verificar se a aplicação está funcionando
    const healthCheck = {
      status: 'healthy' as const,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
    };

    serverLogger.debug('Health check realizado com sucesso');
    return NextResponse.json(healthCheck, { status: 200 });
  } catch (error) {
    serverLogger.error('Erro no health check:', error);
    
    // Em produção, não expor detalhes do erro
    const errorMessage = process.env.NODE_ENV === 'production'
      ? 'Unknown error'
      : error instanceof Error
      ? error.message
      : 'Unknown error';

    return NextResponse.json(
      {
        status: 'unhealthy' as const,
        error: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
