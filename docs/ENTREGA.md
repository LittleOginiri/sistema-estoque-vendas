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

Armazena:

- usuários;
- clientes;
- categorias;
- produtos;
- vendas;
- itens de venda.

### MongoDB

Usado apenas para logs.

Armazena:

- acessos;
- login;
- erros;
- cadastros;
- alterações;
- exclusões;
- cancelamentos.

## Arquitetura

O projeto segue arquitetura em camadas:

```text
View → Router → Middleware → Controller → Service → DAO → Model → Database
```

## Funcionalidades principais

- login com JWT;
- CRUD de produtos;
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

## Cuidados

Não enviar para o GitHub:

```text
.env
node_modules/
```

## Status final

O sistema está funcional e validado até a versão 12.
