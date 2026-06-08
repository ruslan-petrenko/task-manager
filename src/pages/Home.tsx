import UiButton from "../components/common/UiButton";
import AddTaskForm from "../components/AddTaskForm";
import TaskListUi from "../components/TaskList";
import { useState } from "react";
import { useTasksStore } from "../stores/TasksStore";

export default function Home() {
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false);
  const tasks = useTasksStore((s) => s.tasks);
  return (
    <>
      <div className="flex flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-violet-900">Task Manager</h1>
        <UiButton
          className="bg-violet-500 text-white p-2 rounded-md cursor-pointer"
          onClick={() => setIsAddTaskFormOpen(true)}
          label="Add Task"
        />
      </div>
      {isAddTaskFormOpen && <AddTaskForm cancel={() => setIsAddTaskFormOpen(false)} />}
      <TaskListUi tasks={tasks} />
    </>
  );
};
