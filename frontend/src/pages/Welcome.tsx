import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-xl text-center"
      >
        <h1 className="text-6xl font-black text-gray-900">
          Welcome Achiever 👋
        </h1>

        <p className="mt-8 text-xl text-gray-600 leading-9">
          Small wins every day build extraordinary lives.
        </p>

        <button
          onClick={() => navigate("/mission")}
          className="mt-16 rounded-xl bg-blue-600 px-10 py-4 text-xl font-bold text-white hover:bg-blue-700 transition"
        >
          Continue →
        </button>
      </motion.div>
    </div>
  );
}