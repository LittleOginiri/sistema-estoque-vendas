# Testes Realizados

Este documento resume os testes feitos durante o desenvolvimento do projeto.

## Ambiente

O projeto foi testado em Linux e Windows com:

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

## Inicialização

```bash
npm install
npm run dev
```

Resultado esperado:

```text
API rodando em: http://localhost:3000
MongoDB conectado com sucesso.
```

## Saúde da API

```text
GET /api/health
```

Resultado esperado:

```json
{
  "success": true
}
```

## Login

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

- token JWT retornado;
- dados do usuário administrador.

## Middlewares

### AuthMiddleware

Testes:

- acessar rota protegida sem token;
- acessar rota protegida com token válido;
- acessar rota administrativa com ADMIN;
- tentar acessar rota administrativa sem permissão.

Resultado esperado:

- sem token: bloqueado;
- token válido: liberado;
- ADMIN: liberado;
- sem permissão: erro 403.

### LogMiddleware

Testes:

- login gerando log;
- acesso às rotas gerando log;
- cadastro, edição e exclusão gerando log;
- erro gerando log.

Resultado esperado:

- logs salvos no MongoDB;
- registro com endpoint, método, status, usuário, IP e mensagem.

### ValidationMiddleware

Testes:

- cadastrar produto sem campos obrigatórios;
- cadastrar cliente sem nome;
- cadastrar categoria sem nome;
- criar venda sem itens;
- login sem email ou senha.

Resultado esperado:

- requisição bloqueada antes do Controller;
- mensagem de validação retornada.

### UploadMiddleware

Testes:

- cadastrar produto com imagem JPG, PNG ou WEBP;
- editar produto enviando nova imagem;
- verificar pré-visualização no formulário;
- verificar imagem exibida na tabela;
- verificar arquivo salvo em `uploads/produtos`;
- tentar enviar formato inválido.

Resultado esperado:

- imagem aceita nos formatos permitidos;
- arquivo salvo no servidor;
- caminho salvo no campo `imagem`;
- imagem exibida na listagem;
- formato inválido bloqueado.

### ErrorMiddleware

Testes:

- gerar erro em rota/operação inválida;
- verificar JSON padronizado;
- verificar log de erro no MongoDB.

Exemplo esperado:

```json
{
  "success": false,
  "message": "Mensagem do erro"
}
```

## CRUD Produtos

Testes:

- listar produtos;
- buscar produto por ID;
- criar produto;
- atualizar produto;
- excluir produto;
- cadastrar produto com imagem;
- exibir imagem na tabela;
- pré-visualizar imagem no formulário.

Rotas:

```text
GET /api/produtos
GET /api/produtos/:id
POST /api/produtos
PUT /api/produtos/:id
DELETE /api/produtos/:id
```

## CRUD Clientes

Testes:

- listar clientes;
- buscar cliente por ID;
- criar cliente;
- atualizar cliente;
- excluir cliente.

Foi validado que cliente com venda vinculada não é excluído diretamente.

## CRUD Categorias

Testes:

- listar categorias;
- buscar categoria por ID;
- criar categoria;
- atualizar categoria;
- excluir categoria.

Foi validado que categoria com produto vinculado não é excluída diretamente.

## Vendas

Testes:

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

```text
GET /api/logs
GET /api/logs/:id
```

Testes:

- login gerando log;
- acesso às rotas gerando log;
- erro gerando log;
- filtros de logs.

## Exportação XML

```text
GET /api/logs/export/xml
```

Resultado esperado:

- download do XML;
- logs em estrutura XML;
- filtros funcionando.

## Importação e exportação JSON

```text
GET /api/json/export/clientes
POST /api/json/import/clientes
```

Resultado esperado:

- arquivo JSON exportado;
- arquivo JSON importado;
- registros inseridos no MySQL.

## Relatórios em PDF

```text
GET /api/relatorios/vendas
GET /api/relatorios/vendas/pdf
```

Resultado esperado:

- JSON retornado;
- PDF baixado corretamente;
- filtros por status funcionando.

## Dashboard

```text
GET /api/dashboard/completo
```

Tela:

```text
/dashboard
```

Resultado esperado:

- cards carregados;
- gráficos exibidos;
- produtos com baixo estoque listados.

## Resultado final

Os testes principais foram validados:

- API funcionando;
- MySQL funcionando;
- MongoDB funcionando;
- autenticação funcionando;
- CRUDs funcionando;
- vendas funcionando;
- logs funcionando;
- middlewares funcionando;
- upload e exibição de imagens funcionando;
- exportações funcionando;
- relatórios funcionando;
- dashboard funcionando.
