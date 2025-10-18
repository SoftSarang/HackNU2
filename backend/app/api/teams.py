from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.db.database import get_async_session
from app.models.team import Team
from app.models.user import User
from app.schemas.team import TeamCreate, TeamRead
from app.api.deps import get_current_user
from app.schemas.prompt import PromptRead

router = APIRouter(prefix="/teams", tags=["teams"])

@router.post("/", response_model=TeamRead, status_code=status.HTTP_201_CREATED)
async def create_team(team: TeamCreate, db: AsyncSession = Depends(get_async_session), current_user: User = Depends(get_current_user)):
    """Создание новой команды."""
    # Проверяем, существует ли команда с таким именем
    result = await db.execute(select(Team).filter(Team.name == team.name))
    existing_team = result.scalars().first()
    if existing_team:
        raise HTTPException(status_code=400, detail="Team name already exists")
    
    # Создаём команду
    db_team = Team(name=team.name, description=team.description, created_by=current_user.id)
    db.add(db_team)
    await db.commit()
    await db.refresh(db_team)
    
    # Явно загружаем текущего пользователя в текущей сессии
    result = await db.execute(select(User).filter(User.id == current_user.id))
    current_user_in_session = result.scalars().first()
    if not current_user_in_session:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Добавляем создателя в команду
    db_team.members.append(current_user_in_session)
    await db.commit()
    await db.refresh(db_team)
    
    return db_team

@router.get("/", response_model=List[TeamRead])
async def get_teams(db: AsyncSession = Depends(get_async_session), current_user: User = Depends(get_current_user)):
    """Получение списка команд пользователя."""
    return current_user.teams

@router.get("/{team_id}", response_model=TeamRead)
async def get_team_by_id(team_id: int, db: AsyncSession = Depends(get_async_session), current_user: User = Depends(get_current_user)):
    """Получение данных команды по ID."""
    result = await db.execute(select(Team).filter(Team.id == team_id))
    team = result.scalars().first()
    if not team:
        raise HTTPException(status_code=404, detail="Команда не найдена")
    if current_user not in team.members:
        raise HTTPException(status_code=403, detail="Вы не член команды")
    return team

@router.post("/{team_id}/join", response_model=TeamRead)
async def join_team(team_id: int, db: AsyncSession = Depends(get_async_session), current_user: User = Depends(get_current_user)):
    """Вступление в команду."""
    result = await db.execute(select(Team).filter(Team.id == team_id))
    team = result.scalars().first()
    if not team:
        raise HTTPException(status_code=404, detail="Команда не найдена")
    if current_user in team.members:
        raise HTTPException(status_code=400, detail="Вы уже в команде")
    team.members.append(current_user)
    await db.commit()
    return team

@router.get("/{team_id}/prompts", response_model=List[PromptRead])
async def get_team_prompts(team_id: int, db: AsyncSession = Depends(get_async_session), current_user: User = Depends(get_current_user)):
    """Получение промптов команды."""
    result = await db.execute(select(Team).filter(Team.id == team_id))
    team = result.scalars().first()
    if not team:
        raise HTTPException(status_code=404, detail="Команда не найдена")
    if current_user not in team.members:
        raise HTTPException(status_code=403, detail="Вы не член команды")
    return team.prompts