# 1) Instala dependências
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json ./
RUN npm ci || npm i

# 2) Build + Prisma
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate || true
RUN npm run build

# 3) Runtime
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY package.json ./

EXPOSE 4000
CMD sh -c "npx prisma db push && (node prisma/seed.mjs || true) && node dist/index.js"
