from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from app.db.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    prompts = relationship('Prompt', back_populates='user')
    teams = relationship('Team', secondary='team_members', back_populates='members')
    created_teams = relationship('Team', back_populates='creator')  # Добавлено