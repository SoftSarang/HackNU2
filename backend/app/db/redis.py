from redis.asyncio import Redis
from app.core.config import settings

_redis = None

async def get_redis() -> Redis:
    global _redis
    if _redis is None:
        _redis = Redis(
            host=settings.REDIS_HOST,
            port=settings.REDIS_PORT,
            db=0,
            password=settings.REDIS_PASSWORD,
            decode_responses=True
        )
    return _redis
