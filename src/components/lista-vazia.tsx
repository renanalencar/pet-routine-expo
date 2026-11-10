// ============================================================
// Prática 3 — Estado vazio da lista
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Toda lista tem ListEmptyComponent. Sem exceção.
// E o texto do estado vazio precisa AJUDAR o usuário:
//   - primeiro acesso → o que ele pode fazer
//   - busca sem resultado → o que ele pode tentar
// ============================================================
import { StyleSheet, Text, View } from 'react-native';

import { cores, espaco, tipografia } from '../theme';

type ListaVaziaProps = {
  // TODO P3.12: uma prop que permita distinguir "primeiro acesso" de "busca sem resultado".
  termoBusca?: string;
};

export function ListaVazia({ termoBusca }: ListaVaziaProps) {
  // TODO P3.13: dois textos diferentes, conforme o cenário.
  const texto = termoBusca && termoBusca.trim() !== ''
    ? `Nenhum pet encontrado para '${termoBusca}'.`
    : 'Nenhum pet cadastrado. Que tal adicionar um?';

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        {texto}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // TODO P3.14: centralize e use padding generoso
    alignItems: 'center',
    padding: espaco.xl,
  },
  texto: {
    ...tipografia.corpo,
    color: cores.textoFraco,
    textAlign: 'center',
  },
});
