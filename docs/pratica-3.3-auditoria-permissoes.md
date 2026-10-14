# Auditoria de Permissões - Prática 3.3

## Diagnóstico de Problemas Identificados

1. **Vazamento de Memória / Subscription sem Remoção (`watchPositionAsync` e `Accelerometer`)**
   - **Sintoma:** O celular esquenta, a bateria descarrega rápido e o app fica lento com o passar do tempo.
   - **Causa:** As escutas (`watchPositionAsync` e `addListener`) são registradas dentro da função sem armazenar o objeto de subscrição para chamar `.remove()`.

2. **Controle de permissão em variável global mutável (`let jaPediuPermissao = false`)**
   - **Sintoma:** O app para de pedir permissão se o usuário fechar a tela ou negar a primeira vez.
   - **Causa:** Variáveis fora da árvore de estados do React persistem de maneira imprevisível no módulo.

3. **Uso de precisão máxima desnecessária (`Accuracy.BestForNavigation` e `Highest`)**
   - **Sintoma:** Alto consumo de bateria e aquecimento do dispositivo.
   - **Causa:** Precisão de navegação veicular foi utilizada para uma simples rotina de caminhada pet.

4. **Intervalo do acelerômetro muito curto (`16ms`)**
   - **Sintoma:** Travamento da interface por excesso de re-renderizações por segundo.
   - **Causa:** Atualizar o estado a cada 16ms (60 FPS) força renders contínuos desnecessários.

5. **Ação disparada sem verificação de estado de permissão negada**
   - **Sintoma:** O botão falha silenciosamente se a permissão for negada.
   - **Causa:** Não há tratamento de fluxo para o caso do usuário recusar o acesso ao GPS.