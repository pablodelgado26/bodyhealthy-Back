FROM node:22-alpine3.21

WORKDIR /app

# Copiar e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar TODOS os arquivos do projeto
COPY . .

# Gerar cliente Prisma
RUN npx prisma generate

# Criar diretório para SQLite e definir permissões
RUN mkdir -p /app/data && chmod 755 /app/data

EXPOSE 4106

# Comando com seed automático
CMD ["sh", "-c", "npx prisma db push && ([ -f prisma/seed.js ] && node prisma/seed.js || echo 'Seed não encontrado') && npm run start"]