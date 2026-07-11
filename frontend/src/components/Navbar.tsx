import { motion } from "framer-motion";
import { FaBell, FaSearch } from "react-icons/fa";

export default function Navbar() {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mb-8 flex items-center justify-between"
    >
      {/* Greeting */}

      <div>
        <h1 className="text-4xl font-black text-gray-900">
          Good Evening, Ram 👋
        </h1>

        <p className="mt-2 text-gray-500">
          Stay focused. You're getting closer to your mission.
        </p>
      </div>

      {/* Right Side */}

      <div className="flex items-center gap-5">

        {/* Search */}

        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-sm">

          <FaSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="w-56 bg-transparent outline-none"
          />

        </div>

        {/* Notification */}

        <button className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm transition hover:scale-105">

          <FaBell size={18} />

          <span className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-red-500"></span>

        </button>

        {/* Profile */}

        <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-2 shadow-sm">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-black text-white">

            R

          </div>

          <div>

            <h3 className="font-bold text-gray-900">
              Ram
            </h3>

            <p className="text-sm text-gray-500">
              Future Software Engineer
            </p>

          </div>

        </div>

      </div>

    </motion.div>
  );
}