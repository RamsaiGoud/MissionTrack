import { motion } from "framer-motion";
import { FaBullseye, FaFire } from "react-icons/fa";

export default function MissionHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200"
    >
      <div className="flex items-center justify-between">

        {/* Left */}

        <div className="max-w-xl">

          <div className="flex items-center gap-3">

            <div className="rounded-2xl bg-blue-100 p-4">

              <FaBullseye
                size={28}
                className="text-blue-600"
              />

            </div>

            <div>

              <p className="text-gray-500 font-semibold">
                Current Mission
              </p>

              <h1 className="text-4xl font-black text-gray-900">
                Become Software Engineer
              </h1>

            </div>

          </div>

          <p className="mt-6 text-lg text-gray-500 leading-8">
            Stay consistent every single day.
            Small improvements create big success.
          </p>

          {/* Progress */}

          <div className="mt-8">

            <div className="flex justify-between">

              <span className="font-bold">
                Progress
              </span>

              <span className="font-bold text-blue-600">
                74%
              </span>

            </div>

            <div className="mt-3 h-4 rounded-full bg-gray-200">

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "74%" }}
                transition={{
                  duration: 1.2,
                }}
                className="h-full rounded-full bg-blue-600"
              />

            </div>

          </div>

          {/* Bottom */}

          <div className="mt-8 flex gap-8">

            <div>

              <p className="text-gray-500">
                Target
              </p>

              <h3 className="font-black text-xl">
                Dec 31, 2026
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Daily Goal
              </p>

              <h3 className="font-black text-xl">
                5 Tasks
              </h3>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="hidden lg:flex flex-col items-center">

          <div className="flex h-44 w-44 items-center justify-center rounded-full bg-blue-50">

            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-blue-600 text-white">

              <div className="text-center">

                <FaFire
                  size={28}
                  className="mx-auto"
                />

                <h2 className="mt-2 text-4xl font-black">
                  18
                </h2>

                <p className="text-sm">
                  Days
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </motion.div>
  );
}