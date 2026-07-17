from sqlalchemy import Boolean, Column, Integer, String

from app.database.database import Base


class Goal(Base):
    __tablename__ = "goals"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    priority = Column(String)
    due_date = Column(String)
    completed = Column(Boolean, default=False)