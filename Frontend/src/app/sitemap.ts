import { MetadataRoute } from 'next';

/**
 * Gera sitemap dinâmico para SEO
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aplotcloud.com';

  // Rotas estáticas
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/auth/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/auth/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hospedagem/minecraft`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/status`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/suporte/base-conhecimento`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Categorias de documentação
  const categories = [
    'primeiros-passos',
    'minecraft',
    'discord-bot',
    'vps',
    'faturamento',
    'faq',
  ];

  const docRoutes: MetadataRoute.Sitemap = categories.map(category => ({
    url: `${baseUrl}/suporte/base-conhecimento/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...docRoutes];
}

