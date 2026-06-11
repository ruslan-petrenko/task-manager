import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDeleteTask } from './api/useDeleteTask';

export default function useTask(id: string) {
  const [isUpdateTaskOpen, setIsUpdateTaskOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);

  const navigate = useNavigate();
  const { deleteTaskMutation } = useDeleteTask();
  const handleUpdateTask = () => {
    navigate(`/edit/${id}`);
  };

  const handleConfirmDelete = async () => {
    await deleteTaskMutation(id);
    setIsConfirmationDialogOpen(false);
  };

  const handleCancelDelete = () => setIsConfirmationDialogOpen(false);

  return {
    isUpdateTaskOpen,
    isConfirmationDialogOpen,
    setIsUpdateTaskOpen,
    handleUpdateTask,
    handleConfirmDelete,
    handleCancelDelete,
    setIsConfirmationDialogOpen,
  };
}
