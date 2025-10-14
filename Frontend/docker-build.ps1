# ============================================
# Script de Build Docker para Windows
# ============================================
# Script PowerShell para facilitar o build das imagens Docker

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet('production', 'development', 'both')]
    [string]$Environment = 'production',
    
    [Parameter(Mandatory=$false)]
    [switch]$NoCache,
    
    [Parameter(Mandatory=$false)]
    [switch]$Push,
    
    [Parameter(Mandatory=$false)]
    [string]$Tag = 'latest'
)

Write-Host "🐳 Aplot Frontend - Docker Build Script" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Verificar se Docker está rodando
try {
    docker info | Out-Null
} catch {
    Write-Host "❌ Erro: Docker não está rodando!" -ForegroundColor Red
    Write-Host "   Inicie o Docker Desktop e tente novamente." -ForegroundColor Yellow
    exit 1
}

# Nome da imagem
$imageName = "aplot-frontend"

# Opções de build
$buildArgs = @()
if ($NoCache) {
    $buildArgs += "--no-cache"
}

# Função para build
function Build-Image {
    param(
        [string]$dockerfile,
        [string]$tag,
        [string]$envType
    )
    
    Write-Host "📦 Construindo imagem $envType..." -ForegroundColor Green
    Write-Host "   Dockerfile: $dockerfile" -ForegroundColor Gray
    Write-Host "   Tag: ${imageName}:$tag`n" -ForegroundColor Gray
    
    $buildCommand = "docker build -f $dockerfile -t ${imageName}:$tag $($buildArgs -join ' ') ."
    
    Write-Host "🔨 Executando: $buildCommand`n" -ForegroundColor Yellow
    
    Invoke-Expression $buildCommand
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Imagem $envType construída com sucesso!`n" -ForegroundColor Green
        return $true
    } else {
        Write-Host "❌ Falha ao construir imagem $envType`n" -ForegroundColor Red
        return $false
    }
}

# Build conforme ambiente selecionado
$success = $true

if ($Environment -eq 'production' -or $Environment -eq 'both') {
    $prodSuccess = Build-Image -dockerfile "Dockerfile" -tag $Tag -envType "PRODUÇÃO"
    $success = $success -and $prodSuccess
}

if ($Environment -eq 'development' -or $Environment -eq 'both') {
    $devSuccess = Build-Image -dockerfile "Dockerfile.dev" -tag "dev" -envType "DESENVOLVIMENTO"
    $success = $success -and $devSuccess
}

# Push para registry (se solicitado)
if ($Push -and $success) {
    Write-Host "`n🚀 Fazendo push das imagens..." -ForegroundColor Cyan
    
    if ($Environment -eq 'production' -or $Environment -eq 'both') {
        Write-Host "   Pushing ${imageName}:$Tag..." -ForegroundColor Gray
        docker push "${imageName}:$Tag"
    }
    
    if ($Environment -eq 'development' -or $Environment -eq 'both') {
        Write-Host "   Pushing ${imageName}:dev..." -ForegroundColor Gray
        docker push "${imageName}:dev"
    }
    
    Write-Host "✅ Push concluído!`n" -ForegroundColor Green
}

# Resumo
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "📊 Resumo do Build" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

if ($success) {
    Write-Host "✅ Status: SUCESSO" -ForegroundColor Green
    
    Write-Host "`n📋 Imagens criadas:" -ForegroundColor Yellow
    
    if ($Environment -eq 'production' -or $Environment -eq 'both') {
        Write-Host "   - ${imageName}:$Tag (produção)" -ForegroundColor White
    }
    
    if ($Environment -eq 'development' -or $Environment -eq 'both') {
        Write-Host "   - ${imageName}:dev (desenvolvimento)" -ForegroundColor White
    }
    
    Write-Host "`n🚀 Próximos passos:" -ForegroundColor Yellow
    Write-Host "   Para executar em produção:" -ForegroundColor White
    Write-Host "   docker-compose up -d`n" -ForegroundColor Cyan
    
    Write-Host "   Para executar em desenvolvimento:" -ForegroundColor White
    Write-Host "   docker-compose -f docker-compose.dev.yml up`n" -ForegroundColor Cyan
    
} else {
    Write-Host "❌ Status: FALHA" -ForegroundColor Red
    Write-Host "`n⚠️  Verifique os erros acima e tente novamente.`n" -ForegroundColor Yellow
    exit 1
}

Write-Host "========================================`n" -ForegroundColor Cyan

