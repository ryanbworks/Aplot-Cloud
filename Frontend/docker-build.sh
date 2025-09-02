#!/bin/bash

# Script para build e execução do Docker
# Uso: ./docker-build.sh [dev|prod|clean]

set -e

echo "🐳 Aplot Frontend - Docker Build Script"
echo "========================================"

case "${1:-prod}" in
    "dev")
        echo "🔧 Modo: Desenvolvimento"
        echo "📦 Build da imagem de desenvolvimento..."
        docker build -f Dockerfile.dev -t aplot-frontend-dev .
        echo "✅ Build concluído!"
        echo "🚀 Iniciando container de desenvolvimento..."
        docker run -d --name aplot-frontend-dev -p 3001:3000 -v "$(pwd):/app" aplot-frontend-dev
        echo "✅ Container iniciado na porta 3001"
        echo "🌐 Acesse: http://localhost:3001"
        ;;
    "prod")
        echo "🚀 Modo: Produção"
        echo "📦 Build da imagem de produção..."
        docker build -t aplot-frontend .
        echo "✅ Build concluído!"
        echo "🚀 Iniciando container de produção..."
        docker run -d --name aplot-frontend -p 3000:3000 aplot-frontend
        echo "✅ Container iniciado na porta 3000"
        echo "🌐 Acesse: http://localhost:3000"
        ;;
    "compose")
        echo "🐙 Modo: Docker Compose"
        echo "📦 Build e execução com Docker Compose..."
        docker-compose up --build -d
        echo "✅ Serviços iniciados!"
        echo "🌐 Produção: http://localhost:3000"
        echo "🔧 Desenvolvimento: http://localhost:3001 (com --profile dev)"
        ;;
    "clean")
        echo "🧹 Limpeza de containers e imagens..."
        docker stop aplot-frontend aplot-frontend-dev 2>/dev/null || true
        docker rm aplot-frontend aplot-frontend-dev 2>/dev/null || true
        docker rmi aplot-frontend aplot-frontend-dev 2>/dev/null || true
        docker system prune -f
        echo "✅ Limpeza concluída!"
        ;;
    *)
        echo "❌ Uso: $0 [dev|prod|compose|clean]"
        echo ""
        echo "Opções:"
        echo "  dev     - Build e execução em modo desenvolvimento"
        echo "  prod    - Build e execução em modo produção"
        echo "  compose - Usar Docker Compose (recomendado)"
        echo "  clean   - Limpar containers e imagens"
        exit 1
        ;;
esac

echo ""
echo "📋 Comandos úteis:"
echo "  Ver logs: docker logs -f aplot-frontend"
echo "  Parar: docker stop aplot-frontend"
echo "  Executar comando: docker exec -it aplot-frontend npm run lint"
