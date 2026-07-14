import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const tasks = [
  "Complete React Dashboard",
  "Solve 2 DSA Problems",
  "Apply to 50 Jobs",
  "Workout - 45 Minutes",
];

export default function FocusCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-2xl font-bold text-gray-900">
        Today's Focus
      </h2>

      <p className="mt-2 text-gray-500">
        Stay consistent and finish your priorities.
      </p>

      <div className="mt-6 space-y-4">
        {tasks.map((task, index) => (
          <label
            key={index}
            className="flex cursor-pointer items-center gap-4 rounded-2xl p-3 transition hover:bg-gray-50"
          >
            <input
              type="checkbox"
              className="h-5 w-5 accent-blue-600"
            />

            <span className="font-medium text-gray-700">
              {task}
            </span>

            <FaCheckCircle className="ml-auto text-green-500 opacity-70" />
          </label>
        ))}
      </div>
    </motion.div>
  );
}