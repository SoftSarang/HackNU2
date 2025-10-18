from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_async_session
from app.db.redis import get_redis
from app.models.user import User
from app.schemas.user import UserCreate, UserRead, LoginRequest
from app.schemas.token import Token
from app.core.security import (
    verify_password,
    get_password_hash,
    create_access_token,
    create_refresh_token,
)
from app.core.config import settings  
from app.api.deps import get_current_user
router = APIRouter(prefix="/auth", tags=["auth"])


# ======== REGISTER ========
@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def register(user_create: UserCreate, db: AsyncSession = Depends(get_async_session)):
    # Проверяем, есть ли пользователь с таким email
    result = await db.execute(select(User).where(User.email == user_create.email))
    existing_user = result.scalars().first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Хэшируем пароль
    hashed_password = get_password_hash(user_create.password)
    new_user = User(email=user_create.email, hashed_password=hashed_password)

    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    return new_user


# ======== LOGIN ========
@router.post("/login", response_model=Token)
async def login(credentials: LoginRequest, db: AsyncSession = Depends(get_async_session)):
    # Проверяем, есть ли пользователь
    result = await db.execute(select(User).where(User.email == credentials.email))
    user = result.scalars().first()
    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")

    # Создаем токены
    access_token = create_access_token(data={"sub": str(user.id)})
    refresh_token = create_refresh_token(data={"sub": str(user.id)})

    # Сохраняем refresh token в Redis
    redis = await get_redis()
    expire_seconds = settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60
    await redis.set(f"refresh_token:{user.id}", refresh_token, ex=expire_seconds)

    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}


# ======== REFRESH TOKEN ========
@router.post("/refresh", response_model=Token)
async def refresh_token(user_id: str, token: str):
    redis = await get_redis()
    saved_token = await redis.get(f"refresh_token:{user_id}")
    if not saved_token or saved_token != token:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    access_token = create_access_token(data={"sub": user_id})
    return {"access_token": access_token, "token_type": "bearer"}


# ======== LOGOUT ========
@router.post("/logout")
async def logout(user_id: str):
    redis = await get_redis()
    await redis.delete(f"refresh_token:{user_id}")
    return {"message": "Successfully logged out"}

@router.get("/me", response_model=UserRead)
async def get_current_user(user: User = Depends(get_current_user)):
    return user