from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.goal import Goal
from app.schemas.goal import GoalCreate, GoalUpdate, GoalResponse

router = APIRouter(
    prefix="/goals",
    tags=["Goals"]
)


@router.get("/", response_model=list[GoalResponse])
def get_goals(db: Session = Depends(get_db)):
    return db.query(Goal).all()


@router.post("/", response_model=GoalResponse)
def create_goal(goal: GoalCreate, db: Session = Depends(get_db)):
    new_goal = Goal(
        title=goal.title,
        priority=goal.priority,
        due_date=goal.due_date,
        completed=False
    )

    db.add(new_goal)
    db.commit()
    db.refresh(new_goal)

    return new_goal


@router.put("/{goal_id}", response_model=GoalResponse)
def update_goal(goal_id: int, goal_update: GoalUpdate, db: Session = Depends(get_db)):
    goal = db.query(Goal).filter(Goal.id == goal_id).first()

    if goal is None:
        raise HTTPException(status_code=404, detail="Goal not found")

    goal.completed = goal_update.completed

    db.commit()
    db.refresh(goal)

    return goal


@router.delete("/{goal_id}")
def delete_goal(goal_id: int, db: Session = Depends(get_db)):
    goal = db.query(Goal).filter(Goal.id == goal_id).first()

    if goal is None:
        raise HTTPException(status_code=404, detail="Goal not found")

    db.delete(goal)
    db.commit()

    return {"message": "Goal deleted successfully"}