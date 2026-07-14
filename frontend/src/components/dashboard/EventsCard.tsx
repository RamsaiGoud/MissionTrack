import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";

const events = [
  {
    title: "Accenture Interview",
    date: "Tomorrow • 10:00 AM",
  },
  {
    title: "Gym Session",
    date: "Today • 6:00 PM",
  },
  {
    title: "Friend's Birthday",
    date: "Sunday",
  },
];

export default function EventsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-2xl font-bold text-gray-900">
        Upcoming Events
      </h2>

      <div className="mt-6 space-y-4">
        {events.map((event, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4"
          >
            <div className="rounded-xl bg-blue-100 p-3">
              <FaCalendarAlt className="text-blue-600" />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                {event.title}
              </h3>

              <p className="text-sm text-gray-500">
                {event.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}