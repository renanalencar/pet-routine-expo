# Mini-Projeto — Segunda Unidade (AV2)

> **Disciplina:** Desenvolvimento Mobile (2026.2.DM) — CESAR School  
> **Domínio do Projeto:** **App de Gestão e Rotina Pet** (`Pet`)  
> **Pontuação:** **0,0 a 3,0 pontos** na nota da Avaliação 2 (AV2)

| Projeto | Repositório | Branch de partida / entrega | Pontuação |
|---|---|---|---|
| App de Gestão e Rotina Pet | `pet-routine-expo` | `feature/mini-projeto` | **0,0 a 3,0 pts** |

---

## Como funciona este Mini-Projeto

Na Unidade 1 (Aulas 1 a 5 — Práticas 1 a 3), vocês modelaram o domínio `Pet` em TypeScript estrito, criaram o sistema de tokens (`theme.ts`), construíram os componentes base (`Card`, `CardPet`, `ItemPet`, `ListaVazia`, `PetForm`) e implementaram a tela principal com `SectionList` e o registro de passeio com sensores (`expo-location` e `expo-camera`).

Neste **Mini-Projeto da Segunda Unidade**, a sua missão é **finalizar o desenvolvimento do aplicativo de ponta a ponta**, aplicando na prática o conteúdo das **Aulas 6 a 10**, integrando o app ao **backend oficial fornecido pelo professor** na pasta `./backend`, **reformulando a UI/UX** da aplicação e entregando o **Relatório de Uso de Inteligência Artificial**.

### O que já vem pronto nesta branch (`feature/mini-projeto`)

1. **Práticas 1 a 3 concluídas** em `src/` e `App.tsx` (ponto de partida funcional).
2. **Backend REST completo (`./backend`)** fornecido pelo professor em **Node.js + Express + SQLite + JWT**, já configurado com rotas de autenticação (`/api/auth/*`), CRUD completo de pets (`/pets` e `/api/pets`) e uma conta de demonstração pré-populada com 20 pets (`tutor@cesar.school` / senha `123456`).
3. **Template do Relatório de Uso de IA** em `docs/relatorio-uso-ia.md`.

> 🧩 **Sobre os esqueletos (scaffolds) deste documento:** diferentemente das práticas da Unidade 1, na transição para o **Expo Router** a árvore de arquivos muda (`App.tsx` deixa de existir e dá lugar a `src/app/`). Por isso, os esqueletos com marcações `// TODO` estão descritos **neste documento** para guiar a criação de cada arquivo. **Apague cada comentário `// TODO` quando resolver aquele ponto.**

> 🔴 **Teste em emulador e/ou aparelho físico:**
> - **Navegação, Zustand, SQLite, Auth, Backend e Notificações Locais** funcionam tanto no **Android Emulator / iOS Simulator** quanto no aparelho físico.
> - **Câmera e GPS** continuam exigindo aparelho físico (ou a câmera/GPS virtual do Android Emulator). No simulador iOS, a galeria do `expo-image-picker` funciona normalmente.

---

## ⚠️ As 20 Regras de Escrita da Disciplina (continuam valendo!)

Todas as regras acumuladas ao longo do semestre permanecem ativas na avaliação do código entregue:

1. **Sem `JSX.Element`** como tipo de retorno. Não anote o retorno; o TypeScript infere.
2. **Sem `as const`** dentro de `StyleSheet.create`. Em `theme.ts`, sim.
3. **`gap`** (ou `ItemSeparatorComponent` / `space` do GlueStack) para espaçar irmãos, nunca `margin` em cada filho.
4. **`boxShadow`** (ou classes de sombra do NativeWind/GlueStack) no lugar do quarteto legado `shadowColor`/`shadowOffset`/`shadowOpacity`/`shadowRadius`.
5. **Zero `any`.** `as` apenas quando estritamente necessário e com comentário justificando.
6. **A ação vai em `onPress`**, nunca em `onPressIn`. Feedback visual vai no estado `pressed`.
7. **`renderItem` declarado fora do componente** sempre que não depender de estado local, ou componentizado de forma limpa.
8. **Toda lista tem `ListEmptyComponent`** distinguindo "conta ainda sem pets" de "busca sem resultado".
9. **Todo `addListener`, `watchPositionAsync` ou `setInterval` tem limpeza (`remove()` / `clearInterval()`) no retorno do `useEffect`.** Sem exceção.
10. **Estados de falha de permissão são distintos na tela.** "Permissão negada", "permissão bloqueada" e "serviço desligado" exibem orientações diferentes ao tutor.
11. **Nenhuma `Accuracy` sem justificativa.**
12. **`contentFit` explícito** em toda `Image` do `expo-image`.
13. **Confira o import do `Image`.** Use `expo-image`, não o `Image` legado do `react-native`.
14. **`base64` só quando for realmente usado.** Para exibir fotos e persistir a URI da imagem, `uri` basta.
15. **Em `src/app/`, apenas arquivos de rota e `_layout.tsx`.** Componentes reutilizáveis, stores, contextos, tipos e serviços moram em `src/components/`, `src/store/`, `src/context/`, `src/types/` e `src/services/`.
16. **Nomes de arquivos de rota em minúsculas com hífen** (`foto-do-pet.tsx`) e **`href` sempre começando com `/`**.
17. **`Link` no JSX para navegação declarativa; `router.push` / `router.replace` / `router.back` dentro de funções.** Nada de importar `@react-navigation/*` diretamente para criar navegadores manuais.
18. **Todo resultado do `expo-image-picker` passa por `if (resultado.canceled) return;`** antes de acessar `resultado.assets[0].uri`.
19. **`mediaTypes` é um array** (`['images']`), nunca o enum depreciado `MediaTypeOptions`.
20. **`microphonePermission: false`** no config plugin do `expo-image-picker` no `app.json` (o app não grava vídeo).

