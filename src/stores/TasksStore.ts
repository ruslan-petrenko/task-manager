import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Task, type TaskStatus } from '../types';

interface TasksStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, status: TaskStatus) => void;
}

export const useTasksStore = create<TasksStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),
      updateTask: (task) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      moveTask: (id, status) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
        })),
    }),
    {
      name: 'tasks-storage',
      partialize: (state) => ({ tasks: state.tasks }),
    },
  ),
);
