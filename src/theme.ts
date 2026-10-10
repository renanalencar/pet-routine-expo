export const cores = {
  fundo: '#FEF7EE',
  cartao: '#FFFFFF',
  texto: '#1A202C',
  textoFraco: '#718096',
  primaria: '#3182CE',
  sucesso: '#38A169',
  erro: '#E53E3E',
} as const;

export const espaco = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const tipografia = {
  titulo: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: cores.texto,
  },
  corpo: {
    fontSize: 16,
    color: cores.texto,
  },
  legenda: {
    fontSize: 12,
    color: cores.textoFraco,
  },
} as const;