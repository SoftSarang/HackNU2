# Stage 1: Build frontend
FROM node:18-alpine AS frontend

WORKDIR /app

# Устанавливаем bash и необходимые инструменты
RUN apk add --no-cache bash

# Копируем package файлы и ставим зависимости
COPY package.json package-lock.json ./
RUN npm install

# Копируем весь проект
COPY . .

# Делаем скрипты исполняемыми
RUN chmod -R +x node_modules/.bin

# Сборка приложения
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Копируем сборку
COPY --from=frontend /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
