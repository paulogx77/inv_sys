FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio 2: Production - Usa um servidor web Nginx super leve para servir os arquivos
FROM nginx:stable-alpine

# Copia os arquivos estáticos gerados no estágio de build para a pasta que o Nginx serve
COPY --from=build /app/dist /usr/share/nginx/html

# Copia uma configuração customizada do Nginx (opcional, mas recomendado)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# porta padrão do Nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]