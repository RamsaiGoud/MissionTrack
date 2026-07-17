from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/goals",
    tags=["Goals"],
)

goals = []


class Goal(BaseModel):
    title: str
    priority: str
    due_date: str
    completed: bool = False


@router.get("/")
def get_goals():
    return goals


@router.post("/")
def add_goal(goal: Goal):
    new_goal = {
        "id": len(goals) + 1,
        **goal.model_dump()
    }

    goals.append(new_goal)

    return new_goal