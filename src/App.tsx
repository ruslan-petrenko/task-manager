import TaskListUi from './components/TaskListUi';
import { type Task } from './types';
import { useState } from 'react';
import { useTasksStore } from './stores/TasksStore';
import AddTaskForm from './components/AddTaskForm';
function App() {
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState<boolean>(false);
  const { tasks, addTask } = useTasksStore();
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const handleAddTask = (task: Task) => {
    if (!task.title.length) return;
    addTask(task);
    setTaskTitle('');
    setTaskDescription('');
  };
  const cancelAddTask = () => {
    setTaskTitle('');
    setTaskDescription('');
    setIsAddTaskFormOpen(false);
  };
  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-100 via-rose-50 to-sky-100">
      <div className="container mx-auto max-w-5xl p-6 md:p-8">
        <div className="flex flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-violet-900">Task Manager</h1>
          <button
            className="bg-violet-500 text-white p-2 rounded-md cursor-pointer"
            onClick={() => setIsAddTaskFormOpen(true)}
          >
            Add Task
          </button>
        </div>
        {isAddTaskFormOpen && (
          <AddTaskForm
            taskTitle={taskTitle}
            taskDescription={taskDescription}
            setTaskTitle={setTaskTitle}
            setTaskDescription={setTaskDescription}
            handleAddTask={handleAddTask}
            cancelAddTask={cancelAddTask}
          />
        )}
        <TaskListUi tasks={tasks} />
      </div>
    </main>
  );
}

export default App;
