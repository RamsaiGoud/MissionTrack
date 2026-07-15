import { FaFire, FaBullseye, FaCheckCircle } from "react-icons/fa";

const stats = [
  {
    title: "Current Streak",
    value: "18 Days",
    color: "bg-orange-100",
    icon: <FaFire className="text-orange-500 text-2xl" />,
  },
  {
    title: "Mission Progress",
    value: "74%",
    color: "bg-blue-100",
    icon: <FaBullseye className="text-blue-600 text-2xl" />,
  },
  {
    title: "Completed Goals",
    value: "14 / 20",
    color: "bg-green-100",
    icon: <FaCheckCircle className="text-green-600 text-2xl" />,
  },
];

export default function QuickStats() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {stats.map((item) => (
        <div
          key={item.title}
          className="rounded-3xl bg-white p-6 shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">{item.title}</p>

              <h2 className="mt-2 text-3xl font-bold">
                {item.value}
              </h2>
            </div>

            <div className={`${item.color} rounded-2xl p-4`}>
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}