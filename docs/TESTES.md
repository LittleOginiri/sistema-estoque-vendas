# Testes Realizados

Este documento resume os testes feitos durante o desenvolvimento do projeto.

## Ambiente

O projeto foi testado em ambiente Linux com:

```text
Node.js
npm
MySQL
MongoDB
Git
Navegador Chrome
curl
Bruno/Insomnia
```

## Testes de ambiente

Comandos usados:

```bash
node -v
npm -v
mysql --version
git --version
sudo systemctl status mysql
```

Resultado esperado:

- Node instalado;
- npm instalado;
- MySQL ativo;
- Git instalado;
- projeto rodando em `localhost:3000`.

## Teste de inicialização

Comando:

```bash
npm install
npm run dev
```

Resultado esperado:

```text
API rodando em: http://localhost:3000
MongoDB conectado com sucesso.
```

## Teste de saúde da API

```text
GET /api/health
```

Resultado esperado:

```json
{
  "success": true
}
```

## Teste de conexão MySQL

```text
GET /api/teste/mysql
```

Resultado esperado:

- conexão realizada;
- banco `estoque_vendas` acessível.

## Teste de login

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

Resultado esperado:

- retorno de token JWT;
- dados do usuário administrador.

## Teste de rotas protegidas

```text
GET /api/auth/me
```

Header:

```text
Authorization: Bearer TOKEN
```

Resultado esperado:

- usuário autenticado retornado;
- erro caso não envie token.

## CRUD Produtos

Testes realizados:

- listar produtos;
- buscar produto por ID;
- criar produto;
- atualizar produto;
- excluir produto.

Rotas:

```text
GET /api/produtos
GET /api/produtos/:id
POST /api/produtos
PUT /api/produtos/:id
DELETE /api/produtos/:id
```

## CRUD Clientes

Testes realizados:

- listar clientes;
- buscar cliente por ID;
- criar cliente;
- atualizar cliente;
- excluir cliente.

Foi validado que cliente com venda vinculada não é excluído diretamente.

## CRUD Categorias

Testes realizados:

- listar categorias;
- buscar categoria por ID;
- criar categoria;
- atualizar categoria;
- excluir categoria.

Foi validado que categoria com produto vinculado não é excluída diretamente.

## Vendas

Testes realizados:

- criar venda com múltiplos itens;
- calcular total automaticamente;
- reduzir estoque;
- listar vendas;
- buscar venda por ID;
- cancelar venda;
- devolver estoque ao cancelar.

Resultado validado:

- ao criar venda, o estoque diminui;
- ao cancelar venda, o estoque volta.

## MongoDB e logs

Testes realizados:

- login gerando log;
- acesso às rotas gerando log;
- erro gerando log;
- consulta dos logs;
- filtros de logs.

Rotas:

```text
GET /api/logs
GET /api/logs/:id
```

## Exportação XML

Teste realizado:

```text
GET /api/logs/export/xml
```

Resultado esperado:

- download de arquivo XML;
- logs listados em estrutura XML;
- filtros funcionando.

## Importação e exportação JSON

Testes realizados:

```text
GET /api/json/export/clientes
POST /api/json/import/clientes
```

Resultado esperado:

- arquivo JSON exportado;
- arquivo JSON importado;
- registros inseridos no MySQL.

## Relatórios em PDF

Testes realizados:

```text
GET /api/relatorios/vendas
GET /api/relatorios/vendas/pdf
```

Resultado esperado:

- JSON do relatório retornado;
- PDF baixado corretamente;
- filtros por status funcionando.

## Dashboard

Testes realizados:

```text
GET /api/dashboard/completo
```

E tela:

```text
/dashboard
```

Resultado esperado:

- cards carregados;
- gráficos exibidos;
- produtos com baixo estoque listados.

## Testes pelo terminal

Exemplo de login com curl:

```bash
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"admin@admin.com","senha":"123456"}' | grep -o '"token":"[^"]*' | cut -d'"' -f4)
```

Teste do dashboard:

```bash
curl -H "Authorization: Bearer $TOKEN" http://localhost:3000/api/dashboard/completo
```

## Resultado final

Os testes principais foram validados:

- API funcionando;
- MySQL funcionando;
- MongoDB funcionando;
- autenticação funcionando;
- CRUDs funcionando;
- vendas funcionando;
- logs funcionando;
- exportações funcionando;
- relatórios funcionando;
- dashboard funcionando.
