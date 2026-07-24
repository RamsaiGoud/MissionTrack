import { useState } from "react";

interface AddGoalFormProps {
  onAddGoal: (goal: {
    title: string;
    priority: "High" | "Medium" | "Low";
    dueDate: string;
  }) => void;
}

export default function AddGoalForm({
  onAddGoal,
}: AddGoalFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<
    "High" | "Medium" | "Low"
  >("Medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;

    onAddGoal({
      title,
      priority,
      dueDate,
    });

    setTitle("");
    setPriority("Medium");
    setDueDate("");
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-md">
      <h2 className="text-xl font-bold">
        Add Goal
      </h2>

      <input
        type="text"
        placeholder="Goal title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mt-4 w-full rounded-xl border p-3"
      />

      <select
        value={priority}
        onChange={(e) =>
          setPriority(
            e.target.value as "High" | "Medium" | "Low"
          )
        }
        className="mt-4 w-full rounded-xl border p-3"
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="mt-4 w-full rounded-xl border p-3"
      />

      <button
        onClick={handleSubmit}
        className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Add Goal
      </button>
    </div>
  );
}