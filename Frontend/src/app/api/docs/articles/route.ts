import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Função para calcular tempo de leitura
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Função para ler arquivos Markdown
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
    console.error(`Erro ao ler arquivo ${filePath}:`, error);
    return null;
  }
}

// Função para obter artigos de uma categoria
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

// Função para obter um artigo específico
function getArticle(categoryId: string, slug: string) {
  const filePath = path.join(process.cwd(), 'public', 'docs', categoryId, `${slug}.md`);
  return readMarkdownFile(filePath);
}

// Função para buscar artigos
function searchArticles(query: string) {
  const categories = ['primeiros-passos', 'minecraft', 'discord-bot', 'vps', 'faturamento', 'faq'];
  const results = [];
  
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
        if (article.tags.some(tag => tag.toLowerCase().includes(queryLower))) score += 3;
        if (article.content.toLowerCase().includes(queryLower)) score += 1;
        
        results.push({
          article,
          category: { id: categoryId, name: categoryId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) },
          relevanceScore: score
        });
      }
    });
  });
  
  // Ordenar por relevância
  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const slug = searchParams.get('slug');
    const search = searchParams.get('search');
    
    if (search) {
      // Busca global
      const results = searchArticles(search);
      return NextResponse.json(results.slice(0, 8)); // Limit to 8 results
    }
    
    if (category && slug) {
      // Artigo específico
      const article = getArticle(category, slug);
      if (!article) {
        return NextResponse.json({ error: 'Artigo não encontrado' }, { status: 404 });
      }
      return NextResponse.json(article);
    }
    
    if (category) {
      // Artigos de uma categoria
      const articles = getArticlesByCategory(category);
      return NextResponse.json(articles);
    }
    
    // Todos os artigos
    const allCategories = ['primeiros-passos', 'minecraft', 'discord-bot', 'vps', 'faturamento', 'faq'];
    const allArticles = [];
    
    allCategories.forEach(categoryId => {
      const articles = getArticlesByCategory(categoryId);
      allArticles.push(...articles);
    });
    
    return NextResponse.json(allArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  } catch (error) {
    console.error('Erro ao buscar artigos:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
