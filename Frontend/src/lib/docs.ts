import { Category, Article, SearchResult } from '@/types/docs';
import { logger } from '@/lib/logger';
import { apiClient, type ApiError } from '@/lib/api-client';
import { searchRateLimiter, apiRateLimiter } from '@/lib/rate-limiter';

/**
 * Obtém todas as categorias disponíveis
 * @returns Array de categorias com contagem de artigos
 * @throws ApiError se houver erro na requisição
 */
export async function getCategories(): Promise<Category[]> {
  const key = 'get-categories';
  
  // Verificar rate limit
  if (!apiRateLimiter.canMakeRequest(key)) {
    const timeRemaining = apiRateLimiter.getTimeUntilReset(key);
    throw new Error(`Muitas requisições. Tente novamente em ${Math.ceil(timeRemaining / 1000)} segundos.`);
  }

  try {
    const categories = await apiClient.get<Category[]>('/api/docs/categories');
    return categories;
  } catch (error) {
    logger.error('Erro ao buscar categorias:', error);
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Erro ao buscar categorias');
  }
}

/**
 * Obtém todos os artigos de uma categoria específica
 * @param categoryId - ID da categoria
 * @returns Array de artigos da categoria
 * @throws ApiError se houver erro na requisição
 */
export async function getArticlesByCategory(categoryId: string): Promise<Article[]> {
  const key = `get-articles-${categoryId}`;
  
  // Verificar rate limit
  if (!apiRateLimiter.canMakeRequest(key)) {
    const timeRemaining = apiRateLimiter.getTimeUntilReset(key);
    throw new Error(`Muitas requisições. Tente novamente em ${Math.ceil(timeRemaining / 1000)} segundos.`);
  }

  try {
    const articles = await apiClient.get<Article[]>(`/api/docs/articles?category=${encodeURIComponent(categoryId)}`);
    return articles;
  } catch (error) {
    logger.error('Erro ao buscar artigos:', error);
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Erro ao buscar artigos');
  }
}

/**
 * Obtém um artigo específico
 * @param categoryId - ID da categoria
 * @param slug - Slug do artigo
 * @returns Artigo encontrado ou null se não encontrado
 * @throws ApiError se houver erro na requisição
 */
export async function getArticle(categoryId: string, slug: string): Promise<Article | null> {
  const key = `get-article-${categoryId}-${slug}`;
  
  // Verificar rate limit
  if (!apiRateLimiter.canMakeRequest(key)) {
    const timeRemaining = apiRateLimiter.getTimeUntilReset(key);
    throw new Error(`Muitas requisições. Tente novamente em ${Math.ceil(timeRemaining / 1000)} segundos.`);
  }

  try {
    const article = await apiClient.get<Article>(
      `/api/docs/articles?category=${encodeURIComponent(categoryId)}&slug=${encodeURIComponent(slug)}`
    );
    return article;
  } catch (error) {
    const apiError = error as ApiError;
    
    // Se for 404, retornar null (artigo não encontrado)
    if (apiError.status === 404) {
      return null;
    }
    
    logger.error('Erro ao buscar artigo:', error);
    throw new Error(apiError.message || 'Erro ao buscar artigo');
  }
}

/**
 * Busca artigos por query
 * @param query - Termo de busca
 * @returns Array de resultados de busca
 * @throws ApiError se houver erro na requisição ou rate limit excedido
 */
export async function searchArticles(query: string): Promise<SearchResult[]> {
  const key = 'search-articles';
  
  // Verificar rate limit (mais restritivo para buscas)
  if (!searchRateLimiter.canMakeRequest(key)) {
    const timeRemaining = searchRateLimiter.getTimeUntilReset(key);
    throw new Error(`Muitas buscas. Aguarde ${Math.ceil(timeRemaining / 1000)} segundos antes de tentar novamente.`);
  }

  try {
    const results = await apiClient.get<SearchResult[]>(
      `/api/docs/articles?search=${encodeURIComponent(query)}`
    );
    return results;
  } catch (error) {
    logger.error('Erro ao buscar artigos:', error);
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Erro ao buscar artigos');
  }
}

/**
 * Obtém todos os artigos disponíveis
 * @returns Array com todos os artigos
 * @throws ApiError se houver erro na requisição
 */
export async function getAllArticles(): Promise<Article[]> {
  const key = 'get-all-articles';
  
  // Verificar rate limit
  if (!apiRateLimiter.canMakeRequest(key)) {
    const timeRemaining = apiRateLimiter.getTimeUntilReset(key);
    throw new Error(`Muitas requisições. Tente novamente em ${Math.ceil(timeRemaining / 1000)} segundos.`);
  }

  try {
    const articles = await apiClient.get<Article[]>('/api/docs/articles');
    return articles;
  } catch (error) {
    logger.error('Erro ao buscar artigos:', error);
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Erro ao buscar artigos');
  }
}

/**
 * Obtém artigos relacionados a um artigo atual
 * @param currentArticle - Artigo atual
 * @param limit - Número máximo de artigos relacionados (padrão: 3)
 * @returns Array de artigos relacionados
 */
export async function getRelatedArticles(currentArticle: Article, limit: number = 3): Promise<Article[]> {
  try {
    const sameCategoryArticles = await getArticlesByCategory(currentArticle.category);
    return sameCategoryArticles
      .filter(article => article.slug !== currentArticle.slug)
      .slice(0, limit);
  } catch (error) {
    logger.error('Erro ao buscar artigos relacionados:', error);
    return [];
  }
}

/**
 * Obtém estatísticas gerais da documentação
 * @returns Estatísticas da documentação
 */
export async function getDocsStats() {
  try {
    const [allArticles, categories] = await Promise.all([
      getAllArticles(),
      getCategories(),
    ]);
    
    return {
      totalArticles: allArticles.length,
      totalCategories: categories.length,
      totalWords: allArticles.reduce((sum, article) => sum + article.content.split(/\s+/).length, 0),
      averageReadTime: Math.round(allArticles.reduce((sum, article) => sum + article.readTime, 0) / allArticles.length) || 0
    };
  } catch (error) {
    logger.error('Erro ao buscar estatísticas:', error);
    return {
      totalArticles: 0,
      totalCategories: 0,
      totalWords: 0,
      averageReadTime: 0,
    };
  }
}
