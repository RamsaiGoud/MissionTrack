import { useEffect, useState } from "react";
import api from "../services/api";

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

interface Goal {
  id: number;
  title: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  completed: boolean;
}

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
}

export default function Dashboard() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  async function fetchGoals() {
    try {
      const res = await api.get("/goals/");

      const formattedGoals: Goal[] = res.data.map((goal: any) => ({
        id: goal.id,
        title: goal.title,
        priority: goal.priority,
        dueDate: goal.due_date,
        completed: goal.completed,
      }));

      setGoals(formattedGoals);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  }

  async function fetchEvents() {
    try {
      const res = await api.get("/events/");
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }

  async function refreshData() {
    await Promise.all([fetchGoals(), fetchEvents()]);
  }

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">
        <Navbar />

        <div className="mt-8">
          <MissionHero />
        </div>

        <div className="mt-8">
          <QuickStats goals={goals} events={events} />
        </div>

        <div className="mt-8">
          <TodaysMission />
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GoalList
              goals={goals}
              refreshGoals={fetchGoals}
              refreshData={refreshData}
            />
          </div>

          <EventsCard
            events={events}
            refreshEvents={fetchEvents}
            refreshData={refreshData}
          />
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