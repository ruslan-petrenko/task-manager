import { useState } from 'react';
import { useTasksStore } from '../stores/TasksStore';

export default function useTask(id: string, title: string, description: string) {
  const { updateTask } = useTasksStore();
  const [isUpdateTaskOpen, setIsUpdateTaskOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);

  const handleUpdateTask = () => {
    setIsUpdateTaskOpen(true);
  };
  const handleSaveUpdateTask = () => {
    setIsUpdateTaskOpen(false);
    updateTask({ id, title: taskTitle, description: taskDescription, completed: false, createdAt: new Date().toISOString() });
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
