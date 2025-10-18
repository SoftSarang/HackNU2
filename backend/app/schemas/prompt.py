# app/schemas/prompt.py
from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime
from app.schemas.asset import Asset  # Use Pydantic Asset schema

class PromptBase(BaseModel):
    text: str
    parameters: Optional[dict] = None

class PromptCreate(PromptBase):
    team_id: Optional[int] = None

class PromptRead(PromptBase):
    id: int
    version: int
    created_at: datetime
    user_id: int
    team_id: Optional[int] = None
    assets: List[Asset] = []  # Use Pydantic Asset schema

    model_config = ConfigDict(from_attributes=True)