---

## Setup Inicial do Mini-Projeto

### 1. Subir o Backend (fornecido pelo professor)

Abra um terminal exclusivo para o servidor da API:

```bash
cd backend
npm install
npm run dev
```

O servidor iniciará em `http://localhost:3000` (e em `0.0.0.0:3000` para acesso na rede local), criando automaticamente o banco SQLite `pet-routine.db` e a conta de demonstração:
- **E-mail:** `tutor@cesar.school`
- **Senha:** `123456`

Consulte o arquivo [`backend/README.md`](./backend/README.md) e [`backend/test.http`](./backend/test.http) para ver todos os endpoints e exemplos de requisição.

### 2. Instalar as Dependências das Aulas 6 a 10 no App Expo

Em outro terminal, na raiz do repositório `pet-routine-expo`:

```bash
npm install

# Aula 6 e 7: Expo Router, Image Picker, Drawer, Ícones e Notificações
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants
npx expo install expo-image-picker @expo/vector-icons expo-notifications
npx expo install react-native-gesture-handler react-native-reanimated react-native-worklets

# Aula 8 e 9: Zustand, Persistência em Disco, SQLite e SecureStore
npm install zustand
npx expo install @react-native-async-storage/async-storage expo-sqlite expo-secure-store

# Aula 10: Expo UI nativo e Atualizações OTA (expo-updates)
npx expo install @expo/ui expo-updates
```

> 💡 **Para NativeWind v4 / GlueStack UI v2 (Aula 10):** siga o setup visto na Aula 10 (`npx gluestack-ui init` ou configuração do `nativewind` + `tailwindcss`).

---

# Roteiro de Desenvolvimento (Etapas 1 a 5)

O desenvolvimento está organizado em **5 etapas incrementais**, correspondendo exatamente às práticas das **Aulas 6, 7, 8, 9 e 10**. Faça commits pequenos a cada etapa concluída — **o histórico da branch faz parte da evidência de sua autoria do projeto**.

---

## Etapa 1 (Aula 6) — Migração para Expo Router e Foto do Pet (`expo-image-picker`)

### Contexto
Até a Aula 5, o aplicativo inteiro vivia dentro de `App.tsx` e trocava de tela usando um `useState` condicional (`petRegistrando`). Agora ele ganha **roteamento baseado em arquivos com Expo Router** e permite que o tutor escolha a foto do pet tanto da **câmera do sistema** quanto da **galeria de fotos** com recorte quadrado (`1:1`).

### O que implementar nesta etapa

1. **Migração do ponto de entrada para o Expo Router:**
   - No `package.json`, altere `"main": "index.ts"` para `"main": "expo-router/entry"`.
   - No `app.json`, adicione `"scheme": "petroutine"` e configure o plugin do `expo-image-picker` com mensagens claras para o tutor e `"microphonePermission": false`.
   - Mova a lógica atual da tela de lista de `App.tsx` para `src/screens/tela-pets.tsx` (ajustando os imports relativos) e remova os arquivos `App.tsx` e `index.ts` da raiz.
2. **Rota de captura/escolha de foto (`src/app/foto-do-pet.tsx`):**
   - Permite escolher foto da **galeria** (`launchImageLibraryAsync`) ou tirar com a **câmera** (`launchCameraAsync`) usando `mediaTypes: ['images']`, `allowsEditing: true`, `aspect: [1, 1]` e `quality: 0.8`.
   - Trata cancelamento (`if (resultado.canceled) return;`) sem mostrar erro.
   - Exibe mensagens **distintas** para câmera negada (`canAskAgain: true`) e câmera bloqueada (`canAskAgain: false`), mantendo a galeria sempre disponível.
   - Preenche o comentário do **Contrato de Três Tempos** (`PEDIR / LER / PARAR`) para galeria e câmera.
3. **Rota estática institucional (`src/app/sobre.tsx`):**
   - Exibe o nome do app, integrantes do grupo, versão e resumo da arquitetura.

