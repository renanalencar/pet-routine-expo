// ============================================================
// Prática 2 — Card do pet em destaque
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Usa o Card reutilizável e os tipos do domínio.
// Mostra: nome, espécie + status do passeio (um em cada ponta), idade.
// Oferece uma ação "Registrar passeio".
//
// Componentes permitidos: View, Text (dos 7 da aula).
//   Ação de toque via onPress do Text, não Touchable*.
// ============================================================
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import type { Pet } from '../types/pet';

type CardPetProps = {
  pet: Pet;
  onRegistrarPasseio: () => void;
};

export function CardPet({ pet, onRegistrarPasseio }: CardPetProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cabecalho}>
        {pet.fotoUri ? (
          <Image
            source={{ uri: pet.fotoUri }}
            style={styles.foto}
            contentFit="cover"
          />
        ) : (
          <View style={styles.fotoPlaceholder}>
            <Text style={styles.fotoPlaceholderTexto}>
              {pet.nome.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}

        <View style={styles.info}>
          <Text style={styles.nome}>{pet.nome}</Text>
          <Text style={styles.detalhes}>
            {pet.especie} • {pet.porte} • {pet.idadeMeses} meses
          </Text>
          <Text style={styles.status}>Status: {pet.statusPasseio}</Text>
        </View>
      </View>

      {pet.local && (
        <Text style={styles.localizacao}>
          📍 Lat: {pet.local.latitude.toFixed(4)}, Lon: {pet.local.longitude.toFixed(4)} (±{pet.local.precisaoMetros}m)
        </Text>
      )}

      <Pressable
        onPress={onRegistrarPasseio}
        style={({ pressed }) => [
          styles.botaoRegistro,
          pressed && styles.botaoPressionado,
        ]}
      >
        <Text style={styles.textoBotao}>Registrar passeio</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    gap: 12,
  },
  cabecalho: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  foto: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  fotoPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fotoPlaceholderTexto: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#555555',
  },
  info: {
    flex: 1,
    gap: 2,
  },
  nome: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
  },
  detalhes: {
    fontSize: 14,
    color: '#666666',
  },
  status: {
    fontSize: 13,
    color: '#888888',
    textTransform: 'capitalize',
  },
  localizacao: {
    fontSize: 12,
    color: '#444444',
    backgroundColor: '#F0F4F8',
    padding: 8,
    borderRadius: 6,
  },
  botaoRegistro: {
    backgroundColor: '#FF6002',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoPressionado: {
    opacity: 0.8,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});