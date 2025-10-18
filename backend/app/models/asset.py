# app/models/asset.py
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base

class Asset(Base):
    __tablename__ = 'assets'
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String, nullable=False)
    url = Column(String, nullable=False)  # Added nullable=False for consistency
    prompt_id = Column(Integer, ForeignKey('prompts.id'))

    prompt = relationship('Prompt', back_populates='assets')