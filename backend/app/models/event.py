from sqlalchemy import Column, Integer, String

from app.database.database import Base


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    date = Column(String, nullable=False)
    time = Column(String, nullable=False)