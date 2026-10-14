# Pet Routine Expo

**Disciplina:** Desenvolvimento Mobile (2026.2.DM) — CESAR School
**Branch:** `feature/ads025_2026-2`

## Sobre o projeto

App de Gestão e Rotina Pet: um aplicativo para tutores de animais de estimação organizarem a rotina, passeios e histórico de saúde dos pets.

Este projeto é usado nas atividades guiadas e aplicadas da disciplina ao longo do semestre. Cada aula adiciona uma camada nova por cima da anterior — o histórico de commits desta branch é, em si, um registro do progresso.

## Estado atual (Aula 1)

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

1. **Por que SectionList e não FlatList?**
   - Optamos pela `SectionList` para agrupar visualmente os pets por status do passeio ('Passeios Pendentes', 'Passeios Concluídos' e 'Passeios Cancelados'), permitindo que o usuário identifique rapidamente quais pets ainda precisam passear.

2. **Onde agrupamos os dados e por que fora do JSX?**
   - As funções de agrupamento e filtragem foram centralizadas na pasta `src/lib/agrupar.ts`. Isso mantém a separação de responsabilidades, garante a testabilidade do código e evita reprocessamentos pesados dentro do ciclo de render do JSX.

3. **Escolha da precisão da localização (Accuracy):**
   - Utilizamos `Location.Accuracy.Balanced`. Esta escolha oferece precisão na faixa de metros ideal para localizar um passeio pet sem provocar consumo excessivo de bateria, ao contrário de opções como `Highest` ou `BestForNavigation`.

4. **Limitações assumidas:**
   - As fotos capturadas na câmera ficam mantidas no diretório de cache temporário da aplicação e não são salvas na galeria pública do aparelho.
   - Conforme especificação da Prática 3, a inscrição do GPS é encerrada após a leitura única da posição atual (`getCurrentPositionAsync`).