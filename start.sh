#!/bin/sh

echo "=== Iniciando aplicação BodyHealthy ==="

echo "=== DEBUG: Verificando estrutura de arquivos ==="
ls -la /app
echo "=== Conteúdo da pasta src: ==="
ls -la /app/src || echo "Pasta src não encontrada!"

echo "=== Verificando diretório de dados ==="
ls -la /app/data || echo "Pasta data não encontrada!"

# Verificar se o banco já existe
if [ -f "/app/data/bodyhealthy.db" ]; then
    echo "Banco de dados já existe - sincronizando schema..."
    npx prisma db push
else
    echo "Criando novo banco de dados..."
    npx prisma db push --accept-data-loss
    
    # Executar seed se disponível
    if [ -f "/app/prisma/seed.js" ]; then
        echo "Executando seed do banco de dados..."
        node prisma/seed.js || echo "Seed falhou - continuando..."
    else
        echo "Arquivo seed não encontrado em prisma/seed.js"
    fi
fi

# Verificar se o arquivo servidor existe
if [ -f "/app/src/server.js" ]; then
    echo "Iniciando a aplicação BodyHealthy..."
    npm run start
else
    echo "ERRO: Arquivo /app/src/server.js não encontrado!"
    echo "Conteúdo da pasta /app/src:"
    ls -la /app/src
    exit 1
fi