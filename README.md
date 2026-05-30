# Sistema de Estoque e Vendas

Projeto full-stack desenvolvido para a disciplina **Programação para Internet**.

O sistema tem como objetivo controlar produtos, clientes, categorias, vendas, usuários, relatórios e logs de operação, utilizando uma arquitetura em camadas e integração com banco de dados relacional e não relacional.

---

## Tecnologias utilizadas

### Backend

- Node.js
- Express
- MySQL
- MongoDB
- JWT
- Bcrypt
- Multer
- PDFKit
- XMLBuilder2

### Frontend

- HTML5
- CSS3
- JavaScript
- Bootstrap
- Chart.js

### Banco de Dados

- MySQL: dados principais do sistema
- MongoDB: registro de logs da aplicação

---

## Arquitetura do projeto

O projeto segue a arquitetura em camadas:

```text
View
Router
Middleware
Controller
Service
DAO
Model
Database
```

Cada camada possui uma responsabilidade específica:

- **View:** telas HTML acessadas pelo usuário.
- **Router:** define as rotas da API.
- **Middleware:** valida autenticação, autorização, dados e logs.
- **Controller:** recebe a requisição e retorna a resposta.
- **Service:** concentra regras de negócio.
- **DAO:** acessa o banco de dados.
- **Model:** representa as entidades do sistema.
- **Database:** gerencia a conexão com MySQL e MongoDB.

---

## Funcionalidades implementadas

### Autenticação

- Login com JWT.
- Validação de token.
- Controle de acesso por tipo de usuário.
- Usuário ADMIN e usuário COMUM.

Rotas principais:

```text
POST /api/auth/login
GET /api/auth/me
```

### Produtos

CRUD completo de produtos:

```text
GET /api/produtos
GET /api/produtos/:id
POST /api/produtos
PUT /api/produtos/:id
DELETE /api/produtos/:id
```

### Clientes

CRUD completo de clientes:

```text
GET /api/clientes
GET /api/clientes/:id
POST /api/clientes
PUT /api/clientes/:id
DELETE /api/clientes/:id
```

O sistema respeita integridade referencial. Clientes com vendas vinculadas não podem ser removidos diretamente.

### Categorias

CRUD completo de categorias:

```text
GET /api/categorias
GET /api/categorias/:id
POST /api/categorias
PUT /api/categorias/:id
DELETE /api/categorias/:id
```

Categorias com produtos vinculados não podem ser removidas diretamente.

### Vendas e Itens de Venda

O sistema permite cadastrar vendas com múltiplos produtos.

Rotas:

```text
GET /api/vendas
GET /api/vendas/:id
POST /api/vendas
DELETE /api/vendas/:id
```

Regras implementadas:

- cálculo automático do total da venda;
- registro dos itens vendidos;
- baixa automática no estoque;
- cancelamento de venda;
- devolução automática do estoque ao cancelar;
- validação de estoque disponível.

O relacionamento entre vendas e produtos é feito pela tabela intermediária `itens_venda`.

### MongoDB e Logs

O MongoDB é usado para registrar logs da aplicação.

São registrados:

- login;
- acesso às rotas;
- cadastros;
- atualizações;
- exclusões;
- cancelamentos;
- erros;
- método HTTP;
- endpoint;
- usuário autenticado;
- IP;
- status code;
- data e hora.

Rotas:

```text
GET /api/logs
GET /api/logs/:id
```

### Exportação XML dos logs

O sistema permite exportar os logs do MongoDB em XML.

Rota:

```text
GET /api/logs/export/xml
```

Filtros disponíveis:

```text
/api/logs/export/xml?acao=LOGIN
/api/logs/export/xml?metodo=POST
/api/logs/export/xml?status_code=200
/api/logs/export/xml?id_usuario=1
/api/logs/export/xml?data_inicio=2026-05-01&data_fim=2026-05-31
```

### Importação e exportação JSON

O sistema permite exportar dados do MySQL em JSON e importar arquivos JSON.

Rotas:

```text
GET /api/json/export/:entidade
POST /api/json/import/:entidade
```

Entidades disponíveis para exportação:

```text
usuarios
clientes
categorias
produtos
vendas
itens_venda
```

Entidades liberadas para importação direta:

```text
usuarios
clientes
categorias
produtos
```

