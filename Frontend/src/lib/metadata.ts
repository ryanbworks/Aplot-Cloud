import type { Metadata } from 'next';

export interface MetadataConfig {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  siteName?: string;
  locale?: string;
}

/**
 * Gera metadata completo para SEO e redes sociais
 * @param config - Configuração de metadata
 * @returns Metadata do Next.js
 */
export function generateMetadata(config: MetadataConfig): Metadata {
  const {
    title,
    description,
    url,
    image = '/og-image.png',
    type = 'website',
    siteName = 'Aplot Cloud',
    locale = 'pt_BR',
  } = config;

  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const fullUrl = url ? `https://aplotcloud.com${url}` : 'https://aplotcloud.com';
  const fullImage = image.startsWith('http') ? image : `https://aplotcloud.com${image}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      'hospedagem',
      'minecraft',
      'vps',
      'discord bot',
      'servidor',
      'cloud',
      'aplot cloud',
      'hospedagem de jogos',
      'servidor de minecraft',
    ],
    authors: [{ name: 'Aplot Cloud' }],
    creator: 'Aplot Cloud',
    publisher: 'Aplot Cloud',
    metadataBase: new URL('https://aplotcloud.com'),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale,
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [fullImage],
      creator: '@aplotcloud',
      site: '@aplotcloud',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // Adicionar códigos de verificação quando disponíveis
      // google: 'google-site-verification-code',
      // yandex: 'yandex-verification-code',
      // yahoo: 'yahoo-site-verification-code',
    },
  };
}

/**
 * Gera structured data (JSON-LD) para SEO
 * @param config - Configuração para structured data
 * @returns String JSON-LD
 */
export function generateStructuredData(config: {
  type: 'Organization' | 'WebSite' | 'Article' | 'BreadcrumbList';
  data: Record<string, unknown>;
}): string {
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': config.type,
    ...config.data,
  };

  return JSON.stringify(baseStructuredData);
}

/**
 * Metadata padrão do site
 */
export const defaultMetadata: MetadataConfig = {
  title: 'Aplot Cloud',
  description: 'Plataforma moderna e elegante para hospedagem de servidores de Minecraft, VPS, Discord Bots e muito mais. Performance, segurança e suporte 24/7.',
  url: '/',
  type: 'website',
  siteName: 'Aplot Cloud',
  locale: 'pt_BR',
};

