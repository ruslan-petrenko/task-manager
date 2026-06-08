import TaskListUi from './components/TaskList';
import { useState } from 'react';
import { useTasksStore } from './stores/TasksStore';
import AddTaskForm from './components/AddTaskForm';
import UiButton from './components/common/UiButton';

function App() {
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState<boolean>(false);
  const tasks = useTasksStore((s) => s.tasks);
  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-100 via-rose-50 to-sky-100">
      <div className="container mx-auto max-w-5xl p-6 md:p-8">
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
      </div>
    </main>
  );
}

export default App;