### Esqueleto — `src/app/foto-do-pet.tsx`

```tsx
// src/app/foto-do-pet.tsx
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';

type FalhaCamera = 'camera-negada' | 'camera-bloqueada';

const MENSAGENS_FALHA: Record<FalhaCamera, string> = {
  // TODO MP1.1: duas mensagens diferentes dizendo ao tutor o que ELE pode fazer
  'camera-negada': '',
  'camera-bloqueada': '',
};

export default function TelaFotoDoPet() {
  const router = useRouter();
  const { petId } = useLocalSearchParams<{ petId?: string }>();
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [falha, setFalha] = useState<FalhaCamera | null>(null);

  async function escolherDaGaleria() {
    // TODO MP1.2: pedir permissão da galeria, abrir launchImageLibraryAsync com
    // mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.8.
    // Checar if (resultado.canceled) return; antes de ler resultado.assets[0].uri.
  }

  async function tirarFoto() {
    // TODO MP1.3: pedir permissão da câmera (requestCameraPermissionsAsync),
    // diferenciar negada (canAskAgain) de bloqueada (!canAskAgain),
    // e abrir launchCameraAsync com recorte 1:1.
  }

  async function concluir() {
    // TODO MP1.4: se houver petId e fotoUri, atualizar a foto do pet na store/API
    // e voltar com router.back().
  }

  return (
    <View style={estilos.tela}>
      {/* TODO MP1.5: prévia quadrada com Image do expo-image (contentFit="cover")
          ou placeholder quando fotoUri for null */}
      {/* TODO MP1.6: botões Tirar foto, Escolher da galeria, mensagem de falha e Concluir */}
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: 24, gap: 16 },
  previa: { width: '100%', aspectRatio: 1, borderRadius: 12 },
});
```

---

## Etapa 2 (Aula 7) — Abas (`Tabs`), Menu Lateral (`Drawer`), Rota Dinâmica (`pet/[id].tsx`) e Notificações Locais

### Contexto
Um aplicativo real de rotina pet precisa de navegação estruturada: abas para alternar rapidamente entre a **Lista de Pets** e o **Painel de Estatísticas/Configurações**, uma **rota dinâmica** (`/pet/[id]`) para abrir o prontuário/detalhe de qualquer pet clicado na lista, e **notificações locais** (`expo-notifications`) para lembrar o tutor do horário do passeio — abrindo diretamente o detalhe daquele pet quando a notificação é tocada!

### O que implementar nesta etapa

1. **Navegação em Abas (`src/app/(tabs)/_layout.tsx`)** integrada ao layout raiz (com suporte a Drawer ou cabeçalho de acesso às telas `sobre` e `settings`):
   - **Aba 1 (`src/app/(tabs)/index.tsx`) — Meus Pets:** listagem agrupada em `SectionList`, busca por nome, formulário/modal de criação de pet e navegação para `/pet/[id]` ao tocar no card.
   - **Aba 2 (`src/app/(tabs)/stats.tsx`) — Estatísticas e Perfil:** contadores em tempo real (total de pets, passeios concluídos, pendentes e cancelados, porcentagem concluída hoje), preferências e controles de conta.
   - Ícones configurados com `@expo/vector-icons` (`Feather` ou `MaterialIcons`).
2. **Rota Dinâmica de Detalhe do Pet (`src/app/pet/[id].tsx`):**
   - Lê o parâmetro `id` via `useLocalSearchParams<{ id: string }>()`.
   - Exibe todos os dados do pet (foto com `expo-image`, nome, espécie, porte, idade em meses, status do passeio e coordenadas do último passeio formatadas de forma legível).
   - Permite:
     - Alternar o status do passeio ou abrir a captura de passeio com sensores (GPS + câmera/galeria);
     - Agendar um **lembrete de passeio** via notificação local para 5 segundos;
     - Excluir o pet e retornar à lista com `router.back()`.
3. **Notificações Locais (`expo-notifications`):**
   - Configura `Notifications.setNotificationHandler` para exibir banner e tocar som mesmo com o app em primeiro plano (*foreground*).
   - Pede permissão com `Notifications.requestPermissionsAsync()`.
   - Agenda notificação para 5 segundos com `Notifications.scheduleNotificationAsync`, enviando `{ petId: pet.id }` dentro de `content.data`.
   - Registra listeners (`addNotificationReceivedListener` e `addNotificationResponseReceivedListener`) com **cleanup no `useEffect`**: ao tocar na notificação recebida, o app navega automaticamente para `/pet/[id]`!

### Esqueleto — Agendamento e Listener de Notificação

```tsx
// Exemplo de configuração em src/services/notifications.ts ou no layout/tela
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function agendarLembretePasseio(petId: string, nomePet: string) {
  // TODO MP2.1: verificar/pedir permissão com requestPermissionsAsync()
  // TODO MP2.2: chamar scheduleNotificationAsync com:
  //   content: {
  //     title: `Hora do passeio de ${nomePet}! 🐾`,
  //     body: 'Toque para abrir os detalhes e registrar o passeio.',
  //     data: { petId },
  //   },
  //   trigger: {
  //     type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
  //     seconds: 5,
  //   }
}
```

