import { getTask } from '@/api/tasks';
import { useQuery } from '@tanstack/react-query';
import { useUpdateTask } from './api/useUpdateTask';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const useEditTask = (id: string) => {
  const { data: task } = useQuery({
    queryKey: ['task', id],
    queryFn: () => getTask(id),
  });
  const { updateTaskMutation } = useUpdateTask();
  const [taskTitle, setTaskTitle] = useState(task?.title ?? '');
  const [taskDescription, setTaskDescription] = useState(task?.description ?? '');
  const [completed, setCompleted] = useState(task?.completed ?? false);
  const [createdAt, setCreatedAt] = useState(task?.createdAt ?? '');
  const [status, setStatus] = useState(task?.status ?? 'todo');
  const navigate = useNavigate();

  const handleSaveUpdateTask = async () => {
    await updateTaskMutation({
      id,
      title: taskTitle,
      description: taskDescription,
      completed: completed,
      createdAt: createdAt,
      status: status,
    });
    navigate('/');
  };

  const handleCancelUpdateTask = () => {
    setTaskTitle(task?.title ?? '');
    setTaskDescription(task?.description ?? '');
    setCompleted(task?.completed ?? false);
    setCreatedAt(task?.createdAt ?? '');
    setStatus(task?.status ?? 'todo');
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
