import { motion } from "framer-motion";
import { FaBullseye, FaFire, FaArrowRight } from "react-icons/fa";

export default function MissionHero() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning ☀️"
      : hour < 17
      ? "Good Afternoon 🌤️"
      : "Good Evening 🌙";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const progress = 74;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm"
    >
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="max-w-2xl">
          <p className="font-semibold text-blue-600">
            {greeting}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {today}
          </p>

          <div className="mt-6 flex items-center gap-4">
            <div className="rounded-2xl bg-blue-100 p-4">
              <FaBullseye
                size={30}
                className="text-blue-600"
              />
            </div>

            <div>
              <p className="font-semibold text-gray-500">
                Current Mission
              </p>

              <h1 className="text-4xl font-black text-gray-900">
                Become a Software Engineer
              </h1>
            </div>
          </div>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Every application you send and every problem you solve
            brings you one step closer to your dream offer.
            Stay consistent.
          </p>

          {/* Progress */}

          <div className="mt-8">
            <div className="mb-2 flex justify-between">
              <span className="font-semibold text-gray-700">
                Mission Progress
              </span>

              <span className="font-bold text-blue-600">
                {progress}%
              </span>
            </div>

            <div className="h-4 rounded-full bg-gray-200">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1 }}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
              />
            </div>
          </div>

          {/* Bottom Stats */}

          <div className="mt-8 flex flex-wrap gap-10">
            <div>
              <p className="text-sm text-gray-500">
                Target
              </p>

              <h3 className="text-xl font-black">
                Dec 31, 2026
              </h3>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Daily Goal
              </p>

              <h3 className="text-xl font-black">
                5 Tasks
              </h3>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Applications
              </p>

              <h3 className="text-xl font-black">
                50 / Day
              </h3>
            </div>
          </div>

          <button className="mt-8 flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
            Continue Mission

            <FaArrowRight />
          </button>
        </div>

        {/* Right */}

        <div className="flex justify-center">
          <div className="flex h-48 w-48 items-center justify-center rounded-full bg-blue-50">
            <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl">
              <FaFire size={32} />

              <h2 className="mt-2 text-5xl font-black">
                18
              </h2>

              <p className="text-sm font-medium">
                Day Streak 🔥
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}