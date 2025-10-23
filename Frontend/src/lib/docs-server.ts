import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
// Icons are now stored as strings in the categories array
import { Category, Article, SearchResult } from '@/types/docs';

// Configuração das categorias
export const categories = [
  {
    id: 'primeiros-passos',
    name: 'Primeiros Passos',
    icon: 'Rocket',
    description: 'Comece aqui! Guias essenciais para novos usuários',
    color: 'from-blue-500 to-blue-600',
    articleCount: 0
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    icon: 'Gamepad2',
    description: 'Tudo sobre servidores de Minecraft',
    color: 'from-green-500 to-green-600',
    articleCount: 0
  },
  {
    id: 'discord-bot',
    name: 'Discord Bot',
    icon: 'Bot',
    description: 'Hospedagem e configuração de bots',
    color: 'from-purple-500 to-purple-600',
    articleCount: 0
  },
  {
    id: 'vps',
    name: 'VPS',
    icon: 'Server',
    description: 'Servidores virtuais e configurações',
    color: 'from-orange-500 to-orange-600',
    articleCount: 0
  },
  {
    id: 'faturamento',
    name: 'Faturamento',
    icon: 'Wallet',
    description: 'Pagamentos, faturas e renovação',
    color: 'from-emerald-500 to-emerald-600',
    articleCount: 0
  },
  {
    id: 'faq',
    name: 'FAQ',
    icon: 'HelpCircle',
    description: 'Perguntas frequentes e troubleshooting',
    color: 'from-red-500 to-red-600',
    articleCount: 0
  }
];

// Função para calcular tempo de leitura
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Função para ler arquivos Markdown
function readMarkdownFile(filePath: string): Article | null {
  try {
    if (!fs.existsSync(filePath)) return null;
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);
    
    const slug = path.basename(filePath, '.md');
    const category = path.basename(path.dirname(filePath));
    
    return {
      slug,
      title: frontmatter.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: frontmatter.description || '',
      category,
      tags: frontmatter.tags || [],
      author: frontmatter.author,
      date: frontmatter.date || new Date().toISOString(),
      readTime: calculateReadTime(content),
      content
    };
  } catch (error) {
    console.error(`Erro ao ler arquivo ${filePath}:`, error);
    return null;
  }
}

// Função para obter todas as categorias
export function getCategories(): Category[] {
  const categoriesWithCount = categories.map(category => {
    const articles = getArticlesByCategory(category.id);
    return {
      ...category,
      articleCount: articles.length
    };
  });
  
  return categoriesWithCount;
}

// Função para obter artigos de uma categoria
export function getArticlesByCategory(categoryId: string): Article[] {
  const docsPath = path.join(process.cwd(), 'public', 'docs', categoryId);
  
  if (!fs.existsSync(docsPath)) return [];
  
  const files = fs.readdirSync(docsPath);
  const markdownFiles = files.filter(file => file.endsWith('.md'));
  
  const articles = markdownFiles
    .map(file => {
      const filePath = path.join(docsPath, file);
      return readMarkdownFile(filePath);
    })
    .filter((article): article is Article => article !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return articles;
}

// Função para obter um artigo específico
export function getArticle(categoryId: string, slug: string): Article | null {
  const filePath = path.join(process.cwd(), 'public', 'docs', categoryId, `${slug}.md`);
  return readMarkdownFile(filePath);
}

// Função para buscar artigos
export function searchArticles(query: string): SearchResult[] {
  const allCategories = getCategories();
  const results: SearchResult[] = [];
  
  allCategories.forEach(category => {
    const articles = getArticlesByCategory(category.id);
    
    articles.forEach(article => {
      const searchText = `${article.title} ${article.description} ${article.content} ${article.tags.join(' ')}`.toLowerCase();
      const queryLower = query.toLowerCase();
      
      if (searchText.includes(queryLower)) {
        // Calcular score de relevância simples
        let score = 0;
        if (article.title.toLowerCase().includes(queryLower)) score += 10;
        if (article.description.toLowerCase().includes(queryLower)) score += 5;
        if (article.tags.some(tag => tag.toLowerCase().includes(queryLower))) score += 3;
        if (article.content.toLowerCase().includes(queryLower)) score += 1;
        
        results.push({
          article,
          category,
          relevanceScore: score
        });
      }
    });
  });
  
  // Ordenar por relevância
  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

// Função para obter todos os artigos
export function getAllArticles(): Article[] {
  const allCategories = getCategories();
  const allArticles: Article[] = [];
  
  allCategories.forEach(category => {
    const articles = getArticlesByCategory(category.id);
    allArticles.push(...articles);
  });
  
  return allArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Função para obter artigos relacionados
export function getRelatedArticles(currentArticle: Article, limit: number = 3): Article[] {
  const sameCategoryArticles = getArticlesByCategory(currentArticle.category)
    .filter(article => article.slug !== currentArticle.slug)
    .slice(0, limit);
  
  return sameCategoryArticles;
}

// Função para obter estatísticas gerais
export function getDocsStats() {
  const allArticles = getAllArticles();
  const categories = getCategories();
  
  return {
    totalArticles: allArticles.length,
    totalCategories: categories.length,
    totalWords: allArticles.reduce((sum, article) => sum + article.content.split(/\s+/).length, 0),
    averageReadTime: Math.round(allArticles.reduce((sum, article) => sum + article.readTime, 0) / allArticles.length) || 0
  };
}
