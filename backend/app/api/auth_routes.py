from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.user import (
    UserCreate,
    UserResponse,
    UserLogin,
)
from app.services.auth_service import (
    create_user,
    login_user,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/signup",
    response_model=UserResponse,
)
def signup(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    new_user = create_user(db, user)

    if new_user is None:
        raise HTTPException(
            status_code=400,
            detail="Username or email already exists",
        )

    return new_user


@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db),
):
    result = login_user(
        db,
        user.email,
        user.password,
    )

    if result is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    return result