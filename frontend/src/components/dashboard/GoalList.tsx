import { useState } from "react";
import AddGoalForm from "./AddGoalForm";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import api from "../../services/api";
import ConfirmDialog from "../ui/ConfirmDialog";

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
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);

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
  async function updateGoal(goal: Goal) {
  try {
    await api.put(`/goals/${goal.id}`, {
      title: goal.title,
      priority: goal.priority,
      due_date: goal.dueDate,
      completed: goal.completed,
    });

    await refreshData();
    setEditingGoal(null);
    setShowForm(false);
  } catch (error) {
    console.error("Error updating goal:", error);
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
      title: goal.title,
      priority: goal.priority,
      due_date: goal.dueDate,
      completed: !goal.completed,
    });

    await refreshData();
  } catch (error) {
    console.error("Error updating goal:", error);
  }
}
const filteredGoals = goals.filter((goal) =>
  goal.title.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Goals</h2>

        <button
          onClick={() => {
  setEditingGoal(null);
  setShowForm(true);
}}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          <FaPlus />
          Add Goal
        </button>
         </div>
{showForm && editingGoal === null && (
  <div className="rounded-xl border bg-gray-50 p-4">
    <AddGoalForm
      editingGoal={null}
      onAddGoal={addGoal}
      onUpdateGoal={updateGoal}
      onCancel={() => setShowForm(false)}
    />
  </div>
)}
<input
  type="text"
  placeholder="🔍 Search goals..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="w-full rounded-xl border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
/>    
      <div className="space-y-4">
        {filteredGoals.length === 0 ? (
          <div className="rounded-xl border bg-white p-8 text-center text-gray-500 shadow-sm">
            No goals found.
          </div>
        ) : (
         filteredGoals.map((goal) => (
  <div key={goal.id}>
    <div
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

              <div className="flex gap-2">
  <button
    onClick={() => {
    setEditingGoal(goal);
    setShowForm(true);
}}
    className="rounded-lg p-3 text-blue-600 transition hover:bg-blue-50 hover:text-blue-700"
    title="Edit Goal"
  >
    <FaEdit size={18} />
  </button>

  <button
    onClick={() => setGoalToDelete(goal)}
    className="rounded-lg p-3 text-red-500 transition hover:bg-red-50 hover:text-red-700"
    title="Delete Goal"
  >
    <FaTrash size={18} />
  </button>
</div>
            </div>

{editingGoal?.id === goal.id && (
  <div className="mt-4 rounded-xl border bg-gray-50 p-4">
    <AddGoalForm
      editingGoal={editingGoal}
      onAddGoal={addGoal}
      onUpdateGoal={updateGoal}
      onCancel={() => setEditingGoal(null)}
    />
  </div>
)}

</div>
))
        )}
      </div>

      <ConfirmDialog
        isOpen={goalToDelete !== null}
        title="Delete Goal"
        message={`Are you sure you want to delete "${goalToDelete?.title}"?`}
        onCancel={() => setGoalToDelete(null)}
        onConfirm={async () => {
          if (!goalToDelete) return;

          await deleteGoal(goalToDelete.id);
          setGoalToDelete(null);
        }}
      />
    </div>
  );
}