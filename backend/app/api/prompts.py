from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional
from app.db.database import get_async_session
from app.models.prompt import Prompt
from app.models.team import Team
from app.schemas.prompt import PromptCreate, PromptRead
from app.api.deps import get_current_user
from app.models.user import User
from app.utils.helpers import check_team_access
from sqlalchemy.orm import joinedload

router = APIRouter(prefix="/prompts", tags=["prompts"])  

@router.post("/", response_model=PromptRead, status_code=status.HTTP_201_CREATED)
async def create_prompt(prompt: PromptCreate, db: AsyncSession = Depends(get_async_session), current_user: User = Depends(get_current_user)):
    print(f"Received prompt data: {prompt}")
    if prompt.team_id:
        await check_team_access(db, current_user, prompt.team_id)
    db_prompt = Prompt(
        text=prompt.text,
        parameters=prompt.parameters,
        user_id=current_user.id,
        team_id=prompt.team_id
    )
    db.add(db_prompt)
    await db.commit()
    await db.refresh(db_prompt)
    return db_prompt


@router.get("/", response_model=list[PromptRead])
async def get_prompts(db: AsyncSession = Depends(get_async_session), current_user: User = Depends(get_current_user)):
    query = select(Prompt).where(Prompt.user_id == current_user.id)
    result = await db.execute(query)
    prompts = result.scalars().all()
    return prompts

@router.put("/{prompt_id}", response_model=PromptRead)
async def update_prompt(prompt_id: int, prompt: PromptCreate, db: AsyncSession = Depends(get_async_session), current_user: User = Depends(get_current_user)):
    """Редактирование промпта."""
    result = await db.execute(select(Prompt).filter(Prompt.id == prompt_id))
    db_prompt = result.scalars().first()
    if not db_prompt:
        raise HTTPException(status_code=404, detail="Промпт не найден")
    if db_prompt.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Нет прав для редактирования")
    db_prompt.text = prompt.text
    db_prompt.parameters = prompt.parameters
    db_prompt.team_id = prompt.team_id
    await db.commit()
    await db.refresh(db_prompt)
    return db_prompt

@router.delete("/{prompt_id}")
async def delete_prompt(prompt_id: int, db: AsyncSession = Depends(get_async_session), current_user: User = Depends(get_current_user)):
    """Удаление промпта."""
    result = await db.execute(select(Prompt).filter(Prompt.id == prompt_id))
    db_prompt = result.scalars().first()
    if not db_prompt:
        raise HTTPException(status_code=404, detail="Промпт не найден")
    if db_prompt.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Нет прав для удаления")
    await db.delete(db_prompt)
    await db.commit()
    return {"message": "Промпт удален"}
