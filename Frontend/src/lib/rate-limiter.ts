/**
 * Utilitário de rate limiting no frontend
 * Limita o número de requisições por período de tempo para prevenir abuso
 * 
 * @module rate-limiter
 * @description Implementa rate limiting básico usando Map para armazenar timestamps.
 * Útil para limitar requisições de busca, APIs e outras operações que podem ser abusadas.
 */

/**
 * Entrada de rate limit
 */
interface RateLimitEntry {
  /** Contador de requisições */
  count: number;
  /** Timestamp de quando o limite será resetado */
  resetTime: number;
}

/**
 * Classe para gerenciar rate limiting no frontend
 * 
 * @class RateLimiter
 * @example
 * ```typescript
 * const limiter = new RateLimiter(60000, 10); // 10 requisições por minuto
 * if (limiter.canMakeRequest('api-call')) {
 *   await makeApiCall();
 * } else {
 *   console.log(`Aguarde ${limiter.getTimeUntilReset('api-call')}ms`);
 * }
 * ```
 */
class RateLimiter {
  private requests: Map<string, RateLimitEntry>;
  private readonly defaultWindowMs: number;
  private readonly defaultMaxRequests: number;

  constructor(windowMs: number = 60000, maxRequests: number = 10) {
    this.requests = new Map();
    this.defaultWindowMs = windowMs;
    this.defaultMaxRequests = maxRequests;
  }

  /**
   * Verifica se uma requisição pode ser feita
   * @param key - Chave única para identificar a requisição (ex: 'search', 'api-call')
   * @param maxRequests - Número máximo de requisições (opcional, usa o padrão se não fornecido)
   * @param windowMs - Janela de tempo em milissegundos (opcional, usa o padrão se não fornecido)
   * @returns true se a requisição pode ser feita, false caso contrário
   */
  canMakeRequest(
    key: string,
    maxRequests?: number,
    windowMs?: number
  ): boolean {
    const now = Date.now();
    const limit = maxRequests ?? this.defaultMaxRequests;
    const window = windowMs ?? this.defaultWindowMs;

    const entry = this.requests.get(key);

    // Se não existe entrada ou a janela expirou, criar nova entrada
    if (!entry || now > entry.resetTime) {
      this.requests.set(key, {
        count: 1,
        resetTime: now + window,
      });
      return true;
    }

    // Se ainda está na janela, verificar se pode fazer mais requisições
    if (entry.count < limit) {
      entry.count++;
      return true;
    }

    // Limite excedido
    return false;
  }

  /**
   * Retorna o tempo restante até a próxima requisição permitida
   * @param key - Chave única para identificar a requisição
   * @returns Tempo restante em milissegundos, ou 0 se pode fazer requisição
   */
  getTimeUntilReset(key: string): number {
    const entry = this.requests.get(key);
    if (!entry) {
      return 0;
    }

    const now = Date.now();
    const timeRemaining = entry.resetTime - now;
    return timeRemaining > 0 ? timeRemaining : 0;
  }

  /**
   * Reseta o contador para uma chave específica
   * @param key - Chave única para identificar a requisição
   */
  reset(key: string): void {
    this.requests.delete(key);
  }

  /**
   * Limpa todas as entradas expiradas
   */
  cleanExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.requests.entries()) {
      if (now > entry.resetTime) {
        this.requests.delete(key);
      }
    }
  }

  /**
   * Limpa todas as entradas
   */
  clear(): void {
    this.requests.clear();
  }
}

/**
 * Instância padrão do rate limiter
 * Configurada para 10 requisições por minuto
 */
export const rateLimiter = new RateLimiter(60000, 10);

/**
 * Rate limiter específico para buscas
 * Configurado para 3 buscas por segundo (mais restritivo)
 * 
 * @example
 * ```typescript
 * import { searchRateLimiter } from '@/lib/rate-limiter';
 * if (searchRateLimiter.canMakeRequest('search')) {
 *   await performSearch();
 * }
 * ```
 */
export const searchRateLimiter = new RateLimiter(1000, 3);

/**
 * Rate limiter para APIs gerais
 * Configurado para 30 requisições por minuto
 * 
 * @example
 * ```typescript
 * import { apiRateLimiter } from '@/lib/rate-limiter';
 * if (apiRateLimiter.canMakeRequest('api-call')) {
 *   await makeApiCall();
 * }
 * ```
 */
export const apiRateLimiter = new RateLimiter(60000, 30);

