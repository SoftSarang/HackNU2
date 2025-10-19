from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from app.db.database import Base

team_members = Table(
    'team_members', Base.metadata,
    Column('team_id', Integer, ForeignKey('teams.id'), primary_key=True),
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True)
)


class Team(Base):
    __tablename__ = "teams"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)  # Убрали unique=True
    description = Column(String, nullable=True)
    created_by = Column(Integer, ForeignKey("users.id"))
    
    creator = relationship("User", back_populates="created_teams")
    members = relationship("User", secondary="team_members", back_populates="teams")
    prompts = relationship("Prompt", back_populates="team")