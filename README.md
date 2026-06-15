## Rotas do Dashboard

```text
GET /api/dashboard/resumo
GET /api/dashboard/vendas-por-status
GET /api/dashboard/produtos-mais-vendidos
GET /api/dashboard/vendas-por-dia
GET /api/dashboard/estoque-por-categoria
GET /api/dashboard/produtos-baixo-estoque
GET /api/dashboard/completo
```

Todas exigem JWT.

## Como rodar

1. Confirme que MySQL e MongoDB estão rodando.
2. Extraia o zip.
3. Abra a pasta `sistema-estoque-vendas` no VS Code.
4. Altere o `.env` da versão.
5. Rode:

```bash
npm install
npm run dev
```

## Teste pelo navegador

Faça login:

```text
http://localhost:3000/login
```

Depois acesse:

```text
http://localhost:3000/dashboard
```

Clique em:

```text
Carregar Dashboard
```

## Teste pelo Insomnia

```text
GET http://localhost:3000/api/dashboard/completo
```

Header:

```text
Authorization: Bearer SEU_TOKEN_AQUI
```

Também teste:

```text
GET http://localhost:3000/api/dashboard/resumo
GET http://localhost:3000/api/dashboard/vendas-por-status
GET http://localhost:3000/api/dashboard/produtos-mais-vendidos
GET http://localhost:3000/api/dashboard/vendas-por-dia
GET http://localhost:3000/api/dashboard/estoque-por-categoria
GET http://localhost:3000/api/dashboard/produtos-baixo-estoque
``
