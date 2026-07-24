from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.goal_routes import router as goal_router
from app.api.event_routes import router as event_router

from app.database.database import Base, engine

# Import models so SQLAlchemy creates the tables
from app.models.goal import Goal
from app.models.event import Event

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MissionTrack API",
    description="Backend API for MissionTrack",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(goal_router)
app.include_router(event_router)


@app.get("/")
def root():
    return {
        "message": "MissionTrack API Running 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }