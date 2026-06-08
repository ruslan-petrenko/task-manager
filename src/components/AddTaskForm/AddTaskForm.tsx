import useTaskForm from '@/hooks/useTaskForm';
import UiInput from '@/components/common/UiInput/UiInput';
import UiButton from '@/components/common/UiButton/UiButton';
import styles from './AddTaskForm.module.css';

export default function AddTaskForm(props: { cancel: () => void }) {
  const { cancel } = props;
  const { taskTitle, taskDescription, submitted, setTaskTitle, setTaskDescription, handleSubmit, cancelAddTask } =
    useTaskForm(cancel);

  return (
    <div className={styles.form}>
      <div className={styles.fields}>
        <UiInput
          label="Title"
          type="text"
          placeholder="Add a new task"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          required
          error={submitted && !taskTitle.length ? 'This field is required' : undefined}
        />
        <UiInput
          label="Description"
          type="text"
          placeholder="Add a description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </div>
      <div className={styles.actions}>
        <UiButton className={styles.btn} onClick={handleSubmit} label="Add" />
        <UiButton className={styles.btn} onClick={cancelAddTask} label="Cancel" />
      </div>
    </div>
  );
}
