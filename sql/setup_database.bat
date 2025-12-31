@echo off
echo ========================================
echo   Configurando Banco de Dados AvaliaRU
echo ========================================
echo.

REM Configurações do banco (edite conforme necessário)
set DB_USER=seu_usuario
set DB_NAME=avaliarudb
set DB_HOST=localhost
set DB_PORT=5432

echo Executando scripts SQL na ordem correta...
echo.

echo [1/6] Criando estrutura das tabelas...
psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d %DB_NAME% -f script.sql
if %errorlevel% neq 0 (
    echo ERRO: Falha ao executar script.sql
    pause
    exit /b 1
)

echo [2/6] Inserindo dados iniciais...
psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d %DB_NAME% -f seeding.sql
if %errorlevel% neq 0 (
    echo ERRO: Falha ao executar seeding.sql
    pause
    exit /b 1
)

echo [3/6] Populando imagens dos pratos...
psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d %DB_NAME% -f popular_img.sql
if %errorlevel% neq 0 (
    echo ERRO: Falha ao executar popular_img.sql
    pause
    exit /b 1
)

echo [4/6] Criando views...
psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d %DB_NAME% -f view.sql
if %errorlevel% neq 0 (
    echo ERRO: Falha ao executar view.sql
    pause
    exit /b 1
)

echo [5/6] Criando procedures...
psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d %DB_NAME% -f procedure.sql
if %errorlevel% neq 0 (
    echo ERRO: Falha ao executar procedure.sql
    pause
    exit /b 1
)

echo [6/6] Executando consultas em álgebra relacional...
psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d %DB_NAME% -f algebra_relacional.sql
if %errorlevel% neq 0 (
    echo ERRO: Falha ao executar algebra_relacional.sql
    pause
    exit /b 1
)

echo.
echo ========================================
echo   ✅ Banco de dados configurado com sucesso!
echo ========================================
echo.
echo URLs para testar:
echo   🌐 Frontend: http://localhost:3001
echo   📖 API Docs: http://localhost:3000/api/docs
echo   🔌 API Base: http://localhost:3000
echo.
pause