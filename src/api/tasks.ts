import type { Task, TaskStatus } from '@/types';
import axios from 'axios';

const API_URL = 'http://localhost:3001/tasks';

export const getTask = async (id: string): Promise<Task> => {
  const response = await axios.get<Task>(`${API_URL}/${id}`);
  return response.data;
};

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(API_URL);
  return response.data;
};

export const createTask = async (task: Task) => {
  const response = await axios.post(API_URL, task);
  return response;
};

export const updateTask = async (task: Task) => {
  const response = await axios.patch(`${API_URL}/${task.id}`, task);
  return response;
};

export const deleteTask = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response;
};

export const moveTask = async (id: string, status: TaskStatus): Promise<Task> => {
  const response = await axios.patch<Task>(`${API_URL}/${id}`, { status });
  return response.data;
};
