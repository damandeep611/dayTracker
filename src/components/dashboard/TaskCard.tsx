import { ColumnType, Task } from "@/types/types";
import { calculateTimeTaken, formatDate } from "@/utils/taskInfo";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import React from "react";

type TaskCardProps = {
  task: Task;
  onDelete: (id: string) => void;
  updateStatus: (id: string, status: ColumnType) => void;
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onDelete,
  updateStatus,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const cardClass =
    task.status === "inProgress" ? "bg-green-500 text-white" : "bg-white";
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${cardClass} p-4 mb-2 rounded-lg shadow cursor-move`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-move mr-2 text-gray-400 hover:text-gray-600"
      >
        <GripVertical size={20} />
      </div>
      <div className="flex-grow">
        <p className="font-semibold">{task.content}</p>
        <p className="text-sm">Created: {formatDate(task.createdAt)}</p>
        {task.startedAt && (
          <p className="text-sm">Started: {formatDate(task.startedAt)}</p>
        )}
        {task.completedAt && (
          <>
            <p className="text-sm">Completed: {formatDate(task.completedAt)}</p>
            <p className="text-sm">
              Time taken:{" "}
              {calculateTimeTaken(
                task.startedAt || task.createdAt,
                task.completedAt
              )}
            </p>
          </>
        )}
        <button
          onClick={() => onDelete(task.id)}
          className="mt-2 bg-red-500 text-white px-2 py-1 rounded text-sm"
        >
          Delete
        </button>
        {/* status update buttons  */}
        <div className="mt-2 space-x-2">
          {task.status !== "todo" && (
            <button
              onClick={() => updateStatus(task.id, "todo")}
              className="bg-gray-500 text-white px-2 py-1 rounded text-sm"
            >
              Move to todo
            </button>
          )}
          {task.status !== "inProgress" && (
            <button
              onClick={() => updateStatus(task.id, "inProgress")}
              className="bg-gray-500 text-white px-2 py-1 rounded text-sm"
            >
              Move to In Progress
            </button>
          )}
          {task.status !== "completed" && (
            <button
              onClick={() => updateStatus(task.id, "completed")}
              className="bg-gray-500 text-white px-2 py-1 rounded text-sm"
            >
              Move to Completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
