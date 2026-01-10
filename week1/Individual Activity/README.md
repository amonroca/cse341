# API REST - CSE 341 (Express)

Uma API simples em Node.js + Express para atividade individual.

## Requisitos

- Node.js 18+ (recomendado)

## Configuração

1. Copie o arquivo `.env.example` para `.env` e ajuste as variáveis se necessário:
   ```env
   PORT=3001
   FRONTEND_URL=http://localhost:3000
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

## Scripts

- `npm run dev`: executa com nodemon (recarrega automaticamente)
- `npm start`: executa em modo produção

## Executando

```bash
npm run dev
```

A API sobe em `http://localhost:3001` (ou na porta configurada em `PORT`).

## Endpoints

- `GET /health` → status da API
- `GET /api/items` → lista itens (memória)
- `POST /api/items` → cria item
  - Body JSON: `{ "name": "Item X" }`

## CORS

Defina `FRONTEND_URL` no `.env` com a URL do seu frontend (pode ser mais de uma, separadas por vírgula). Se não definir, a API aceita qualquer origem (útil para desenvolvimento).

## Conectando com o Frontend

Aponte seu frontend para a base da API, por exemplo `http://localhost:3001`.

Exemplo com `fetch` (React/Vite/Vanilla):

```js
const API_BASE =
  import.meta?.env?.VITE_API_URL ||
  process.env.REACT_APP_API_BASE_URL ||
  "http://localhost:3001";

export async function getItems() {
  const res = await fetch(`${API_BASE}/api/items`);
  if (!res.ok) throw new Error("Falha ao buscar itens");
  return res.json();
}

export async function createItem(name) {
  const res = await fetch(`${API_BASE}/api/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Falha ao criar item");
  return res.json();
}
```

No frontend, configure a base URL conforme seu bundler:

- Vite: defina `VITE_API_URL=http://localhost:3001` no `.env.local`
- Create React App: defina `REACT_APP_API_BASE_URL=http://localhost:3001` no `.env.local`

## Estrutura

```
src/
  config/env.js
  middleware/errorHandler.js
  routes/
    index.js
    items.js
  controllers/
    itemsController.js
  index.js
```

## Próximos passos

- Adicionar persistência real (MongoDB/Postgres) se necessário.
- Escrever testes (Jest/Supertest) conforme o curso exigir.
