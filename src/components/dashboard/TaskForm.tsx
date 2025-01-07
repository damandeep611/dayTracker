import React, { useState } from "react";

type AddTaskFormProps = {
  onAddTask: (content: string) => void;
};

export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onAddTask(content.trim());
      setContent("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a new task"
        className="p-2 border rounded mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 p-2 rounded">
        Add Task
      </button>
    </form>
  );
}
