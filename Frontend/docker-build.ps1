# Script PowerShell para build e execução do Docker
# Uso: .\docker-build.ps1 [dev|prod|compose|clean]

param(
    [Parameter(Position=0)]
    [ValidateSet("dev", "prod", "compose", "clean")]
    [string]$Mode = "prod"
)

Write-Host "🐳 Aplot Frontend - Docker Build Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

switch ($Mode) {
    "dev" {
        Write-Host "🔧 Modo: Desenvolvimento" -ForegroundColor Yellow
        Write-Host "📦 Build da imagem de desenvolvimento..." -ForegroundColor Green
        
        docker build -f Dockerfile.dev -t aplot-frontend-dev .
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Build concluído!" -ForegroundColor Green
            Write-Host "🚀 Iniciando container de desenvolvimento..." -ForegroundColor Green
            
            docker run -d --name aplot-frontend-dev -p 3001:3000 -v "${PWD}:/app" aplot-frontend-dev
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ Container iniciado na porta 3001" -ForegroundColor Green
                Write-Host "🌐 Acesse: http://localhost:3001" -ForegroundColor Cyan
            }
        }
    }
    
    "prod" {
        Write-Host "🚀 Modo: Produção" -ForegroundColor Yellow
        Write-Host "📦 Build da imagem de produção..." -ForegroundColor Green
        
        docker build -t aplot-frontend .
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Build concluído!" -ForegroundColor Green
            Write-Host "🚀 Iniciando container de produção..." -ForegroundColor Green
            
            docker run -d --name aplot-frontend -p 3000:3000 aplot-frontend
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ Container iniciado na porta 3000" -ForegroundColor Green
                Write-Host "🌐 Acesse: http://localhost:3000" -ForegroundColor Cyan
            }
        }
    }
    
    "compose" {
        Write-Host "🐙 Modo: Docker Compose" -ForegroundColor Yellow
        Write-Host "📦 Build e execução com Docker Compose..." -ForegroundColor Green
        
        docker-compose up --build -d
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Serviços iniciados!" -ForegroundColor Green
            Write-Host "🌐 Produção: http://localhost:3000" -ForegroundColor Cyan
            Write-Host "🔧 Desenvolvimento: http://localhost:3001 (com --profile dev)" -ForegroundColor Cyan
        }
    }
    
    "clean" {
        Write-Host "🧹 Limpeza de containers e imagens..." -ForegroundColor Yellow
        
        docker stop aplot-frontend 2>$null
        docker stop aplot-frontend-dev 2>$null
        docker rm aplot-frontend 2>$null
        docker rm aplot-frontend-dev 2>$null
        docker rmi aplot-frontend 2>$null
        docker rmi aplot-frontend-dev 2>$null
        docker system prune -f
        
        Write-Host "✅ Limpeza concluída!" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "📋 Comandos úteis:" -ForegroundColor Yellow
Write-Host "  Ver logs: docker logs -f aplot-frontend" -ForegroundColor White
Write-Host "  Parar: docker stop aplot-frontend" -ForegroundColor White
Write-Host "  Executar comando: docker exec -it aplot-frontend npm run lint" -ForegroundColor White
