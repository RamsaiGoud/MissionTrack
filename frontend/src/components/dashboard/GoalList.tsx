import { useEffect, useState } from "react";
import AddGoalForm from "./AddGoalForm";
import { FaTrash, FaPlus } from "react-icons/fa";
import api from "../../services/api";

interface Goal {
  id: number;
  title: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  completed: boolean;
}

export default function GoalList() {
  const [showForm, setShowForm] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    fetchGoals();
  }, []);

  async function fetchGoals() {
    try {
      const response = await api.get("/goals/");

      const formattedGoals = response.data.map((goal: any) => ({
        ...goal,
        dueDate: goal.due_date,
      }));

      setGoals(formattedGoals);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  }

  async function addGoal(goal: {
    title: string;
    priority: "High" | "Medium" | "Low";
    dueDate: string;
  }) {
    try {
      await api.post("/goals/", {
        title: goal.title,
        priority: goal.priority,
        due_date: goal.dueDate,
        completed: false,
      });

      fetchGoals();
      setShowForm(false);
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  }

  function toggleGoal(id: number) {
    setGoals(
      goals.map((goal) =>
        goal.id === id
          ? { ...goal, completed: !goal.completed }
          : goal
      )
    );
  }

  function deleteGoal(id: number) {
    setGoals(
      goals.filter((goal) => goal.id !== id)
    );
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold">
        My Goals
      </h2>

      <div className="mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <FaPlus />
          {showForm ? "Close Form" : "Add New Goal"}
        </button>

        {showForm && (
          <div className="mt-4">
            <AddGoalForm onAddGoal={addGoal} />
          </div>
        )}
      </div>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="flex items-center justify-between rounded-xl border border-gray-200 p-4"
          >
            <div>
              <h3
                className={
                  goal.completed
                    ? "font-semibold line-through text-gray-400"
                    : "font-semibold"
                }
              >
                {goal.title}
              </h3>

              <p
                className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                  goal.priority === "High"
                    ? "bg-red-100 text-red-600"
                    : goal.priority === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {goal.priority} Priority
              </p>

              <p className="mt-2 text-xs text-gray-500">
                Due: {goal.dueDate}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={goal.completed}
                onChange={() => toggleGoal(goal.id)}
                className="h-5 w-5 accent-blue-600"
              />

              <button
                onClick={() => deleteGoal(goal.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}