from sqlalchemy.orm import Session

from app.models.goal import Goal
from app.models.event import Event
from app.models.user import User

from app.services.analytics_service import calculate_streaks


def get_achievements(
    db: Session,
    current_user: User,
):
    completed_goals = (
        db.query(Goal)
        .filter(
            Goal.user_id == current_user.id,
            Goal.completed == True,
        )
        .count()
    )

    total_events = (
        db.query(Event)
        .filter(
            Event.user_id == current_user.id,
        )
        .count()
    )

    streaks = calculate_streaks(
        db,
        current_user,
    )

    achievements = [
        {
            "title": "🎯 First Goal",
            "progress": min(completed_goals, 1),
            "target": 1,
            "unlocked": completed_goals >= 1,
        },
        {
            "title": "🥉 Goal Starter",
            "progress": min(completed_goals, 10),
            "target": 10,
            "unlocked": completed_goals >= 10,
        },
        {
            "title": "🥈 Goal Master",
            "progress": min(completed_goals, 50),
            "target": 50,
            "unlocked": completed_goals >= 50,
        },
        {
            "title": "🥇 Goal Legend",
            "progress": min(completed_goals, 100),
            "target": 100,
            "unlocked": completed_goals >= 100,
        },
        {
            "title": "🔥 3 Day Streak",
            "progress": min(streaks["current_streak"], 3),
            "target": 3,
            "unlocked": streaks["current_streak"] >= 3,
        },
        {
            "title": "🔥 7 Day Streak",
            "progress": min(streaks["current_streak"], 7),
            "target": 7,
            "unlocked": streaks["current_streak"] >= 7,
        },
        {
            "title": "📅 Event Planner",
            "progress": min(total_events, 20),
            "target": 20,
            "unlocked": total_events >= 20,
        },
    ]

    return achievements