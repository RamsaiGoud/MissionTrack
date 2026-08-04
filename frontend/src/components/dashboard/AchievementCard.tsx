import { useEffect, useState } from "react";
import api from "../../services/api";

interface Achievement {
  title: string;
  progress: number;
  target: number;
  unlocked: boolean;
}

export default function AchievementCard() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    async function fetchAchievements() {
      try {
        const res = await api.get("/achievements/");
        setAchievements(res.data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
    }

    fetchAchievements();
  }, []);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold">
        🏆 Achievements
      </h2>

      <div className="space-y-5">
        {achievements.map((achievement) => (
          <div key={achievement.title}>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-semibold">
                {achievement.title}
              </h3>

              {achievement.unlocked ? (
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                  Unlocked
                </span>
              ) : (
                <span className="text-sm text-gray-500">
                  {achievement.progress}/{achievement.target}
                </span>
              )}
            </div>

            <div className="h-3 rounded-full bg-gray-200">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  achievement.unlocked
                    ? "bg-green-500"
                    : "bg-blue-600"
                }`}
                style={{
                  width: `${
                    (achievement.progress /
                      achievement.target) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}