import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl bg-white p-7 shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-500 font-semibold">
            {title}
          </p>

          <h2
            className="mt-3 text-5xl font-black"
            style={{ color }}
          >
            {value}
          </h2>

          <p className="mt-3 text-gray-400">
            {subtitle}
          </p>

        </div>

        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
          style={{
            background: `${color}20`,
            color: color,
          }}
        >
          {icon}
        </div>

      </div>
    </motion.div>
  );
}