---

## Etapa 3 (Aula 8) — Hooks (`useEffect`, `useContext`), `zustand` e Persistência Local (`AsyncStorage` + `expo-sqlite`)

### Contexto
Nesta etapa eliminamos estados isolados e vazamentos de memória: criamos o contexto global de **Tema Claro/Escuro** persistido em disco, o **Cronômetro de Passeio** com `useEffect` e cleanup na tela de detalhe do pet, e o banco relacional local com **`expo-sqlite`** para salvar o histórico de duração dos passeios no aparelho.

### O que implementar nesta etapa

1. **Contexto de Tema Claro/Escuro (`src/context/theme-context.tsx`):**
   - Criado com `createContext`, exportando `<ThemeProvider>` e o hook customizado `useTheme()` (que valida se está dentro do Provider).
   - Carrega a preferência salva no `AsyncStorage` (`'@petroutine:theme'`) dentro de um `useEffect(..., [])` ao iniciar e persiste sempre que `toggleTheme()` é acionado.
   - Envolve a árvore de rotas em `src/app/_layout.tsx` e aplica o tema claro/escuro nas telas do app.
2. **Cronômetro de Passeio com Cleanup (`src/components/walk-timer.tsx` ou dentro de `src/app/pet/[id].tsx`):**
   - Controla `seconds` e `isRunning` com `useState`.
   - No `useEffect`, quando `isRunning` for `true`, cria um `setInterval` de `1000` ms usando atualização funcional (`setSeconds((prev) => prev + 1)`).
   - Retorna obrigatoriamente `() => clearInterval(intervalId)` no cleanup do `useEffect` para não vazar memória ao pausar ou sair da tela.
3. **Histórico de Sessões de Passeio em SQLite (`src/services/passeio-db.ts`):**
   - Usa `expo-sqlite` (`SQLite.openDatabaseAsync('petroutine.db')`) para criar a tabela `passeio_logs`:
     - `id INTEGER PRIMARY KEY AUTOINCREMENT`
     - `petId TEXT NOT NULL`
     - `seconds INTEGER NOT NULL`
     - `createdAt TEXT NOT NULL`
   - Ao finalizar/salvar um tempo no cronômetro de passeio, grava o registro no SQLite (`db.runAsync` com placeholders `?`) e lista na tela de detalhe do pet (`db.getAllAsync<PasseioLog>`) o histórico de passeios realizados com aquele pet.

### Esqueleto — `src/services/passeio-db.ts`

```tsx
// src/services/passeio-db.ts
import * as SQLite from 'expo-sqlite';

export type PasseioLog = {
  id: number;
  petId: string;
  seconds: number;
  createdAt: string;
};

export async function openPasseioDb() {
  const db = await SQLite.openDatabaseAsync('petroutine.db');
  // TODO MP3.1: criar tabela passeio_logs (id, petId, seconds, createdAt) com db.execAsync
  return db;
}

export async function salvarSessaoPasseio(petId: string, seconds: number) {
  const db = await openPasseioDb();
  // TODO MP3.2: inserir registro com db.runAsync e placeholders (?, ?, ?)
}

export async function listarSessoesPasseio(petId: string): Promise<PasseioLog[]> {
  const db = await openPasseioDb();
  // TODO MP3.3: buscar sessões do petId ordenadas por id DESC com db.getAllAsync<PasseioLog>
  return [];
}
```

---

## Etapa 4 (Aula 9) — Autenticação com `sessionToken` (JWT) e Integração Full Stack com o Backend

### Contexto
Agora o aplicativo deixa de depender de mocks estáticos: cada tutor tem sua própria conta autenticada via **JWT (`sessionToken`)**, as rotas privadas são protegidas por um **Auth Guard** no `_layout.tsx` e todas as operações da `usePetStore` conversam com o backend real em `./backend`.

### O que implementar nesta etapa

1. **Store de Sessão Persistida (`src/store/use-auth-store.ts`):**
   - Armazena `sessionToken: string | null`, `user: AuthUser | null` e `isHydrated: boolean`.
   - Usa `persist` do Zustand com `createJSONStorage(() => AsyncStorage)` (ou `expo-secure-store`) sob a chave `'@petroutine:auth-session'`.
   - Marca `isHydrated: true` no callback `onRehydrateStorage`.
2. **Cliente HTTP Centralizado (`src/services/api.ts`):**
   - Usa `export const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';`.
   - Lê `useAuthStore.getState().sessionToken` e injeta automaticamente `Authorization: Bearer ${token}` nas requisições.
   - Se a resposta retornar status `401` ou `403`, chama `useAuthStore.getState().clearSession()`.
   - Trata respostas JSON e texto, lançando `new Error(data.error)` quando `!response.ok`.
