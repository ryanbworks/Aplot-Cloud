# 🐳 Guia Docker - Aplot Frontend

Este guia explica como executar o Aplot Frontend usando Docker.

## 📋 Pré-requisitos

- Docker Engine 20.10+ instalado
- Docker Compose 2.0+ instalado
- 2GB de RAM disponível
- 5GB de espaço em disco

## 🚀 Início Rápido

### 1. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo e configure suas variáveis:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações.

### 2. Executar em Produção

#### Opção A: Com Nginx (Recomendado para produção)

```bash
docker-compose up -d
```

Acesse a aplicação:
- **Frontend direto**: http://localhost:3000
- **Através do Nginx**: http://localhost

#### Opção B: Apenas Frontend

```bash
docker-compose up -d frontend
```

Acesse em: http://localhost:3000

### 3. Executar em Desenvolvimento

Para desenvolvimento com hot-reload:

```bash
# Copiar arquivo de ambiente de desenvolvimento
cp .env.example .env.local

# Iniciar em modo desenvolvimento
docker-compose -f docker-compose.dev.yml up
```

Acesse em: http://localhost:3000

## 📝 Comandos Úteis

### Gerenciamento de Containers

```bash
# Iniciar containers
docker-compose up -d

# Parar containers
docker-compose down

# Ver logs
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f frontend

# Reiniciar containers
docker-compose restart

# Verificar status
docker-compose ps

# Parar e remover volumes
docker-compose down -v
```

### Build e Reconstrução

```bash
# Build da imagem
docker-compose build

# Build sem cache
docker-compose build --no-cache

# Build e iniciar
docker-compose up -d --build

# Build apenas do frontend
docker-compose build frontend
```

### Modo Desenvolvimento

```bash
# Iniciar em modo desenvolvimento
docker-compose -f docker-compose.dev.yml up

# Build e iniciar em modo desenvolvimento
docker-compose -f docker-compose.dev.yml up --build

# Parar modo desenvolvimento
docker-compose -f docker-compose.dev.yml down
```

### Manutenção e Debug

```bash
# Acessar shell do container
docker-compose exec frontend sh

# Ver uso de recursos
docker stats aplot-frontend

# Verificar health check
docker inspect --format='{{json .State.Health}}' aplot-frontend

# Limpar recursos não utilizados
docker system prune -a
```

## 🏗️ Estrutura dos Arquivos Docker

```
Frontend/
├── Dockerfile              # Produção (multi-stage build otimizado)
├── Dockerfile.dev          # Desenvolvimento (com hot-reload)
├── docker-compose.yml      # Produção (frontend + nginx)
├── docker-compose.dev.yml  # Desenvolvimento
├── .dockerignore          # Arquivos ignorados no build
├── .env.example           # Exemplo de variáveis de ambiente
└── nginx.conf             # Configuração do Nginx
```

## 🔧 Configurações Avançadas

### Variáveis de Ambiente

Principais variáveis de ambiente disponíveis:

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `NODE_ENV` | Ambiente de execução | `production` |
| `PORT` | Porta da aplicação | `3000` |
| `NEXT_TELEMETRY_DISABLED` | Desabilitar telemetria | `1` |
| `NEXT_PUBLIC_API_URL` | URL da API backend | - |

### Portas Utilizadas

- **3000**: Frontend Next.js
- **80**: Nginx (proxy reverso)

### Volumes (Desenvolvimento)

Em modo desenvolvimento, os seguintes diretórios são montados:
- `./src` - Código fonte
- `./public` - Arquivos públicos
- Arquivos de configuração (next.config.ts, tailwind.config.ts, etc.)

## 🏥 Health Checks

A aplicação inclui health checks automáticos:

**Endpoint**: `/api/health`

**Configuração**:
- Intervalo: 30s
- Timeout: 10s
- Retries: 3
- Start period: 40s

Verificar health check:
```bash
curl http://localhost:3000/api/health
```

## 🔒 Segurança

### Boas Práticas Implementadas

1. ✅ Multi-stage build para imagens menores
2. ✅ Usuário não-root no container
3. ✅ .dockerignore para não copiar arquivos sensíveis
4. ✅ Health checks configurados
5. ✅ Nginx com headers de segurança
6. ✅ Rate limiting no Nginx

### Recomendações Adicionais

- Nunca commite arquivos `.env` com dados sensíveis
- Use secrets do Docker Swarm ou Kubernetes para produção
- Mantenha as imagens base atualizadas
- Faça scan de vulnerabilidades regularmente

## 🚀 Deploy em Produção

### Docker Swarm

```bash
# Inicializar Swarm
docker swarm init

# Deploy do stack
docker stack deploy -c docker-compose.yml aplot

# Verificar serviços
docker service ls
```

### Kubernetes

Para deploy em Kubernetes, você pode converter o docker-compose:

```bash
# Instalar kompose
curl -L https://github.com/kubernetes/kompose/releases/download/v1.31.2/kompose-linux-amd64 -o kompose
chmod +x kompose

# Converter
./kompose convert -f docker-compose.yml
```

## 🐛 Troubleshooting

### Container não inicia

```bash
# Ver logs detalhados
docker-compose logs frontend

# Verificar configuração
docker-compose config
```

### Porta já em uso

```bash
# Verificar o que está usando a porta
netstat -ano | findstr :3000  # Windows
lsof -i :3000                 # Linux/Mac

# Ou alterar a porta no docker-compose.yml
ports:
  - "3001:3000"  # Usar porta 3001 no host
```

### Build falha

```bash
# Build sem cache
docker-compose build --no-cache

# Ver uso de espaço
docker system df

# Limpar espaço
docker system prune -a
```

### Hot-reload não funciona

Certifique-se de estar usando o `docker-compose.dev.yml`:

```bash
docker-compose -f docker-compose.dev.yml up
```

### Performance lenta

1. Alocar mais recursos ao Docker Desktop
2. Usar volumes nomeados ao invés de bind mounts
3. Verificar uso de recursos: `docker stats`

## 📊 Monitoramento

### Logs

```bash
# Todos os logs
docker-compose logs -f

# Últimas 100 linhas
docker-compose logs --tail=100 frontend

# Logs desde uma data
docker-compose logs --since 2024-01-01T00:00:00
```

### Métricas

```bash
# Uso de recursos em tempo real
docker stats aplot-frontend

# Informações do container
docker inspect aplot-frontend
```

## 🔄 Updates e Manutenção

### Atualizar a aplicação

```bash
# Pull das mudanças
git pull

# Rebuild e restart
docker-compose up -d --build

# Verificar se tudo está funcionando
docker-compose ps
```

### Backup

```bash
# Backup de volumes (se houver)
docker run --rm -v aplot_data:/data -v $(pwd):/backup alpine tar czf /backup/aplot-backup.tar.gz /data
```

## 📚 Recursos Adicionais

- [Documentação Docker](https://docs.docker.com/)
- [Next.js Docker Docs](https://nextjs.org/docs/deployment#docker-image)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Nginx Docker](https://hub.docker.com/_/nginx)

## 🆘 Suporte

Se encontrar problemas:

1. Verifique os logs: `docker-compose logs -f`
2. Verifique o health check: `docker ps`
3. Verifique as variáveis de ambiente no `.env`
4. Consulte a seção de Troubleshooting acima

---

**Última atualização**: Outubro 2025
**Versão**: 1.0.0

