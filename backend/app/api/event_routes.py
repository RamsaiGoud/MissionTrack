from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies.auth import get_current_user

from app.database.database import get_db
from app.models.event import Event
from app.schemas.event import EventCreate, EventUpdate, EventResponse
router = APIRouter(
    prefix="/events",
    tags=["Events"]
)


@router.get("/", response_model=list[EventResponse])
def get_events(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
   return (
    db.query(Event)
    .filter(Event.user_id == current_user.id)
    .all()
)


@router.post("/", response_model=EventResponse)
def create_event(
    event: EventCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    new_event = Event(
        title=event.title,
        date=event.date,
        time=event.time,
        user_id=current_user.id
    )

    db.add(new_event)
    db.commit()
    db.refresh(new_event)

    return new_event
@router.put("/{event_id}", response_model=EventResponse)
def update_event(
    event_id: int,
    event_update: EventUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    event = db.query(Event).filter(
    Event.id == event_id,
    Event.user_id == current_user.id,
).first()

    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")

    event.title = event_update.title
    event.date = event_update.date
    event.time = event_update.time

    db.commit()
    db.refresh(event)

    return event

@router.delete("/{event_id}")
def delete_event(
    event_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    event = (
    db.query(Event)
    .filter(
        Event.id == event_id,
        Event.user_id == current_user.id,
    )
    .first()
)

    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")

    db.delete(event)
    db.commit()

    return {"message": "Event deleted successfully"}