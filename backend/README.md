# Pet Routine Backend (Express + SQLite + JWT)

> **Disciplina:** Desenvolvimento Mobile (2026.2.DM) — CESAR School  
> **Fornecido pelo professor** para a entrega do **Mini-Projeto (Unidade 2)**.

Este diretório contém a API REST completa em **Node.js + Express + SQLite (`better-sqlite3`) + JWT (`jsonwebtoken` + `bcryptjs`)** em TypeScript. Você **não precisa alterar o código deste backend** para concluir o mini-projeto — basta rodá-lo localmente e integrar o aplicativo Expo a ele.

---

## 1. Como Rodar o Servidor

Em um terminal separado do Expo, entre na pasta `backend`, instale as dependências e inicie o servidor:

```bash
cd backend
npm install
npm run dev
```

Ao iniciar pela primeira vez, o servidor cria automaticamente o arquivo `pet-routine.db` e popula uma **conta de demonstração** com os 20 pets iniciais da Prática 3:

| Campo | Valor |
|---|---|
| **E-mail demo** | `tutor@cesar.school` |
| **Senha demo** | `123456` |
| **Porta padrão** | `http://localhost:3000` |

---

## 2. Qual URL Configurar no `.env` do App Expo (`EXPO_PUBLIC_API_URL`)?

Na raiz do projeto Expo (`pet-routine-expo/.env`), defina a variável `EXPO_PUBLIC_API_URL` de acordo com onde você está testando o aplicativo:

| Ambiente de Teste | Valor de `EXPO_PUBLIC_API_URL` | Motivo |
|---|---|---|
| **iOS Simulator / Web** | `http://localhost:3000` | Compartilha a interface de rede da sua máquina |
| **Android Emulator** | `http://10.0.2.2:3000` | No Android Emulator, `localhost` é o próprio celular virtual; `10.0.2.2` aponta para o seu computador |
| **Celular Físico (Expo Go)** | `http://SEU_IP_WIFI:3000` *(ex.: `http://192.168.1.15:3000`)* | O celular precisa acessar o IP da sua máquina na mesma rede Wi-Fi |

---

## 3. Contrato dos Endpoints da API

### 3.1. Autenticação (`/api/auth/*`)

| Método e Rota | Autenticação | Corpo (`JSON`) | Resposta de Sucesso |
|---|---|---|---|
| `POST /api/auth/signup` | Pública | `{ name, email, password }` | `201 Created` → `{ token, user: { id, name, email } }` |
| `POST /api/auth/login` | Pública | `{ email, password }` | `200 OK` → `{ token, user: { id, name, email } }` |
| `POST /api/auth/logout` | Pública / Bearer | *(vazio)* | `200 OK` → `{ success: true, message }` |
| `GET /api/auth/me` | `Bearer <token>` | — | `200 OK` → `{ user: { id, name, email } }` |

### 3.2. Gestão e Rotina de Pets (`/pets` ou `/api/pets`)

> 💡 Todas as rotas de pets exigem o cabeçalho HTTP `Authorization: Bearer <sessionToken>`. Tanto o prefixo `/pets` quanto `/api/pets` são aceitos.

| Método e Rota | Corpo (`JSON`) | Descrição e Resposta |
|---|---|---|
| `GET /pets` | — | Retorna `Pet[]` pertencentes exclusivamente ao tutor logado (`200 OK`) |
| `GET /pets/:id` | — | Retorna um `Pet` específico do tutor (`200 OK` ou `404`) |
| `POST /pets` | `{ nome, especie, porte, idadeMeses, local?, fotoUri? }` | Cria um novo pet vinculado ao tutor logado (`201 Created` → `Pet`) |
| `PATCH /pets/:id/toggle` | `{ statusPasseio?, local?, fotoUri? }` *(opcional)* | Alterna `statusPasseio` (`pendente` ↔ `concluido`) ou aplica os campos enviados (`200 OK` → `Pet`) |
| `PATCH /pets/:id/passeio` | `{ statusPasseio?, local?, fotoUri? }` | Registra o passeio (com coordenadas GPS e/ou URI da foto) e marca como `concluido` (`200 OK` → `Pet`) |
| `PUT /pets/:id` ou `PATCH /pets/:id` | `Partial<Pet>` | Atualiza dados cadastrais, status, localização ou foto do pet (`200 OK` → `Pet`) |
| `DELETE /pets/:id` | — | Remove o pet do tutor logado (`200 OK` → `{ success: true, id }`) |
| `POST /pets/seed` | — | *(Utilitário opcional)* Popula os 20 pets de exemplo na conta autenticada (`201 Created` → `Pet[]`) |
