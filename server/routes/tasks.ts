import { Router } from 'express';
import prisma from '../prisma/client';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.use(authenticate);

// Get all tasks for the authenticated user
router.get('/', async (req, res) => {
  const tasks = await prisma.task.findMany({ where: { userId: req.user!.id } });
  res.json(tasks);
});

// Get a task by id
router.get('/:id', async (req, res) => {
  const task = await prisma.task.findFirst({
    where: { id: req.params.id, userId: req.user!.id },
  });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

// Create a task
router.post('/', async (req, res) => {
  const task = await prisma.task.create({
    data: { ...req.body, userId: req.user!.id },
  });
  res.status(201).json(task);
});

// Update a task
router.patch('/:id', async (req, res) => {
  const existing = await prisma.task.findFirst({
    where: { id: req.params.id, userId: req.user!.id },
  });
  if (!existing) return res.status(404).json({ message: 'Task not found' });

  await prisma.task.update({ where: { id: req.params.id }, data: req.body });
  res.json({ message: 'Task updated' });
});

// Delete a task
router.delete('/:id', async (req, res) => {
  const existing = await prisma.task.findFirst({
    where: { id: req.params.id, userId: req.user!.id },
  });
  if (!existing) return res.status(404).json({ message: 'Task not found' });

  await prisma.task.delete({ where: { id: req.params.id } });
  res.json({ message: 'Task deleted' });
});

export default router;