A importação de vendas é feita somente pela rotina própria de vendas, para preservar as regras de estoque e itens.

### Relatórios em PDF

O sistema gera relatório de vendas em PDF.

Rotas:

```text
GET /api/relatorios/vendas
GET /api/relatorios/vendas/pdf
```

Filtros disponíveis:

```text
/api/relatorios/vendas?status=FINALIZADA
/api/relatorios/vendas?status=CANCELADA
/api/relatorios/vendas?data_inicio=2026-05-01&data_fim=2026-05-31
```

O relatório apresenta:

- quantidade de vendas;
- total geral;
- lista de vendas;
- produtos mais vendidos.

### Dashboard

Foi implementado um dashboard com cards e gráficos.

Tela:

```text
http://localhost:3000/dashboard
```

Rotas:

```text
GET /api/dashboard/resumo
GET /api/dashboard/vendas-por-status
GET /api/dashboard/produtos-mais-vendidos
GET /api/dashboard/vendas-por-dia
GET /api/dashboard/estoque-por-categoria
GET /api/dashboard/produtos-baixo-estoque
GET /api/dashboard/completo
```

O dashboard apresenta:

- total de vendas;
- total vendido;
- produtos ativos;
- valor em estoque;
- vendas por status;
- vendas por dia;
- produtos mais vendidos;
- estoque por categoria;
- produtos com baixo estoque.

---

## Banco de Dados MySQL

Nome do banco:

```text
estoque_vendas
```

Tabelas principais:

```text
usuarios
clientes
categorias
produtos
vendas
itens_venda
```

Relacionamentos:

```text
usuarios 1:N vendas
clientes 1:N vendas
categorias 1:N produtos
vendas N:N produtos
vendas 1:N itens_venda
produtos 1:N itens_venda
```

O MySQL é o banco principal da aplicação.

---

## MongoDB

O MongoDB é utilizado apenas para logs.

Banco:

```text
estoque_vendas_logs
```

Coleção:

```text
logs
```

---

## Usuários iniciais

Usuário administrador:

```text
E-mail: admin@admin.com
Senha: 123456
Tipo: ADMIN
```

Usuário comum:

```text
E-mail: usuario@teste.com
Senha: 123456
Tipo: COMUM
```

---

## Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/LittleOginiri/sistema-estoque-vendas.git
cd sistema-estoque-vendas
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar o `.env`

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`.

Exemplo:

```env
PORT=3000

MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=sua_senha
MYSQL_DATABASE=estoque_vendas

JWT_SECRET=chave_secreta_para_desenvolvimento
JWT_EXPIRES_IN=1d

MONGO_URI=mongodb://127.0.0.1:27017/estoque_vendas_logs
```

### 4. Rodar o projeto

```bash
npm run dev
```

A API ficará disponível em:

```text
http://localhost:3000
```

---

## Telas disponíveis

```text
/login
/produtos
/clientes
/categorias
/vendas
/logs
/json
/relatorios
/dashboard
```

---

## Testes realizados

Durante o desenvolvimento foram testados:

- conexão com MySQL;
- conexão com MongoDB;
- login com JWT;
- rotas protegidas;
- CRUD de produtos;
- CRUD de clientes;
- CRUD de categorias;
- cadastro de vendas;
- baixa de estoque;
- cancelamento de vendas;
- devolução de estoque;
- logs no MongoDB;
- exportação XML;
- importação/exportação JSON;
- relatório PDF;
- dashboard com gráficos.

---

## Evolução do projeto

O projeto foi desenvolvido por versões:

```text
v1 - Estrutura base da API
v2 - Conexão com MySQL
v3 - Login com JWT
v4 - CRUD de Produtos
v5 - CRUD de Clientes
v6 - CRUD de Categorias
v7 - Vendas e ItensVenda
v8 - MongoDB com logs
v9 - Exportação XML dos logs
v10 - Importação e exportação JSON
v11 - Relatórios em PDF
v12 - Dashboard com gráficos
```

---

## Observações

- O arquivo `.env` não deve ser enviado para o GitHub.
- A pasta `node_modules` não deve ser enviada para o GitHub.
- O MySQL armazena os dados principais.
- O MongoDB armazena apenas logs.
- As rotas administrativas exigem token JWT de usuário ADMIN.

---
