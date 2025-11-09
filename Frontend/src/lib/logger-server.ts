/**
 * Utilitário de logging para servidor (API routes)
 * Remove logs em produção e pode ser estendido para enviar logs para serviços externos
 * 
 * @module logger-server
 * @description Logger específico para uso em rotas de API do Next.js.
 * Diferente do logger client-side, este é otimizado para ambiente servidor.
 */

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Níveis de log disponíveis
 */
type LogLevel = 'log' | 'error' | 'warn' | 'info' | 'debug';

/**
 * Entrada de log
 */
interface LogEntry {
  /** Nível do log */
  level: LogLevel;
  /** Mensagem do log */
  message: string;
  /** Dados adicionais (opcional) */
  data?: unknown;
  /** Timestamp do log */
  timestamp: string;
  /** Caminho da requisição (opcional) */
  path?: string;
  /** Método HTTP (opcional) */
  method?: string;
}

/**
 * Logger para servidor (API routes)
 * 
 * @class ServerLogger
 * @example
 * ```typescript
 * import { serverLogger } from '@/lib/logger-server';
 * serverLogger.info('Requisição processada');
 * serverLogger.error('Erro ao processar:', error);
 * ```
 */
class ServerLogger {
  private logEntry(level: LogLevel, message: string, ...args: unknown[]): void {
    const entry: LogEntry = {
      level,
      message,
      data: args.length > 0 ? args : undefined,
      timestamp: new Date().toISOString(),
    };

    // Em desenvolvimento, usar console
    if (isDevelopment) {
      switch (level) {
        case 'error':
          console.error(`[SERVER ${entry.timestamp}]`, message, ...args);
          break;
        case 'warn':
          console.warn(`[SERVER ${entry.timestamp}]`, message, ...args);
          break;
        case 'info':
          console.info(`[SERVER ${entry.timestamp}]`, message, ...args);
          break;
        case 'debug':
          console.debug(`[SERVER ${entry.timestamp}]`, message, ...args);
          break;
        default:
          console.log(`[SERVER ${entry.timestamp}]`, message, ...args);
      }
    }

    // Em produção, você pode enviar para um serviço de logging
    // Exemplo: Sentry, LogRocket, etc.
    if (!isDevelopment && level === 'error') {
      // TODO: Enviar para serviço de logging em produção
      // sendToLoggingService(entry);
    }
  }

  /**
   * Log de nível padrão
   * @param message - Mensagem do log
   * @param args - Argumentos adicionais
   */
  log(message: string, ...args: unknown[]): void {
    this.logEntry('log', message, ...args);
  }

  /**
   * Log de erro
   * @param message - Mensagem do erro
   * @param args - Argumentos adicionais (geralmente o objeto de erro)
   */
  error(message: string, ...args: unknown[]): void {
    this.logEntry('error', message, ...args);
  }

  /**
   * Log de aviso
   * @param message - Mensagem do aviso
   * @param args - Argumentos adicionais
   */
  warn(message: string, ...args: unknown[]): void {
    this.logEntry('warn', message, ...args);
  }

  /**
   * Log informativo
   * @param message - Mensagem informativa
   * @param args - Argumentos adicionais
   */
  info(message: string, ...args: unknown[]): void {
    this.logEntry('info', message, ...args);
  }

  /**
   * Log de debug
   * @param message - Mensagem de debug
   * @param args - Argumentos adicionais
   */
  debug(message: string, ...args: unknown[]): void {
    this.logEntry('debug', message, ...args);
  }
}

/**
 * Instância padrão do logger para servidor
 * 
 * @example
 * ```typescript
 * import { serverLogger } from '@/lib/logger-server';
 * serverLogger.error('Erro ao processar requisição:', error);
 * ```
 */
export const serverLogger = new ServerLogger();

