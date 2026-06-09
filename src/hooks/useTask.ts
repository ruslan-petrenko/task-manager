import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTasksStore } from '@/stores/TasksStore';

export default function useTask(id: string) {
  const task = useTasksStore((s) => s.tasks.find((t) => t.id === id) ?? null);
  const [isUpdateTaskOpen, setIsUpdateTaskOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task?.title ?? '');
  const [taskDescription, setTaskDescription] = useState(task?.description ?? '');
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);

  const navigate = useNavigate();
  const updateTask = useTasksStore((s) => s.updateTask);
  const deleteTask = useTasksStore((s) => s.deleteTask);

  const handleUpdateTask = () => {
    navigate(`/edit/${id}`);
  };

  const handleSaveUpdateTask = () => {
    if (!task) return;
    updateTask({ ...task, title: taskTitle, description: taskDescription });
    navigate('/');
  };

  const handleCancelUpdateTask = () => {
    setTaskTitle(task?.title ?? '');
    setTaskDescription(task?.description ?? '');
    navigate('/');
  };

  const handleConfirmDelete = () => {
    deleteTask(id);
    setIsConfirmationDialogOpen(false);
  };

  const handleCancelDelete = () => setIsConfirmationDialogOpen(false);

  return {
    task,
    isUpdateTaskOpen,
    taskTitle,
    taskDescription,
    isConfirmationDialogOpen,
    setIsUpdateTaskOpen,
    setTaskTitle,
    setTaskDescription,
    handleUpdateTask,
    handleSaveUpdateTask,
    handleCancelUpdateTask,
    handleConfirmDelete,
    handleCancelDelete,
    setIsConfirmationDialogOpen,
  };
}
