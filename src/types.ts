export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
    id: string
    title: string
    description: string
    completed: boolean
    createdAt: string
    status: TaskStatus
    priority?: 'low' | 'medium' | 'high'
    dueDate?: string
  }