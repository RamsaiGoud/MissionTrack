import { FaCalendarAlt } from "react-icons/fa";

const days = ["S", "M", "T", "W", "T", "F", "S"];

export default function CalendarCard() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Calendar
        </h2>

        <FaCalendarAlt className="text-blue-600 text-xl" />
      </div>

      <p className="mt-2 text-gray-500">
        July 2026
      </p>

      <div className="grid grid-cols-7 gap-2 mt-6">
        {days.map((day) => (
          <div
            key={day}
            className="text-center font-semibold text-gray-500"
          >
            {day}
          </div>
        ))}

        {Array.from({ length: 31 }, (_, i) => (
          <button
            key={i}
            className={`rounded-xl p-2 transition ${
              i + 1 === 15
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}