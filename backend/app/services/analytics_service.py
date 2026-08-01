from datetime import datetime, timedelta

from sqlalchemy.orm import Session

from app.models.goal import Goal


def calculate_streaks(db: Session):
    completed_goals = (
        db.query(Goal)
        .filter(
            Goal.completed == True,
            Goal.completed_at != None
        )
        .all()
    )

    completed_days = sorted(
        {
            goal.completed_at.date()
            for goal in completed_goals
        }
    )

    if not completed_days:
        return {
            "current_streak": 0,
            "longest_streak": 0,
        }

    # ---------- Current Streak ----------
    completed_set = set(completed_days)

    current_streak = 0
    current_day = datetime.now().date()

    while current_day in completed_set:
        current_streak += 1
        current_day -= timedelta(days=1)

    # ---------- Longest Streak ----------
    longest_streak = 1
    temp = 1

    for i in range(1, len(completed_days)):
        if completed_days[i] == completed_days[i - 1] + timedelta(days=1):
            temp += 1
            longest_streak = max(longest_streak, temp)
        else:
            temp = 1

    return {
        "current_streak": current_streak,
        "longest_streak": longest_streak,
    }