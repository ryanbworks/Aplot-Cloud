# ============================================
# Dockerfile - Aplot Frontend (Produção)
# ============================================
# Multi-stage build otimizado para produção

# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiar apenas arquivos de dependências
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copiar dependências do stage anterior
COPY --from=deps /app/node_modules ./node_modules

# Copiar código fonte
COPY . .

# Configurar variável de ambiente para standalone build
ENV DOCKER_BUILD=true
ENV NEXT_TELEMETRY_DISABLED=1

# Build da aplicação
RUN npm run build

# Stage 3: Runner (produção)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Criar usuário não-root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copiar arquivos necessários do standalone build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Mudar para usuário não-root
USER nextjs

# Expor porta
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Comando de inicialização
CMD ["node", "server.js"]

