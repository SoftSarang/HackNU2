from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, teams, assets, prompts
from app.db.database import async_engine as engine, init_models
from app.models import User, Team, Prompt, Asset, team_members  # Импорт всех моделей

app = FastAPI(
    title="HackNU Hackathon Project",
    description="Backend for HackNU Hackathon — FastAPI + PostgreSQL + Redis",
    version="1.0.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Для продакшена замените на конкретные домены, например ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключение роутеров с префиксом /api
app.include_router(teams.router, prefix="/api")
app.include_router(auth.router)
app.include_router(assets.router, prefix="/api")
app.include_router(prompts.router, prefix="/api")

@app.on_event("startup")
async def startup_event():
    await init_models()

@app.get("/")
async def root():
    return {"message": "HackNU Hackathon API is running!"}