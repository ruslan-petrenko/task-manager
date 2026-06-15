import { Router } from 'express';
import { type Task } from '../../shared/types';

const router = Router();
let tasks: Task[] = [];

// Get all tasks
router.get('/', (_, res) => {
  res.json(tasks);
});

// Get a task by id
router.get('/:id', (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

// Create a task
router.post('/', (req, res) => {
  tasks.push(req.body);
  res.status(201).json(req.body);
});

// Update a task
router.patch('/:id', (req, res) => {
  const { title, description, completed } = req.body;
  tasks = tasks.map((t) => (t.id === req.params.id ? { ...t, title, description, completed } : t));
  res.json({ message: 'Task updated' });
});

// Delete a task
router.delete('/:id', (req, res) => {
  tasks = tasks.filter((t) => t.id !== req.params.id);
  res.json({ message: 'Task deleted' });
});

// Update a task status
router.patch('/:id', (req, res) => {
  const { status } = req.body;
  tasks = tasks.map((t) => (t.id === req.params.id ? { ...t, status } : t));
  res.json({ message: 'Task updated' });
});
export default router;
