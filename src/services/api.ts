import { Task } from "@/types/types";

const API_BASE_URL = "http://localhost:5000/api";

export const taskApi = {
  //fetch all tasks from backend
  getTasks: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  // create a new task
  createTask: async (content: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
      return await response.json();
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },

  // update an existing task
  updateTask: async (id: string, updates: Partial<Task>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });
      return await response.json();
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },

  // delete a task
  deleteTask: async (id: string) => {
    try {
      await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  },
};
