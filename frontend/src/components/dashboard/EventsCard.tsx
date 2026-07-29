import { useEffect, useRef, useState } from "react";
import { FaCalendarAlt, FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { useCalendar } from "../../context/CalendarContext";
import api from "../../services/api";
import ConfirmDialog from "../ui/ConfirmDialog";


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
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

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
setEditingEvent(null);
setShowForm(false);
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  }
  async function updateEvent() {
  if (!editingEvent) return;

  try {
    await api.put(`/events/${editingEvent.id}`, {
      title,
      date,
      time: time || "All Day",
    });

    await refreshData();

    setTitle("");
    setDate("");
    setTime("");
    setEditingEvent(null);
    setShowForm(false);
  } catch (error) {
    console.error("Failed to update event:", error);
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
  useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (
      formRef.current &&
      !formRef.current.contains(event.target as Node)
    ) {
      setTitle("");
      setDate("");
      setTime("");
      setShowForm(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

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
        <div
  ref={formRef}
  className="mb-6 rounded-xl border border-gray-200 p-4"
>
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

         <div className="flex gap-3">
  <button
  onClick={editingEvent ? updateEvent : addEvent}
  className="flex-1 rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
>
  {editingEvent ? "Update Event" : "Add Event"}
</button>

  <button
  onClick={() => {
  setTitle("");
  setDate("");
  setTime("");
  setEditingEvent(null);
  setShowForm(false);
}}
    className="rounded-lg border border-gray-300 px-5 py-2 hover:bg-gray-100"
  >
    Cancel
  </button>
</div>
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

              <div className="flex gap-3">
  <button
    onClick={() => {
      setEditingEvent(event);
      setTitle(event.title);
      setDate(event.date);
      setTime(event.time === "All Day" ? "" : event.time);
      setShowForm(true);
    }}
    className="text-blue-600 hover:text-blue-800"
    title="Edit Event"
  >
    <FaEdit />
  </button>

  <button
    onClick={() => setEventToDelete(event)}
    className="text-red-500 hover:text-red-700"
    title="Delete Event"
  >
    <FaTrash />
  </button>
</div>
            </div>
          ))
        )}
           </div>

      <ConfirmDialog
        isOpen={eventToDelete !== null}
        title="Delete Event"
        message={`Are you sure you want to delete "${eventToDelete?.title}"?`}
        onCancel={() => setEventToDelete(null)}
        onConfirm={async () => {
          if (!eventToDelete) return;

          await deleteEvent(eventToDelete.id);
          setEventToDelete(null);
        }}
      />
    </div>
  );
}