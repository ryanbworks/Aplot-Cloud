export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  articleCount: number;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author?: string;
  date: string;
  readTime: number;
  content: string;
}

export interface SearchResult {
  article: Article;
  category: Category;
  relevanceScore: number;
}
