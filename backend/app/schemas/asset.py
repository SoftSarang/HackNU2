# app/schemas/asset.py
from pydantic import BaseModel, ConfigDict
from typing import Optional

class AssetBase(BaseModel):
    type: str
    url: str

class AssetCreate(AssetBase):
    prompt_id: int

class Asset(AssetBase):
    id: int
    prompt_id: int

    model_config = ConfigDict(from_attributes=True)