/**
 * Hook para gerenciar estados de loading
 * Fornece utilitários para controlar múltiplos estados de loading simultaneamente
 */

import { useState, useCallback } from 'react';

interface LoadingState {
  [key: string]: boolean;
}

interface UseLoadingReturn {
  isLoading: (key?: string) => boolean;
  setLoading: (key: string, loading: boolean) => void;
  withLoading: <T>(key: string, asyncFn: () => Promise<T>) => Promise<T>;
  loadingStates: LoadingState;
}

/**
 * Hook para gerenciar estados de loading
 * @param initialStates - Estados iniciais de loading (opcional)
 * @returns Objeto com funções e estados de loading
 * 
 * @example
 * ```tsx
 * const { isLoading, setLoading, withLoading } = useLoading();
 * 
 * // Verificar se está carregando
 * if (isLoading('fetch')) {
 *   return <Loading />;
 * }
 * 
 * // Definir loading manualmente
 * setLoading('fetch', true);
 * 
 * // Usar com função assíncrona
 * await withLoading('fetch', async () => {
 *   const data = await fetchData();
 *   return data;
 * });
 * ```
 */
export function useLoading(initialStates: LoadingState = {}): UseLoadingReturn {
  const [loadingStates, setLoadingStates] = useState<LoadingState>(initialStates);

  /**
   * Verifica se um estado de loading está ativo
   * @param key - Chave do estado de loading. Se não fornecido, verifica se algum estado está ativo
   * @returns true se o estado está carregando
   */
  const isLoading = useCallback(
    (key?: string): boolean => {
      if (key === undefined) {
        // Se não há chave, verifica se algum estado está ativo
        return Object.values(loadingStates).some(Boolean);
      }
      return loadingStates[key] || false;
    },
    [loadingStates]
  );

  /**
   * Define o estado de loading para uma chave específica
   * @param key - Chave do estado de loading
   * @param loading - Valor do estado de loading
   */
  const setLoading = useCallback((key: string, loading: boolean) => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: loading,
    }));
  }, []);

  /**
   * Executa uma função assíncrona com controle automático de loading
   * @param key - Chave do estado de loading
   * @param asyncFn - Função assíncrona a ser executada
   * @returns Resultado da função assíncrona
   */
  const withLoading = useCallback(
    async <T,>(key: string, asyncFn: () => Promise<T>): Promise<T> => {
      setLoading(key, true);
      try {
        const result = await asyncFn();
        return result;
      } finally {
        setLoading(key, false);
      }
    },
    [setLoading]
  );

  return {
    isLoading,
    setLoading,
    withLoading,
    loadingStates,
  };
}

