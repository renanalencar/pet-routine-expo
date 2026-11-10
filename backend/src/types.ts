export type EspeciePet = 'cachorro' | 'gato' | 'ave' | 'outro';
export type PortePet = 'pequeno' | 'medio' | 'grande';
export type StatusPasseio = 'pendente' | 'concluido' | 'cancelado';

export interface LocalPasseio {
  latitude: number;
  longitude: number;
  precisaoMetros: number;
}

export interface PetDTO {
  id: string;
  nome: string;
  especie: EspeciePet;
  porte: PortePet;
  statusPasseio: StatusPasseio;
  idadeMeses: number;
  criadoEm: string;
  local?: LocalPasseio;
  fotoUri?: string;
}

export interface PetRow {
  id: string;
  userId: string;
  nome: string;
  especie: EspeciePet;
  porte: PortePet;
  statusPasseio: StatusPasseio;
  idadeMeses: number;
  criadoEm: string;
  latitude: number | null;
  longitude: number | null;
  precisaoMetros: number | null;
  fotoUri: string | null;
}

export interface UserRow {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface AuthUserDTO {
  id: string;
  name: string;
  email: string;
}
