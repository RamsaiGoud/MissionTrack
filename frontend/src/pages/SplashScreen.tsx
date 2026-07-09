import { motion } from "framer-motion";

export default function SplashScreen() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl font-black text-blue-600">
          MissionTrack
        </h1>
      </motion.div>

      <motion.p
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 text-lg font-semibold text-gray-600"
      >
        Track. Improve. Achieve.
      </motion.p>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 220 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mt-10 h-2 rounded-full bg-blue-600"
      />
    </div>
  );
}