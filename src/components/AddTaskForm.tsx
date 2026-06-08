import useTaskForm from '../hooks/useTaskForm';
import UiInput from './common/UiInput';
import UiButton from './common/UiButton';

export default function AddTaskForm(props: { cancel: () => void }) {
  const { cancel } = props;
  const { taskTitle, taskDescription, submitted, setTaskTitle, setTaskDescription, handleSubmit, cancelAddTask } = useTaskForm(cancel);

  return (
    <div className="mb-8 flex flex-row justify-between items-end gap-4 rounded-2xl border border-white/70 bg-white/80 p-6 shadow-lg shadow-violet-200/50 backdrop-blur-sm">
      <div className="flex flex-row self-baseline gap-2">
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
      <div className="flex flex-row gap-2 self-end">
        <UiButton
          className="self-baseline rounded-lg bg-violet-500 px-4 py-2 font-medium text-white shadow-md shadow-violet-300/60 transition hover:bg-violet-600"
          onClick={handleSubmit}
          label="Add"
        />
        <UiButton
          className="self-baseline rounded-lg bg-violet-500 px-4 py-2 font-medium text-white shadow-md shadow-violet-300/60 transition hover:bg-violet-600"
          onClick={cancelAddTask}
          label="Cancel"
        />
      </div>
    </div>
  );
}
