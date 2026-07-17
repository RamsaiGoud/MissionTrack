import {
  FaCode,
  FaLaptopCode,
  FaBriefcase,
} from "react-icons/fa";

const missions = [
  {
    title: "Complete GeeksforGeeks DSA",
    progress: 80,
    color: "bg-blue-600",
    icon: <FaCode className="text-blue-600" />,
  },
  {
    title: "Practice Aptitude",
    progress: 55,
    color: "bg-orange-500",
    icon: <FaLaptopCode className="text-orange-500" />,
  },
  {
    title: "Apply to 50 Companies",
    progress: 25,
    color: "bg-green-600",
    icon: <FaBriefcase className="text-green-600" />,
  },
];

export default function TodaysMission() {
  const averageProgress = Math.round(
    missions.reduce((sum, item) => sum + item.progress, 0) /
      missions.length
  );

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            🎯 Today's Mission
          </h2>

          <p className="mt-1 text-gray-500">
            Focus on your highest priority tasks.
          </p>
        </div>

        <div className="rounded-2xl bg-blue-100 px-4 py-2">
          <span className="font-bold text-blue-700">
            {averageProgress}% Complete
          </span>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {missions.map((mission) => (
          <div key={mission.title}>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {mission.icon}

                <span className="font-semibold text-gray-800">
                  {mission.title}
                </span>
              </div>

              <span className="font-bold text-gray-600">
                {mission.progress}%
              </span>
            </div>

            <div className="h-3 rounded-full bg-gray-200">
              <div
                className={`${mission.color} h-3 rounded-full transition-all duration-700`}
                style={{
                  width: `${mission.progress}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-5 text-white">
        <h3 className="text-lg font-bold">
          🚀 Focus Score
        </h3>

        <p className="mt-2 text-4xl font-black">
          {averageProgress}%
        </p>

        <p className="mt-2 text-blue-100">
          Keep your consistency. You're getting closer to your
          Software Engineer offer every day.
        </p>
      </div>
    </div>
  );
}