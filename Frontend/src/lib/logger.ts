/**
 * Utilitário de logging que remove logs em produção
 * e pode ser estendido para enviar logs para serviços externos
 */

const isDevelopment = process.env.NODE_ENV === 'development';

type LogLevel = 'log' | 'error' | 'warn' | 'info' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: unknown;
  timestamp: string;
}

class Logger {
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
          console.error(`[${entry.timestamp}]`, message, ...args);
          break;
        case 'warn':
          console.warn(`[${entry.timestamp}]`, message, ...args);
          break;
        case 'info':
          console.info(`[${entry.timestamp}]`, message, ...args);
          break;
        case 'debug':
          console.debug(`[${entry.timestamp}]`, message, ...args);
          break;
        default:
          console.log(`[${entry.timestamp}]`, message, ...args);
      }
    }

    // Em produção, você pode enviar para um serviço de logging
    // Exemplo: Sentry, LogRocket, etc.
    if (!isDevelopment && level === 'error') {
      // TODO: Enviar para serviço de logging em produção
      // sendToLoggingService(entry);
    }
  }

  log(message: string, ...args: unknown[]): void {
    this.logEntry('log', message, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    this.logEntry('error', message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.logEntry('warn', message, ...args);
  }

  info(message: string, ...args: unknown[]): void {
    this.logEntry('info', message, ...args);
  }

  debug(message: string, ...args: unknown[]): void {
    this.logEntry('debug', message, ...args);
  }
}

export const logger = new Logger();

