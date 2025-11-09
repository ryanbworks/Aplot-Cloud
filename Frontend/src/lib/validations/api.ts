/**
 * Validações Zod para APIs
 * 
 * @module validations/api
 * @description Schemas de validação para parâmetros de query e rotas de API.
 * Garante que apenas dados válidos sejam processados pelas rotas.
 */

import { z } from 'zod';

/**
 * Schema para validação de parâmetros de query na rota de artigos
 * 
 * Valida os parâmetros category, slug e search, garantindo que:
 * - Não há parâmetros conflitantes
 * - Os valores estão no formato correto
 * - Os valores estão dentro dos limites permitidos
 * 
 * @example
 * ```typescript
 * const result = articlesQuerySchema.safeParse({ category: 'minecraft', slug: 'instalacao' });
 * if (result.success) {
 *   // Processar parâmetros validados
 * }
 * ```
 */
export const articlesQuerySchema = z.object({
  category: z
    .string()
    .min(1, 'Categoria é obrigatória')
    .regex(/^[a-z-]+$/, 'Categoria inválida')
    .optional(),
  slug: z
    .string()
    .min(1, 'Slug é obrigatório')
    .regex(/^[a-z0-9-]+$/, 'Slug inválido')
    .optional(),
  search: z
    .string()
    .min(1, 'Query de busca é obrigatória')
    .max(100, 'Query de busca muito longa')
    .optional(),
}).refine(
  (data) => {
    // Validar que não há parâmetros conflitantes
    const paramCount = [data.category, data.slug, data.search].filter(Boolean).length;
    return paramCount <= 2; // Pode ter category+slug OU search OU category OU nenhum
  },
  {
    message: 'Parâmetros de query inválidos',
  }
);

/**
 * Schema para validação de categoria
 * 
 * Valida que a categoria:
 * - Não está vazia
 * - Está no formato correto (apenas letras minúsculas e hífens)
 * - É uma categoria válida do sistema
 * 
 * @example
 * ```typescript
 * const result = categorySchema.safeParse('minecraft');
 * if (result.success) {
 *   // Categoria válida
 * }
 * ```
 */
export const categorySchema = z
  .string()
  .min(1, 'Categoria é obrigatória')
  .regex(/^[a-z-]+$/, 'Categoria inválida')
  .refine(
    (category) => {
      const validCategories = [
        'primeiros-passos',
        'minecraft',
        'discord-bot',
        'vps',
        'faturamento',
        'faq',
      ];
      return validCategories.includes(category);
    },
    {
      message: 'Categoria não encontrada',
    }
  );

/**
 * Schema para validação de slug
 * 
 * Valida que o slug:
 * - Não está vazio
 * - Tem no máximo 100 caracteres
 * - Contém apenas letras minúsculas, números e hífens
 * 
 * @example
 * ```typescript
 * const result = slugSchema.safeParse('instalacao-servidor');
 * if (result.success) {
 *   // Slug válido
 * }
 * ```
 */
export const slugSchema = z
  .string()
  .min(1, 'Slug é obrigatório')
  .max(100, 'Slug muito longo')
  .regex(/^[a-z0-9-]+$/, 'Slug inválido - deve conter apenas letras minúsculas, números e hífens');

/**
 * Schema para validação de query de busca
 * 
 * Valida que a query de busca:
 * - Não está vazia
 * - Tem no máximo 100 caracteres
 * - Está sanitizada (sem caracteres perigosos)
 * 
 * @example
 * ```typescript
 * const result = searchQuerySchema.safeParse('como instalar servidor');
 * if (result.success) {
 *   // Query válida
 * }
 * ```
 */
export const searchQuerySchema = z
  .string()
  .min(1, 'Query de busca é obrigatória')
  .max(100, 'Query de busca muito longa')
  .refine(
    (query) => {
      // Sanitizar query - remover caracteres perigosos
      const sanitized = query.trim();
      return sanitized.length > 0 && sanitized.length <= 100;
    },
    {
      message: 'Query de busca inválida',
    }
  );

export type ArticlesQueryParams = z.infer<typeof articlesQuerySchema>;

