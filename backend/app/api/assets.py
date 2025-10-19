from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models.asset import Asset
from app.models.prompt import Prompt
from app.schemas.asset import AssetCreate, Asset
from app.api.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/assets", tags=["assets"])

@router.post("/", response_model=Asset)
async def create_asset(asset: AssetCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Создание ассета для промпта."""
    prompt = db.query(Prompt).filter(Prompt.id == asset.prompt_id).first()
    if not prompt:
        raise HTTPException(status_code=404, detail="Промпт не найден")
    if prompt.user_id != current_user.id and prompt.team_id not in [team.id for team in current_user.teams]:
        raise HTTPException(status_code=403, detail="Нет прав для добавления ассета")
    db_asset = Asset(type=asset.type, url=asset.url, prompt_id=asset.prompt_id)
    db.add(db_asset)
    db.commit()
    db.refresh(db_asset)
    return db_asset

@router.get("/prompt/{prompt_id}", response_model=List[Asset])
async def get_prompt_assets(prompt_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Получение ассетов для промпта."""
    prompt = db.query(Prompt).filter(Prompt.id == prompt_id).first()
    if not prompt:
        raise HTTPException(status_code=404, detail="Промпт не найден")
    if prompt.user_id != current_user.id and prompt.team_id not in [team.id for team in current_user.teams]:
        raise HTTPException(status_code=403, detail="Нет прав для просмотра ассетов")
    return prompt.assets