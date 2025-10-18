from sqlalchemy.orm import Session
from app.models.team import Team
from app.models.user import User
from fastapi import HTTPException, status
import json
from typing import Optional

def check_team_access(db: Session, user: User, team_id: int) -> None:
    """Проверка, является ли пользователь членом команды."""
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Команда не найдена")
    if user not in team.members:
        raise HTTPException(status_code=403, detail="Вы не член команды")

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