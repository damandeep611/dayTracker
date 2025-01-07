export interface Task {
  id: string;
  content: string;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  status: "todo" | "inProgress" | "completed";
}

export type ColumnType = "todo" | "inProgress" | "completed";

export interface Column {
  id: ColumnType;
  title: string;
}
