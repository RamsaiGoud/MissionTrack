from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.goal_routes import router as goal_router

app = FastAPI(
    title="MissionTrack API",
    description="Backend API for MissionTrack",
    version="1.0.0",
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routes
app.include_router(goal_router)


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