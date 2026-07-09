import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaPhone } from "react-icons/fa";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <h1 className="text-center text-5xl font-black text-gray-900">
          MissionTrack
        </h1>

        <p className="mt-3 text-center text-gray-500">
          Track. Improve. Achieve.
        </p>

        <button className="mt-12 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 py-4 font-bold transition hover:scale-[1.02] hover:shadow-lg">
          <FcGoogle size={24} />
          Continue with Google
        </button>

        <button className="mt-4 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 py-4 font-bold transition hover:scale-[1.02] hover:shadow-lg">
          <FaPhone />
          Continue with Phone Number
        </button>

        <div className="my-8 text-center text-gray-400">
          ───────── OR ─────────
        </div>

        <input
          type="text"
          placeholder="Achiever Name"
          className="mb-4 w-full rounded-xl border border-gray-300 p-4 font-medium outline-none transition focus:border-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-xl border border-gray-300 p-4 font-medium outline-none transition focus:border-blue-500"
        />

        <div className="mt-3 text-right">
          <button className="text-sm font-semibold text-blue-600">
            Forgot Password?
          </button>
        </div>

        <button className="mt-8 w-full rounded-xl bg-blue-600 py-4 text-lg font-bold text-white transition hover:scale-[1.02] hover:bg-blue-700">
          Sign In
        </button>
      </motion.div>
    </div>
  );
}