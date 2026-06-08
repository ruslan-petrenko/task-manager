import { useDroppable } from '@dnd-kit/core';
import { type Task, type TaskStatus } from '../types';
import TaskUi from './Task';

interface KanbanColumnProps {
  id: TaskStatus;
  label: string;
  tasks: Task[];
}

export default function KanbanColumn({ id, label, tasks }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col gap-3 rounded-xl p-4 min-h-96 transition-colors border ${
        isOver
          ? 'bg-violet-50 dark:bg-violet-900/20 border-violet-300 dark:border-violet-600'
          : 'bg-white/60 dark:bg-gray-800/60 border-white/70 dark:border-gray-700/50'
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-base font-semibold text-violet-900 dark:text-violet-300">{label}</h2>
        <span className="text-xs font-medium bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 rounded-full px-2 py-0.5">
          {tasks.length}
        </span>
      </div>
      {tasks.map((task) => (
        <TaskUi key={task.id} {...task} />
      ))}
    </div>
  );
}
