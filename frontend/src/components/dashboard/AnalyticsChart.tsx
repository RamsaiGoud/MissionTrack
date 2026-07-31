interface Goal {
  id: number;
  completed: boolean;
  completed_at: string | null;
}

interface Event {
  id: number;
}

interface AnalyticsChartProps {
  goals: Goal[];
  events: Event[];
}

export default function AnalyticsChart({
  goals,
  events,
}: AnalyticsChartProps) {
  const completedGoals = goals.filter(
    (goal) => goal.completed
  ).length;

  const pendingGoals = goals.length - completedGoals;

  const totalEvents = events.length;

  const completionRate =
    goals.length === 0
      ? 0
      : Math.round((completedGoals / goals.length) * 100);

  const weekDays = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

const weeklyCounts = [0, 0, 0, 0, 0, 0, 0];

goals.forEach((goal) => {
  if (goal.completed && goal.completed_at) {
    const day = new Date(goal.completed_at).getDay();
    weeklyCounts[day]++;
  }
});

const weeklyData = weekDays.map((day, index) => ({
  day,
  value: weeklyCounts[index],
}));

  const maxValue = Math.max(
  ...weeklyData.map((d) => d.value),
  1
);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Weekly Analytics
          </h2>

          <p className="text-sm text-gray-500">
            Productivity Overview
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
          {completionRate}%
        </div>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-slate-50 p-4 text-center">
          <p className="text-sm text-gray-500">Completed</p>
          <h3 className="mt-2 text-2xl font-bold text-green-600">
            {completedGoals}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-50 p-4 text-center">
          <p className="text-sm text-gray-500">Pending</p>
          <h3 className="mt-2 text-2xl font-bold text-orange-500">
            {pendingGoals}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-50 p-4 text-center">
          <p className="text-sm text-gray-500">Events</p>
          <h3 className="mt-2 text-2xl font-bold text-blue-600">
            {totalEvents}
          </h3>
        </div>
      </div>

      <div className="flex h-56 items-end justify-between gap-3">
        {weeklyData.map((item, index) => (
          <div
            key={`${item.day}-${index}`}
            className="flex flex-1 flex-col items-center"
          >
            <div
              className={`w-full rounded-t-xl transition-all duration-500 ${
                item.value === maxValue
                  ? "bg-green-500"
                  : "bg-blue-600"
              }`}
              style={{
                height: `${(item.value / maxValue) * 140}px`,
              }}
            />

            <span className="mt-3 text-sm font-semibold text-gray-500">
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}