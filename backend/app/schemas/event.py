from pydantic import BaseModel


class EventCreate(BaseModel):
    title: str
    date: str
    time: str


class EventResponse(BaseModel):
    id: int
    title: str
    date: str
    time: str

    class Config:
        from_attributes = True