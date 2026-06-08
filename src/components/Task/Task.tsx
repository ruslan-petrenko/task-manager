import { type Task } from '@/types';
import { useTasksStore } from '@/stores/TasksStore';
import UiButton from '@/components/common/UiButton/UiButton';
import UiInput from '@/components/common/UiInput/UiInput';
import useTask from '@/hooks/useTask';
import { useState, memo } from 'react';
import ConfirmationDialog from '@/components/common/ConfirmationDialog/ConfirmationDialog';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import styles from './Task.module.css';

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
  const handleCancelDelete = () => setIsConfirmationDialogOpen(false);

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
        className={`${styles.card} ${isDragging ? styles.dragging : ''}`}
      >
        <div className={styles.header}>
          {isUpdateTaskOpen ? (
            <div className={styles.editFields}>
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
            <div className={styles.content}>
              <p className={styles.title}>{title}</p>
              {description && <p className={styles.description}>{description}</p>}
            </div>
          )}
          <button
            {...attributes}
            {...listeners}
            className={styles.dragHandle}
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
        <div className={styles.actions}>
          {isUpdateTaskOpen ? (
            <>
              <UiButton className={styles.btnSave} onClick={handleSaveUpdateTask} label="Save" />
              <UiButton className={styles.btnCancel} onClick={handleCancelUpdateTask} label="Cancel" />
            </>
          ) : (
            <>
              <UiButton className={styles.btnEdit} onClick={handleUpdateTask} label="Edit" />
              <UiButton className={styles.btnDelete} onClick={() => setIsConfirmationDialogOpen(true)} label="Delete" />
            </>
          )}
        </div>
      </div>
    </>
  );
});
