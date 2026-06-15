# Guia de Entrega

Este arquivo resume os pontos principais para apresentar o projeto.

## Projeto

Sistema de Controle de Estoque e Vendas.

## Objetivo

Criar uma aplicação web full-stack para controlar produtos, clientes, categorias, vendas, relatórios e logs.

## Tecnologias

- Node.js
- Express
- MySQL
- MongoDB
- HTML
- CSS
- JavaScript
- Bootstrap
- Chart.js
- JWT
- PDFKit
- XMLBuilder2
- Multer

## Bancos de dados

### MySQL

Usado como banco principal.

Armazena usuários, clientes, categorias, produtos, vendas, itens de venda e caminho das imagens dos produtos.

### MongoDB

Usado para logs de acesso, login, erros, cadastros, alterações, exclusões e cancelamentos.

## Arquitetura

```text
View → Router → Middleware → Controller → Service → DAO → Model → Database
```

## Middlewares

Principais middlewares:

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

Funções:

- autenticar usuário com JWT;
- verificar permissão ADMIN;
- validar dados de entrada;
- registrar logs no MongoDB;
- tratar erros globais;
- processar upload de imagens dos produtos.

## Funcionalidades principais

- login com JWT;
- permissões ADMIN e COMUM;
- CRUD de produtos;
- upload de imagem no cadastro/edição de produtos;
- exibição da imagem na listagem de produtos;
- CRUD de clientes;
- CRUD de categorias;
- cadastro de vendas;
- baixa automática de estoque;
- cancelamento de vendas;
- devolução de estoque;
- logs no MongoDB;
- exportação XML;
- importação/exportação JSON;
- relatório PDF;
- dashboard com gráficos.

## Telas

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

## Upload de imagem

Funcionamento:

```text
Usuário escolhe imagem no formulário
    ↓
Frontend envia com FormData
    ↓
UploadMiddleware recebe o arquivo com Multer
    ↓
Imagem é salva em uploads/produtos
    ↓
ProdutoController monta o caminho
    ↓
MySQL salva o caminho no campo imagem
    ↓
Tela de produtos exibe a imagem
```

Formatos aceitos:

```text
JPG
PNG
WEBP
```

## Usuário de teste

```text
E-mail: admin@admin.com
Senha: 123456
Tipo: ADMIN
```

## Como rodar

```bash
npm install
npm run dev
```

Acessar:

```text
http://localhost:3000
```

Telas úteis:

```text
http://localhost:3000/login
http://localhost:3000/produtos
http://localhost:3000/vendas
http://localhost:3000/logs
http://localhost:3000/json
http://localhost:3000/relatorios
http://localhost:3000/dashboard
```

## Cuidados

Não enviar para o GitHub:

```text
.env
node_modules/
```

## Status final

O sistema está funcional e validado até a versão 12.4.

Pontos validados:

- autenticação com JWT;
- CRUDs principais;
- venda com baixa de estoque;
- cancelamento com devolução de estoque;
- logs no MongoDB;
- exportação XML;
- importação/exportação JSON;
- relatório PDF;
- dashboard com gráficos;
- upload e exibição de imagens dos produtos;
- middlewares principais funcionando.
