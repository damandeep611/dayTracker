import { Task } from "@/types/types";
import { formatDate } from "@/utils/utils";
import React from "react";

interface DragOverlayProps {
  task: Task;
}

export const DragOverlay: React.FC<DragOverlayProps> = ({ task }) => {
  const cardClass = task.status === "inProgress" ? "bg-green-500" : "bg-white";
  return (
    <div className={`${cardClass} p-4 rounded-lg shadow w-64`}>
      <p className="font-semibold mb-2">{task.content}</p>
      <p className="text-sm">Created: {formatDate(task.createdAt)}</p>
    </div>
  );
};