3. **Proteção de Rotas (Auth Guard) no `src/app/_layout.tsx`:**
   - Enquanto `!isHydrated`, exibe um indicador de carregamento (`ActivityIndicator`) para evitar piscar a tela de login indevidamente.
   - Observa `[sessionToken, isHydrated, segments]` num `useEffect`:
     - Se `!sessionToken && segments[0] !== '(auth)'`, redireciona com `router.replace('/(auth)/login')`.
     - Se `sessionToken && segments[0] === '(auth)'`, redireciona com `router.replace('/(tabs)')`.
4. **Serviço e Telas de Autenticação (`signup`, `login` e `logout`):**
   - `src/services/auth-service.ts` implementando `signupUser(name, email, password)`, `loginUser(email, password)` e `logoutUser()` (que limpa `clearSession()` e `clearPets()` no bloco `finally`).
   - Telas `src/app/(auth)/login.tsx` e `src/app/(auth)/signup.tsx` com estados de `loading`, mensagens de `error` claras e validação de campos vazios.
   - Botão **Sair da Conta (Logout)** na aba de Estatísticas/Perfil (`src/app/(tabs)/stats.tsx`).
5. **Store Global de Pets Integrada ao Backend (`src/store/use-pet-store.ts`):**
   - `fetchPets()`: `GET /pets`
   - `addPet(novoPet: NovoPet)`: `POST /pets`
   - `togglePasseio(id: string)`: `PATCH /pets/${id}/toggle`
   - `registrarPasseio(id: string, local?: Pet['local'], fotoUri?: string)`: `PATCH /pets/${id}/passeio`
   - `updatePet(id: string, dados: AtualizacaoPet)`: `PUT /pets/${id}`
   - `removePet(id: string)`: `DELETE /pets/${id}`
   - `clearPets()`: reseta `{ pets: [], error: null }` ao fazer logout.

### Esqueleto — `src/store/use-pet-store.ts`

```tsx
// src/store/use-pet-store.ts
import { create } from 'zustand';
import { apiFetch } from '../services/api';
import type { AtualizacaoPet, NovoPet, Pet } from '../types/pet';

type PetStore = {
  pets: Pet[];
  isLoading: boolean;
  error: string | null;
  fetchPets: () => Promise<void>;
  addPet: (novo: NovoPet) => Promise<void>;
  togglePasseio: (id: string) => Promise<void>;
  registrarPasseio: (id: string, local?: Pet['local'], fotoUri?: string) => Promise<void>;
  updatePet: (id: string, dados: AtualizacaoPet) => Promise<void>;
  removePet: (id: string) => Promise<void>;
  clearPets: () => void;
};

export const usePetStore = create<PetStore>((set) => ({
  pets: [],
  isLoading: false,
  error: null,

  fetchPets: async () => {
    // TODO MP4.1: buscar GET /pets com apiFetch<Pet[]>('/pets') e atualizar estado
  },

  addPet: async (novo) => {
    // TODO MP4.2: enviar POST /pets e adicionar o pet criado de forma imutável
  },

  togglePasseio: async (id) => {
    // TODO MP4.3: enviar PATCH /pets/${id}/toggle e substituir no array com .map()
  },

  registrarPasseio: async (id, local, fotoUri) => {
    // TODO MP4.4: enviar PATCH /pets/${id}/passeio com { statusPasseio: 'concluido', local, fotoUri }
  },

  updatePet: async (id, dados) => {
    // TODO MP4.5: enviar PUT /pets/${id} e atualizar o item correspondente na store
  },

  removePet: async (id) => {
    // TODO MP4.6: enviar DELETE /pets/${id} e filtrar do array com .filter()
  },

  clearPets: () => set({ pets: [], error: null }),
}));
```

---

## Etapa 5 (Aula 10) — Reformulação de UI/UX (GlueStack UI + NativeWind + `@expo/ui`), OTA (`expo-updates`) e EAS Build (`eas.json`)

### Contexto
Para fechar a disciplina, o aplicativo precisa ter **acabamento de produto real**: interface reformulada com componentes acessíveis e estilização consistente, controles nativos do sistema operacional com `@expo/ui`, verificação de atualizações remotas Over-The-Air (`expo-updates`) e configuração pronta para gerar `.apk` e build iOS no **EAS Build**.

### O que implementar nesta etapa

