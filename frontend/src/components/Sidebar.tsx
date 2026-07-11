import {
  FaHome,
  FaBullseye,
  FaTasks,
  FaCalendarAlt,
  FaChartPie,
  FaCog,
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
    <aside className="w-72 h-screen bg-white border-r border-gray-200 flex flex-col justify-between shadow-sm">

      {/* Logo */}

      <div>

        <div className="px-8 pt-10">

          <h1 className="text-4xl font-black text-blue-600">
            MissionTrack
          </h1>

          <p className="text-gray-500 mt-2">
            Track. Improve. Achieve.
          </p>

        </div>

        {/* Menu */}

        <div className="mt-12 px-4">

          {menuItems.map((item) => (

            <button
              key={item.name}
              className="group mb-3 flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-lg font-semibold text-gray-700 transition-all duration-300 hover:bg-blue-600 hover:text-white"
            >

              <span className="text-xl">
                {item.icon}
              </span>

              {item.name}

            </button>

          ))}

        </div>

      </div>

      {/* Bottom Card */}

      <div className="p-6">

        <div className="rounded-3xl bg-blue-600 p-6 text-white">

          <p className="text-sm opacity-80">
            Current Streak
          </p>

          <h2 className="mt-3 text-5xl font-black">
            🔥 18
          </h2>

          <p className="mt-2 opacity-80">
            Keep your streak alive.
          </p>

        </div>

      </div>

    </aside>
  );
}