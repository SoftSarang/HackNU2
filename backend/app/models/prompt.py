# app/models/prompt.py
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.database import Base

class Prompt(Base):
    __tablename__ = 'prompts'
    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False)
    parameters = Column(String, nullable=True)  # JSON string
    version = Column(Integer, default=1)
    created_at = Column(DateTime, default=datetime.utcnow)
    user_id = Column(Integer, ForeignKey('users.id'))
    team_id = Column(Integer, ForeignKey('teams.id'), nullable=True)

    user = relationship('User', back_populates='prompts')
    team = relationship('Team', back_populates='prompts')
    assets = relationship('Asset', back_populates='prompt')