1. **Reformulação de UI/UX (Critério de Avaliação Obrigatório):**
   - Refatore o visual das telas do aplicativo (**Login**, **Cadastro**, **Meus Pets**, **CardPet**, **Detalhe do Pet / Registro de Passeio** e **Estatísticas/Perfil**) aplicando **GlueStack UI + NativeWind** (`GluestackUIProvider`, `Card`, `VStack`, `HStack`, `Heading`, `Text`, `Badge`, `Button`, `Input`, `className`) em conjunto com o suporte ao **Tema Claro/Escuro** (`useTheme`).
   - **O que será avaliado no redesign de UI/UX:**
     - **Hierarquia visual e legibilidade:** contraste adequado nos modos claro e escuro, badges semânticos para o status do passeio (`pendente`, `concluido`, `cancelado`) e para a espécie/porte do pet;
     - **Consistência de espaçamento e alinhamento:** zero elementos colados nas bordas da tela, respeito à Safe Area, uso consistente de `gap` / `VStack` / `HStack`;
     - **Feedbacks visuais completos:** estados de carregamento (`ActivityIndicator` / skeletons), estados de erro claros, feedback de toque (`pressed`) e botões desabilitados durante requisições em andamento;
     - **Documentação do Redesign no `README.md`:** inclua uma seção **"Reformulação de UI/UX"** explicando as decisões visuais e de usabilidade tomadas pelo grupo (com capturas de tela do antes e depois).
2. **Controles Nativos com `@expo/ui` (`src/components/native-pet-reminder-settings.tsx`):**
   - Na aba de Estatísticas/Perfil (`src/app/(tabs)/stats.tsx`), inclua o componente de preferências nativas da rotina pet encapsulado em `<Host matchContents>` usando `<Switch>` (ex.: ativar lembretes diários de passeio) e `<Picker variant="segmented">` (ex.: meta de passeio `'Curto'`, `'Moderado'`, `'Longo'`).
3. **Verificador de Atualizações Over-The-Air (`src/components/ota-status-card.tsx`):**
   - Usa `Updates.useUpdates()` do `expo-updates` para exibir `currentlyRunning.channel` e `currentlyRunning.runtimeVersion`.
   - Possui botão **"Buscar Atualização OTA"** que bloqueia com segurança quando `__DEV__` for `true` (`"OTA desabilitado em modo de desenvolvimento."`) e, em build nativa, executa `checkForUpdateAsync()` → `fetchUpdateAsync()` → `reloadAsync()`.
4. **Configuração de Build APK e Simulador iOS (`app.json` e `eas.json`):**
   - No `app.json`, configure:
     - `"scheme": "petroutine"`
     - `"runtimeVersion": { "policy": "appVersion" }`
     - `"ios": { "bundleIdentifier": "br.cesarschool.petroutine" }`
     - `"android": { "package": "br.cesarschool.petroutine" }`
   - Crie o arquivo `eas.json` na raiz do projeto com os perfis `development`, `preview` (gerando `.apk` para Android com `"buildType": "apk"`, `"simulator": true` para iOS, `"channel": "preview"` e variável `"EXPO_PUBLIC_API_URL"`) e `production`.

---

## Etapa Obrigatória — Relatório de Uso de Inteligência Artificial (`docs/relatorio-uso-ia.md`)

De acordo com o Plano de Ensino da disciplina e a **Política de Governança de IA do CESAR**, a entrega do mini-projeto exige o preenchimento completo do arquivo [`docs/relatorio-uso-ia.md`](./docs/relatorio-uso-ia.md), contendo:

1. **Declaração narrativa oficial** informando a(s) ferramenta(s) e versão(ões) utilizada(s) (constantes no Catálogo de IA do CESAR), a finalidade e a confirmação de não tratamento de dados pessoais (ou declaração formal de não utilização de IA).
2. **Tabela de registro de uso por etapa** (Etapas 1 a 5 e Reformulação de UI/UX), detalhando o que foi gerado, o que foi aproveitado e o que precisou ser refeito.
3. **Curadoria técnica (análise crítica):** identificação de pelo menos **dois** casos concretos em que a IA sugeriu padrões obsoletos/depreciados do React Native / Expo ou violou alguma das 20 regras de escrita da disciplina, demonstrando como o grupo diagnosticou e corrigiu o código.

---

## Estrutura Final Esperada do Projeto

Ao concluir todas as etapas, a árvore de arquivos do seu projeto deverá seguir esta organização:

