import {
  FaFire,
  FaBullseye,
  FaCheckCircle,
  FaCalendarAlt,
} from "react-icons/fa";

const stats = [
  {
    title: "Current Streak",
    value: "18",
    subtitle: "Days Active 🔥",
    color: "bg-orange-100",
    text: "text-orange-600",
    icon: <FaFire className="text-3xl" />,
  },
  {
    title: "Mission Progress",
    value: "74%",
    subtitle: "You're doing great 🚀",
    color: "bg-blue-100",
    text: "text-blue-600",
    icon: <FaBullseye className="text-3xl" />,
  },
  {
    title: "Completed Goals",
    value: "14/20",
    subtitle: "6 Remaining",
    color: "bg-green-100",
    text: "text-green-600",
    icon: <FaCheckCircle className="text-3xl" />,
  },
  {
    title: "Today's Events",
    value: "3",
    subtitle: "Stay on Schedule",
    color: "bg-purple-100",
    text: "text-purple-600",
    icon: <FaCalendarAlt className="text-3xl" />,
  },
];

export default function QuickStats() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.title}
          className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                {item.title}
              </p>

              <h2 className="mt-3 text-4xl font-black text-gray-900">
                {item.value}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {item.subtitle}
              </p>
            </div>

            <div
              className={`${item.color} ${item.text} rounded-2xl p-4 transition-transform duration-300 group-hover:scale-110`}
            >
              {item.icon}
            </div>
          </div>

          <div className="mt-6 h-1 w-full rounded-full bg-gray-100">
            <div
              className={`h-full rounded-full ${
                item.title === "Current Streak"
                  ? "w-4/5 bg-orange-500"
                  : item.title === "Mission Progress"
                  ? "w-3/4 bg-blue-600"
                  : item.title === "Completed Goals"
                  ? "w-2/3 bg-green-600"
                  : "w-1/2 bg-purple-600"
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}