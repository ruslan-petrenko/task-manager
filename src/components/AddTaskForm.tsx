import { useState } from 'react';
import Input from './Input';
import { v4 as uuidv4 } from 'uuid';
import { type Task } from '../types';
import Button from './Button';

interface AddTaskFormProps {
  taskTitle: string;
  taskDescription: string;
  setTaskTitle: (title: string) => void;
  setTaskDescription: (description: string) => void;
  handleAddTask: (task: Task) => void;
  cancelAddTask: () => void;
}
export default function AddTaskForm(props: AddTaskFormProps) {
  const { taskTitle, taskDescription, setTaskTitle, setTaskDescription, handleAddTask, cancelAddTask } = props;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    if (!taskTitle.length) return;

    handleAddTask({
      id: uuidv4(),
      title: taskTitle,
      description: taskDescription,
      completed: false,
      createdAt: new Date().toISOString(),
    });
    setSubmitted(false);
  };

  return (
    <div className="mb-8 flex flex-row justify-between items-end gap-4 rounded-2xl border border-white/70 bg-white/80 p-6 shadow-lg shadow-violet-200/50 backdrop-blur-sm">
      <div className="flex flex-row self-baseline gap-2">
        <Input
          label="Title"
          type="text"
          placeholder="Add a new task"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          required
          error={submitted && !taskTitle.length ? 'This field is required' : undefined}
        />
        <Input
          label="Description"
          type="text"
          placeholder="Add a description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </div>
      <div className="flex flex-row gap-2 self-end">
        <Button
          className="self-baseline rounded-lg bg-violet-500 px-4 py-2 font-medium text-white shadow-md shadow-violet-300/60 transition hover:bg-violet-600"
          onClick={handleSubmit}
          label="Add"
        />
        <Button
          className="self-baseline rounded-lg bg-violet-500 px-4 py-2 font-medium text-white shadow-md shadow-violet-300/60 transition hover:bg-violet-600"
          onClick={cancelAddTask}
          label="Cancel"
        />
      </div>
    </div>
  );
}
