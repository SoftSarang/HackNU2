from pydantic import BaseModel
from typing import Optional, List
from app.schemas.user import UserRead
from app.schemas.prompt import PromptRead

class TeamBase(BaseModel):
    name: str
    description: Optional[str] = None

class TeamCreate(TeamBase):
    pass

class TeamRead(TeamBase):
    id: int
    created_by: int
    members: List[UserRead] = []
    prompts: List[PromptRead] = []

    class Config:
        from_attributes = True