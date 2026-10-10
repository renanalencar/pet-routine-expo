# Auditoria de Estilo - Prática 2.2

## 1. Lista de Problemas Encontrados

1. **Uso de `props: any`**
   - *Errado:* `TelaResumo (props: any)`.
   - *Consequência:* Perda da verificação de tipos em tempo de compilação, podendo gerar erros se props obrigatórias não forem passadas.
   - *Correção:* Tipar as props com `type TelaResumoProps = { total: number; nome: string; detalhe: string; }`.

2. **Estilos Inline na ScrollView e View**
   - *Errado:* `style={{ padding: 20, alignItems: 'center' }}`.
   - *Consequência:* Recriação dos objetos de estilo a cada renderização, reduzindo o desempenho.
   - *Correção:* Mover os estilos para `StyleSheet.create`.

3. **Uso de `marginBottom` em vez de `gap`**
   - *Errado:* `marginBottom: 10` e `marginBottom: 8`.
   - *Consequência:* Acoplamento de margens entre componentes irmãos.
   - *Correção:* Utilizar a propriedade `gap` no elemento pai.

4. **Uso do quarteto de sombras antigo (`shadowColor`, `shadowOffset`, etc.)**
   - *Errado:* Declaração de `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius` e `elevation`.
   - *Consequência:* Inconsistência entre plataformas e violação das diretrizes atuais do React Native.
   - *Correção:* Substituir por `boxShadow: '0px 1px 2px rgba(0,0,0,0.2)'`.

5. **Cores e tamanhos mágicos no código (`#333`, `#666`, `fontSize: 18`)**
   - *Errado:* Declaração direta de cores hexadecimais e tamanhos nos estilos.
   - *Consequência:* Impossibilidade de manutenção centralizada do tema.
   - *Correção:* Extrair todos os valores para `theme.ts`.

6. **Propriedade duplicada no mesmo estilo (`fontSize: 14` e `fontSize: 16`)**
   - *Errado:* `fontSize: 14, color: '#666', fontSize: 16`.
   - *Consequência:* A segunda propriedade sobrescreve a primeira de forma confusa.
   - *Correção:* Manter apenas uma declaração de `fontSize`.

7. **Erro de sintaxe em `fontweight: 'bold'`**
   - *Errado:* `fontweight` com 'w' minúsculo.
   - *Consequência:* O React Native ignora a regra e o texto não fica em negrito.
   - *Correção:* Corrigir para `fontWeight: 'bold'`.

8. **Prop `style` em componente `Button` nativo**
   - *Errado:* `<Button style={globalStyles.button} ... />`.
   - *Consequência:* O componente `Button` padrão do React Native não aceita a prop `style`, sendo completamente ignorada.
   - *Correção:* Envolver o botão num container estilizado ou utilizar um componente customizado.

---

## 2. Problema Arquitetural

O ficheiro `globalStyles.ts` junta num único local estilos globais e estilos de componentes específicos (`button`, `container`). Isso cria um acoplamento forte onde alterações globais podem quebrar a estrutura de componentes específicos em diferentes telas.

---

## 3. `globalStyles.ts` Reescrito como `theme.ts`

```typescript
export const cores = {
  textoPrincipal: '#333333',
  textoSecundario: '#666666',
  primaria: '#0000FF',
} as const;

export const espaco = {
  sm: 10,
  md: 20,
} as const;

export const tipografia = {
  titulo: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: cores.textoPrincipal,
  },
  corpo: {
    fontSize: 14,
    color: cores.textoSecundario,
  },
} as const;