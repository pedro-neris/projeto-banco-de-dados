# Script PowerShell para configurar o banco de dados AvaliaRU
param(
    [string]$DbUser = "seu_usuario",
    [string]$DbName = "avaliarudb", 
    [string]$DbHost = "localhost",
    [string]$DbPort = "5432"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Configurando Banco de Dados AvaliaRU" -ForegroundColor Cyan  
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Array com os scripts na ordem correta
$scripts = @(
    @{Name="script.sql"; Description="Criando estrutura das tabelas"},
    @{Name="seeding.sql"; Description="Inserindo dados iniciais"}, 
    @{Name="popular_img.sql"; Description="Populando imagens dos pratos"},
    @{Name="view.sql"; Description="Criando views"},
    @{Name="procedure.sql"; Description="Criando procedures"},
    @{Name="algebra_relacional.sql"; Description="Executando consultas em álgebra relacional"}
)

$totalScripts = $scripts.Count
$currentScript = 0

foreach ($script in $scripts) {
    $currentScript++
    Write-Host "[$currentScript/$totalScripts] $($script.Description)..." -ForegroundColor Yellow
    
    $scriptPath = Join-Path $PSScriptRoot $script.Name
    
    if (-not (Test-Path $scriptPath)) {
        Write-Host "❌ ERRO: Arquivo $($script.Name) não encontrado!" -ForegroundColor Red
        exit 1
    }
    
    try {
        $result = & psql -h $DbHost -p $DbPort -U $DbUser -d $DbName -f $scriptPath 2>&1
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ ERRO ao executar $($script.Name)" -ForegroundColor Red
            Write-Host $result -ForegroundColor Red
            exit 1
        }
        
        Write-Host "✅ $($script.Name) executado com sucesso!" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ ERRO ao executar $($script.Name): $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   ✅ Banco de dados configurado com sucesso!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "URLs para testar:" -ForegroundColor Cyan
Write-Host "   🌐 Frontend: http://localhost:3001" -ForegroundColor White
Write-Host "   📖 API Docs: http://localhost:3000/api/docs" -ForegroundColor White  
Write-Host "   🔌 API Base: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "Pressione qualquer tecla para continuar..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")