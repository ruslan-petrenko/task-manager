export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
}
export interface AuthResponse {
  token: string;
  user: User;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  status: TaskStatus;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
}
