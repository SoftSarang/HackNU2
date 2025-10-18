from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import Session, sessionmaker, declarative_base
from sqlalchemy import URL, create_engine, text 
from app.core.config import settings

engine = create_async_engine(
    url = settings.DATABASE_URL_asyncpg, 
    future = True,
    echo = False
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
    autocommit=False,
)

Base = declarative_base()

async def get_async_session() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session

async def init_models():
    from app.models import user
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


