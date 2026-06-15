import { useDroppable } from '@dnd-kit/core';
import { type Task, type TaskStatus } from '../../../shared/types';
import TaskUi from '@/components/Task/Task';
import styles from './KanbanColumn.module.css';

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
      className={`${styles.column} ${isOver ? styles.columnOver : styles.columnDefault}`}
    >
      <div className={styles.header}>
        <h2 className={styles.label}>{label}</h2>
        <span className={styles.badge}>{tasks.length}</span>
      </div>
      {tasks.map((task) => (
        <TaskUi
          key={task.id}
          {...task}
        />
      ))}
    </div>
  );
}
