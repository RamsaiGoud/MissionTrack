import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export interface Goal {
  id: number;
  title: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
}

const initialGoals: Goal[] = [
  {
    id: 1,
    title: "Complete GeeksforGeeks DSA",
    completed: false,
    priority: "High",
    dueDate: "2026-07-20",
  },
  {
    id: 2,
    title: "Apply to 50 Companies",
    completed: false,
    priority: "High",
    dueDate: "2026-07-18",
  },
  {
    id: 3,
    title: "Complete Aptitude Practice",
    completed: true,
    priority: "Medium",
    dueDate: "2026-07-16",
  },
];

interface GoalContextType {
  goals: Goal[];

  addGoal: (goal: Goal) => void;

  deleteGoal: (id: number) => void;

  toggleGoal: (id: number) => void;

  totalGoals: number;

  completedGoals: number;

  pendingGoals: number;

  progress: number;
}

const GoalContext = createContext<GoalContextType | undefined>(
  undefined
);

export function GoalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [goals, setGoals] = useState(initialGoals);

  function addGoal(goal: Goal) {
    setGoals((prev) => [...prev, goal]);
  }

  function deleteGoal(id: number) {
    setGoals((prev) =>
      prev.filter((goal) => goal.id !== id)
    );
  }

  function toggleGoal(id: number) {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              completed: !goal.completed,
            }
          : goal
      )
    );
  }

  const totalGoals = goals.length;

  const completedGoals = goals.filter(
    (goal) => goal.completed
  ).length;

  const pendingGoals =
    totalGoals - completedGoals;

  const progress =
    totalGoals === 0
      ? 0
      : Math.round(
          (completedGoals / totalGoals) * 100
        );

  return (
    <GoalContext.Provider
      value={{
        goals,
        addGoal,
        deleteGoal,
        toggleGoal,
        totalGoals,
        completedGoals,
        pendingGoals,
        progress,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
}

export function useGoals() {
  const context = useContext(GoalContext);

  if (!context) {
    throw new Error(
      "useGoals must be used inside GoalProvider"
    );
  }

  return context;
}