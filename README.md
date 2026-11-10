# Pet Routine Expo

**Disciplina:** Desenvolvimento Mobile (2026.2.DM) — CESAR School
**Branch:** `feature/mini-projeto`

## Sobre o projeto

App de Gestão e Rotina Pet: um aplicativo para tutores de animais de estimação organizarem a rotina, passeios e histórico de saúde dos pets.

Este projeto é usado nas atividades guiadas e aplicadas da disciplina ao longo do semestre. Cada aula adiciona uma camada nova por cima da anterior — o histórico de commits desta branch é, em si, um registro do progresso.

## Mini-Projeto — Segunda Unidade (AV2)

Esta branch contém o ponto de partida para o **Mini-Projeto da Unidade 2 (0,0 a 3,0 pontos)**, partindo das Práticas 1 a 3 concluídas:

- **Enunciado completo e roteiro (Etapas 1 a 5):** [`docs/MINI-PROJETO.md`](./docs/MINI-PROJETO.md)
- **Apresentação do Mini-Projeto (Slides HTML / PDF):** [`docs/apresentacao-mini-projeto/presentation.pdf`](./docs/apresentacao-mini-projeto/presentation.pdf)
- **Backend REST fornecido pelo professor (Express + SQLite + JWT):** [`backend/README.md`](./backend/README.md)
- **Template do Relatório de Uso de IA:** [`docs/relatorio-uso-ia.md`](./docs/relatorio-uso-ia.md)

### Como rodar o Backend e o App

Em um terminal (Backend):
```bash
cd backend
npm install
npm run dev
```

Em outro terminal (App Expo):
```bash
npm install
npx expo start
```

## Estado inicial (histórico da Aula 1)

Scaffold inicial gerado com Expo (`create-expo-app`, template `blank-typescript`). Nenhuma tela ou modelagem de domínio foi implementada ainda — isso é propositalmente deixado para as próximas aulas. Veja os comentários `TODO` em `App.tsx`.

## Como rodar

```bash
npm install
npx expo start
```

Abra o app **Expo Go** no celular e escaneie o QR code (ou use um emulador). Requisito: **Node.js 22.11+**.

## Práticas da Aula 1

Os esqueletos das práticas de `PRATICA.md` já estão no repositório. Cada `TODO Px.y` no código corresponde a um item do enunciado — resolva na ordem.

| Prática | Arquivo | Escopo |
|---|---|---|
| 1 — Modelagem do domínio Pet | `src/types/pet.ts` | TypeScript puro |
| 2 — Serviço mockado | `src/services/petService.ts` | TypeScript puro |
| 2 — Estado de tela | `src/tela-pet.ts` | TypeScript puro |
| 3 — Relatório de plataforma | `docs/pratica-03-relatorio-plataforma.md` | Texto |
| 4 — Material desatualizado *(bônus)* | `docs/pratica-04-material-desatualizado.md` | Texto |

As Práticas 1 e 2 **não precisam de React Native nem do Expo** — são verificáveis só com o compilador:

```bash
npm run typecheck        # equivale a `npx tsc --noEmit`
npm run pratica:tela     # roda src/tela-pet.ts via tsx
```

> ⚠️ **O `typecheck` falha de propósito enquanto os TODOs não estiverem resolvidos.** Cada erro reportado aponta para um `TODO` que ainda falta preencher — é esse o critério de pronto. Alguns blocos marcados como *verificação* precisam **falhar** ao serem descomentados; não os apague.

## Próximos passos (exercícios)

Os `TODO` deixados no código apontam para os exercícios de `exercises.md` de cada aula. Resolva-os na ordem em que aparecem e mantenha um commit por exercício (ou por bloco), para que o histórico da branch sirva de evidência de progresso.

## Decisões de Projeto (Prática 2)

- **Decisão de modelagem**: Optamos por utilizar a prop condicional `destacado?: boolean` no componente `Card` no lugar de criar componentes separados. Como o destaque do cartão reflete mudanças mínimas de interface (bordas diferentes), o uso de um booleano mantém o componente genérico e de simples utilização.
- **Decisão de organização de estilo**: As cores, os espaçamentos principais e as propriedades fixas de tipografia viraram tokens no `theme.ts` visando assegurar a consistência visual geral da aplicação. Já atributos de disposição e estruturais (como `flexDirection`, alinhamentos e variações focadas da margem interna) ficaram como estilos locais nos componentes, já que refletem a necessidade espacial e estrutural local de cada exibição.

## Decisões da Prática 3

- **Por que `SectionList` e não `FlatList`**: Nossa lista deve agrupar os pets naturalmente por um critério (neste caso, o status de passeio, sendo 'Pendente', 'Concluído' ou 'Cancelado'). A API `SectionList` do React Native tem suporte nativo robusto de layout e virtualização (com `renderSectionHeader` entre outros hooks) para seções bidimensionais com alto rendimento, o que a `FlatList` pura exigiria contornos difíceis de manter e propensos a falhas arquiteturais.
- **Onde os dados são agrupados e filtrados**: Em `/src/lib/agrupar.ts`, separadamente do JSX. Agrupamentos e filtragens são lógicas de negócio cruas (ou lógicas de dados) que independem do ciclo de vida da UI. Ao extraí-las do JSX, ganhamos extrema facilidade em testar funções puras, além de isolar o custo da CPU por re-processamentos na UI.
- **A escolha de `Accuracy` na obtenção de GPS**: Selecionamos `Location.Accuracy.High` por conta do balanço adequado (oferece precisão satisfatória aos registros via Wi-Fi/Redes, não obrigando um GPS dedicado a 100% de esforço que esgotaria rápido a bateria do dispositivo como `Highest` ou `BestForNavigation` fariam), poupando carga durante a duração estendida dos passeios com pets.
- **Limitações assumidas**: A tela de registro está implementada utilizando leituras momentâneas/únicas e chamadas manuais (`getCurrentPositionAsync`, leitura simples via Câmera). Apesar de termos subscrições pendentes ou possíveis, assumimos que elas não precisam de *cleanups* profundos no momento. Além disso, as fotos capturadas residem em cachê primário da aplicação (e não são salvas via `FileSystem` ou MediaLibrary diretamente na galeria) em respeito à redução de escopo da funcionalidade.
