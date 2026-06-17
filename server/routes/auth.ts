import { Router } from 'express';
import crypto from 'crypto';
import prisma from '../prisma/client';
import { authenticate } from '../middleware/authenticate';
import { AuthError, findOrCreateOAuthUser, loginUser, registerUser, toUser } from '../services/auth.service';
import {
  buildFrontendCallbackUrl,
  fetchGitHubProfile,
  fetchGoogleProfile,
  getGitHubAuthUrl,
  getGoogleAuthUrl,
} from '../services/oauth.service';

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

router.get('/google', (_req, res) => {
  const state = crypto.randomBytes(16).toString('hex');
  res.redirect(getGoogleAuthUrl(state));
});

router.get('/google/callback', async (req, res) => {
  try {
    const { code } = req.query;
    if (typeof code !== 'string') return res.status(400).send('Missing code');
    const profile = await fetchGoogleProfile(code);
    const auth = await findOrCreateOAuthUser(profile);
    return res.redirect(buildFrontendCallbackUrl(auth.token));
  } catch {
    return res.status(500).send('Google authentication failed');
  }
});

router.get('/github', (_req, res) => {
  const state = crypto.randomBytes(16).toString('hex');
  res.redirect(getGitHubAuthUrl(state));
});

router.get('/github/callback', async (req, res) => {
  try {
    const { code } = req.query;
    if (typeof code !== 'string') return res.status(400).send('Missing code');
    const profile = await fetchGitHubProfile(code);
    const auth = await findOrCreateOAuthUser(profile);
    return res.redirect(buildFrontendCallbackUrl(auth.token));
  } catch {
    return res.status(500).send('GitHub authentication failed');
  }
});

export default router;
