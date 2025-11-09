import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ZodError } from 'zod';
import { SearchResult, Article } from '@/types/docs';
import { serverLogger } from '@/lib/logger-server';
import { articlesQuerySchema, categorySchema, slugSchema, searchQuerySchema } from '@/lib/validations/api';

/**
 * Calcula o tempo estimado de leitura de um conteúdo
 * @param content - Conteúdo do artigo
 * @returns Tempo estimado em minutos
 */
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Lê e processa um arquivo Markdown
 * @param filePath - Caminho do arquivo Markdown
 * @returns Objeto com dados do artigo ou null se houver erro
 */
function readMarkdownFile(filePath: string) {
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
    serverLogger.error(`Erro ao ler arquivo ${filePath}:`, error);
    return null;
  }
}

/**
 * Obtém todos os artigos de uma categoria específica
 * @param categoryId - ID da categoria
 * @returns Array de artigos da categoria, ordenados por data (mais recente primeiro)
 */
function getArticlesByCategory(categoryId: string) {
  const docsPath = path.join(process.cwd(), 'public', 'docs', categoryId);
  
  if (!fs.existsSync(docsPath)) return [];
  
  const files = fs.readdirSync(docsPath);
  const markdownFiles = files.filter(file => file.endsWith('.md'));
  
  const articles = markdownFiles
    .map(file => {
      const filePath = path.join(docsPath, file);
      return readMarkdownFile(filePath);
    })
    .filter(article => article !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return articles;
}

/**
 * Obtém um artigo específico
 * @param categoryId - ID da categoria
 * @param slug - Slug do artigo
 * @returns Artigo encontrado ou null se não encontrado
 */
function getArticle(categoryId: string, slug: string) {
  const filePath = path.join(process.cwd(), 'public', 'docs', categoryId, `${slug}.md`);
  return readMarkdownFile(filePath);
}

/**
 * Busca artigos por query de texto
 * @param query - Termo de busca
 * @returns Array de resultados de busca ordenados por relevância
 */
function searchArticles(query: string) {
  const categories = ['primeiros-passos', 'minecraft', 'discord-bot', 'vps', 'faturamento', 'faq'];
  const results: SearchResult[] = [];
  
  categories.forEach(categoryId => {
    const articles = getArticlesByCategory(categoryId);
    
    articles.forEach(article => {
      const searchText = `${article.title} ${article.description} ${article.content} ${article.tags.join(' ')}`.toLowerCase();
      const queryLower = query.toLowerCase();
      
      if (searchText.includes(queryLower)) {
        // Calcular score de relevância simples
        let score = 0;
        if (article.title.toLowerCase().includes(queryLower)) score += 10;
        if (article.description.toLowerCase().includes(queryLower)) score += 5;
        if (article.tags.some((tag: string) => tag.toLowerCase().includes(queryLower))) score += 3;
        if (article.content.toLowerCase().includes(queryLower)) score += 1;
        
        results.push({
          article,
          category: { 
            id: categoryId, 
            name: categoryId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
            icon: '',
            description: '',
            color: '',
            articleCount: 0
          },
          relevanceScore: score
        });
      }
    });
  });
  
  // Ordenar por relevância
  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

/**
 * Handler GET para rota de artigos
 * Suporta três tipos de requisição:
 * 1. Busca: ?search=query
 * 2. Artigo específico: ?category=id&slug=slug
 * 3. Artigos de categoria: ?category=id
 * 4. Todos os artigos: sem parâmetros
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const slug = searchParams.get('slug');
    const search = searchParams.get('search');

    // Validar parâmetros de query
    const validationResult = articlesQuerySchema.safeParse({
      category: category || undefined,
      slug: slug || undefined,
      search: search || undefined,
    });

    if (!validationResult.success) {
      serverLogger.warn('Validação de parâmetros falhou:', validationResult.error.issues);
      return NextResponse.json(
        {
          error: 'Parâmetros de query inválidos',
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    // Processar busca
    if (search) {
      try {
        const searchValidated = searchQuerySchema.parse(search);
        const results = searchArticles(searchValidated);
        serverLogger.info(`Busca realizada: "${searchValidated}" - ${results.length} resultados`);
        return NextResponse.json(results.slice(0, 8)); // Limit to 8 results
      } catch (error) {
        serverLogger.warn('Erro na validação de busca:', error);
        return NextResponse.json(
          { error: 'Query de busca inválida' },
          { status: 400 }
        );
      }
    }

    // Processar artigo específico
    if (category && slug) {
      try {
        const categoryValidated = categorySchema.parse(category);
        const slugValidated = slugSchema.parse(slug);
        const article = getArticle(categoryValidated, slugValidated);
        
        if (!article) {
          serverLogger.warn(`Artigo não encontrado: ${categoryValidated}/${slugValidated}`);
          return NextResponse.json(
            { error: 'Artigo não encontrado' },
            { status: 404 }
          );
        }
        
        serverLogger.info(`Artigo recuperado: ${categoryValidated}/${slugValidated}`);
        return NextResponse.json(article);
      } catch (error) {
        if (error instanceof ZodError) {
          serverLogger.warn('Erro na validação de categoria/slug:', error.issues);
          return NextResponse.json(
            { error: 'Categoria ou slug inválidos', details: error.issues },
            { status: 400 }
          );
        }
        throw error;
      }
    }

    // Processar artigos de uma categoria
    if (category) {
      try {
        const categoryValidated = categorySchema.parse(category);
        const articles = getArticlesByCategory(categoryValidated);
        serverLogger.info(`Artigos recuperados da categoria: ${categoryValidated} - ${articles.length} artigos`);
        return NextResponse.json(articles);
      } catch (error) {
        if (error instanceof ZodError) {
          serverLogger.warn('Erro na validação de categoria:', error.issues);
          return NextResponse.json(
            { error: 'Categoria inválida', details: error.issues },
            { status: 400 }
          );
        }
        throw error;
      }
    }

    // Retornar todos os artigos
    try {
      const allCategories = ['primeiros-passos', 'minecraft', 'discord-bot', 'vps', 'faturamento', 'faq'];
      const allArticles: Article[] = [];

      allCategories.forEach(categoryId => {
        const articles = getArticlesByCategory(categoryId);
        allArticles.push(...articles);
      });

      serverLogger.info(`Todos os artigos recuperados: ${allArticles.length} artigos`);
      return NextResponse.json(
        allArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      );
    } catch (error) {
      serverLogger.error('Erro ao recuperar todos os artigos:', error);
      throw error;
    }
  } catch (error) {
    serverLogger.error('Erro ao buscar artigos:', error);
    
    // Em produção, não expor detalhes do erro
    const errorMessage = process.env.NODE_ENV === 'production'
      ? 'Erro interno do servidor'
      : error instanceof Error
      ? error.message
      : 'Erro desconhecido';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
