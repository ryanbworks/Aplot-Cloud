/**
 * Cliente HTTP com tratamento de erros centralizado, retry logic e toast notifications
 * 
 * @module api-client
 * @description Fornece um cliente HTTP robusto com retry automático, timeout configurável
 * e tratamento centralizado de erros. Ideal para substituir fetch() direto em toda a aplicação.
 */

import { logger } from './logger';

/**
 * Opções de configuração do cliente API
 */
export interface ApiClientOptions {
  /** Timeout em milissegundos (padrão: 10000) */
  timeout?: number;
  /** Número de tentativas de retry (padrão: 2) */
  retries?: number;
  /** Delay entre tentativas em milissegundos (padrão: 1000) */
  retryDelay?: number;
  /** Mostrar toast em caso de erro (padrão: true) */
  showToastOnError?: boolean;
}

/**
 * Estrutura de erro da API
 */
export interface ApiError {
  /** Mensagem de erro */
  message: string;
  /** Status HTTP (se disponível) */
  status?: number;
  /** Status text HTTP (se disponível) */
  statusText?: string;
  /** Dados adicionais do erro (se disponível) */
  data?: unknown;
}

/**
 * Cliente HTTP com retry logic e tratamento de erros
 * 
 * @class ApiClient
 * @example
 * ```typescript
 * const client = new ApiClient({ timeout: 5000, retries: 3 });
 * const data = await client.get<User>('/api/user');
 * ```
 */
class ApiClient {
  private defaultTimeout: number;
  private defaultRetries: number;
  private defaultRetryDelay: number;
  private showToastOnError: boolean;

  constructor(options: ApiClientOptions = {}) {
    this.defaultTimeout = options.timeout || 10000; // 10 segundos
    this.defaultRetries = options.retries || 2;
    this.defaultRetryDelay = options.retryDelay || 1000; // 1 segundo
    this.showToastOnError = options.showToastOnError ?? true;
  }

  /**
   * Cria um AbortController com timeout configurado
   * @param timeout - Timeout em milissegundos
   * @returns AbortController configurado
   * @private
   */
  private createTimeoutController(timeout: number): AbortController {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    // Limpar timeout quando a requisição completar
    controller.signal.addEventListener('abort', () => {
      clearTimeout(timeoutId);
    });

    return controller;
  }

