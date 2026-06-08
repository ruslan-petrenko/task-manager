import { type Task } from '../types';
import { useTasksStore } from '../stores/TasksStore';
import UiButton from './common/UiButton';
import UiInput from './common/UiInput';
import useTask from '../hooks/useTask';
import { useState, memo } from 'react';
import ConfirmationDialog from './common/ConfirmationDialog';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export default memo(function TaskUi(props: Task) {
  const { id, title, description } = props;
  const deleteTask = useTasksStore((s) => s.deleteTask);
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
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
  const style = { transform: CSS.Translate.toString(transform) };

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
      <div
        ref={setNodeRef}
        style={style}
        className={`flex flex-col gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-opacity ${isDragging ? 'opacity-40' : 'opacity-100'}`}
      >
        <div className="flex items-center justify-between">
          {isUpdateTaskOpen ? (
            <div className="flex flex-col gap-1 w-full">
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
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{title}</p>
              {description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{description}</p>
              )}
            </div>
          )}
          <button
            {...attributes}
            {...listeners}
            className="ml-2 shrink-0 cursor-grab active:cursor-grabbing text-gray-300 dark:text-gray-600 hover:text-violet-400 dark:hover:text-violet-400 transition-colors touch-none"
            aria-label="Drag task"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <circle cx="5" cy="4" r="1.5" />
              <circle cx="11" cy="4" r="1.5" />
              <circle cx="5" cy="8" r="1.5" />
              <circle cx="11" cy="8" r="1.5" />
              <circle cx="5" cy="12" r="1.5" />
              <circle cx="11" cy="12" r="1.5" />
            </svg>
          </button>
        </div>
        <div className="flex gap-1.5 justify-end">
          {isUpdateTaskOpen ? (
            <>
              <UiButton
                className="text-xs bg-green-500 hover:bg-green-600 text-white px-2.5 py-1 rounded cursor-pointer"
                onClick={handleSaveUpdateTask}
                label="Save"
              />
              <UiButton
                className="text-xs bg-gray-400 hover:bg-gray-500 text-white px-2.5 py-1 rounded cursor-pointer"
                onClick={handleCancelUpdateTask}
                label="Cancel"
              />
            </>
          ) : (
            <>
              <UiButton
                className="text-xs bg-violet-500 hover:bg-violet-600 text-white px-2.5 py-1 rounded cursor-pointer"
                onClick={handleUpdateTask}
                label="Edit"
              />
              <UiButton
                className="text-xs bg-red-500 hover:bg-red-600 text-white px-2.5 py-1 rounded cursor-pointer"
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
