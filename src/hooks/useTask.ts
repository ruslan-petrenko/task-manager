import { useState } from 'react';
import { useTasksStore } from '../stores/TasksStore';

export default function useTask(id: string, title: string, description: string) {
  const updateTask = useTasksStore((s) => s.updateTask);
  const [isUpdateTaskOpen, setIsUpdateTaskOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);
  const task = useTasksStore((s) => s.tasks.find((t) => t.id === id) ?? null);

  const handleUpdateTask = () => {
    setIsUpdateTaskOpen(true);
  };
  const handleSaveUpdateTask = () => {
    setIsUpdateTaskOpen(false);
    updateTask({ ...task, title: taskTitle, description: taskDescription });
  };
  const handleCancelUpdateTask = () => {
    setIsUpdateTaskOpen(false);
    setTaskTitle(title);
    setTaskDescription(description);
  };

  return {
    isUpdateTaskOpen,
    setIsUpdateTaskOpen,
    taskTitle,
    setTaskTitle,
    taskDescription,
    setTaskDescription,
    handleUpdateTask,
    handleSaveUpdateTask,
    handleCancelUpdateTask,
  };
}
