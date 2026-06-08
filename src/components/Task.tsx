import { type Task } from '../types';
import { useTasksStore } from '../stores/TasksStore';
import UiButton from './common/UiButton';
import UiInput from './common/UiInput';
import useTask from '../hooks/useTask';
import { useState, memo } from 'react';
import ConfirmationDialog from './common/ConfirmationDialog';

export default memo(function TaskUi(props: Task) {
  const { id, title, description } = props;
  const deleteTask = useTasksStore((s) => s.deleteTask);
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
      <div className="flex flex-row justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-md shadow-md dark:shadow-gray-900/50">
        <div className="flex flex-col gap-2">
          {isUpdateTaskOpen ? (
            <div>
              <UiInput
                label="Title"
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <UiInput
                label="Description"
                type="text"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold dark:text-white">{title}</h1>
              <p className="text-gray-600 dark:text-gray-400">{description}</p>
            </div>
          )}
        </div>
        <div className="flex flex-row gap-2">
          {isUpdateTaskOpen ? (
            <>
              <UiButton
                className="bg-green-500 text-white p-2 rounded-md cursor-pointer"
                onClick={handleSaveUpdateTask}
                label="Save"
              />
              <UiButton
                className="bg-blue-500 text-white p-2 rounded-md cursor-pointer"
                onClick={handleCancelUpdateTask}
                label="Cancel"
              />
            </>
          ) : (
            <>
              <UiButton
                className="bg-blue-500 text-white p-2 rounded-md cursor-pointer"
                onClick={handleUpdateTask}
                label="Update"
              />
              <UiButton
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
});