  /**
   * Aguarda um tempo especificado antes de continuar
   * @param ms - Tempo em milissegundos
   * @returns Promise que resolve após o tempo especificado
   * @private
   */
  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Formata mensagem de erro para exibição ao usuário
   * @param error - Erro ocorrido
   * @param defaultMessage - Mensagem padrão caso o erro não tenha mensagem
   * @returns Mensagem de erro formatada
   * @private
   */
  private getErrorMessage(error: unknown, defaultMessage: string): string {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return 'A requisição demorou muito para responder. Tente novamente.';
      }
      return error.message || defaultMessage;
    }
    return defaultMessage;
  }

  /**
   * Verifica se um erro pode ser retentado
   * @param status - Status HTTP (opcional)
   * @param error - Objeto de erro (opcional)
   * @returns true se o erro pode ser retentado
   * @private
   */
  private isRetryableError(status?: number, error?: Error): boolean {
    if (error?.name === 'AbortError') {
      return true; // Timeout é retryable
    }
    
    if (!status) {
      return true; // Erros de rede são retryable
    }

    // Retry em erros 5xx e 429 (rate limit)
    return status >= 500 || status === 429;
  }

  /**
   * Executa uma requisição HTTP com lógica de retry automático
   * @param url - URL da requisição
   * @param options - Opções da requisição fetch
   * @param timeout - Timeout em milissegundos
   * @param retries - Número de tentativas
   * @returns Promise com a resposta da requisição
   * @throws ApiError se todas as tentativas falharem
   * @private
   */
  private async fetchWithRetry(
    url: string,
    options: RequestInit,
    timeout: number,
    retries: number
  ): Promise<Response> {
    let lastError: Error | null = null;
    let lastStatus: number | undefined;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = this.createTimeoutController(timeout);
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        // Se a resposta é bem-sucedida, retornar
        if (response.ok) {
          return response;
        }

        lastStatus = response.status;
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || `HTTP ${response.status}: ${response.statusText}`;
        const apiError: ApiError & Error = Object.assign(new Error(errorMessage), {
          message: errorMessage,
          status: response.status,
          statusText: response.statusText,
          data: errorData,
        });

        // Se não é retryable, lançar erro imediatamente
        if (!this.isRetryableError(response.status)) {
          throw apiError;
        }

        // Se é a última tentativa, lançar erro
        if (attempt === retries) {
          throw apiError;
        }

        // Aguardar antes de retentar
        await this.sleep(this.defaultRetryDelay * (attempt + 1));
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Erro desconhecido');

        // Se não é retryable, lançar erro imediatamente
        if (!this.isRetryableError(lastStatus, lastError)) {
          throw lastError;
        }

        // Se é a última tentativa, lançar erro
        if (attempt === retries) {
          throw lastError;
        }

        // Log da tentativa
        logger.warn(`Tentativa ${attempt + 1}/${retries + 1} falhou para ${url}:`, lastError);

        // Aguardar antes de retentar
        await this.sleep(this.defaultRetryDelay * (attempt + 1));
      }
    }

    throw lastError || new Error('Erro desconhecido');
  }

  /**
   * Executa uma requisição GET
   * @param url - URL da requisição
   * @param options - Opções adicionais (timeout, retries, headers, etc.)
   * @returns Promise com os dados da resposta
   * @throws ApiError se a requisição falhar
   * @template T - Tipo dos dados retornados
   * 
   * @example
   * ```typescript
   * const users = await apiClient.get<User[]>('/api/users');
   * ```
   */
  async get<T>(
    url: string,
    options: RequestInit & { timeout?: number; retries?: number; cache?: RequestCache } = {}
  ): Promise<T> {
    const { timeout = this.defaultTimeout, retries = this.defaultRetries, cache, ...fetchOptions } = options;

    try {
      const response = await this.fetchWithRetry(
        url,
        {
          ...fetchOptions,
          method: 'GET',
          cache: cache || 'no-store',
          headers: {
            'Content-Type': 'application/json',
            ...fetchOptions.headers,
          },
        },
        timeout,
        retries
      );

      const data = await response.json();
      return data as T;
    } catch (error) {
      logger.error(`Erro na requisição GET para ${url}:`, error);
      
      // Se o erro já é um ApiError, re-lançar
      if (error && typeof error === 'object' && 'status' in error && 'message' in error) {
        throw error as ApiError;
      }
      
      const errorMessage = this.getErrorMessage(error, 'Erro ao buscar dados');
      
      throw {
        message: errorMessage,
        status: (error as ApiError).status,
        statusText: (error as ApiError).statusText,
        data: (error as ApiError).data,
      } as ApiError;
    }
  }

  /**
   * Executa uma requisição POST
   * @param url - URL da requisição
   * @param body - Corpo da requisição (será serializado para JSON)
   * @param options - Opções adicionais (timeout, retries, headers, etc.)
   * @returns Promise com os dados da resposta
   * @throws ApiError se a requisição falhar
   * @template T - Tipo dos dados retornados
   * 
   * @example
   * ```typescript
   * const user = await apiClient.post<User>('/api/users', { name: 'John', email: 'john@example.com' });
   * ```
   */
  async post<T>(
    url: string,
    body: unknown,
    options: RequestInit & { timeout?: number; retries?: number } = {}
  ): Promise<T> {
    const { timeout = this.defaultTimeout, retries = this.defaultRetries, ...fetchOptions } = options;

    try {
      const response = await this.fetchWithRetry(
        url,
        {
          ...fetchOptions,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...fetchOptions.headers,
          },
          body: JSON.stringify(body),
        },
        timeout,
        retries
      );

      const data = await response.json();
      return data as T;
    } catch (error) {
      logger.error(`Erro na requisição POST para ${url}:`, error);
      
      // Se o erro já é um ApiError, re-lançar
      if (error && typeof error === 'object' && 'status' in error && 'message' in error) {
        throw error as ApiError;
      }
      
      const errorMessage = this.getErrorMessage(error, 'Erro ao enviar dados');
      
      throw {
        message: errorMessage,
        status: (error as ApiError).status,
        statusText: (error as ApiError).statusText,
        data: (error as ApiError).data,
      } as ApiError;
    }
  }
}

/**
 * Instância padrão do cliente API
 * Configurada com timeout de 10s, 2 retries e delay de 1s entre tentativas
 * 
 * @example
 * ```typescript
 * import { apiClient } from '@/lib/api-client';
 * const data = await apiClient.get('/api/endpoint');
 * ```
 */
export const apiClient = new ApiClient({
  timeout: 10000,
  retries: 2,
  retryDelay: 1000,
  showToastOnError: true,
});

