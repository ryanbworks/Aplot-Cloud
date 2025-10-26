import { Category, Article, SearchResult } from '@/types/docs';

// Função para obter todas as categorias
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch('/api/docs/categories', { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) throw new Error('Erro ao buscar categorias');
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return [];
  }
}

// Função para obter artigos de uma categoria
export async function getArticlesByCategory(categoryId: string): Promise<Article[]> {
  try {
    const response = await fetch(`/api/docs/articles?category=${categoryId}`, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) throw new Error('Erro ao buscar artigos');
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar artigos:', error);
    return [];
  }
}

// Função para obter um artigo específico
export async function getArticle(categoryId: string, slug: string): Promise<Article | null> {
  try {
    const response = await fetch(`/api/docs/articles?category=${categoryId}&slug=${slug}`, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar artigo:', error);
    return null;
  }
}

// Função para buscar artigos
export async function searchArticles(query: string): Promise<SearchResult[]> {
  try {
    // Use relative URL for internal API calls
    const response = await fetch(`/api/docs/articles?search=${encodeURIComponent(query)}`, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar artigos:', error);
    return [];
  }
}

// Função para obter todos os artigos
export async function getAllArticles(): Promise<Article[]> {
  try {
    const response = await fetch('/api/docs/articles', { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) throw new Error('Erro ao buscar artigos');
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar artigos:', error);
    return [];
  }
}

// Função para obter artigos relacionados
export async function getRelatedArticles(currentArticle: Article, limit: number = 3): Promise<Article[]> {
  const sameCategoryArticles = await getArticlesByCategory(currentArticle.category);
  return sameCategoryArticles
    .filter(article => article.slug !== currentArticle.slug)
    .slice(0, limit);
}

// Função para obter estatísticas gerais
export async function getDocsStats() {
  const allArticles = await getAllArticles();
  const categories = await getCategories();
  
  return {
    totalArticles: allArticles.length,
    totalCategories: categories.length,
    totalWords: allArticles.reduce((sum, article) => sum + article.content.split(/\s+/).length, 0),
    averageReadTime: Math.round(allArticles.reduce((sum, article) => sum + article.readTime, 0) / allArticles.length) || 0
  };
}
