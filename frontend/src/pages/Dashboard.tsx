import EventsCard from "../components/dashboard/EventsCard";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import StatCard from "../components/dashboard/StatCard";
import MissionHero from "../components/dashboard/MissionHero";
import FocusCard from "../components/dashboard/FocusCard";

import {
  FaFire,
  FaBullseye,
  FaCheckCircle,
} from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <main className="flex-1 p-8">

        <Navbar />
        <div className="mt-8">
  <MissionHero />
</div>
<div className="mt-8 grid grid-cols-2 gap-6">

  <FocusCard />

  <EventsCard />
        {/* Top Cards */}

        <div className="grid grid-cols-3 gap-6">

          <StatCard
            title="Current Streak"
            value="18 Days"
            subtitle="Keep pushing!"
            icon={<FaFire />}
            color="#2563EB"
          />

          <StatCard
            title="Mission Progress"
            value="74%"
            subtitle="You're doing great"
            icon={<FaBullseye />}
            color="#22C55E"
          />

          <StatCard
            title="Goals Completed"
            value="14/20"
            subtitle="This month"
            icon={<FaCheckCircle />}
            color="#F59E0B"
          />

        </div>

        {/* Bottom Grid */}

        <div className="grid grid-cols-3 gap-6 mt-8">

          {/* Mission */}

          <div className="rounded-3xl bg-white p-8 shadow-md">

            <h2 className="text-2xl font-black">
              🎯 Mission
            </h2>

            <h3 className="mt-6 text-3xl font-bold">
              Become a Software Engineer
            </h3>

            <p className="mt-3 text-gray-500">
              Stay focused every day and you'll achieve it.
            </p>

          </div>

          {/* Goals */}

          <div className="rounded-3xl bg-white p-8 shadow-md">

            <h2 className="text-2xl font-black">
              Today's Goals
            </h2>

            <div className="mt-6 space-y-4">

              <label className="flex gap-3">
                <input type="checkbox" className="accent-blue-600" />
                Solve 2 DSA Problems
              </label>

              <label className="flex gap-3">
                <input type="checkbox" className="accent-blue-600" />
                Build MissionTrack
              </label>

              <label className="flex gap-3">
                <input type="checkbox" className="accent-blue-600" />
                Workout
              </label>

            </div>

          </div>

          {/* Events */}

          <div className="rounded-3xl bg-white p-8 shadow-md">

            <h2 className="text-2xl font-black">
              Upcoming
            </h2>

            <div className="mt-6 space-y-5">

              <div className="rounded-xl bg-blue-50 p-4">
                📅 Accenture Interview
              </div>

              <div className="rounded-xl bg-green-50 p-4">
                💪 Gym
              </div>

              <div className="rounded-xl bg-yellow-50 p-4">
                🎂 Friend Birthday
              </div>

            </div>

          </div>

        </div>

        {/* Progress */}

        <div className="mt-8 rounded-3xl bg-white p-8 shadow-md">

          <div className="flex justify-between">

            <h2 className="text-3xl font-black">
              Weekly Progress
            </h2>

            <span className="font-bold text-blue-600">
              74%
            </span>

          </div>

          <div className="mt-6 h-4 rounded-full bg-gray-200">

            <div
              className="h-full rounded-full bg-blue-600"
              style={{ width: "74%" }}
            />

          </div>

        </div>

      </main>

    </div>
  );
}