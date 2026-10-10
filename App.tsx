import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { CardPet } from './src/components/card-pet';
import { buscarPetEmDestaque } from './src/services/pet-service';
import { type EstadoTela, type Pet } from './src/types/pet';
import { cores, espaco } from './src/theme';

export default function App() {
  const [estado, setEstado] = useState<EstadoTela<Pet>>({ tipo: 'carregando' });

  const carregar = useCallback(async () => {
    setEstado({ tipo: 'carregando' });
    try {
      const pet = await buscarPetEmDestaque();
      setEstado({ tipo: 'sucesso', dados: pet });
    } catch {
      setEstado({ tipo: 'erro', mensagem: 'Erro ao carregar o pet em destaque.' });
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  function registrarPasseio() {
    if (estado.tipo === 'sucesso') {
      setEstado({
        tipo: 'sucesso',
        dados: { ...estado.dados, statusPasseio: 'concluido' },
      });
    }
  }

  switch (estado.tipo) {
    case 'carregando':
      return (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color={cores.primaria} />
        </View>
      );
    case 'sucesso':
      return (
        <View style={styles.container}>
          <CardPet pet={estado.dados} aoRegistrarPasseio={registrarPasseio} />
        </View>
      );
    case 'erro':
      return (
        <View style={styles.centro}>
          <Text style={{ color: cores.erro }}>{estado.mensagem}</Text>
          <Text style={styles.textoBotao} onPress={carregar}>
            Tentar novamente
          </Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: espaco.xl,
    paddingHorizontal: espaco.md,
    backgroundColor: cores.fundo,
  },
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.fundo,
    gap: espaco.md,
  },
  textoBotao: {
    color: cores.primaria,
    fontWeight: 'bold',
  },
});