import AddGoalForm from "./AddGoalForm";
import { useState } from "react";
import { goals as initialGoals } from "../../data/goals";
import { FaTrash } from "react-icons/fa";

export default function GoalList() {
  const [goals, setGoals] = useState(initialGoals);

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
  function addGoal(goal: {
  title: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
}) {
  const newGoal = {
    id: Date.now(),
    title: goal.title,
    completed: false,
    priority: goal.priority,
    dueDate: goal.dueDate,
  };

  setGoals((prevGoals) => [...prevGoals, newGoal]);
}

  return (
    <div className="rounded-3xl bg-white p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        My Goals
      </h2>
      <AddGoalForm onAddGoal={addGoal} />

<div className="mt-6 space-y-4">
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

              <p className="text-sm text-gray-500">
                {goal.priority} Priority
              </p>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={goal.completed}
                onChange={() => toggleGoal(goal.id)}
              />

              <button
                onClick={() => deleteGoal(goal.id)}
                className="text-red-500"
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