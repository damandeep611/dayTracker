import { Column, ColumnType, Task } from "@/types/types";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import React, { useCallback, useState } from "react";
import { ColumnContainer } from "./ColumnContainer";
import { TaskCard } from "./TaskCard";
import AddTaskForm from "./TaskForm";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { DragOverlay as CustomDragOverlay } from "./DragOverlay";

const columns: Column[] = [
  { id: "todo", title: "To Do" },
  { id: "inProgress", title: "In Progress" },
  { id: "completed", title: "Completed" },
];

export const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const addTask = (content: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      content,
      createdAt: new Date(),
      status: "todo",
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTaskStatus = useCallback((id: string, status: ColumnType) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          const updatedTask = { ...task, status };
          if (status === "inProgress" && !task.startedAt) {
            updatedTask.startedAt = new Date();
            setShowProgressModal(true);
            setTimeout(() => setShowProgressModal(false), 1000);
          } else if (status === "completed" && !task.completedAt) {
            updatedTask.completedAt = new Date();
          }
          return updatedTask;
        }
        return task;
      })
    );
  }, []);

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeTask = tasks.find((task) => task.id === active.id);
    if (activeTask) {
      setActiveTask(activeTask);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((task) => task.id === active.id);
    const overColumn = over.id as ColumnType;

    if (activeTask && activeTask.status !== overColumn) {
      updateTaskStatus(activeTask.id, overColumn);
    }

    setTasks((tasks) => {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);
      return arrayMove(tasks, oldIndex, newIndex);
    });
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
      <AddTaskForm onAddTask={addTask} />
      <div className="mb-4">
        <p>Total Tasks: {totalTasks}</p>
        <p>Completed Tasks: {completedTasks}</p>
      </div>
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        modifiers={[restrictToWindowEdges]}
      >
        <div className="flex gap-4">
          {columns.map((column) => (
            <ColumnContainer key={column.id} column={column}>
              <SortableContext
                items={tasks.filter((task) => task.status === column.id)}
              >
                {tasks
                  .filter((task) => task.status === column.id)
                  .map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onDelete={deleteTask}
                      updateStatus={updateTaskStatus}
                    />
                  ))}
              </SortableContext>
            </ColumnContainer>
          ))}
        </div>
        <DragOverlay>
          {activeTask && <CustomDragOverlay task={activeTask} />}
        </DragOverlay>
      </DndContext>
      {showProgressModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="text-lg font-semibold">Task in Progress</p>
          </div>
        </div>
      )}
    </div>
  );
};
