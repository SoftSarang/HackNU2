from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.database import get_db
from app.models.prompt import Prompt
from app.models.team import Team
from app.schemas.prompt import PromptCreate, PromptRead
from app.api.deps import get_current_user
from app.models.user import User
from app.utils.helpers import check_team_access

router = APIRouter(prefix="/prompts", tags=["prompts"])

@router.post("/", response_model=PromptRead)
async def create_prompt(prompt: PromptCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Создание нового промпта."""
    if prompt.team_id:
        check_team_access(db, current_user, prompt.team_id)
    db_prompt = Prompt(
        text=prompt.text,
        parameters=prompt.parameters,
        user_id=current_user.id,
        team_id=prompt.team_id
    )
    db.add(db_prompt)
    db.commit()
    db.refresh(db_prompt)
    return db_prompt

@router.get("/", response_model=List[PromptRead])
async def get_prompts(team_id: Optional[int] = None, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Получение списка промптов с фильтрацией по команде."""
    query = db.query(Prompt)
    if team_id:
        check_team_access(db, current_user, team_id)
        query = query.filter(Prompt.team_id == team_id)
    else:
        query = query.filter(Prompt.user_id == current_user.id)
    return query.all()

@router.put("/{prompt_id}", response_model=PromptRead)
async def update_prompt(prompt_id: int, prompt: PromptCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Редактирование промпта."""
    db_prompt = db.query(Prompt).filter(Prompt.id == prompt_id).first()
    if not db_prompt:
        raise HTTPException(status_code=404, detail="Промпт не найден")
    if db_prompt.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Нет прав для редактирования")
    db_prompt.text = prompt.text
    db_prompt.parameters = prompt.parameters
    db_prompt.team_id = prompt.team_id
    db.commit()
    db.refresh(db_prompt)
    return db_prompt

@router.delete("/{prompt_id}")
async def delete_prompt(prompt_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Удаление промпта."""
    db_prompt = db.query(Prompt).filter(Prompt.id == prompt_id).first()
    if not db_prompt:
        raise HTTPException(status_code=404, detail="Промпт не найден")
    if db_prompt.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Нет прав для удаления")
    db.delete(db_prompt)
    db.commit()
    return {"message": "Промпт удален"}