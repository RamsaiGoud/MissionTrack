from pydantic import BaseModel


class GoalCreate(BaseModel):
    title: str
    priority: str
    due_date: str


class GoalResponse(BaseModel):
    id: int
    title: str
    priority: str
    due_date: str
    completed: bool

    class Config:
        from_attributes = True