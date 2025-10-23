import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { 
  Gamepad2, 
  Bot, 
  Server, 
  Wallet, 
  HelpCircle, 
  Rocket,
  type LucideIcon 
} from 'lucide-react';

// Configuração das categorias
const categories = [
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

export async function GET() {
  try {
    const categoriesWithCount = categories.map(category => {
      const articles = getArticlesByCategory(category.id);
      return {
        ...category,
        articleCount: articles.length
      };
    });
    
    return NextResponse.json(categoriesWithCount);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
