FROM node:20-alpine AS deps
WORKDIR /app

# Copia apenas o package.json
COPY package.json ./

# Instala dependências
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Build (caso seja necessário para frontend)
RUN npm run build

# Expor porta (API roda na 3000 por padrão)
EXPOSE 3000

CMD ["npm", "start"]
