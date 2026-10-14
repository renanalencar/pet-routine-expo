// ============================================================
// Prática 3 — Item tocável da lista de pets
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Envolve o CardPet num Pressable para toque curto e longo.
// A ação vai em onPress, feedback visual vai no `pressed`.
// Nunca onPressIn.
// ============================================================
import { Pressable, StyleSheet } from 'react-native';
import type { Pet } from '../types/pet';
import { CardPet } from './card-pet';

type ItemPetProps = {
  pet: Pet;
  onAlternar: (id: string) => void;
  onRemover: (id: string) => void;
  onRegistrar: (pet: Pet) => void;
};

export function ItemPet({ pet, onAlternar, onRemover, onRegistrar }: ItemPetProps) {
  return (
    <Pressable
      onPress={() => onAlternar(pet.id)}
      onLongPress={() => onRemover(pet.id)}
      accessibilityRole="button"
      accessibilityLabel={`Pet ${pet.nome}, status ${pet.statusPasseio}`}
      hitSlop={8}
      unstable_pressDelay={100}
      style={({ pressed }) => [
        styles.itemContainer,
        pressed && styles.itemPressionado,
      ]}
    >
      <CardPet pet={pet} onRegistrarPasseio={() => onRegistrar(pet)} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    boxShadow: '0px 2px 4px rgba(0,0,0,0.08)',
  },
  itemPressionado: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
});