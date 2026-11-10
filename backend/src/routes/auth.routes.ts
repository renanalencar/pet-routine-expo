import { Router, type Request, type Response } from 'express';
import { randomUUID } from 'node:crypto';
import {
  authMiddleware,
  comparePassword,
  generateToken,
  hashPassword,
  type AuthenticatedRequest,
} from '../auth.js';
import { db, findUserByEmail, seedPetsForUser } from '../db.js';

export const authRouter = Router();

interface SignupBody {
  name?: string;
  email?: string;
  password?: string;
  seedInitialPets?: boolean;
}

interface LoginBody {
  email?: string;
  password?: string;
}

authRouter.post('/signup', async (req: Request, res: Response) => {
  try {
    const body = req.body as SignupBody;
    const rawEmail = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const rawPassword = typeof body.password === 'string' ? body.password : '';
    const rawName =
      typeof body.name === 'string' && body.name.trim() !== ''
        ? body.name.trim()
        : rawEmail.split('@')[0] ?? 'Tutor';

    if (!rawEmail || !rawPassword) {
      res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
      return;
    }

    if (rawPassword.length < 4) {
      res.status(400).json({ error: 'A senha deve ter pelo menos 4 caracteres.' });
      return;
    }

    const existing = findUserByEmail(rawEmail);

    if (existing) {
      res.status(400).json({ error: 'Este e-mail já está cadastrado.' });
      return;
    }

    const id = randomUUID();
    const passwordHash = await hashPassword(rawPassword);
    const createdAt = new Date().toISOString();

    db.prepare(
      'INSERT INTO users (id, name, email, passwordHash, createdAt) VALUES (?, ?, ?, ?, ?)'
    ).run(id, rawName, rawEmail, passwordHash, createdAt);

    if (body.seedInitialPets === true) {
      seedPetsForUser(id, false);
    }

    const token = generateToken(id);

    res.status(201).json({
      token,
      user: {
        id,
        name: rawName,
        email: rawEmail,
      },
    });
  } catch (err) {
    console.error('[AUTH SIGNUP ERROR]', err);
    res.status(500).json({ error: 'Falha interna ao criar conta de usuário.' });
  }
});

authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const body = req.body as LoginBody;
    const rawEmail = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const rawPassword = typeof body.password === 'string' ? body.password : '';

    if (!rawEmail || !rawPassword) {
      res.status(400).json({ error: 'Preencha e-mail e senha.' });
      return;
    }

    const user = findUserByEmail(rawEmail);

    if (!user) {
      res.status(401).json({ error: 'E-mail ou senha inválidos.' });
      return;
    }

    const valid = await comparePassword(rawPassword, user.passwordHash);
    if (!valid) {
      res.status(401).json({ error: 'E-mail ou senha inválidos.' });
      return;
    }

    const token = generateToken(user.id);

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('[AUTH LOGIN ERROR]', err);
    res.status(500).json({ error: 'Falha interna ao autenticar usuário.' });
  }
});

authRouter.post('/logout', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Logout realizado com sucesso.',
  });
});

authRouter.get('/me', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  res.status(200).json({ user: req.user });
});
