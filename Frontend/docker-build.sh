#!/bin/bash

# ============================================
# Script de Build Docker para Linux/Mac
# ============================================
# Script Bash para facilitar o build das imagens Docker

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configurações padrão
ENVIRONMENT="production"
NO_CACHE=false
PUSH=false
TAG="latest"
IMAGE_NAME="aplot-frontend"

# Função de ajuda
show_help() {
    echo -e "${CYAN}🐳 Aplot Frontend - Docker Build Script${NC}"
    echo -e "${CYAN}========================================${NC}"
    echo ""
    echo "Uso: ./docker-build.sh [opções]"
    echo ""
    echo "Opções:"
    echo "  -e, --environment ENV    Ambiente: production, development, both (padrão: production)"
    echo "  -t, --tag TAG           Tag da imagem (padrão: latest)"
    echo "  -n, --no-cache          Build sem usar cache"
    echo "  -p, --push              Push da imagem para registry após build"
    echo "  -h, --help              Mostra esta ajuda"
    echo ""
    echo "Exemplos:"
    echo "  ./docker-build.sh                           # Build produção"
    echo "  ./docker-build.sh -e development            # Build desenvolvimento"
    echo "  ./docker-build.sh -e both -n                # Build ambos sem cache"
    echo "  ./docker-build.sh -t v1.0.0 -p              # Build e push com tag v1.0.0"
    echo ""
}

# Parse argumentos
while [[ $# -gt 0 ]]; do
    case $1 in
        -e|--environment)
            ENVIRONMENT="$2"
            shift 2
            ;;
        -t|--tag)
            TAG="$2"
            shift 2
            ;;
        -n|--no-cache)
            NO_CACHE=true
            shift
            ;;
        -p|--push)
            PUSH=true
            shift
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            echo -e "${RED}❌ Opção desconhecida: $1${NC}"
            show_help
            exit 1
            ;;
    esac
done

# Validar ambiente
if [[ ! "$ENVIRONMENT" =~ ^(production|development|both)$ ]]; then
    echo -e "${RED}❌ Ambiente inválido: $ENVIRONMENT${NC}"
    echo -e "${YELLOW}   Use: production, development ou both${NC}"
    exit 1
fi

echo -e "${CYAN}🐳 Aplot Frontend - Docker Build Script${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""

# Verificar se Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Erro: Docker não está rodando!${NC}"
    echo -e "${YELLOW}   Inicie o Docker e tente novamente.${NC}"
    exit 1
fi

# Opções de build
BUILD_ARGS=""
if [ "$NO_CACHE" = true ]; then
    BUILD_ARGS="--no-cache"
fi

# Função para build
build_image() {
    local dockerfile=$1
    local tag=$2
    local env_type=$3
    
    echo -e "${GREEN}📦 Construindo imagem $env_type...${NC}"
    echo -e "${YELLOW}   Dockerfile: $dockerfile${NC}"
    echo -e "${YELLOW}   Tag: ${IMAGE_NAME}:$tag${NC}"
    echo ""
    
    if docker build -f "$dockerfile" -t "${IMAGE_NAME}:$tag" $BUILD_ARGS .; then
        echo -e "${GREEN}✅ Imagem $env_type construída com sucesso!${NC}"
        echo ""
        return 0
    else
        echo -e "${RED}❌ Falha ao construir imagem $env_type${NC}"
        echo ""
        return 1
    fi
}

# Build conforme ambiente selecionado
SUCCESS=true

if [[ "$ENVIRONMENT" == "production" ]] || [[ "$ENVIRONMENT" == "both" ]]; then
    if ! build_image "Dockerfile" "$TAG" "PRODUÇÃO"; then
        SUCCESS=false
    fi
fi

if [[ "$ENVIRONMENT" == "development" ]] || [[ "$ENVIRONMENT" == "both" ]]; then
    if ! build_image "Dockerfile.dev" "dev" "DESENVOLVIMENTO"; then
        SUCCESS=false
    fi
fi

# Push para registry (se solicitado)
if [ "$PUSH" = true ] && [ "$SUCCESS" = true ]; then
    echo ""
    echo -e "${CYAN}🚀 Fazendo push das imagens...${NC}"
    
    if [[ "$ENVIRONMENT" == "production" ]] || [[ "$ENVIRONMENT" == "both" ]]; then
        echo -e "${YELLOW}   Pushing ${IMAGE_NAME}:$TAG...${NC}"
        docker push "${IMAGE_NAME}:$TAG"
    fi
    
    if [[ "$ENVIRONMENT" == "development" ]] || [[ "$ENVIRONMENT" == "both" ]]; then
        echo -e "${YELLOW}   Pushing ${IMAGE_NAME}:dev...${NC}"
        docker push "${IMAGE_NAME}:dev"
    fi
    
    echo -e "${GREEN}✅ Push concluído!${NC}"
    echo ""
fi

# Resumo
echo ""
echo -e "${CYAN}========================================${NC}"
echo -e "${CYAN}📊 Resumo do Build${NC}"
echo -e "${CYAN}========================================${NC}"

if [ "$SUCCESS" = true ]; then
    echo -e "${GREEN}✅ Status: SUCESSO${NC}"
    
    echo ""
    echo -e "${YELLOW}📋 Imagens criadas:${NC}"
    
    if [[ "$ENVIRONMENT" == "production" ]] || [[ "$ENVIRONMENT" == "both" ]]; then
        echo -e "   - ${IMAGE_NAME}:$TAG (produção)"
    fi
    
    if [[ "$ENVIRONMENT" == "development" ]] || [[ "$ENVIRONMENT" == "both" ]]; then
        echo -e "   - ${IMAGE_NAME}:dev (desenvolvimento)"
    fi
    
    echo ""
    echo -e "${YELLOW}🚀 Próximos passos:${NC}"
    echo -e "   Para executar em produção:"
    echo -e "${CYAN}   docker-compose up -d${NC}"
    echo ""
    echo -e "   Para executar em desenvolvimento:"
    echo -e "${CYAN}   docker-compose -f docker-compose.dev.yml up${NC}"
    echo ""
    
else
    echo -e "${RED}❌ Status: FALHA${NC}"
    echo ""
    echo -e "${YELLOW}⚠️  Verifique os erros acima e tente novamente.${NC}"
    echo ""
    exit 1
fi

echo -e "${CYAN}========================================${NC}"
echo ""

