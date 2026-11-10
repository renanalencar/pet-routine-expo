import bcrypt from 'bcryptjs';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import type { EspeciePet, PetDTO, PetRow, PortePet, StatusPasseio, UserRow } from './types.js';

const dbPath = process.env.DB_PATH
  ? path.resolve(process.cwd(), process.env.DB_PATH)
  : path.resolve(process.cwd(), 'pet-routine.db');

export const db = new DatabaseSync(dbPath);
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

export function rowToPetDTO(row: PetRow): PetDTO {
  const pet: PetDTO = {
    id: row.id,
    nome: row.nome,
    especie: row.especie,
    porte: row.porte,
    statusPasseio: row.statusPasseio,
    idadeMeses: row.idadeMeses,
    criadoEm: row.criadoEm,
  };

  if (row.latitude !== null && row.longitude !== null) {
    pet.local = {
      latitude: row.latitude,
      longitude: row.longitude,
      precisaoMetros: row.precisaoMetros ?? 0,
    };
  }

  if (row.fotoUri !== null && row.fotoUri.trim() !== '') {
    pet.fotoUri = row.fotoUri;
  }

  return pet;
}

export function findUserByEmail(email: string): UserRow | undefined {
  // node:sqlite retorna Record<string, SQLOutputValue> | undefined; convertemos na fronteira do banco
  return db
    .prepare('SELECT id, name, email, passwordHash, createdAt FROM users WHERE email = ?')
    .get(email) as unknown as UserRow | undefined;
}

export function findUserById(id: string): UserRow | undefined {
  // Conversão na fronteira do driver SQLite
  return db
    .prepare('SELECT id, name, email, passwordHash, createdAt FROM users WHERE id = ?')
    .get(id) as unknown as UserRow | undefined;
}

export function listPetsByUser(userId: string): PetRow[] {
  // Conversão na fronteira do driver SQLite
  return db
    .prepare('SELECT * FROM pets WHERE userId = ? ORDER BY criadoEm DESC')
    .all(userId) as unknown as PetRow[];
}

export function findPetById(id: string): PetRow | undefined {
  // Conversão na fronteira do driver SQLite
  return db
    .prepare('SELECT * FROM pets WHERE id = ?')
    .get(id) as unknown as PetRow | undefined;
}

export function findPetByIdAndUser(id: string, userId: string): PetRow | undefined {
  // Conversão na fronteira do driver SQLite
  return db
    .prepare('SELECT * FROM pets WHERE id = ? AND userId = ?')
    .get(id, userId) as unknown as PetRow | undefined;
}

interface SeedPetInput {
  id: string;
  nome: string;
  especie: EspeciePet;
  porte: PortePet;
  statusPasseio: StatusPasseio;
  idadeMeses: number;
  criadoEm: string;
  latitude?: number;
  longitude?: number;
  precisaoMetros?: number;
  fotoUri?: string;
}

