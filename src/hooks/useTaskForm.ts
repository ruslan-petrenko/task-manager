import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { type Task } from '../types';
import { useTasksStore } from '../stores/TasksStore';

export default function useTaskForm(cancel: () => void) {
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const addTask = useTasksStore((s) => s.addTask);

  const handleAddTask = useCallback(
    (task: Task) => {
      if (!task.title.length) return;
      addTask(task);
      setTaskTitle('');
      setTaskDescription('');
    },
    [addTask],
  );

  const cancelAddTask = useCallback(() => {
    setTaskTitle('');
    setTaskDescription('');
    cancel();
  }, [cancel]);

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    if (!taskTitle.length) return;

    handleAddTask({
      id: uuidv4(),
      title: taskTitle,
      description: taskDescription,
      completed: false,
      createdAt: new Date().toISOString(),
      status: 'todo',
    });
    setSubmitted(false);
  }, [handleAddTask, taskTitle, taskDescription]);

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
