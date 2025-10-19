# app/schemas/prompt.py
from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime
from app.schemas.asset import Asset  # Use Pydantic Asset schema
from pydantic import BaseModel
from typing import Optional, Dict, Any

class PromptBase(BaseModel):
    text: str
    parameters: Optional[dict] = None

class PromptCreate(PromptBase):
    text: str
    parameters: Optional[str] = None
    team_id: Optional[int] = None
    

class PromptRead(BaseModel):
    id: int
    text: str
    parameters: Optional[str] = None
    version: int
    created_at: datetime
    user_id: int
    team_id: Optional[int] = None

    class Config:
        from_attributes = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
        exclude = {"assets"}  # Исключаем assets