import { StyleSheet, Text, View } from 'react-native';
import { type Pet, rotuloEspecie, rotuloStatusPasseio } from '../types/pet';
import { cores, espaco, tipografia } from '../theme';
import { Card } from './card';

type CardPetProps = {
  pet: Pet;
  aoRegistrarPasseio: () => void;
};

export function CardPet({ pet, aoRegistrarPasseio }: CardPetProps) {
  return (
    <Card destacado>
      <Text style={tipografia.titulo}>{pet.nome}</Text>
      <View style={styles.linha}>
        <Text style={tipografia.corpo}>{rotuloEspecie[pet.especie]}</Text>
        <Text style={tipografia.legenda}>{rotuloStatusPasseio[pet.statusPasseio]}</Text>
      </View>
      <Text style={tipografia.legenda}>{pet.idadeMeses} meses</Text>
      <Text style={styles.botao} onPress={aoRegistrarPasseio}>
        Registrar passeio
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: espaco.sm,
  },
  botao: {
    paddingTop: espaco.sm,
    fontWeight: 'bold',
    color: cores.primaria,
  },
});