import { Router } from 'express';
import prisma from '../prisma/client';

const router = Router();

// Get all tasks
router.get('/', async (_, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

// Get a task by id
router.get('/:id', async (req, res) => {
  const task = await prisma.task.findUnique({
    where: {
      id: req.params.id,
    },
  });
  if (!task) return res.status(404).json({ message: 'Task not found' });

  res.json(task);
});

// Create a task
router.post('/', async (req, res) => {
  const task = await prisma.task.create({
    data: req.body,
  });
  res.status(201).json(task);
});

// Update a task
router.patch('/:id', async (req, res) => {
  await prisma.task.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });
  res.json({ message: 'Task updated' });
});

// Delete a task
router.delete('/:id', async (req, res) => {
  await prisma.task.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({ message: 'Task deleted' });
});
export default router;
