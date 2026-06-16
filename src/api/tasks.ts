import type { Task, TaskStatus } from '../../shared/types';
import { apiClient } from '../config/api';

export const getTask = async (id: string): Promise<Task> => {
  const response = await apiClient.get<Task>(`/tasks/${id}`);
  return response.data;
};

export const getTasks = async (): Promise<Task[]> => {
  const response = await apiClient.get<Task[]>(`/tasks`);
  return response.data;
};

export const createTask = async (task: Task) => {
  const response = await apiClient.post(`/tasks`, task);
  return response;
};

export const updateTask = async (task: Task) => {
  const response = await apiClient.patch(`/tasks/${task.id}`, task);
  return response;
};

export const deleteTask = async (id: string) => {
  const response = await apiClient.delete(`/tasks/${id}`);
  return response;
};

export const moveTask = async (id: string, status: TaskStatus): Promise<Task> => {
  const response = await apiClient.patch<Task>(`/tasks/${id}`, { status });
  return response.data;
};
