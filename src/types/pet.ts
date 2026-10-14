// ============================================================
// Prática 1.1 — Modelagem do domínio Pet
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Leia o enunciado completo em `PRATICA.md` › "Prática 1".
// Onde houver `/* … */` ou `TODO`, é a sua vez de escrever.
// Os blocos marcados como VERIFICAÇÃO **não devem ser apagados**.
//
// Regras do domínio (resumo — o enunciado manda):
//   • Um pet tem exatamente UMA espécie e exatamente UM porte.
//   • O passeio do dia tem três desfechos: pendente, concluído ou cancelado.
//   • `id`, `criadoEm` e o `statusPasseio` inicial são gerados pelo SERVIDOR —
//     o formulário de cadastro não envia nenhum dos três.
//   • A lista "Meus pets" mostra só nome, espécie e status do passeio (+ `id`).
//
// Restrições de avaliação: nenhum `any`; `as` só com justificativa em
// comentário; nenhum campo de domínio tipado como `string` genérica.
// ============================================================

// ============================================================
export type StatusPasseio = 'pendente' | 'concluido' | 'cancelado';
export type EspeciePet = 'cachorro' | 'gato' | 'ave' | 'outro';
export type PortePet = 'pequeno' | 'medio' | 'grande';

export interface Pet {
  id: string;
  nome: string;
  especie: EspeciePet;
  porte: PortePet;
  statusPasseio: StatusPasseio;
  idadeMeses: number;
  criadoEm: Date;
  // Campos opcionais da Prática 3
  local?: {
    latitude: number;
    longitude: number;
    precisaoMetros: number;
  };
  fotoUri?: string;
}