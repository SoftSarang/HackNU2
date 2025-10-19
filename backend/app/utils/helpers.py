from sqlalchemy.orm import Session
from app.models.team import Team
from app.models.user import User
from fastapi import HTTPException, status
import json
from typing import Optional


def validate_prompt_parameters(parameters: Optional[dict]) -> Optional[str]:
    """Валидация параметров промпта и преобразование в JSON-строку."""
    if not parameters:
        return None
    try:
        # Пример валидации aspect_ratio
        if "aspect_ratio" in parameters:
            ratio = parameters["aspect_ratio"]
            if not isinstance(ratio, str) or ":" not in ratio:
                raise ValueError("aspect_ratio должен быть строкой в формате 'X:Y'")
        return json.dumps(parameters)
    except (ValueError, TypeError) as e:
        raise HTTPException(status_code=400, detail=f"Некорректные параметры: {str(e)}")

def generate_asset_url(asset_type: str, prompt_id: int) -> str:
    """Генерация URL для ассета на основе его типа и ID промпта."""
    pass

from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.team import Team
from app.models.user import User
async def check_team_access(db: AsyncSession, user: User, team_id: int):
    result = await db.execute(select(Team).filter(Team.id == team_id))
    team = result.scalars().first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    if user.id not in [member.id for member in team.members]:
        raise HTTPException(status_code=403, detail="Access to team denied")