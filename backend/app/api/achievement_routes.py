from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.dependencies.auth import get_current_user
from app.services.achievement_service import get_achievements

router = APIRouter(
    prefix="/achievements",
    tags=["Achievements"],
)


@router.get("/")
def achievements(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_achievements(
        db,
        current_user,
    )