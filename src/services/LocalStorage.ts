import { Task } from "@/types/types";

const STORAGE_KEY = "kanban_tasks";

export const localStorageService = {
  //get all the tasks from local storage
  getTasks: (): Task[] => {
    if (typeof window === "undefined") return [];
    const tasks = localStorage.getItem(STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  },
  //save all tasks to local storage
  saveTasks: (tasks: Task[]): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  },

  //add a new task
  addTask: (content: string): Task => {
    const tasks = localStorageService.getTasks();
    const newTask: Task = {
      id: Date.now().toString(), // simple way to generate unique id
      content,
      status: "todo",
      createdAt: new Date(),
    };
    tasks.push(newTask);
    localStorageService.saveTasks(tasks);
    return newTask;
  },
  //update a task
  updateTask: (id: string, updates: Partial<Task>): Task | null => {
    const tasks = localStorageService.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) return null;

    const updatedTask = { ...tasks[taskIndex], ...updates };
    tasks[taskIndex] = updatedTask;
    localStorageService.saveTasks(tasks);
    return updatedTask;
  },

  //delete a task
  deleteTask: (id: string): void => {
    const tasks = localStorageService.getTasks();
    const filteredTasks = tasks.filter((task) => task.id !== id);
    localStorageService.saveTasks(filteredTasks);
  },
};
