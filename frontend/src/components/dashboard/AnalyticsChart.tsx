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

  return (
    <div className="rounded-3xl bg-white p-6 shadow-md">
      <h2 className="text-2xl font-bold text-gray-900">
        Weekly Analytics
      </h2>

      <p className="mt-2 text-gray-500">
        Productivity This Week
      </p>

      <div className="mt-8 flex h-56 items-end justify-between gap-3">
        {weeklyData.map((item) => (
          <div
            key={item.day}
            className="flex flex-col items-center"
          >
            <div
              className="w-10 rounded-t-xl bg-blue-600 transition-all duration-500"
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