# Arquitetura do Projeto

O projeto utiliza uma arquitetura em camadas, separando responsabilidades para facilitar manutenção, testes e evolução.

## Fluxo principal

```text
View → Router → Middleware → Controller → Service → DAO → Model → Database
```

## Camadas

### View

Arquivos HTML localizados em:

```text
public/html/
```

Responsável pelas telas acessadas pelo navegador.

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

### Router

Arquivos localizados em:

```text
src/routes/
```

Responsável por definir os endpoints da API e encaminhar as requisições para os controllers.

Exemplos:

```text
ProdutoRoutes.js
ClienteRoutes.js
CategoriaRoutes.js
VendaRoutes.js
DashboardRoutes.js
```

### Middleware

Arquivos localizados em:

```text
src/middlewares/
```

Responsável por validações e tarefas intermediárias.

Exemplos:

```text
AuthMiddleware.js
ProdutoValidationMiddleware.js
ClienteValidationMiddleware.js
CategoriaValidationMiddleware.js
VendaValidationMiddleware.js
LogMiddleware.js
```

Funções principais:

- validar token JWT;
- validar permissão ADMIN;
- validar dados enviados;
- registrar logs no MongoDB.

### Controller

Arquivos localizados em:

```text
src/controllers/
```

Responsável por receber a requisição, chamar o service e devolver a resposta HTTP.

O controller não deve concentrar regras de negócio.

### Service

Arquivos localizados em:

```text
src/services/
```

Responsável pelas regras de negócio.

Exemplos:

- validação de login;
- criação de venda;
- baixa de estoque;
- cancelamento de venda;
- geração de relatórios;
- montagem de dashboard.

### DAO

Arquivos localizados em:

```text
src/dao/
```

Responsável pelo acesso ao banco de dados MySQL.

O DAO executa os comandos SQL e isola a persistência do restante da aplicação.

### Model

Arquivos localizados em:

```text
src/models/
```

Representam as entidades do sistema.

Exemplos:

```text
Usuario.js
Produto.js
Cliente.js
Categoria.js
Venda.js
Log.js
```

### Database

Arquivos localizados em:

```text
src/database/
```

Responsáveis pela conexão com os bancos de dados.

```text
MySqlDatabase.js
MongoDatabase.js
```

## Bancos utilizados

### MySQL

Banco principal da aplicação.

Armazena:

- usuários;
- clientes;
- categorias;
- produtos;
- vendas;
- itens de venda.

### MongoDB

Banco auxiliar usado apenas para logs.

Armazena:

- acessos;
- login;
- erros;
- cadastros;
- atualizações;
- exclusões;
- cancelamentos.

## Resumo

A arquitetura foi construída para seguir o padrão solicitado na disciplina, mantendo o código organizado em camadas e separando as regras de negócio do acesso ao banco e das rotas.
