import bcrypt from 'bcryptjs';
import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { findUserById } from './db.js';
import type { AuthUserDTO } from './types.js';

const JWT_SECRET = process.env.JWT_SECRET ?? 'cesar_school_pet_routine_secret_2026_2';

export interface JwtPayloadData {
  userId: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthUserDTO;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JwtPayloadData | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === 'object' && decoded !== null && 'userId' in decoded) {
      return { userId: String(decoded.userId) };
    }
    return null;
  } catch {
    return null;
  }
}

export function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token de sessão ausente. Faça login novamente.' });
    return;
  }

  const token = authHeader.slice('Bearer '.length).trim();
  const payload = verifyToken(token);

  if (!payload) {
    res.status(401).json({ error: 'Token de sessão inválido ou expirado.' });
    return;
  }

  const user = findUserById(payload.userId);

  if (!user) {
    res.status(401).json({ error: 'Usuário da sessão não encontrado.' });
    return;
  }

  req.user = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  next();
}
