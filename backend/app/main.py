from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth
from app.db.database import engine, init_models

app = FastAPI(
    title="HackNU Hackathon Project",
    description="Backend for HackNU Hackathon — FastAPI + PostgreSQL + Redis",
    version="1.0.0",
)

# Routers
app.include_router(auth.router)

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

# Startup and shutdown
@app.on_event("startup")
async def on_startup():
    await init_models()
    print("✅ Database tables created")

@app.on_event("shutdown")
async def on_shutdown():
    await engine.dispose()
    print("🛑 Database connection closed")
