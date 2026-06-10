import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTasksStore } from '@/stores/TasksStore';
import { useDeleteTask } from './api/useDeleteTask';
import { useUpdateTask } from './api/useUpdateTask';

export default function useTask(id: string) {
  const task = useTasksStore((s) => s.tasks.find((t) => t.id === id) ?? null);
  const [isUpdateTaskOpen, setIsUpdateTaskOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task?.title ?? '');
  const [taskDescription, setTaskDescription] = useState(task?.description ?? '');
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);

  const navigate = useNavigate();
  const { updateTaskMutation } = useUpdateTask();
  const { deleteTaskMutation } = useDeleteTask();
  const handleUpdateTask = () => {
    navigate(`/edit/${id}`);
  };

  const handleSaveUpdateTask = async () => {
    if (!task) return;
    await updateTaskMutation({
      id,
      title: taskTitle,
      description: taskDescription,
      completed: task.completed,
      createdAt: task.createdAt,
      status: task.status,
    });
    navigate('/');
  };

  const handleCancelUpdateTask = () => {
    setTaskTitle(task?.title ?? '');
    setTaskDescription(task?.description ?? '');
    navigate('/');
  };

  const handleConfirmDelete = async () => {
    await deleteTaskMutation(id);
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
