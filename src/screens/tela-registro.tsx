// ============================================================
// Prática 3 — Tela de registro de passeio (sensores)
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Captura o CONTEXTO do passeio: onde aconteceu (GPS) e como ele
// se parecia (câmera). Navegação por condicional com useState —
// navegação real chega na Aula 7.
//
// CONTRATO DE TRÊS TEMPOS — preencha em cada bloco de sensor:
//   1. PEDIR   → ______________________________
//   2. LER     → ______________________________
//   3. PARAR   → ______________________________  (ou: "não se aplica, porque ___")
//
// Restrições:
//   • Sem useEffect, useRef — apenas useState + hooks das bibliotecas
//   • Sem navegação — a tela aparece por condicional em App.tsx
//   • Sem mapa — coordenada é texto
//   • Sem salvar na galeria e sem escolher do rolo
//   • Sem rede — foto vive no cache
// ============================================================
// Exemplo parcial focado no contrato de localização
import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import { Image } from 'expo-image';
import type { Pet } from '../types/pet';

type TelaRegistroProps = {
  pet: Pet;
  onSalvar: (local?: { latitude: number; longitude: number; precisaoMetros: number }, fotoUri?: string) => void;
  onCancelar: () => void;
};

export function TelaRegistro({ pet, onSalvar, onCancelar }: TelaRegistroProps) {
  const [permissaoCamera, pedirPermissaoCamera] = useCameraPermissions();
  const [cameraRef, setCameraRef] = useState<CameraView | null>(null);
  
  const [fotoUri, setFotoUri] = useState<string | undefined>(undefined);
  const [local, setLocal] = useState<{ latitude: number; longitude: number; precisaoMetros: number } | undefined>(undefined);
  
  const [mensagemErro, setMensagemErro] = useState<string>('');
  const [carregandoLocal, setCarregandoLocal] = useState(false);

  // P3.18 / P3.22: Capturar Localização (Contrato de 3 tempos)
  async function capturarLocalizacao() {
    try {
      setMensagemErro('');
      setCarregandoLocal(true);

      // CONTRATO DE TRÊS TEMPOS:
      // 1. PEDIR permissão
      const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        if (!canAskAgain) {
          setMensagemErro('Permissão de localização bloqueada nas configurações do dispositivo.');
        } else {
          setMensagemErro('Permissão de localização negada pelo usuário.');
        }
        setCarregandoLocal(false);
        return;
      }

      const servicoAtivo = await Location.hasServicesEnabledAsync();
      if (!servicoAtivo) {
        setMensagemErro('O serviço de localização (GPS) está desligado no aparelho.');
        setCarregandoLocal(false);
        return;
      }

      // 2. LER posição
      // Accuracy.Balanced: Escolhido para otimizar o uso da bateria mantendo precisão adequada para passeios pet.
      const posicao = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLocal({
        latitude: posicao.coords.latitude,
        longitude: posicao.coords.longitude,
        precisaoMetros: Math.round(posicao.coords.accuracy ?? 0),
      });

      // 3. PARAR (getCurrentPositionAsync encerra a leitura automaticamente)
    } catch {
      setMensagemErro('Sensor/hardware de localização indisponível no dispositivo.');
    } finally {
      setCarregandoLocal(false);
    }
  }

  // P3.19-P3.20: Capturar Foto com Câmera
  async function tirarFoto() {
    try {
      setMensagemErro('');

      // 1. PEDIR
      if (!permissaoCamera?.granted) {
        const res = await pedirPermissaoCamera();
        if (!res.granted) {
          setMensagemErro('Permissão de câmera negada.');
          return;
        }
      }

      // 2. LER / CAPTURAR
      if (cameraRef) {
        const foto = await cameraRef.takePictureAsync({
          quality: 0.7,
          skipProcessing: true,
        });

        if (foto?.uri) {
          setFotoUri(foto.uri);
        }
      }
      // 3. PARAR (fechamento após captura)
    } catch {
      setMensagemErro('Erro ao acessar hardware da câmera.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registrar Passeio: {pet.nome}</Text>

      {mensagemErro !== '' && (
        <View style={styles.boxErro}>
          <Text style={styles.textoErro}>{mensagemErro}</Text>
        </View>
      )}

      {/* Seção Câmera */}
      <View style={styles.secaoCamera}>
        {fotoUri ? (
          <View style={styles.previewContainer}>
            <Image source={{ uri: fotoUri }} style={styles.preview} contentFit="cover" />
            <Pressable onPress={() => setFotoUri(undefined)} style={styles.botaoRefazer}>
              <Text style={styles.textoBotaoRefazer}>Tirar outra foto</Text>
            </Pressable>
          </View>
        ) : permissaoCamera?.granted ? (
          <CameraView style={styles.camera} ref={(ref) => setCameraRef(ref)}>
            <Pressable onPress={tirarFoto} style={styles.botaoCaptura}>
              <Text style={styles.textoBotaoCaptura}>Capturar Foto</Text>
            </Pressable>
          </CameraView>
        ) : (
          <Pressable onPress={tirarFoto} style={styles.botaoPermissao}>
            <Text style={styles.textoBotao}>Ativar Câmera</Text>
          </Pressable>
        )}
      </View>

      {/* Seção Localização */}
      <View style={styles.secaoLocal}>
        <Pressable onPress={capturarLocalizacao} style={styles.botaoLocal}>
          <Text style={styles.textoBotao}>
            {carregandoLocal ? 'Obtendo Localização...' : 'Obter Localização Atual'}
          </Text>
        </Pressable>

        {local && (
          <Text style={styles.textoLocal}>
            📍 Lat: {local.latitude.toFixed(4)}, Lon: {local.longitude.toFixed(4)} (Precisão: {local.precisaoMetros}m)
          </Text>
        )}
      </View>

      {/* Ações */}
      <View style={styles.secaoAcoes}>
        <Pressable onPress={() => onSalvar(local, fotoUri)} style={styles.botaoSalvar}>
          <Text style={styles.textoBotaoSalvar}>Salvar Passeio</Text>
        </Pressable>
        <Pressable onPress={onCancelar} style={styles.botaoCancelar}>
          <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
    backgroundColor: '#F8F9FA',
  },
  titulo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111111',
  },
  boxErro: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  textoErro: {
    color: '#D32F2F',
    fontSize: 14,
  },
  secaoCamera: {
    height: 240,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 12,
  },
  previewContainer: {
    flex: 1,
    position: 'relative',
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  botaoCaptura: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoRefazer: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 8,
  },
  textoBotaoRefazer: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  botaoPermissao: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CCCCCC',
  },
  secaoLocal: {
    gap: 8,
  },
  botaoLocal: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoLocal: {
    fontSize: 14,
    color: '#333333',
    backgroundColor: '#E9ECEF',
    padding: 10,
    borderRadius: 6,
  },
  secaoAcoes: {
    gap: 8,
    marginTop: 'auto',
  },
  botaoSalvar: {
    backgroundColor: '#28A745',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotaoSalvar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botaoCancelar: {
    backgroundColor: '#6C757D',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotaoCancelar: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  textoBotaoCaptura: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});