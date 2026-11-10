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
  onRegistrar: (id: string) => void;
};

export function ItemPet({ pet, onAlternar, onRemover, onRegistrar }: ItemPetProps) {
  return (
    <Pressable
      // TODO P3.6: toque curto alterna o status do passeio; toque longo remove.
      onPress={() => onAlternar(pet.id)}
      onLongPress={() => onRemover(pet.id)}
      // TODO P3.7: acessibilidade — papel e rótulo.
      accessibilityRole="button"
      accessibilityLabel={`${pet.nome}, toque para alternar passeio`}
      // TODO P3.8: hitSlop e unstable_pressDelay.
      // hitSlop={10} amplia um pouco a área tocável para melhorar usabilidade em telas menores.
      // unstable_pressDelay={150} atrasa o feedback para evitar flashes durante o scroll.
      hitSlop={10}
      unstable_pressDelay={150}
      style={({ pressed }) => [
        styles.item,
        // TODO P3.9: feedback visual quando pressed.
        pressed && { opacity: 0.7 }
      ]}
    >
      {/* TODO P3.10: reaproveite o CardPet aqui dentro. */}
      <CardPet pet={pet} aoRegistrarPasseio={() => onRegistrar(pet.id)} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    // TODO P3.11: SEM margin aqui.
  },
});
