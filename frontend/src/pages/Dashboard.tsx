import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

import MissionHero from "../components/dashboard/MissionHero";
import QuickStats from "../components/dashboard/QuickStats";
import GoalList from "../components/dashboard/GoalList";
import EventsCard from "../components/dashboard/EventsCard";
import CalendarCard from "../components/dashboard/CalendarCard";
import QuoteCard from "../components/dashboard/QuoteCard";
import TodaysMission from "../components/dashboard/TodaysMission";

import FloatingActionButton from "../components/ui/FloatingActionButton";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">
        <Navbar />

        <div className="mt-8">
          <MissionHero />
        </div>

        <div className="mt-8">
          <QuickStats />
        </div>
          <div className="mt-8">
  <TodaysMission />

        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GoalList />
          </div>

          <EventsCard />
        </div>

        <div className="mt-8">
          <CalendarCard />
        </div>

        <div className="mt-8">
          <QuoteCard />
        </div>

        <FloatingActionButton />
      </main>
    </div>
  );
}