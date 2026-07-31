from datetime import datetime
from pydantic import BaseModel


class GoalCreate(BaseModel):
    title: str
    priority: str
    due_date: str


class GoalUpdate(BaseModel):
    title: str
    priority: str
    due_date: str
    completed: bool


class GoalResponse(BaseModel):
    id: int
    title: str
    priority: str
    due_date: str
    completed: bool
    completed_at: datetime | None

    class Config:
        from_attributes = True