FROM python:3.11-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем зависимости для PostgreSQL и компиляции
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*  # Очистка кэша apt

# Обновляем pip
RUN pip install --no-cache-dir --upgrade pip

# Копируем requirements.txt и устанавливаем зависимости
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Устанавливаем NLTK-ресурсы
RUN python -m nltk.downloader -d /usr/share/nltk_data punkt stopwords

# Копируем только необходимые файлы
COPY app ./app
COPY alembic ./alembic
COPY alembic.ini .

# Выполняем миграции и запускаем приложение
CMD ["sh", "-c", "alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4"]