export const INITIAL_PETS: SeedPetInput[] = [
  { id: 'p1', nome: 'Rex', especie: 'cachorro', porte: 'medio', statusPasseio: 'pendente', idadeMeses: 24, criadoEm: '2025-01-15T10:00:00.000Z' },
  { id: 'p2', nome: 'Mia', especie: 'gato', porte: 'pequeno', statusPasseio: 'concluido', idadeMeses: 18, criadoEm: '2025-03-10T10:00:00.000Z', latitude: -8.05, longitude: -34.9, precisaoMetros: 10 },
  { id: 'p3', nome: 'Blu', especie: 'ave', porte: 'pequeno', statusPasseio: 'cancelado', idadeMeses: 6, criadoEm: '2025-06-20T10:00:00.000Z', fotoUri: 'https://picsum.photos/seed/blu/200/200' },
  { id: 'p4', nome: 'Thor', especie: 'cachorro', porte: 'grande', statusPasseio: 'pendente', idadeMeses: 36, criadoEm: '2025-02-10T10:00:00.000Z' },
  { id: 'p5', nome: 'Bolinha', especie: 'outro', porte: 'pequeno', statusPasseio: 'concluido', idadeMeses: 4, criadoEm: '2025-08-01T10:00:00.000Z' },
  { id: 'p6', nome: 'Luna', especie: 'gato', porte: 'medio', statusPasseio: 'pendente', idadeMeses: 12, criadoEm: '2025-04-12T10:00:00.000Z' },
  { id: 'p7', nome: 'Nina', especie: 'cachorro', porte: 'pequeno', statusPasseio: 'cancelado', idadeMeses: 48, criadoEm: '2024-10-05T10:00:00.000Z' },
  { id: 'p8', nome: 'Bob', especie: 'cachorro', porte: 'medio', statusPasseio: 'pendente', idadeMeses: 60, criadoEm: '2024-05-15T10:00:00.000Z' },
  { id: 'p9', nome: 'Garfield', especie: 'gato', porte: 'grande', statusPasseio: 'concluido', idadeMeses: 72, criadoEm: '2023-11-20T10:00:00.000Z', fotoUri: 'https://picsum.photos/seed/garf/200/200', latitude: -8.06, longitude: -34.89, precisaoMetros: 5 },
  { id: 'p10', nome: 'Tico', especie: 'ave', porte: 'pequeno', statusPasseio: 'cancelado', idadeMeses: 24, criadoEm: '2025-01-05T10:00:00.000Z' },
  { id: 'p11', nome: 'Lola', especie: 'cachorro', porte: 'medio', statusPasseio: 'pendente', idadeMeses: 15, criadoEm: '2025-05-15T10:00:00.000Z' },
  { id: 'p12', nome: 'Tom', especie: 'gato', porte: 'medio', statusPasseio: 'concluido', idadeMeses: 9, criadoEm: '2025-07-20T10:00:00.000Z' },
  { id: 'p13', nome: 'Max', especie: 'cachorro', porte: 'grande', statusPasseio: 'cancelado', idadeMeses: 42, criadoEm: '2024-12-10T10:00:00.000Z' },
  { id: 'p14', nome: 'Chico', especie: 'outro', porte: 'medio', statusPasseio: 'pendente', idadeMeses: 3, criadoEm: '2025-09-01T10:00:00.000Z' },
  { id: 'p15', nome: 'Bella', especie: 'cachorro', porte: 'pequeno', statusPasseio: 'concluido', idadeMeses: 28, criadoEm: '2025-03-25T10:00:00.000Z' },
  { id: 'p16', nome: 'Amora', especie: 'gato', porte: 'pequeno', statusPasseio: 'pendente', idadeMeses: 8, criadoEm: '2025-08-10T10:00:00.000Z' },
  { id: 'p17', nome: 'Pipoca', especie: 'ave', porte: 'pequeno', statusPasseio: 'concluido', idadeMeses: 14, criadoEm: '2025-04-30T10:00:00.000Z' },
  { id: 'p18', nome: 'Zeus', especie: 'cachorro', porte: 'grande', statusPasseio: 'cancelado', idadeMeses: 80, criadoEm: '2023-08-12T10:00:00.000Z' },
  { id: 'p19', nome: 'Mel', especie: 'gato', porte: 'medio', statusPasseio: 'pendente', idadeMeses: 22, criadoEm: '2025-02-28T10:00:00.000Z' },
  { id: 'p20', nome: 'Kiwi', especie: 'ave', porte: 'pequeno', statusPasseio: 'concluido', idadeMeses: 5, criadoEm: '2025-07-05T10:00:00.000Z' },
];

export function initDatabase(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      passwordHash TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS pets (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      nome TEXT NOT NULL,
      especie TEXT NOT NULL CHECK (especie IN ('cachorro', 'gato', 'ave', 'outro')),
      porte TEXT NOT NULL CHECK (porte IN ('pequeno', 'medio', 'grande')),
      statusPasseio TEXT NOT NULL CHECK (statusPasseio IN ('pendente', 'concluido', 'cancelado')),
      idadeMeses INTEGER NOT NULL DEFAULT 12,
      criadoEm TEXT NOT NULL,
      latitude REAL,
      longitude REAL,
      precisaoMetros REAL,
      fotoUri TEXT,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  seedDemoUserIfNeeded();
}

export function seedPetsForUser(userId: string, useFixedIds = false): void {
  const insertPet = db.prepare(`
    INSERT OR IGNORE INTO pets (
      id, userId, nome, especie, porte, statusPasseio, idadeMeses, criadoEm, latitude, longitude, precisaoMetros, fotoUri
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  db.exec('BEGIN');
  try {
    for (const pet of INITIAL_PETS) {
      const petId = useFixedIds ? pet.id : randomUUID();
      insertPet.run(
        petId,
        userId,
        pet.nome,
        pet.especie,
        pet.porte,
        pet.statusPasseio,
        pet.idadeMeses,
        pet.criadoEm,
        pet.latitude ?? null,
        pet.longitude ?? null,
        pet.precisaoMetros ?? null,
        pet.fotoUri ?? null
      );
    }
    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
}

function seedDemoUserIfNeeded(): void {
  const demoEmail = 'tutor@cesar.school';
  const existing = findUserByEmail(demoEmail);

  if (existing) {
    return;
  }

  const demoUserId = 'user-demo-cesar';
  const passwordHash = bcrypt.hashSync('123456', 10);

  db.prepare(
    'INSERT INTO users (id, name, email, passwordHash, createdAt) VALUES (?, ?, ?, ?, ?)'
  ).run(demoUserId, 'Tutor Demo CESAR', demoEmail, passwordHash, new Date().toISOString());

  seedPetsForUser(demoUserId, true);
  console.log('[DB] Conta demo criada: tutor@cesar.school (senha: 123456) com 20 pets.');
}

if (process.argv.includes('--seed')) {
  initDatabase();
  console.log('[DB] Banco SQLite inicializado e populado com sucesso em:', dbPath);
}
