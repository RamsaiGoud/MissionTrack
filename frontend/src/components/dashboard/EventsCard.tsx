import { useState } from "react";
import { FaCalendarAlt, FaPlus, FaTrash } from "react-icons/fa";
import { useCalendar } from "../../context/CalendarContext";
import api from "../../services/api";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
}

interface EventsCardProps {
  events: Event[];
  refreshEvents: () => Promise<void>;
  refreshData: () => Promise<void>;
}

export default function EventsCard({
  events,
  refreshData,
}: EventsCardProps) {
  const { selectedDate } = useCalendar();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [showForm, setShowForm] = useState(false);

  async function addEvent() {
    if (!title.trim() || !date) return;

    try {
      await api.post("/events/", {
        title: title.trim(),
        date,
        time: time || "All Day",
      });

      await refreshData();

      setTitle("");
      setDate("");
      setTime("");
      setShowForm(false);
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  }

  async function deleteEvent(id: number) {
    try {
      await api.delete(`/events/${id}`);

      await refreshData();
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  }

  const filteredEvents = events.filter(
    (event) => event.date === selectedDate
  );

  return (
    <div className="rounded-3xl bg-white p-6 shadow-md">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <FaCalendarAlt />
          Events
        </h2>

        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
        >
          <FaPlus />
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-xl border border-gray-200 p-4">
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-3 w-full rounded-lg border p-2"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mb-3 w-full rounded-lg border p-2"
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mb-3 w-full rounded-lg border p-2"
          />

          <button
            onClick={addEvent}
            className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Add Event
          </button>
        </div>
      )}

      <div className="mb-4 rounded-lg bg-blue-50 p-3 text-center text-sm font-medium text-blue-700">
        Selected Date: {selectedDate}
      </div>

      <div className="space-y-3">
        {filteredEvents.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-gray-500">
            No events for this date 📅
          </div>
        ) : (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between rounded-xl border border-gray-200 p-4"
            >
              <div>
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-500">{event.date}</p>
                <p className="text-sm text-blue-600">{event.time}</p>
              </div>

              <button
                onClick={() => deleteEvent(event.id)}
                className="text-red-500 hover:text-red-700"
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