# app/db/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

# Synchronous engine for Alembic migrations
sync_engine = create_engine(
    url=f"postgresql://{settings.DB_USER}:{settings.DB_PASSWORD}@{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}",
    echo=False
)

# Asynchronous engine for FastAPI
async_engine = create_async_engine(
    url=settings.DATABASE_URL_asyncpg,
    future=True,
    echo=False
)

# Async session factory
AsyncSessionLocal = async_sessionmaker(
    bind=async_engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
    autocommit=False,
)

# Sync session factory for Alembic
SyncSessionLocal = sessionmaker(
    bind=sync_engine,
    autocommit=False,
    autoflush=False,
)

Base = declarative_base()

async def get_async_session() -> AsyncSession:
    """
    Provides an async database session for dependency injection.
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception as e:
            await session.rollback()
            raise e

def get_db():
    """
    Provides a sync database session for Alembic or other sync operations.
    """
    db = SyncSessionLocal()
    try:
        yield db
    finally:
        db.close()

async def init_models():
    """
    Initializes database tables for development (use Alembic in production).
    """
    from app.models import user, team, prompt, asset
    try:
        async with async_engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
    except Exception as e:
        print(f"Error initializing models: {e}")
        raise

async def init_models():
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)