import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client';
import { AuthError } from '../errors/auth.error';
import type { AuthResponse, User } from '../../shared/types';

const JWT_SECRET = process.env.JWT_SECRET ?? 'default-secret';
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN ?? '7d') as jwt.SignOptions['expiresIn'];

type DbUser = {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
};

export function toUser(user: DbUser): User {
  return {
    id: user.id,
    email: user.email,
    name: user.name ?? undefined,
    createdAt: user.createdAt.toISOString(),
  };
}

export function signToken(user: DbUser): string {
  return jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export function buildAuthResponse(user: DbUser): AuthResponse {
  return { token: signToken(user), user: toUser(user) };
}

export async function registerUser(input: { email: string; password: string; name?: string }): Promise<AuthResponse> {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw new AuthError(409, 'Email already registered');
  const passwordHash = await bcrypt.hash(input.password, 10);
  const user = await prisma.user.create({
    data: {
      email: input.email,
      passwordHash,
      name: input.name,
    },
  });
  return buildAuthResponse(user);
}

export async function loginUser(input: { email: string; password: string }): Promise<AuthResponse> {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user?.passwordHash) throw new AuthError(401, 'Invalid credentials');
  const valid = await bcrypt.compare(input.password, user.passwordHash);
  if (!valid) throw new AuthError(401, 'Invalid credentials');
  return buildAuthResponse(user);
}

export async function findOrCreateOAuthUser(input: {
  provider: 'google' | 'github';
  providerId: string;
  email: string;
  name?: string;
}): Promise<AuthResponse> {
  const account = await prisma.account.findUnique({
    where: {
      provider_providerId: {
        provider: input.provider,
        providerId: input.providerId,
      },
    },
    include: { user: true },
  });
  if (account) return buildAuthResponse(account.user);
  const existingUser = await prisma.user.findUnique({ where: { email: input.email } });
  const user = existingUser
    ? existingUser
    : await prisma.user.create({
        data: {
          email: input.email,
          name: input.name,
        },
      });
  await prisma.account.create({
    data: {
      provider: input.provider,
      providerId: input.providerId,
      userId: user.id,
    },
  });
  return buildAuthResponse(user);
}

export { AuthError };
