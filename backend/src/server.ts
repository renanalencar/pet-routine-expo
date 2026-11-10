import cors from 'cors';
import 'dotenv/config';
import express, { type NextFunction, type Request, type Response } from 'express';
import { initDatabase } from './db.js';
import { authRouter } from './routes/auth.routes.js';
import { petsRouter } from './routes/pets.routes.js';

initDatabase();

export const app = express();
const PORT = Number(process.env.PORT ?? 3000);

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Log simples de requisições para facilitar o debug dos alunos no terminal
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Health check
app.get(['/health', '/api/health'], (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'pet-routine-backend',
    timestamp: new Date().toISOString(),
  });
});

// Rotas de autenticação (suporta /api/auth/* e /auth/*)
app.use('/api/auth', authRouter);
app.use('/auth', authRouter);

// Rotas de CRUD de Pets (suporta /pets/* e /api/pets/*)
app.use('/pets', petsRouter);
app.use('/api/pets', petsRouter);

// Rota 404 amigável
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: `Rota não encontrada: ${req.method} ${req.originalUrl}`,
  });
});

// Tratamento global de erros
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[SERVER ERROR]', err);
  const message = err instanceof Error ? err.message : 'Erro interno no servidor';
  res.status(500).json({ error: message });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log('==========================================================');
    console.log(`🐾 Pet Routine API rodando em http://localhost:${PORT}`);
    console.log(`📱 Android Emulator: http://10.0.2.2:${PORT}`);
    console.log(`🔑 Conta demo: tutor@cesar.school | Senha: 123456`);
    console.log('==========================================================');
  });
}
