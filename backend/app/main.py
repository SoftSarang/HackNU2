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

# Routers
app.include_router(auth.router)
app.include_router(teams.router)
app.include_router(assets.router)
app.include_router(prompts.router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check
@app.get("/")
async def root():
    return {"message": "Hackathon backend is running 🚀"}

@app.on_event("startup")
async def startup_event():
    await init_models()