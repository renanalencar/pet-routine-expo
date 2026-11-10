// ============================================================
// Prática 3 — Tela de registro de passeio
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// CONTRATO DE TRÊS TEMPOS:
//   1. PEDIR   → pedirPermissaoCamera() / Location.requestForegroundPermissionsAsync()
//   2. LER     → cameraRef.takePictureAsync() / Location.getCurrentPositionAsync()
//   3. PARAR   → fechar câmera / (não se aplica para getCurrentPositionAsync)
//
// Restrições:
//   • Sem useEffect, useRef — apenas useState + hooks das bibliotecas
//   • Sem navegação — a tela aparece por condicional em App.tsx
//   • Sem mapa — coordenada é texto
//   • Sem salvar na galeria e sem escolher do rolo
//   • Sem rede — foto vive no cache
// ============================================================
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import * as Location from 'expo-location';
import { CameraView, useCameraPermissions } from 'expo-camera';

import type { Pet } from '../types/pet';
import { cores, espaco, tipografia } from '../theme';

type TelaRegistroProps = {
  pet: Pet;
  onSalvar: (local?: Pet['local'], fotoUri?: string) => void;
  onCancelar: () => void;
};

export function TelaRegistro({ pet, onSalvar, onCancelar }: TelaRegistroProps) {
  const [local, setLocal] = useState<Pet['local'] | null>(null);
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [erro, setErro] = useState('');
  const [mostrarCamera, setMostrarCamera] = useState(false);

  // TODO P3.16: hook de permissão de câmera (das libs, não do React):
  const [permissaoCamera, pedirPermissaoCamera] = useCameraPermissions();

  // TODO P3.17: ref da câmera via useState (useRef não está disponível nesta prática).
  const [cameraRef, setCameraRef] = useState<CameraView | null>(null);

  // ----- Localização -----
  // CONTRATO: 1. PEDIR → Location.requestForegroundPermissionsAsync()
  //           2. LER   → Location.getCurrentPositionAsync()
  //           3. PARAR → não se aplica (leitura única, sem subscription)
  async function obterLocalizacao() {
    try {
      const servico = await Location.hasServicesEnabledAsync();
      if (!servico) {
        setErro('GPS desligado. Ative a localização nas configurações do aparelho.');
        return;
      }

      const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        if (canAskAgain) {
          setErro('Permissão de localização negada. Toque em "Obter localização" para tentar de novo.');
        } else {
          setErro('Permissão bloqueada. Vá em Configurações > Permissões para habilitar o GPS.');
        }
        return;
      }

      const posicao = await Location.getCurrentPositionAsync({
        // Utiliza High para balancear bateria e precisão. Highest / BestForNavigation gasta muita bateria.
        accuracy: Location.Accuracy.High,
      });

      setLocal({
        latitude: posicao.coords.latitude,
        longitude: posicao.coords.longitude,
        precisaoMetros: posicao.coords.accuracy ?? 0,
      });
      setErro('');
    } catch (e) {
      setErro('Sensor/hardware de localização indisponível.');
    }
  }

  // ----- Câmera -----
  // CONTRATO: 1. PEDIR → pedirPermissaoCamera()
  //           2. LER   → cameraRef.takePictureAsync()
  //           3. PARAR → setMostrarCamera(false) (fecha a view)
  async function abrirCamera() {
    try {
      const { status } = await pedirPermissaoCamera();
      if (status !== 'granted') {
        setErro('Permissão de câmera negada. Vá em Configurações para habilitar.');
        return;
      }
      setMostrarCamera(true);
      setErro('');
    } catch (e) {
      setErro('Hardware de câmera indisponível.');
    }
  }

  async function tirarFoto() {
    if (!cameraRef) return;
    try {
      const foto = await cameraRef.takePictureAsync({ base64: false });
      if (foto) {
        setFotoUri(foto.uri);
        setMostrarCamera(false);
      }
    } catch (e) {
      setErro('Erro ao capturar a foto.');
    }
  }

  function salvar() {
    // TODO P3.23: chame onSalvar com os dados capturados.
    // TODO P3.24: o app funciona MESMO quando o usuário nega tudo.
    onSalvar(local ?? undefined, fotoUri ?? undefined);
  }

  // ----- Renderização: câmera ativa -----
  if (mostrarCamera) {
    return (
      <View style={styles.tela}>
        <CameraView
          ref={setCameraRef}
          style={styles.camera}
          facing="back"
        />
        <View style={styles.acoesCamera}>
            <Pressable onPress={tirarFoto} style={[styles.botaoAcao, { flex: 1 }]}>
                <Text style={styles.textoBotao}>Tirar foto</Text>
            </Pressable>
            <Pressable onPress={() => setMostrarCamera(false)} style={styles.botaoCancelar}>
                <Text style={styles.textoBotao}>Cancelar</Text>
            </Pressable>
        </View>
      </View>
    );
  }

  // ----- Renderização: tela principal de registro -----
  return (
    <View style={styles.tela}>
      <Text style={tipografia.titulo}>Registrar passeio de {pet.nome}</Text>

      {/* TODO P3.21: mostre o erro com mensagem DISTINTA por cenário. */}
      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      {/* Localização */}
      {local ? (
        <View style={styles.secao}>
          <Text style={tipografia.corpo}>
            Local: {local.latitude.toFixed(3)}, {local.longitude.toFixed(3)} (±{Math.round(local.precisaoMetros)}m)
          </Text>
        </View>
      ) : (
        <Pressable onPress={obterLocalizacao} style={styles.botaoAcao}>
          <Text style={styles.textoBotao}>Obter localização</Text>
        </Pressable>
      )}

      {/* Foto */}
      {fotoUri ? (
        <Image
          source={{ uri: fotoUri }}
          style={styles.previa}
          // contentFit="cover" preenche a área mantendo a proporção, enquanto "contain" deixaria espaço vazio
          contentFit="cover"
        />
      ) : (
        <Pressable onPress={abrirCamera} style={styles.botaoAcao}>
          <Text style={styles.textoBotao}>Tirar foto</Text>
        </Pressable>
      )}

      {/* Ações */}
      <View style={styles.acoes}>
        <Pressable onPress={salvar} style={[styles.botaoAcao, { flex: 1 }]}>
          <Text style={styles.textoBotao}>Salvar</Text>
        </Pressable>
        <Pressable onPress={onCancelar} style={styles.botaoCancelar}>
          <Text style={styles.textoBotao}>Cancelar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    padding: espaco.md,
    paddingTop: 48,
    backgroundColor: cores.fundo,
    gap: espaco.md,
  },
  erro: { ...tipografia.corpo, color: cores.erro },
  secao: { gap: espaco.sm },
  camera: { flex: 1, borderRadius: espaco.sm },
  acoesCamera: { flexDirection: 'row', gap: espaco.md, paddingBottom: espaco.md },
  previa: { width: '100%', height: 200, borderRadius: espaco.sm },
  botaoAcao: {
    backgroundColor: cores.primaria,
    padding: espaco.md,
    borderRadius: espaco.sm,
    alignItems: 'center',
  },
  botaoCancelar: {
    backgroundColor: cores.textoFraco,
    padding: espaco.md,
    borderRadius: espaco.sm,
    alignItems: 'center',
    flex: 1,
  },
  textoBotao: { color: '#FFFFFF', fontWeight: 'bold' },
  acoes: { flexDirection: 'row', gap: espaco.md },
});
