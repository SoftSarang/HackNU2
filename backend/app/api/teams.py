from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.db.database import get_async_session
from app.models.team import Team
from app.models.user import User
from app.schemas.team import TeamCreate, TeamRead
from app.schemas.prompt import PromptRead
from app.api.deps import get_current_user
from sqlalchemy import or_

router = APIRouter(prefix="/teams", tags=["teams"])

@router.post("/", response_model=TeamRead, status_code=status.HTTP_201_CREATED)
async def create_team(team: TeamCreate, db: AsyncSession = Depends(get_async_session), current_user: User = Depends(get_current_user)):
    """Создание новой команды."""
    result = await db.execute(select(Team).filter(Team.name == team.name))
    existing_team = result.scalars().first()
    if existing_team:
        raise HTTPException(status_code=400, detail="Team name already exists")
    
    db_team = Team(name=team.name, description=team.description, created_by=current_user.id)
    db.add(db_team)
    await db.commit()
    await db.refresh(db_team)
    
    result = await db.execute(select(User).filter(User.id == current_user.id))
    current_user_in_session = result.scalars().first()
    if not current_user_in_session:
        raise HTTPException(status_code=404, detail="User not found")
    
    db_team.members.append(current_user_in_session)
    await db.commit()
    await db.refresh(db_team)
    
    return db_team

@router.get("/", response_model=List[TeamRead])
async def get_teams(
    name: str = None,
    db: AsyncSession = Depends(get_async_session),
    current_user: User = Depends(get_current_user)
):
    """Получение списка команд пользователя или поиск по имени."""
    if name:
        result = await db.execute(select(Team).filter(Team.name.ilike(f"%{name}%")))
    else:
        result = await db.execute(select(Team).filter(Team.members.contains(current_user)))
    teams = result.scalars().all()
    return teams

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
    await db.refresh(team)
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

@router.post("/{team_id}/prompts", response_model=PromptRead)
async def add_team_prompt(
    team_id: int,
    prompt_data: dict,
    db: AsyncSession = Depends(get_async_session),
    current_user: User = Depends(get_current_user)
):
    """Добавление промта в команду."""
    result = await db.execute(select(Team).filter(Team.id == team_id))
    team = result.scalars().first()
    if not team:
        raise HTTPException(status_code=404, detail="Команда не найдена")
    if current_user not in team.members:
        raise HTTPException(status_code=403, detail="Вы не член команды")
    
    prompt_id = prompt_data.get("prompt_id")
    result = await db.execute(select(Prompt).filter(Prompt.id == prompt_id, Prompt.user_id == current_user.id))
    prompt = result.scalars().first()
    if not prompt:
        raise HTTPException(status_code=404, detail="Промпт не найден или не принадлежит вам")
    
    prompt.team_id = team_id
    await db.commit()
    await db.refresh(prompt)
    return prompt

@router.post("/{team_id}/invite", response_model=TeamRead)
async def invite_to_team(
    team_id: int,
    invite_data: dict,
    db: AsyncSession = Depends(get_async_session),
    current_user: User = Depends(get_current_user)
):
    """Приглашение пользователя в команду по email."""
    result = await db.execute(select(Team).filter(Team.id == team_id))
    team = result.scalars().first()
    if not team:
        raise HTTPException(status_code=404, detail="Команда не найдена")
    if team.created_by != current_user.id:
        raise HTTPException(status_code=403, detail="Только создатель команды может приглашать")
    
    email = invite_data.get("email")
    result = await db.execute(select(User).filter(User.email == email))
    user = result.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    if user in team.members:
        raise HTTPException(status_code=400, detail="Пользователь уже в команде")
    
    team.members.append(user)
    await db.commit()
    await db.refresh(team)
    return team

@router.delete("/{team_id}/members/{member_id}", response_model=TeamRead)
async def remove_team_member(
    team_id: int,
    member_id: int,
    db: AsyncSession = Depends(get_async_session),
    current_user: User = Depends(get_current_user)
):
    """Удаление участника из команды."""
    result = await db.execute(select(Team).filter(Team.id == team_id))
    team = result.scalars().first()
    if not team:
        raise HTTPException(status_code=404, detail="Команда не найдена")
    if team.created_by != current_user.id:
        raise HTTPException(status_code=403, detail="Только создатель команды может удалять участников")
    
    result = await db.execute(select(User).filter(User.id == member_id))
    member = result.scalars().first()
    if not member:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    if member not in team.members:
        raise HTTPException(status_code=400, detail="Пользователь не в команде")
    
    team.members.remove(member)
    await db.commit()
    await db.refresh(team)
    return team