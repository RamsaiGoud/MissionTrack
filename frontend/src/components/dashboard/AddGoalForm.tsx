import { useEffect, useRef, useState } from "react";

interface Goal {
  id: number;
  title: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  completed: boolean;
}

interface AddGoalFormProps {
  editingGoal: Goal | null;

  onAddGoal: (goal: {
    title: string;
    priority: "High" | "Medium" | "Low";
    dueDate: string;
  }) => void;

  onUpdateGoal: (goal: Goal) => void;

  onCancel: () => void;
}

export default function AddGoalForm({
  editingGoal,
  onAddGoal,
  onUpdateGoal,
  onCancel,
}: AddGoalFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<
    "High" | "Medium" | "Low"
  >("Medium");
  const [dueDate, setDueDate] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editingGoal) {
      setTitle(editingGoal.title);
      setPriority(editingGoal.priority);
      setDueDate(editingGoal.dueDate);
    } else {
      setTitle("");
      setPriority("Medium");
      setDueDate("");
    }
  }, [editingGoal]);
  useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (
      formRef.current &&
      !formRef.current.contains(event.target as Node)
    ) {
      onCancel();
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [onCancel]);

  function handleSubmit() {
    if (!title.trim()) return;

    if (editingGoal) {
      onUpdateGoal({
        ...editingGoal,
        title,
        priority,
        dueDate,
      });
    } else {
      onAddGoal({
        title,
        priority,
        dueDate,
      });

      setTitle("");
      setPriority("Medium");
      setDueDate("");
    }
  }

  return (
   <div
  ref={formRef}
  className="rounded-3xl bg-white p-6 shadow-md"
>
      <h2 className="text-xl font-bold">
        {editingGoal ? "Edit Goal" : "Add Goal"}
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

      <div className="mt-6 flex gap-3">
        <button
          onClick={handleSubmit}
          className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
        >
          {editingGoal ? "Update Goal" : "Add Goal"}
        </button>

        <button
  type="button"
  onClick={onCancel}
  className="rounded-xl border border-gray-300 px-6 py-3 hover:bg-gray-100"
>
  Cancel
</button>
        
      </div>
    </div>
  );
}