```text
pet-routine-expo/
├── README.md                                ← atualizado com instruções, decisões e seção de UI/UX
├── app.json                                 ← scheme, plugins, runtimeVersion, package e bundleIdentifier
├── eas.json                                 ← perfis development, preview (APK) e production
├── .env.example                             ← EXPO_PUBLIC_API_URL=http://localhost:3000
├── docs/
│   ├── MINI-PROJETO.md                      ← este enunciado
│   └── relatorio-uso-ia.md                  ← Relatório de Uso de IA preenchido pelo aluno
├── backend/                                 ← API Express + SQLite + JWT fornecida pelo professor
│   ├── package.json
│   ├── README.md
│   ├── test.http
│   └── src/
│       ├── server.ts
│       ├── db.ts
│       ├── auth.ts
│       ├── types.ts
│       └── routes/
│           ├── auth.routes.ts
│           └── pets.routes.ts
└── src/
    ├── app/                                 ← APENAS rotas e layouts (Regra 15)
    │   ├── _layout.tsx                      ← GluestackUIProvider + ThemeProvider + Auth Guard + Listener Push
    │   ├── (auth)/
    │   │   ├── _layout.tsx                  ← Stack pública de autenticação
    │   │   ├── login.tsx                    ← Tela de Login integrada ao backend
    │   │   └── signup.tsx                   ← Tela de Cadastro integrada ao backend
    │   ├── (tabs)/
    │   │   ├── _layout.tsx                  ← Tabs: Meus Pets (index) e Estatísticas (stats)
    │   │   ├── index.tsx                    ← Lista SectionList + Busca + Cadastro rápido via API
    │   │   └── stats.tsx                    ← Métricas + Tema + @expo/ui + OTA Card + Botão Logout
    │   ├── pet/
    │   │   └── [id].tsx                     ← Detalhe do Pet + WalkTimer (useEffect) + SQLite + Sensores + Notificação
    │   ├── foto-do-pet.tsx                  ← Captura/escolha de foto com expo-image-picker (1:1)
    │   └── sobre.tsx                        ← Informações do app e da equipe
    ├── components/                          ← Componentes reutilizáveis e UI reformulada
    │   ├── card.tsx
    │   ├── card-pet.tsx
    │   ├── item-pet.tsx
    │   ├── lista-vazia.tsx
    │   ├── walk-timer.tsx
    │   ├── native-pet-reminder-settings.tsx
    │   └── ota-status-card.tsx
    ├── context/
    │   └── theme-context.tsx                ← Contexto global de Tema Claro/Escuro + AsyncStorage
    ├── store/
    │   ├── use-auth-store.ts                ← Store Zustand de sessão (sessionToken + persist)
    │   └── use-pet-store.ts                 ← Store Zustand de pets integrada ao backend REST
    ├── services/
    │   ├── api.ts                           ← Helper apiFetch com Bearer token e tratamento 401/403
    │   ├── auth-service.ts                  ← signupUser, loginUser, logoutUser
    │   ├── passeio-db.ts                    ← Histórico local de sessões de passeio em expo-sqlite
    │   └── notifications.ts                 ← Configuração e agendamento com expo-notifications
    ├── lib/
    │   └── agrupar.ts                       ← Funções puras de agrupamento e busca
    ├── types/
    │   └── pet.ts                           ← Tipos de domínio e utility types
    └── theme.ts                             ← Tokens de design
```

---

## Equivalência de Domínio (`Habito` ↔ `Pet`)

Os exercícios de sala das Aulas 7 a 10 usam o domínio `Habito`. Caso consulte as notas de aula (`student-notes.md` e `exercises.md`), utilize esta tabela de correspondência para o domínio `Pet`:

| Domínio `Habito` *(exercícios de sala)* | Domínio `Pet` *(este Mini-Projeto)* |
|---|---|
| `Habit` / `Habito` | `Pet` |
| `useHabitStore` (`src/store/use-habit-store.ts`) | `usePetStore` (`src/store/use-pet-store.ts`) |
| `GET /habits`, `POST /habits`, `PATCH /habits/:id/toggle`, `DELETE /habits/:id` | `GET /pets`, `POST /pets`, `PATCH /pets/:id/toggle`, `PATCH /pets/:id/passeio`, `DELETE /pets/:id` |
| `src/app/habit/[id].tsx` | `src/app/pet/[id].tsx` |
| `FocusTimer` (`focus_logs` no `expo-sqlite`) | `WalkTimer` / Cronômetro de Passeio (`passeio_logs` no `expo-sqlite`) |
| `NativeHabitReminderSettings` (`['Leve', 'Moderado', 'Intenso']`) | `NativePetReminderSettings` (`['Curto', 'Moderado', 'Longo']`) |
| `HabitCard` | `CardPet` |
| `"scheme": "habittracker"` | `"scheme": "petroutine"` |
| `"package": "br.cesarschool.habittracker"` | `"package": "br.cesarschool.petroutine"` |
| `'@habits:auth-session'` | `'@petroutine:auth-session'` |

---

## Checklist Final de Entrega

Antes de abrir o Pull Request ou submeter a branch do grupo, valide todos os itens abaixo:

