import type { Task } from '@/types';
import { useUpdateTask } from './api/useUpdateTask';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const useEditTask = (task: Task) => {
  const { updateTaskMutation } = useUpdateTask();
  const [taskTitle, setTaskTitle] = useState(task.title ?? '');
  const [taskDescription, setTaskDescription] = useState(task.description ?? '');
  const [completed, setCompleted] = useState(task.completed);
  const [createdAt, setCreatedAt] = useState(task.createdAt);
  const [status, setStatus] = useState(task.status);
  const navigate = useNavigate();

  const handleSaveUpdateTask = async () => {
    await updateTaskMutation({
      id: task.id,
      title: taskTitle,
      description: taskDescription,
      completed,
      createdAt,
      status,
    });
    navigate('/');
  };

  const handleCancelUpdateTask = () => {
    navigate('/');
  };

  return {
    taskTitle,
    taskDescription,
    completed,
    createdAt,
    status,
    handleSaveUpdateTask,
    handleCancelUpdateTask,
    setTaskTitle,
    setTaskDescription,
    setCompleted,
    setCreatedAt,
    setStatus,
  };
};
