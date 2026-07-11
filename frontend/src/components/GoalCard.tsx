import { useState } from "react";

interface Goal {
  id: number;
  title: string;
  completed: boolean;
}

export default function GoalCard() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, title: "Solve 2 DSA Problems", completed: false },
    { id: 2, title: "Workout", completed: true },
    { id: 3, title: "Learn React", completed: false },
  ]);

  const toggle = (id: number) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id
          ? { ...goal, completed: !goal.completed }
          : goal
      )
    );
  };

  const completed = goals.filter((g) => g.completed).length;
  const progress = (completed / goals.length) * 100;

  return (
    <div className="rounded-3xl bg-white p-8 shadow-md">
      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-black">
          Today's Goals
        </h2>

        <span className="font-bold text-blue-600">
          {completed}/{goals.length}
        </span>

      </div>

      <div className="h-2 bg-gray-200 rounded-full mt-6 overflow-hidden">
        <div
          className="bg-blue-600 h-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-4 mt-8">

        {goals.map((goal) => (
          <label
            key={goal.id}
            className="flex justify-between items-center rounded-xl border p-4 hover:bg-blue-50 transition cursor-pointer"
          >
            <div className="flex gap-4 items-center">

              <input
                type="checkbox"
                checked={goal.completed}
                onChange={() => toggle(goal.id)}
                className="w-5 h-5 accent-blue-600"
              />

              <span
                className={`font-semibold ${
                  goal.completed
                    ? "line-through text-gray-400"
                    : ""
                }`}
              >
                {goal.title}
              </span>

            </div>

            {goal.completed && "✅"}
          </label>
        ))}

      </div>
    </div>
  );
}