- [ ] `npm run typecheck` na raiz e `cd backend && npm run typecheck` executam **sem nenhum erro de TypeScript**.
- [ ] Nenhum comentário `// TODO` restou nos arquivos entregues.
- [ ] Abrir o app sem sessão ativa redireciona automaticamente para `/(auth)/login`.
- [ ] Fazer login com `tutor@cesar.school` (senha `123456`) carrega os 20 pets vindos do backend SQLite na `SectionList`.
- [ ] Criar uma nova conta em `/(auth)/signup` autentica o usuário e mostra apenas os pets daquela conta.
- [ ] Fechar e reabrir o app mantém o tutor logado (`useAuthStore` hidratada sem piscar tela de login).
- [ ] Cadastrar um pet, alternar o status do passeio, registrar passeio com GPS/foto ou excluir um pet atualiza imediatamente a UI (Home e Estatísticas) e persiste no banco SQLite do backend.
- [ ] Tocar em um pet abre `/pet/[id]` mostrando seus detalhes, o cronômetro de passeio (`useEffect` com cleanup) salvando sessões no `expo-sqlite` local e o botão de agendar lembrete de notificação para 5s.
- [ ] Tocar na notificação local recebida redireciona o usuário para `/pet/[id]`.
- [ ] A tela `/foto-do-pet` permite escolher imagem da galeria ou tirar foto com a câmera (recorte `1:1`), tratando cancelamento e permissões negada/bloqueada com mensagens distintas.
- [ ] A aba de Estatísticas/Perfil exibe os contadores em tempo real, o switch de Tema Claro/Escuro (`useTheme`), os controles nativos com `<Host>` (`@expo/ui`), o card de verificação OTA (`expo-updates`) e o botão de **Logout** (que limpa `sessionToken` e a lista de pets em memória).
- [ ] Os arquivos `app.json` e `eas.json` estão configurados para gerar `.apk` no perfil `preview`.
- [ ] O arquivo `docs/relatorio-uso-ia.md` e a seção de **Reformulação de UI/UX** no `README.md` estão devidamente preenchidos.

---

## Critérios de Avaliação e Distribuição de Pontos (0,0 a 3,0 pontos)

O Mini-Projeto vale **até 3,0 pontos** na composição da **Avaliação 2 (AV2)**, distribuídos conforme a rubrica abaixo:

| Bloco Avaliativo | Pontuação Máxima | Peso (%) | O que é avaliado para nota máxima |
|---|---|---|---|
| **1. Navegação, Rotas e Sensores (Aulas 6 e 7)** | **0,50 pt** | ~16,7% | Migração limpa para `src/app/` (`App.tsx` e `index.ts` removidos); estrutura com `(tabs)`, `(auth)`, `sobre` e `foto-do-pet`; rota dinâmica `pet/[id].tsx` funcional; `expo-image-picker` com contrato de 3 tempos, `canceled` tratado e estados de falha distintos; notificações locais agendando em 5s e abrindo `/pet/[id]` ao tocar. |
| **2. Hooks, Zustand e Persistência Local (Aula 8)** | **0,50 pt** | ~16,7% | `ThemeContext` + `useTheme` persistido no `AsyncStorage`; cronômetro de passeio com `useEffect` e função de cleanup (`clearInterval`); histórico de sessões de passeio salvo localmente com `expo-sqlite` (`passeio_logs`); store Zustand tipada com seletores e atualizações 100% imutáveis. |
| **3. Autenticação `sessionToken` e Integração Backend (Aula 9)** | **0,75 pt** | 25,0% | `useAuthStore` persistida com controle de `isHydrated`; Auth Guard automático no `_layout.tsx` com `router.replace`; fluxos completos de `signup`, `login` e `logout` (limpando sessão e pets no `finally`); helper `apiFetch` centralizado injetando `Bearer <sessionToken>` e tratando `401`/`403`; CRUD completo de pets (`GET`, `POST`, `PATCH`, `PUT`, `DELETE`) sincronizado com `./backend`. |
| **4. Reformulação de UI/UX, `@expo/ui`, OTA e EAS Build (Aula 10)** | **0,75 pt** | 25,0% | **Reformulação completa e coesa de UI/UX** (GlueStack UI + NativeWind, hierarquia visual, estados de loading/vazio/erro, tema claro/escuro funcional, documentação antes/depois no README); controles nativos `@expo/ui` dentro de `<Host matchContents>`; card OTA (`expo-updates`) tratando `__DEV__`; `app.json` e `eas.json` configurados para gerar `.apk` no perfil `preview`. |
| **5. Qualidade de Código, Regras da Disciplina e Relatório de Uso de IA** | **0,50 pt** | ~16,7% | `npm run typecheck` passando sem erros; respeito rigoroso às **20 Regras de Escrita** (zero `any`, sem componentes fora de lugar em `src/app/`, sem mutação de estado); commits atômicos por etapa; **`docs/relatorio-uso-ia.md`** preenchido com declaração oficial, tabela de etapas e análise crítica de curadoria técnica. |
| **TOTAL** | **3,00 pts** | **100%** | — |

### Penalidades Diretas
- **Código que não compila no `npm run typecheck` ou quebra ao iniciar:** desconto proporcional nos blocos afetados.
- **Entrega sem o `docs/relatorio-uso-ia.md` preenchido:** perda integral da pontuação de governança/documentação (até **-0,30 pt**).
- **Violação das 20 Regras de Escrita** (ex.: uso de `any`, `ScrollView` envolvendo `SectionList`/`FlatList`, ausência de cleanup em `useEffect`/listeners, componentes soltos dentro de `src/app/`): **-0,05 pt a -0,15 pt** por ocorrência.
