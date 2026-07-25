import {
  FaHome,
  FaBullseye,
  FaTasks,
  FaCalendarAlt,
  FaChartPie,
  FaCog,
  FaChevronRight,
} from "react-icons/fa";

const menuItems = [
  { name: "Dashboard", icon: <FaHome /> },
  { name: "Mission", icon: <FaBullseye /> },
  { name: "Goals", icon: <FaTasks /> },
  { name: "Calendar", icon: <FaCalendarAlt /> },
  { name: "Analytics", icon: <FaChartPie /> },
  { name: "Settings", icon: <FaCog /> },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col justify-between border-r border-gray-200 bg-white shadow-sm">

      {/* Logo */}

      <div>

        <div className="border-b border-gray-100 px-8 py-8">

          <h1 className="text-4xl font-black tracking-tight">
            <span className="text-blue-600">Mission</span>
            <span className="text-blue-600">Track</span>
          </h1>

          <p className="mt-2 text-sm text-black-500">
            Track. Improve. Achieve.
          </p>

        </div>

        {/* Navigation */}

        <nav className="mt-8 px-4">

          {menuItems.map((item, index) => (

            <button
              key={item.name}
              className={`group mb-3 flex w-full items-center justify-between rounded-2xl px-5 py-4 text-lg font-semibold transition-all duration-300
              ${
                index === 0
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >

              <div className="flex items-center gap-4">

                <span className="text-xl">
                  {item.icon}
                </span>

                {item.name}

              </div>

              {index === 0 && (
                <FaChevronRight className="text-sm opacity-80" />
              )}

            </button>

          ))}

        </nav>

      </div>

      {/* Bottom Card */}

      <div className="p-6">

        <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-xl">

          <p className="text-sm opacity-90">
            🔥 Current Streak
          </p>

          <h2 className="mt-3 text-5xl font-black">
            18
          </h2>

          <p className="mt-2 text-sm opacity-90">
            You're building consistency.
          </p>

          <div className="mt-5 h-2 rounded-full bg-blue-400">

            <div className="h-2 w-4/5 rounded-full bg-white" />

          </div>

          <p className="mt-3 text-xs opacity-80">
            Keep going. Don't break the streak.
          </p>

        </div>

      </div>

    </aside>
  );
}