# 🐳 Docker para Aplot Frontend

Este projeto está configurado com Docker para facilitar o desenvolvimento e deploy.

## 📋 Pré-requisitos

- Docker instalado
- Docker Compose instalado

## 🚀 Como usar

### 1. Build e execução em produção

```bash
# Build da imagem
docker build -t aplot-frontend .

# Executar container
docker run -p 3000:3000 aplot-frontend
```

### 2. Usando Docker Compose (recomendado)

```bash
# Build e execução em produção
docker-compose up --build

# Executar em background
docker-compose up -d --build
```

### 3. Desenvolvimento com Docker

```bash
# Executar em modo desenvolvimento
docker-compose --profile dev up --build

# Ou build manual
docker build -f Dockerfile.dev -t aplot-frontend-dev .
docker run -p 3001:3000 -v $(pwd):/app aplot-frontend-dev
```

## 🔧 Comandos úteis

```bash
# Parar containers
docker-compose down

# Ver logs
docker-compose logs -f frontend

# Executar comandos no container
docker-compose exec frontend npm run lint

# Limpar imagens não utilizadas
docker system prune -a
```

## 📁 Estrutura de arquivos Docker

- `Dockerfile` - Para produção (multi-stage build otimizado)
- `Dockerfile.dev` - Para desenvolvimento (com hot reload)
- `docker-compose.yml` - Orquestração dos serviços
- `.dockerignore` - Arquivos excluídos do build

## 🌐 Portas

- **Produção**: 3000
- **Desenvolvimento**: 3001

## ⚡ Otimizações

- Multi-stage build para reduzir tamanho da imagem
- Usuário não-root para segurança
- Health checks para monitoramento
- Cache de dependências otimizado
- Output standalone do Next.js

## 🚨 Troubleshooting

### Erro de permissão
```bash
# No Windows/Mac, pode ser necessário ajustar permissões
chmod -R 755 .
```

### Porta já em uso
```bash
# Verificar portas em uso
netstat -tulpn | grep :3000

# Parar processo na porta
sudo kill -9 <PID>
```

### Limpar cache do Docker
```bash
docker builder prune
docker system prune
```

## 📚 Recursos adicionais

- [Documentação oficial do Docker](https://docs.docker.com/)
- [Next.js com Docker](https://nextjs.org/docs/deployment#docker-image)
- [Docker Compose](https://docs.docker.com/compose/)
