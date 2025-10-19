FROM node:16-alpine

WORKDIR /frontend

# Копируем package файлы и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем все файлы проекта
COPY . .

# Собираем приложение
RUN npm start

# Экспонируем порт 3000 для разработки
EXPOSE 3000

# Запускаем приложение с командой npm start
CMD ["npm", "start"]
