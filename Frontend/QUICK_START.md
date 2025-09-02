# 🚀 Início Rápido - Docker

## ⚡ Comandos essenciais

### 1. Primeira execução
```bash
# Windows PowerShell
.\docker-build.ps1 compose

# Linux/Mac
./docker-build.sh compose
```

### 2. Desenvolvimento
```bash
# Windows PowerShell
.\docker-build.ps1 dev

# Linux/Mac
./docker-build.sh dev
```

### 3. Produção
```bash
# Windows PowerShell
.\docker-build.ps1 prod

# Linux/Mac
./docker-build.sh prod
```

## 🌐 URLs de acesso

- **Produção**: http://localhost:3000
- **Desenvolvimento**: http://localhost:3001
- **Health Check**: http://localhost:3000/api/health

## 📋 Comandos Docker básicos

```bash
# Ver containers rodando
docker ps

# Ver logs
docker logs -f aplot-frontend

# Parar aplicação
docker stop aplot-frontend

# Executar comando no container
docker exec -it aplot-frontend npm run lint

# Limpar tudo
docker system prune -a
```

## 🔧 Docker Compose

```bash
# Iniciar serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down

# Rebuild
docker-compose up --build -d
```

## 🚨 Problemas comuns

### Porta já em uso
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :3000
kill -9 <PID>
```

### Erro de permissão
```bash
# Linux/Mac
chmod +x docker-build.sh
```

### Limpar cache
```bash
docker builder prune
docker system prune
```

## 📚 Próximos passos

1. ✅ Docker configurado
2. 🔄 Teste a aplicação
3. 📝 Configure variáveis de ambiente
4. 🚀 Deploy em produção
