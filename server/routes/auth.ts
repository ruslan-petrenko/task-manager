import { Router } from 'express';
import prisma from '../prisma/client';
import { authenticate } from '../middleware/authenticate';
import { AuthError, loginUser, registerUser, toUser } from '../services/auth.service';

const router = Router();

function isValidEmail(email: unknown): email is string {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password: unknown): password is string {
  return typeof password === 'string' && password.length >= 8;
}

router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!isValidEmail(email) || !isValidPassword(password)) {
      return res.status(400).json({ message: 'Valid email and password (min 8 chars) required' });
    }
    const response = await registerUser({ email, password, name });
    return res.status(201).json(response);
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!isValidEmail(email) || typeof password !== 'string') {
      return res.status(400).json({ message: 'Email and password required' });
    }
    const response = await loginUser({ email, password });
    return res.json(response);
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Login failed' });
  }
});

router.get('/me', authenticate, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.json(toUser(user));
});

export default router;
