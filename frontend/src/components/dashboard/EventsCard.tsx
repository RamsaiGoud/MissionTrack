import { useState } from "react";
import { FaCalendarAlt, FaPlus, FaTrash } from "react-icons/fa";
import { initialEvents } from "../../data/events";
import { useCalendar } from "../../context/CalendarContext";

export default function EventsCard() {
  const { selectedDate } = useCalendar();

  const [events, setEvents] = useState(initialEvents);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [showForm, setShowForm] = useState(false);

  const filteredEvents = events.filter(
    (event) => event.date === selectedDate
  );

  function addEvent() {
    if (!title.trim() || !date) return;

    const newEvent = {
      id: Date.now(),
      title: title.trim(),
      date,
      time: time || "All Day",
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);

    setTitle("");
    setDate("");
    setTime("");
    setShowForm(false);
  }

  function deleteEvent(id: number) {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== id)
    );
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-md">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <FaCalendarAlt />
          Events
        </h2>

        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-blue-600 p-2 text-white transition hover:bg-blue-700"
        >
          <FaPlus />
        </button>
      </div>

      {/* Add Event Form */}
      {showForm && (
        <div className="mb-6 rounded-xl border border-gray-200 p-4">
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-3 w-full rounded-lg border p-2 outline-none focus:border-blue-500"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mb-3 w-full rounded-lg border p-2 outline-none focus:border-blue-500"
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mb-2 w-full rounded-lg border p-2 outline-none focus:border-blue-500"
          />

          <p className="mb-4 text-xs text-gray-500">
            Time is optional.
          </p>

          <button
            onClick={addEvent}
            className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Add Event
          </button>
        </div>
      )}

      {/* Selected Date */}
      <div className="mb-4 rounded-lg bg-blue-50 p-3 text-center text-sm font-medium text-blue-700">
        Selected Date: {selectedDate}
      </div>

      {/* Events */}
      <div className="space-y-3">
        {filteredEvents.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-gray-500">
            No events for this date 📅
          </div>
        ) : (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition hover:shadow-md"
            >
              <div>
                <h3 className="font-semibold">
                  {event.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {event.date}
                </p>

                <p className="text-sm text-blue-600">
                  {event.time}
                </p>
              </div>

              <button
                onClick={() => deleteEvent(event.id)}
                className="text-red-500 transition hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}