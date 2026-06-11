import UiButton from '@/components/common/UiButton/UiButton';
import UiInput from '@/components/common/UiInput/UiInput';
import styles from './EditTaskSideBar.module.css';
import { useEditTask } from '@/hooks/useEditTask';
import { useQuery } from '@tanstack/react-query';
import { getTask } from '@/api/tasks';
import type { Task } from '@/types';

interface EditTaskSideBarProps {
  taskId: string;
}

interface EditTaskFormProps {
  task: Task;
}

function EditTaskForm({ task }: EditTaskFormProps) {
  const { taskTitle, setTaskTitle, taskDescription, setTaskDescription, handleSaveUpdateTask, handleCancelUpdateTask } = useEditTask(task);

  return (
    <>
      <div
        className={styles.overlay}
        onClick={handleCancelUpdateTask}
        aria-hidden="true"
      />
      <aside
        className={styles.sidebar}
        role="dialog"
        aria-labelledby="edit-task-title"
      >
        <div className={styles.header}>
          <h2
            id="edit-task-title"
            className={styles.title}
          >
            Edit Task
          </h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={handleCancelUpdateTask}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.fields}>
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
        </div>

        <div className={styles.footer}>
          <UiButton
            className={styles.btnCancel}
            onClick={handleCancelUpdateTask}
            label="Cancel"
          />
          <UiButton
            className={styles.btnSave}
            onClick={handleSaveUpdateTask}
            label="Save"
          />
        </div>
      </aside>
    </>
  );
}

export default function EditTaskSideBar({ taskId }: EditTaskSideBarProps) {
  const { data: task, isLoading } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTask(taskId),
  });

  if (isLoading || !task) return null;

  return <EditTaskForm key={task.id} task={task} />;
}
