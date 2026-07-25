import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";

export default function FloatingActionButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl transition hover:bg-blue-700"
    >
      <FaPlus size={22} />
    </motion.button>
  );
}