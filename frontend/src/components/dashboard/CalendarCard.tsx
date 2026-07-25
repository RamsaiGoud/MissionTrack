import { useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useCalendar } from "../../context/CalendarContext";

export default function CalendarCard() {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const { selectedDate, setSelectedDate } = useCalendar();

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  function formatDate(date: Date) {
    return `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  const monthTitle = currentMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const calendar = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  }, [currentMonth]);

  function isToday(date: Date) {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  function isSelected(date: Date) {
    return formatDate(date) === selectedDate;
  }

  function previousMonth() {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        1
      )
    );
  }

  function nextMonth() {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        1
      )
    );
  }

  return (
    <div className="rounded-3xl bg-white p-5 shadow-md">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <button
          aria-label="Previous month"
          onClick={previousMonth}
          className="rounded-lg p-2 transition hover:bg-gray-100"
        >
          <FaChevronLeft />
        </button>

        <h2 className="text-lg font-bold text-gray-900">
          {monthTitle}
        </h2>

        <button
          aria-label="Next month"
          onClick={nextMonth}
          className="rounded-lg p-2 transition hover:bg-gray-100"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500">
        {weekDays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar */}
      <div className="mt-2 grid grid-cols-7 gap-1">
        {calendar.map((date, index) =>
          date ? (
            <button
              key={formatDate(date)}
              onClick={() => setSelectedDate(formatDate(date))}
              className={`h-9 rounded-lg text-sm font-medium transition-all duration-200 ${
                isSelected(date)
                  ? "bg-blue-600 text-white shadow"
                  : isToday(date)
                  ? "border-2 border-blue-600 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              {date.getDate()}
            </button>
          ) : (
            <div
              key={`empty-${index}`}
              className="h-9"
            />
          )
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 border-t pt-3 text-center text-sm text-gray-500">
        Selected Date:
        <span className="ml-2 font-semibold text-blue-600">
          {selectedDate}
        </span>
      </div>
    </div>
  );
}