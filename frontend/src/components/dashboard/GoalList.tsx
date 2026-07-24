import { useState } from "react";
import AddGoalForm from "./AddGoalForm";
import { FaPlus, FaTrash } from "react-icons/fa";
import api from "../../services/api";

interface Goal {
  id: number;
  title: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  completed: boolean;
}

interface GoalListProps {
  goals: Goal[];
  refreshGoals: () => Promise<void>;
  refreshData: () => Promise<void>;
}

export default function GoalList({
  goals,
  refreshGoals,
  refreshData,
}: GoalListProps) {
  const [showForm, setShowForm] = useState(false);

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
      });

      await refreshData();
      setShowForm(false);
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  }

  async function deleteGoal(id: number) {
    try {
      await api.delete(`/goals/${id}`);
      await refreshData();
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  }

  async function toggleGoal(goal: Goal) {
    try {
      await api.put(`/goals/${goal.id}`, {
        completed: !goal.completed,
      });

      await refreshData();
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Goals</h2>

        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          <FaPlus />
          Add Goal
        </button>
      </div>

      {showForm && (
        <div className="rounded-xl border bg-gray-50 p-4">
          <AddGoalForm onAddGoal={addGoal} />
        </div>
      )}

      <div className="space-y-4">
        {goals.length === 0 ? (
          <div className="rounded-xl border bg-white p-8 text-center text-gray-500 shadow-sm">
            No goals found.
          </div>
        ) : (
          goals.map((goal) => (
            <div
              key={goal.id}
              className="flex items-center justify-between rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={goal.completed}
                  onChange={() => toggleGoal(goal)}
                  className="mt-1 h-5 w-5 cursor-pointer"
                />

                <div>
                  <h3
                    className={`text-lg font-semibold ${
                      goal.completed
                        ? "line-through text-gray-400"
                        : ""
                    }`}
                  >
                    {goal.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Due: {goal.dueDate || "Not specified"}
                  </p>

                  <span
                    className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold text-white ${
                      goal.priority === "High"
                        ? "bg-red-500"
                        : goal.priority === "Medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {goal.priority}
                  </span>
                </div>
              </div>

              <button
                onClick={() => deleteGoal(goal.id)}
                className="rounded-lg p-3 text-red-500 transition hover:bg-red-50 hover:text-red-700"
                title="Delete Goal"
              >
                <FaTrash size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}