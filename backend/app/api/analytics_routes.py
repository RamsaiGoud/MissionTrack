from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.services.analytics_service import calculate_streaks

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"],
)


@router.get("/streak")
def get_streak(db: Session = Depends(get_db)):
    return calculate_streaks(db)