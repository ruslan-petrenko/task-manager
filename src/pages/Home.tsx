import UiButton from "../components/common/UiButton";
import AddTaskForm from "../components/AddTaskForm";
import KanbanBoard from "../components/KanbanBoard";
import { useState } from "react";

export default function Home() {
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false);
  return (
    <>
      <div className="flex flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-violet-900 dark:text-violet-300">Task Manager</h1>
        <UiButton
          className="bg-violet-500 text-white p-2 rounded-md cursor-pointer"
          onClick={() => setIsAddTaskFormOpen(true)}
          label="Add Task"
        />
      </div>
      {isAddTaskFormOpen && <AddTaskForm cancel={() => setIsAddTaskFormOpen(false)} />}
      <KanbanBoard />
    </>
  );
};
