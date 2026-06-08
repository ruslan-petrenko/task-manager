import { DndContext, type DragEndEvent, DragOverlay, type DragStartEvent } from '@dnd-kit/core';
import { useState } from 'react';
import { useTasksStore } from '../stores/TasksStore';
import { type Task, type TaskStatus } from '../types';
import KanbanColumn from './KanbanColumn';
import TaskUi from './Task';

const COLUMNS: { id: TaskStatus; label: string }[] = [
  { id: 'todo', label: 'To Do' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'done', label: 'Done' },
];

export default function KanbanBoard() {
  const tasks = useTasksStore((s) => s.tasks);
  const moveTask = useTasksStore((s) => s.moveTask);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    setActiveTask(task ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      const targetStatus = over.id as TaskStatus;
      const task = tasks.find((t) => t.id === active.id);
      if (task && task.status !== targetStatus) {
        moveTask(String(active.id), targetStatus);
      }
    }
    setActiveTask(null);
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            label={col.label}
            tasks={tasks.filter((t) => (t.status ?? 'todo') === col.id)}
          />
        ))}
      </div>
      <DragOverlay>
        {activeTask ? (
          <div className="rotate-1 shadow-xl opacity-95">
            <TaskUi {...activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
