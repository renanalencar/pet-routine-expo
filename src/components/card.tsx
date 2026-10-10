import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { cores, espaco } from '../theme';

type CardProps = {
  children: ReactNode;
  destacado?: boolean;
};

export function Card({ children, destacado }: CardProps) {
  return (
    <View style={[styles.card, destacado && styles.cardDestacado]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: espaco.md,
    borderRadius: espaco.sm,
    backgroundColor: cores.cartao,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    gap: espaco.sm,
  },
  cardDestacado: {
    borderWidth: 2,
    borderColor: cores.primaria,
  },
});