// ============================================================
// Prática 3 — Agrupamento e filtragem de pets
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Funções puras — sem JSX, sem estado, sem React.
// Moram aqui para serem testáveis e reutilizáveis independentemente.
// ============================================================

import type { Pet } from '../types/pet';

export type Secao = {
  title: string;
  data: Pet[];
};

export function agrupar(pets: Pet[]): Secao[] {
  // P3.2: Agrupamento por status do passeio
  // Decisão: Organizar primeiro o que requer ação (pendentes), seguido dos finalizados e cancelados.
  const ordemStatus: Array<{ status: Pet['statusPasseio']; titulo: string }> = [
    { status: 'pendente', titulo: 'Passeios Pendentes' },
    { status: 'concluido', titulo: 'Passeios Concluídos' },
    { status: 'cancelado', titulo: 'Passeios Cancelados' },
  ];

  const secoes = ordemStatus.map(({ status, titulo }) => ({
    title: titulo,
    data: pets.filter((p) => p.statusPasseio === status),
  }));

  // P3.3: Descartar grupos vazios
  return secoes.filter((secao) => secao.data.length > 0);
}

export function filtrarPorNome(pets: Pet[], busca: string): Pet[] {
  // P3.5: Busca case-insensitive. Busca vazia retorna todos.
  const termo = busca.trim().toLowerCase();
  if (!termo) return pets;
  return pets.filter((pet) => pet.nome.toLowerCase().includes(termo));
}