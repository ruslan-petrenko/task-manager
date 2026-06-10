import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useCreateTask } from './api/useCreateTask';

export default function useTaskForm(cancel: () => void) {
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const { createTaskMutation } = useCreateTask();
  const cancelAddTask = useCallback(() => {
    setTaskTitle('');
    setTaskDescription('');
    cancel();
  }, [cancel]);

  const handleSubmit = useCallback(async () => {
    setSubmitted(true);
    if (!taskTitle.length) return;

    await createTaskMutation({
      id: uuidv4(),
      title: taskTitle,
      description: taskDescription,
      completed: false,
      createdAt: new Date().toISOString(),
      status: 'todo',
    });
    setTaskTitle('');
    setTaskDescription('');
    setSubmitted(false);
  }, [createTaskMutation, taskTitle, taskDescription]);

  return {
    taskTitle,
    taskDescription,
    submitted,
    setTaskTitle,
    setTaskDescription,
    handleSubmit,
    cancelAddTask,
  };
}
