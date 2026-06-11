import { type Task } from '@/types';
import UiButton from '@/components/common/UiButton/UiButton';
import useTask from '@/hooks/useTask';
import { memo } from 'react';
import ConfirmationDialog from '@/components/common/ConfirmationDialog/ConfirmationDialog';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import styles from './Task.module.css';
import DragButton from './components/DragButton';

export default memo(function TaskUi(props: Task) {
  const { id, title, description, status } = props;
  const { handleUpdateTask, handleConfirmDelete, handleCancelDelete, isConfirmationDialogOpen, setIsConfirmationDialogOpen } = useTask(id);
  const { setNodeRef, transform, isDragging, attributes, listeners } = useDraggable({ id });

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
        className={`${styles.card} ${isDragging ? styles.dragging : ''} ${status === 'todo' ? styles.todo : status === 'in-progress' ? styles.inProgress : styles.done}`}
      >
        <div className={styles.header}>
          <div className={styles.content}>
            <p className={styles.title}>{title ?? ''}</p>
            {description && <p className={styles.description}>{description}</p>}
          </div>
          <DragButton
            attributes={attributes}
            listeners={listeners}
          />
        </div>
        <div className={styles.actions}>
          <UiButton
            className={styles.btnEdit}
            onClick={handleUpdateTask}
            label="Edit"
          />
          <UiButton
            className={styles.btnDelete}
            onClick={() => setIsConfirmationDialogOpen(true)}
            label="Delete"
          />
        </div>
      </div>
    </>
  );
});
