import { type Task } from '../types';
import { useTasksStore } from '../stores/TasksStore';
import Button from './Button';
import Input from './Input';
import useTask from '../hooks/useTask';
import { useState } from 'react';
import ConfirmationDialog from './ConfirmationDialog';

export default function TaskUi(props: Task) {
  const { id, title, description } = props;
  const { deleteTask } = useTasksStore();
  const {
    isUpdateTaskOpen,
    taskTitle,
    setTaskTitle,
    taskDescription,
    setTaskDescription,
    handleUpdateTask,
    handleSaveUpdateTask,
    handleCancelUpdateTask,
  } = useTask(id, title, description);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const handleConfirmDelete = () => {
    deleteTask(id);
    setIsConfirmationDialogOpen(false);
  };
  const handleCancelDelete = () => {
    setIsConfirmationDialogOpen(false);
  };
  return (
    <>
      {isConfirmationDialogOpen && (
        <ConfirmationDialog
          title="Delete Task"
          description="Are you sure you want to delete this task?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      <div className="flex flex-row justify-between items-center bg-white p-4 rounded-md shadow-md">
        <div className="flex flex-col gap-2">
          {isUpdateTaskOpen ? (
            <div>
              <Input
                label="Title"
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <Input
                label="Description"
                type="text"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              <p>{description}</p>
            </div>
          )}
        </div>
        <div className="flex flex-row gap-2">
          {isUpdateTaskOpen ? (
            <>
              <Button
                className="bg-green-500 text-white p-2 rounded-md cursor-pointer"
                onClick={handleSaveUpdateTask}
                label="Save"
              />
              <Button
                className="bg-blue-500 text-white p-2 rounded-md cursor-pointer"
                onClick={handleCancelUpdateTask}
                label="Cancel"
              />
            </>
          ) : (
            <>
              <Button
                className="bg-blue-500 text-white p-2 rounded-md cursor-pointer"
                onClick={handleUpdateTask}
                label="Update"
              />
              <Button
                className="bg-red-500 text-white p-2 rounded-md cursor-pointer"
                onClick={() => setIsConfirmationDialogOpen(true)}
                label="Delete"
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
