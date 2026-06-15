# Rotas da API

Base da aplicação:

```text
http://localhost:3000
```

## Autenticação

### Login

```text
POST /api/auth/login
```

Body:

```json
{
  "email": "admin@admin.com",
  "senha": "123456"
}
```

### Usuário autenticado

```text
GET /api/auth/me
```

Header:

```text
Authorization: Bearer TOKEN
```

## Produtos

```text
GET /api/produtos
GET /api/produtos/:id
POST /api/produtos
PUT /api/produtos/:id
DELETE /api/produtos/:id
```

Criação, alteração e exclusão exigem token e permissão ADMIN.

### Cadastro/edição de produto com imagem

As rotas `POST /api/produtos` e `PUT /api/produtos/:id` usam `multipart/form-data` porque podem receber imagem.

Campos:

```text
id_categoria
nome
descricao
preco
estoque
imagem
```

O campo do arquivo deve se chamar:

```text
imagem
```

Exemplo conceitual:

```text
id_categoria: 1
nome: Mouse Gamer
descricao: Mouse USB com RGB
preco: 89.90
estoque: 25
imagem: arquivo.png
```

O backend salva a imagem em:

```text
uploads/produtos/
```

E grava no MySQL apenas o caminho:

```text
/uploads/produtos/nome-do-arquivo.png
```

## Clientes

```text
GET /api/clientes
GET /api/clientes/:id
POST /api/clientes
PUT /api/clientes/:id
DELETE /api/clientes/:id
```

Rotas protegidas por JWT.

## Categorias

```text
GET /api/categorias
GET /api/categorias/:id
POST /api/categorias
PUT /api/categorias/:id
DELETE /api/categorias/:id
```

Rotas protegidas por JWT.

## Vendas

```text
GET /api/vendas
GET /api/vendas/:id
POST /api/vendas
DELETE /api/vendas/:id
```

Exemplo de criação:

```json
{
  "id_cliente": 1,
  "itens": [
    { "id_produto": 1, "quantidade": 1 },
    { "id_produto": 2, "quantidade": 1 }
  ]
}
```

Ao criar venda, o sistema calcula o total, grava a venda, grava os itens e reduz o estoque.

Ao cancelar venda, o sistema altera o status para CANCELADA e devolve o estoque.

## Logs

```text
GET /api/logs
GET /api/logs/:id
GET /api/logs/export/xml
```

Filtros XML:

```text
acao
metodo
status_code
id_usuario
email_usuario
data_inicio
data_fim
```

## JSON

### Exportar

```text
GET /api/json/export/:entidade
```

Entidades:

```text
usuarios
clientes
categorias
produtos
vendas
itens_venda
```

### Importar

```text
POST /api/json/import/:entidade
```

Campo do arquivo:

```text
arquivo_json
```

Entidades liberadas:

```text
usuarios
clientes
categorias
produtos
```

## Relatórios

```text
GET /api/relatorios/vendas
GET /api/relatorios/vendas/pdf
```

Filtros:

```text
status
data_inicio
data_fim
```

## Dashboard

```text
GET /api/dashboard/resumo
GET /api/dashboard/vendas-por-status
GET /api/dashboard/produtos-mais-vendidos
GET /api/dashboard/vendas-por-dia
GET /api/dashboard/estoque-por-categoria
GET /api/dashboard/produtos-baixo-estoque
GET /api/dashboard/completo
```

A rota mais completa para teste é:

```text
GET /api/dashboard/completo
```

Header:

```text
Authorization: Bearer TOKEN
```
