# Arquitetura do Projeto

O projeto utiliza uma arquitetura em camadas, separando responsabilidades para facilitar manutenção, testes e evolução.

## Fluxo principal

```text
View → Router → Middleware → Controller → Service → DAO → Model → Database
```

## Camadas

### View

Arquivos HTML localizados em `public/html/`.

Telas principais:

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

A tela de produtos possui cadastro, edição, upload de imagem, pré-visualização e exibição da imagem na tabela.

### Router

Arquivos localizados em `src/routes/`.

Responsável por definir os endpoints da API e encaminhar as requisições para os controllers.

Exemplos:

```text
ProdutoRoutes.js
ClienteRoutes.js
CategoriaRoutes.js
VendaRoutes.js
LogRoutes.js
JsonRoutes.js
RelatorioRoutes.js
DashboardRoutes.js
```

No cadastro e edição de produtos, o Router aplica autenticação, permissão de ADMIN, upload da imagem e validação dos dados antes do Controller.

### Middleware

Arquivos localizados em `src/middlewares/`.

Middlewares principais:

```text
AuthMiddleware.js
LogMiddleware.js
ErrorMiddleware.js
UploadMiddleware.js
LoginValidationMiddleware.js
ProdutoValidationMiddleware.js
ClienteValidationMiddleware.js
CategoriaValidationMiddleware.js
VendaValidationMiddleware.js
```

Funções principais:

- validar token JWT;
- validar permissão ADMIN;
- validar dados enviados pelo usuário;
- registrar logs no MongoDB;
- tratar erros globais da aplicação;
- receber e validar imagens enviadas no cadastro/edição de produtos.

#### AuthMiddleware

Controla a autenticação e autorização.

Funções principais:

```text
verificarToken
verificarAdmin
```

O `verificarToken` valida o JWT enviado no header `Authorization`. O `verificarAdmin` bloqueia ações administrativas para usuários que não são ADMIN.

#### LogMiddleware

Registra requisições da API no MongoDB, contendo endpoint, método HTTP, status, IP, usuário, mensagem e tempo de resposta.

#### ValidationMiddleware

Valida os dados antes do Controller. O projeto possui validações específicas para login, produto, cliente, categoria e venda.

#### UploadMiddleware

Responsável pelo upload de imagens de produtos usando Multer.

Funções:

- cria a pasta `uploads/produtos`, caso ela não exista;
- salva a imagem com nome único;
- aceita JPG, PNG e WEBP;
- limita o tamanho do arquivo;
- envia o arquivo para o Controller por meio de `request.file`.

Fluxo do upload:

```text
produtos.html
    ↓
FormData
    ↓
ProdutoRoutes.js
    ↓
UploadMiddleware.js
    ↓
ProdutoController.js
    ↓
ProdutoService.js
    ↓
ProdutoDAO.js
    ↓
MySQL salva o caminho da imagem
```

A imagem é salva em:

```text
uploads/produtos/
```

O MySQL salva apenas o caminho:

```text
/uploads/produtos/nome-do-arquivo.png
```

#### ErrorMiddleware

Tratamento global de erros. Fica no final do `app.js`, depois de todas as rotas. Quando ocorre erro em Controller, Service, DAO ou Middleware, ele registra o erro no MongoDB e retorna JSON padronizado.

Exemplo:

```json
{
  "success": false,
  "message": "Mensagem do erro"
}
```

### Controller

Arquivos em `src/controllers/`.

Recebe a requisição, chama o Service e devolve resposta HTTP. Não concentra regra de negócio.

No caso dos produtos, o `ProdutoController` monta o caminho da imagem quando recebe `request.file`.

### Service

Arquivos em `src/services/`.

Responsável pelas regras de negócio, como login, criação de venda, baixa de estoque, cancelamento, relatórios e dashboard.

### DAO

Arquivos em `src/dao/`.

Responsável pelo acesso ao MySQL. No caso dos produtos, grava e atualiza também o campo `imagem`.

### Model

Arquivos em `src/models/`.

Representam entidades como `Usuario`, `Produto`, `Cliente`, `Categoria`, `Venda` e `Log`. O Model Produto possui atributo `imagem`.

### Database

Arquivos em `src/database/`.

```text
MySqlDatabase.js
MongoDatabase.js
```

## Arquivos estáticos

O `app.js` libera:

```text
public/ → telas HTML, CSS e JavaScript
uploads/ → imagens enviadas no cadastro de produtos
```

## Bancos utilizados

### MySQL

Banco principal. Armazena usuários, clientes, categorias, produtos, vendas, itens de venda e caminho das imagens.

### MongoDB

Banco auxiliar usado para logs de acessos, login, erros, cadastros, atualizações, exclusões e cancelamentos.

## Resumo

O sistema segue a arquitetura solicitada com View, Router, Middleware, Controller, Service, DAO, Model e Database. Também possui JWT, logs no MongoDB, validações, ErrorMiddleware, UploadMiddleware com Multer e exibição de imagens dos produtos.
