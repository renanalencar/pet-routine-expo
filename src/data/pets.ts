// ============================================================
// Prática 3 — Mock de dados: lista de pets
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Este arquivo é o mock da lista. No mínimo 20 itens, com:
//   • pelo menos 3 espécies diferentes
//   • todos os 3 status de passeio representados
//   • idades variadas
//   • alguns com local e/ou fotoUri, outros sem
//
// Lista pequena esconde exatamente os problemas que esta prática
// ensina a evitar. Não reduza.
// ============================================================

import type { Pet } from '../types/pet';

export const PETS: Pet[] = [
  {
    id: 'p1',
    nome: 'Rex',
    especie: 'cachorro',
    porte: 'medio',
    statusPasseio: 'pendente',
    idadeMeses: 24,
    criadoEm: new Date('2025-01-15'),
  },
  {
    id: 'p2',
    nome: 'Mia',
    especie: 'gato',
    porte: 'pequeno',
    statusPasseio: 'concluido',
    idadeMeses: 18,
    criadoEm: new Date('2025-03-10'),
    local: { latitude: -8.05, longitude: -34.9, precisaoMetros: 10 },
  },
  {
    id: 'p3',
    nome: 'Blu',
    especie: 'ave',
    porte: 'pequeno',
    statusPasseio: 'cancelado',
    idadeMeses: 6,
    criadoEm: new Date('2025-06-20'),
    fotoUri: 'https://picsum.photos/seed/blu/200/200',
  },
  { id: 'p4', nome: 'Thor', especie: 'cachorro', porte: 'grande', statusPasseio: 'pendente', idadeMeses: 36, criadoEm: new Date('2025-02-10') },
  { id: 'p5', nome: 'Bolinha', especie: 'outro', porte: 'pequeno', statusPasseio: 'concluido', idadeMeses: 4, criadoEm: new Date('2025-08-01') },
  { id: 'p6', nome: 'Luna', especie: 'gato', porte: 'medio', statusPasseio: 'pendente', idadeMeses: 12, criadoEm: new Date('2025-04-12') },
  { id: 'p7', nome: 'Nina', especie: 'cachorro', porte: 'pequeno', statusPasseio: 'cancelado', idadeMeses: 48, criadoEm: new Date('2024-10-05') },
  { id: 'p8', nome: 'Bob', especie: 'cachorro', porte: 'medio', statusPasseio: 'pendente', idadeMeses: 60, criadoEm: new Date('2024-05-15') },
  { id: 'p9', nome: 'Garfield', especie: 'gato', porte: 'grande', statusPasseio: 'concluido', idadeMeses: 72, criadoEm: new Date('2023-11-20'), fotoUri: 'https://picsum.photos/seed/garf/200/200', local: { latitude: -8.06, longitude: -34.89, precisaoMetros: 5 } },
  { id: 'p10', nome: 'Tico', especie: 'ave', porte: 'pequeno', statusPasseio: 'cancelado', idadeMeses: 24, criadoEm: new Date('2025-01-05') },
  { id: 'p11', nome: 'Lola', especie: 'cachorro', porte: 'medio', statusPasseio: 'pendente', idadeMeses: 15, criadoEm: new Date('2025-05-15') },
  { id: 'p12', nome: 'Tom', especie: 'gato', porte: 'medio', statusPasseio: 'concluido', idadeMeses: 9, criadoEm: new Date('2025-07-20') },
  { id: 'p13', nome: 'Max', especie: 'cachorro', porte: 'grande', statusPasseio: 'cancelado', idadeMeses: 42, criadoEm: new Date('2024-12-10') },
  { id: 'p14', nome: 'Chico', especie: 'outro', porte: 'medio', statusPasseio: 'pendente', idadeMeses: 3, criadoEm: new Date('2025-09-01') },
  { id: 'p15', nome: 'Bella', especie: 'cachorro', porte: 'pequeno', statusPasseio: 'concluido', idadeMeses: 28, criadoEm: new Date('2025-03-25') },
  { id: 'p16', nome: 'Amora', especie: 'gato', porte: 'pequeno', statusPasseio: 'pendente', idadeMeses: 8, criadoEm: new Date('2025-08-10') },
  { id: 'p17', nome: 'Pipoca', especie: 'ave', porte: 'pequeno', statusPasseio: 'concluido', idadeMeses: 14, criadoEm: new Date('2025-04-30') },
  { id: 'p18', nome: 'Zeus', especie: 'cachorro', porte: 'grande', statusPasseio: 'cancelado', idadeMeses: 80, criadoEm: new Date('2023-08-12') },
  { id: 'p19', nome: 'Mel', especie: 'gato', porte: 'medio', statusPasseio: 'pendente', idadeMeses: 22, criadoEm: new Date('2025-02-28') },
  { id: 'p20', nome: 'Kiwi', especie: 'ave', porte: 'pequeno', statusPasseio: 'concluido', idadeMeses: 5, criadoEm: new Date('2025-07-05') },
];
