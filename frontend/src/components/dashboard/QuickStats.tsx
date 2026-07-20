import {
  FaBullseye,
  FaCheckCircle,
  FaCalendarAlt,
  FaTasks,
} from "react-icons/fa";
import { useCalendar } from "../../context/CalendarContext";

interface Goal {
  id: number;
  completed: boolean;
}

interface Event {
  id: number;
  date: string;
}

interface QuickStatsProps {
  goals: Goal[];
  events: Event[];
}

export default function QuickStats({
  goals,
  events,
}: QuickStatsProps) {
  const { selectedDate } = useCalendar();

  const totalGoals = goals.length;

  const completedGoals = goals.filter(
    (goal) => goal.completed
  ).length;

  const pendingGoals = totalGoals - completedGoals;

  const completionRate =
    totalGoals === 0
      ? 0
      : Math.round((completedGoals / totalGoals) * 100);

  const selectedEvents = events.filter(
    (event) => event.date === selectedDate
  ).length;

  const stats = [
    {
      title: "Total Goals",
      value: totalGoals,
      subtitle: `${pendingGoals} Pending`,
      color: "bg-orange-100",
      text: "text-orange-600",
      icon: <FaTasks className="text-3xl" />,
      progress: totalGoals === 0 ? 0 : 100,
    },
    {
      title: "Mission Progress",
      value: `${completionRate}%`,
      subtitle: "Completion Rate",
      color: "bg-blue-100",
      text: "text-blue-600",
      icon: <FaBullseye className="text-3xl" />,
      progress: completionRate,
    },
    {
      title: "Completed Goals",
      value: completedGoals,
      subtitle: `Out of ${totalGoals}`,
      color: "bg-green-100",
      text: "text-green-600",
      icon: <FaCheckCircle className="text-3xl" />,
      progress: completionRate,
    },
    {
      title: "Selected Date Events",
      value: selectedEvents,
      subtitle: selectedDate,
      color: "bg-purple-100",
      text: "text-purple-600",
      icon: <FaCalendarAlt className="text-3xl" />,
      progress:
        selectedEvents === 0
          ? 0
          : Math.min((selectedEvents / 5) * 100, 100),
    },
  ];

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
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}