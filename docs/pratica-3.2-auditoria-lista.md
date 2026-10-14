# Auditoria de Lista - Prática 3.2

## Diagnóstico de Problemas Identificados

1. **Uso de ScrollView envolvendo FlatList**
   - **Sintoma para o usuário:** A tela congela e trava ao rolar com muitos itens.
   - **Causa técnica:** A ScrollView pai renderiza todos os itens da FlatList de uma vez só, destruindo a virtualização e a reciclagem de memória.

2. **KeyExtractor usando o índice do array (`index.toString()`)**
   - **Sintoma:** Ao alternar ou atualizar um item, itens errados mudam de cor ou o app mostra dados inconsistentes.
   - **Causa:** O índice muda quando a lista é filtrada ou itens são removidos, quebrando a reconciliação do React.

3. **Mutação direta de estado no método `registrar`**
   - **Sintoma:** A interface não atualiza ao clicar em "registrar passeio".
   - **Causa:** `alvo.statusPasseio = 'concluido'; setPets(pets);` altera a mesma referência em memória, impedindo o re-render.

4. **Invocação de componente no `ListHeaderComponent`**
   - **Sintoma:** O campo de busca perde o foco a cada caractere digitado.
   - **Causa:** Definir uma função inline de componente força a recriação do TextInput a cada renderização.

5. **Ação de clique atribuída em elemento `Text` (`Text onPress`)**
   - **Sintoma:** Dificuldade de clicar no botão e ausência de feedback visual de toque.
   - **Causa:** Uso de `Text` para interações em vez do componente nativo `Pressable`.

6. **Configuração agressiva e incorreta de desempenho (`initialNumToRender={100}`, `windowSize={50}`)**
   - **Sintoma:** Demora excessiva para carregar a tela e alto consumo de memória.
   - **Causa:** Forçar a renderização de 100 itens de início consome processamento desnecessário.