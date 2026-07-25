import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

export default function QuoteCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <FaQuoteLeft
        className="text-blue-600"
        size={28}
      />

      <h2 className="mt-6 text-2xl font-bold text-gray-900">
        Quote of the Day
      </h2>

      <p className="mt-5 text-lg leading-8 text-gray-600">
        "Success doesn't come from what you do occasionally.
        It comes from what you do consistently."
      </p>

      <p className="mt-6 font-semibold text-blue-600">
        — Marie Forleo
      </p>
    </motion.div>
  );
}