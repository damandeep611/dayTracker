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
    <>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type="text"
          placeholder="Enter a new task"
          className="border  p-2 px-4 mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 px-4 rounded"
        >
          Add Task
        </button>
      </form>
    </>
  );
}
