// ============================================================
// Prática 3 — Estado vazio da lista
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Toda lista tem ListEmptyComponent. Sem exceção.
// E o texto do estado vazio precisa AJUDAR o usuário:
//   - primeiro acesso → o que ele pode fazer
//   - busca sem resultado → o que ele pode tentar
// ============================================================
import { View, Text, StyleSheet } from 'react-native';

type ListaVaziaProps = {
  busca: string;
};

export function ListaVazia({ busca }: ListaVaziaProps) {
  const eBusca = busca.trim().length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {eBusca ? 'Nenhum pet encontrado' : 'Nenhum pet cadastrado'}
      </Text>
      <Text style={styles.subtitulo}>
        {eBusca
          ? `Não foi encontrado nenhum pet correspondente ao termo "${busca}".`
          : 'Sua lista de pets está vazia no momento.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    alignItems: 'center',
    gap: 8,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  subtitulo: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
});