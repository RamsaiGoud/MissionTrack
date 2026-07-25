export default function AnalyticsChart() {
  const weeklyData = [
    { day: "Mon", value: 35 },
    { day: "Tue", value: 55 },
    { day: "Wed", value: 70 },
    { day: "Thu", value: 50 },
    { day: "Fri", value: 85 },
    { day: "Sat", value: 95 },
    { day: "Sun", value: 75 },
  ];

  const maxValue = Math.max(...weeklyData.map((d) => d.value));

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
          75%
        </div>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-slate-50 p-4 text-center">
          <p className="text-sm text-gray-500">Completed</p>
          <h3 className="mt-2 text-2xl font-bold text-green-600">
            12
          </h3>
        </div>

        <div className="rounded-xl bg-slate-50 p-4 text-center">
          <p className="text-sm text-gray-500">Pending</p>
          <h3 className="mt-2 text-2xl font-bold text-orange-500">
            5
          </h3>
        </div>

        <div className="rounded-xl bg-slate-50 p-4 text-center">
          <p className="text-sm text-gray-500">Events</p>
          <h3 className="mt-2 text-2xl font-bold text-blue-600">
            8
          </h3>
        </div>
      </div>

      <div className="flex h-56 items-end justify-between gap-3">
        {weeklyData.map((item) => (
          <div
            key={item.day}
            className="flex flex-1 flex-col items-center"
          >
            <div
              className={`w-full rounded-t-xl transition-all duration-500 ${
                item.value === maxValue
                  ? "bg-green-500"
                  : "bg-blue-600"
              }`}
              style={{
                height: `${item.value * 1.6}px`,
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