// ============================================================
// Prática 3 — Tela principal: lista de pets + registro de passeio
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Na Prática 2 esta tela mostrava um pet em destaque.
// Agora mostra uma lista de verdade com SectionList, toque
// interativo e registro de passeio com sensores.
//
// Restrições:
//   • Nenhuma ScrollView envolvendo a lista
//   • Nenhuma mutação de estado — toda mudança cria array novo
//   • Agrupamento e filtro moram em src/lib/, não aqui
//   • Sem useEffect para sensores (cleanup é assunto da Aula 6)
// ============================================================
import { useState } from 'react';
import { View, Text, SectionList, TextInput, StyleSheet } from 'react-native';
import { PETS } from './src/data/pets';
import type { Pet } from './src/types/pet';
import { agrupar, filtrarPorNome } from './src/lib/agrupar';
import { ItemPet } from './src/components/item-pet';
import { ListaVazia } from './src/components/lista-vazia';
import { TelaRegistro } from './src/screens/tela-registro';

export default function App() {
  const [pets, setPets] = useState<Pet[]>(PETS);
  const [busca, setBusca] = useState('');
  const [atualizando, setAtualizando] = useState(false);
  const [petRegistrando, setPetRegistrando] = useState<Pet | null>(null);

  // P3.29: Alternar status de passeio imutavelmente
  function alternarStatus(id: string) {
    setPets((anteriores) =>
      anteriores.map((p) => {
        if (p.id !== id) return p;
        const novoStatus = p.statusPasseio === 'pendente' ? 'concluido' : 'pendente';
        return { ...p, statusPasseio: novoStatus };
      })
    );
  }

  // P3.30: Remover pet imutavelmente
  function removerPet(id: string) {
    setPets((anteriores) => anteriores.filter((p) => p.id !== id));
  }

  // P3.31: Pull to refresh (recarregar dados iniciais)
  function recarregar() {
    setAtualizando(true);
    setTimeout(() => {
      setPets(PETS);
      setAtualizando(false);
    }, 800);
  }

  // P3.32: Atualizar pet após captura na TelaRegistro
  function handleSalvarRegistro(
    local?: { latitude: number; longitude: number; precisaoMetros: number },
    fotoUri?: string
  ) {
    if (!petRegistrando) return;

    setPets((anteriores) =>
      anteriores.map((p) => {
        if (p.id !== petRegistrando.id) return p;
        return {
          ...p,
          statusPasseio: 'concluido',
          local: local ?? p.local,
          fotoUri: fotoUri ?? p.fotoUri,
        };
      })
    );
    setPetRegistrando(null);
  }

  // P3.33: Exibição condicional da Tela de Registro
  if (petRegistrando) {
    return (
      <TelaRegistro
        pet={petRegistrando}
        onSalvar={handleSalvarRegistro}
        onCancelar={() => setPetRegistrando(null)}
      />
    );
  }

  // P3.34: Processamento de dados fora do JSX
  const petsFiltrados = filtrarPorNome(pets, busca);
  const secoes = agrupar(petsFiltrados);

  return (
    <View style={styles.container}>
      <SectionList
        sections={secoes}
        keyExtractor={(item) => item.id}
        refreshing={atualizando}
        onRefresh={recarregar}
        ListHeaderComponent={
          <View style={styles.cabecalhoLista}>
            <Text style={styles.tituloApp}>Rotina Pet</Text>
            <TextInput
              style={styles.inputBusca}
              placeholder="Buscar pet por nome..."
              value={busca}
              onChangeText={setBusca}
            />
          </View>
        }
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.tituloSecao}>{title}</Text>
        )}
        renderItem={({ item }) => (
          <ItemPet
            pet={item}
            onAlternar={alternarStatus}
            onRemover={removerPet}
            onRegistrar={(p) => setPetRegistrando(p)}
          />
        )}
        SectionSeparatorComponent={() => <View style={styles.espacoSecao} />}
        ItemSeparatorComponent={() => <View style={styles.espacoItem} />}
        ListEmptyComponent={<ListaVazia busca={busca} />}
        contentContainerStyle={styles.conteudoLista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  conteudoLista: {
    padding: 16,
  },
  cabecalhoLista: {
    gap: 12,
    marginBottom: 16,
  },
  tituloApp: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111111',
  },
  inputBusca: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 16,
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: '700',
    color: '#444444',
    backgroundColor: '#F5F5F5',
    paddingVertical: 8,
  },
  espacoItem: {
    height: 10,
  },
  espacoSecao: {
    height: 16,
  },
});