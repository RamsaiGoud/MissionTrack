export interface Goal {
  id: number;
  title: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
}