# Pet Routine Expo - Prática 02

## Decisões de Projeto

### 1. Decisão de Modelagem
Optei por utilizar `type` com unions literais e `EstadoTela<T>` para representar os estados assíncronos da tela (`carregando`, `sucesso`, `erro`). Essa modelagem garante discriminated unions em TypeScript, garantindo o controlo estrito de estados sem inconsistências.

### 2. Decisão de Organização de Estilo
Centralizei todos os tokens (cores, espaçamentos e tipografia) no ficheiro `src/theme.ts` utilizando `as const`. Os componentes utilizam exclusivamente esses tokens para cores e dimensões, mantendo no `StyleSheet.create` local apenas as regras de alinhamento e estrutura de layout (Flexbox).