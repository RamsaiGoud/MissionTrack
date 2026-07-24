from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.event import Event
from app.schemas.event import EventCreate, EventResponse

router = APIRouter(
    prefix="/events",
    tags=["Events"]
)


@router.get("/", response_model=list[EventResponse])
def get_events(db: Session = Depends(get_db)):
    return db.query(Event).all()


@router.post("/", response_model=EventResponse)
def create_event(event: EventCreate, db: Session = Depends(get_db)):
    new_event = Event(
        title=event.title,
        date=event.date,
        time=event.time
    )

    db.add(new_event)
    db.commit()
    db.refresh(new_event)

    return new_event


@router.delete("/{event_id}")
def delete_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()

    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")

    db.delete(event)
    db.commit()

    return {"message": "Event deleted successfully"}