import UiButton from '@/components/common/UiButton/UiButton';
import AddTaskForm from '@/components/AddTaskForm/AddTaskForm';
import KanbanBoard from '@/components/KanbanBoard/KanbanBoard';
import { useState } from 'react';
import styles from './Home.module.css';

export default function Home() {
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false);

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Task Manager</h1>
        <UiButton className={styles.addBtn} onClick={() => setIsAddTaskFormOpen(true)} label="Add Task" />
      </div>
      {isAddTaskFormOpen && <AddTaskForm cancel={() => setIsAddTaskFormOpen(false)} />}
      <KanbanBoard />
    </>
  );
}
