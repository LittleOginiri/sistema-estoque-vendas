# Sistema de Controle de Estoque e Vendas

Projeto desenvolvido para a disciplina **Programação para Internet**, com o objetivo de criar uma aplicação web full-stack para gerenciamento de estoque, clientes, categorias, vendas, relatórios e logs do sistema.

A aplicação foi construída usando **Node.js**, **Express**, **MySQL**, **MongoDB**, **HTML**, **CSS**, **JavaScript** e **Bootstrap**, seguindo uma organização em camadas para separar as responsabilidades do sistema.

---

## 1. Introdução à aplicação

O **Sistema de Controle de Estoque e Vendas** é uma aplicação web criada para simular o funcionamento de um sistema administrativo de uma loja ou empresa.

Com ele, o usuário consegue:

- fazer login no sistema;
- cadastrar, listar, editar e remover produtos;
- cadastrar, listar, editar e remover clientes;
- cadastrar, listar, editar e remover categorias;
- registrar vendas com um ou mais produtos;
- atualizar automaticamente o estoque;
- cancelar vendas e devolver o estoque;
- visualizar logs de uso do sistema;
- exportar dados em JSON;
- importar dados em JSON;
- exportar logs em XML;
- gerar relatório de vendas em PDF;
- visualizar um dashboard com gráficos e indicadores.

A aplicação foi pensada para demonstrar o uso conjunto de frontend, backend, banco relacional, banco NoSQL, autenticação, validação, logs e geração de relatórios.

---

## 2. O que foi pedido no projeto

O projeto atende aos principais pontos solicitados para uma aplicação web com backend, frontend e banco de dados.

Entre os requisitos trabalhados, estão:

- aplicação web com Node.js e Express;
- conexão com banco de dados MySQL;
- uso de MongoDB para logs;
- sistema de login com autenticação;
- controle de usuários;
- separação entre usuário ADMIN e usuário COMUM;
- CRUD de entidades principais;
- uso de arquitetura em camadas;
- validações no backend;
- rotas protegidas por token JWT;
- relacionamento entre tabelas;
- controle de estoque;
- cadastro de vendas com itens;
- relatórios;
- importação e exportação de arquivos;
- dashboard com gráficos;
- documentação do projeto;
- organização do código em pastas.

A aplicação também segue uma divisão em camadas:

```text
View → Router → Middleware → Controller → Service → DAO → Model → Database
```

Essa divisão ajuda a deixar o projeto mais organizado e mais fácil de entender.

---

## 3. Pontos fortes do sistema

Os principais pontos fortes da aplicação são:

### Organização em camadas

O projeto separa bem as responsabilidades:

- `routes`: define as rotas da API;
- `middlewares`: valida token, permissões e dados;
- `controllers`: recebem as requisições;
- `services`: concentram as regras de negócio;
- `dao`: acessam o banco MySQL;
- `models`: representam as entidades;
- `database`: controla as conexões com os bancos.

### Uso de dois bancos de dados

O sistema usa:

```text
MySQL → dados principais do sistema
MongoDB → logs da aplicação
```

Isso demonstra o uso de banco relacional e banco NoSQL no mesmo projeto.

### Autenticação com JWT

O login gera um token JWT, usado para acessar rotas protegidas.

### Controle de estoque

Ao cadastrar uma venda, o sistema reduz automaticamente o estoque dos produtos vendidos.

Ao cancelar uma venda, o sistema devolve o estoque.

### Relatórios e exportações

O sistema permite:

- exportar dados em JSON;
- importar dados em JSON;
- exportar logs em XML;
- gerar relatório de vendas em PDF.

### Dashboard

A aplicação possui uma tela de dashboard com:

- resumo de vendas;
- total vendido;
- quantidade de produtos;
- valor em estoque;
- vendas por status;
- vendas por dia;
- produtos mais vendidos;
- estoque por categoria;
- produtos com baixo estoque.

### Interface com navegação

O frontend possui menu de navegação entre as principais telas:

```text
Dashboard | Produtos | Clientes | Categorias | Vendas | Logs | JSON | Relatórios | Sair
```

---

## 4. Tecnologias utilizadas

### Backend

- Node.js
- Express
- MySQL2
- MongoDB / Mongoose
- JWT
- bcrypt
- dotenv
- cors
- multer
- pdfkit
- xmlbuilder2

### Frontend

- HTML
- CSS
- JavaScript
- Bootstrap
- Chart.js

### Banco de dados

- MySQL
- MongoDB

### Ferramentas de apoio

- Git
- GitHub
- Insomnia, Bruno ou Postman
- Terminal
- Navegador Google Chrome

---

## 5. Dependências do projeto

As dependências principais estão no arquivo `package.json`.

Para instalar todas as dependências do projeto, use:

```bash
npm install
```

Principais dependências usadas:

```text
bcrypt
cors
dotenv
express
jsonwebtoken
mongodb
mongoose
multer
mysql2
pdfkit
xmlbuilder2
```

Dependência de desenvolvimento:

```text
nodemon
```

---

## 6. O que é necessário para rodar

Para rodar a aplicação, é necessário ter instalado:

```text
Node.js
npm
MySQL
MongoDB
Git
Navegador
```

Também é necessário criar o banco MySQL e configurar o arquivo `.env`.

---

## 7. Como rodar no Windows

### 7.1 Instalar os programas

No Windows, instale:

- Node.js LTS;
- MySQL Server;
- MySQL Workbench, se quiser uma interface visual;
- MongoDB Community Server;
- Git;
- Google Chrome;
- Insomnia, Bruno ou Postman, se quiser testar a API.

### 7.2 Baixar o projeto

Você pode baixar o projeto pelo GitHub ou extrair o `.zip`.

Pelo GitHub:

```bash
git clone https://github.com/LittleOginiri/sistema-estoque-vendas.git
```

Depois entre na pasta:

```bash
cd sistema-estoque-vendas
```

### 7.3 Instalar as dependências

```bash
npm install
```

### 7.4 Configurar o banco MySQL

Crie o banco usando o script SQL do projeto, se disponível na pasta:

```text
scripts/
```

O banco principal deve se chamar:

```text
estoque_vendas
```

### 7.5 Configurar o `.env`

Crie um arquivo chamado `.env` na raiz do projeto.

Exemplo:

```env
PORT=3000

MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=sua_senha
MYSQL_DATABASE=estoque_vendas

MONGO_URI=mongodb://localhost:27017/estoque_vendas_logs

JWT_SECRET=segredo_do_projeto
JWT_EXPIRES_IN=1d
```

Altere `MYSQL_PASSWORD` de acordo com a senha do seu MySQL.

### 7.6 Iniciar o projeto

```bash
npm run dev
```

Se tudo estiver correto, o terminal deve mostrar algo parecido com:

```text
API rodando em: http://localhost:3000
MongoDB conectado com sucesso.
```

Depois acesse no navegador:

```text
http://localhost:3000/login
```

---

## 8. Como rodar no Linux

### 8.1 Instalar Node.js, npm, MySQL, MongoDB e Git

Em distribuições baseadas em Ubuntu, use:

```bash
sudo apt update
sudo apt install nodejs npm mysql-server git
```

Para verificar as versões:

```bash
node -v
npm -v
mysql --version
git --version
```

### 8.2 Instalar ou ativar o MongoDB

Dependendo da distribuição, o MongoDB pode precisar ser instalado pelo repositório oficial.

Após instalar, tente iniciar o serviço:

```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

Verifique o status:

```bash
sudo systemctl status mongod
```

### 8.3 Baixar o projeto

Pelo GitHub:

```bash
git clone https://github.com/LittleOginiri/sistema-estoque-vendas.git
```

Entrar na pasta:

```bash
cd sistema-estoque-vendas
```

Se estiver usando uma pasta com espaço no nome, use aspas:

```bash
cd "/home/nome/Área de trabalho/estoque-vendas"
```

### 8.4 Instalar dependências

```bash
npm install
```

### 8.5 Configurar o MySQL

Acesse o MySQL:

```bash
sudo mysql
```

Ou, se estiver usando senha:

```bash
mysql -u root -p
```

Crie o banco e execute o script SQL do projeto.

O banco deve se chamar:

```text
estoque_vendas
```

### 8.6 Criar o arquivo `.env`

Na raiz do projeto, crie o arquivo:

```bash
nano .env
```

Exemplo de configuração:

```env
PORT=3000

MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=sua_senha
MYSQL_DATABASE=estoque_vendas

MONGO_URI=mongodb://localhost:27017/estoque_vendas_logs

JWT_SECRET=segredo_do_projeto
JWT_EXPIRES_IN=1d
```

Salvar no `nano`:

```text
Ctrl + O
Enter
Ctrl + X
```

### 8.7 Iniciar a aplicação

```bash
npm run dev
```

Acessar no navegador:

```text
http://localhost:3000/login
```

---

## 9. Como iniciar a aplicação

Depois de instalar as dependências e configurar o `.env`, use:

```bash
npm run dev
```

A aplicação será iniciada na porta configurada no `.env`.

Por padrão:

```text
http://localhost:3000
```

A tela inicial de uso é:

```text
http://localhost:3000/login
```

---

## 10. O que o usuário verá ao rodar a aplicação

Ao acessar o sistema, o usuário verá primeiro a tela de login.

### Tela de login

A tela possui:

- campo de e-mail;
- campo de senha;
- botão Entrar;
- opção "Esqueceu sua senha?".

Usuários de teste:

```text
Administrador
E-mail: admin@admin.com
Senha: 123456

Usuário comum
E-mail: usuario@teste.com
Senha: 123456
```

Após o login, o usuário é redirecionado para o dashboard.

### Menu principal

Depois de entrar, aparece um menu superior com as opções:

```text
Dashboard
Produtos
Clientes
Categorias
Vendas
Logs
JSON
Relatórios
Sair
```

---

## 11. Tutorial rápido de uso

### 11.1 Fazer login

Acesse:

```text
http://localhost:3000/login
```

Use:

```text
admin@admin.com
123456
```

Clique em **Entrar**.

---

### 11.2 Usar o dashboard

Após o login, o sistema abre a tela:

```text
/dashboard
```

Nessa tela, o usuário pode visualizar:

- quantidade de vendas;
- total vendido;
- produtos ativos;
- valor em estoque;
- gráficos de vendas;
- produtos com baixo estoque.

---

### 11.3 Cadastrar uma categoria

Acesse:

```text
/categorias
```

Preencha:

```text
Nome da categoria
Descrição
```

Clique em **Salvar**.

Exemplo:

```text
Nome: Informática
Descrição: Produtos de tecnologia
```

---

### 11.4 Cadastrar um produto

Acesse:

```text
/produtos
```

Preencha:

```text
ID Categoria
Nome do produto
Preço
Estoque
Descrição
```

Exemplo:

```text
ID Categoria: 1
Nome: Mouse Gamer
Preço: 89.90
Estoque: 25
Descrição: Mouse USB com RGB
```

Clique em **Salvar**.

---

### 11.5 Cadastrar um cliente

Acesse:

```text
/clientes
```

Preencha:

```text
Nome
E-mail
Telefone
CPF
```

Exemplo:

```text
Nome: João Silva
E-mail: joao@email.com
Telefone: (12) 99999-1111
CPF: 111.111.111-11
```

Clique em **Salvar**.

---

### 11.6 Realizar uma venda

Acesse:

```text
/vendas
```

Preencha:

```text
ID Cliente
ID Produto 1
Quantidade 1
```

Exemplo:

```text
ID Cliente: 1
ID Produto 1: 1
Quantidade 1: 2
```

Clique em **Cadastrar Venda**.

O sistema irá:

- registrar a venda;
- calcular o total;
- baixar o estoque automaticamente.

---

### 11.7 Cancelar uma venda

Na tela de vendas, clique em **Cancelar** na venda desejada.

O sistema irá:

- alterar o status da venda para `CANCELADA`;
- devolver os produtos ao estoque.

---

### 11.8 Consultar logs

Acesse:

```text
/logs
```

Nessa tela, é possível visualizar os logs do sistema e exportar em XML.

---

### 11.9 Exportar e importar JSON

Acesse:

```text
/json
```

Nessa tela, é possível:

- exportar dados de usuários, clientes, categorias, produtos, vendas e itens;
- importar dados de usuários, clientes, categorias e produtos.

---

### 11.10 Gerar relatório em PDF

Acesse:

```text
/relatorios
```

Escolha os filtros desejados e clique em:

```text
Baixar PDF
```

O sistema gera um relatório de vendas.

---

## 12. Rotas principais da aplicação

### Telas

```text
/login
/dashboard
/produtos
/clientes
/categorias
/vendas
/logs
/json
/relatorios
```

### API

```text
/api/auth/login
/api/auth/me
/api/produtos
/api/clientes
/api/categorias
/api/vendas
/api/logs
/api/json
/api/relatorios
/api/dashboard
```

---

## 13. Estrutura de pastas

Estrutura geral do projeto:

```text
estoque-vendas/
├── app.js
├── package.json
├── .env.example
├── public/
│   ├── html/
│   ├── js/
│   └── css/
├── src/
│   ├── controllers/
│   ├── dao/
│   ├── database/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── services/
├── scripts/
├── docs/
└── uploads/
```

---

## 14. Observações importantes

O arquivo `.env` não deve ser enviado a outra pessoa.

A pasta `node_modules` também não deve ser enviada.

---

## 15. Comandos úteis

### Instalar dependências

```bash
npm install
```

### Rodar em modo desenvolvimento

```bash
npm run dev
```

### Rodar diretamente com Node

```bash
node app.js
```

### Verificar status do Git

```bash
git status
```

### Enviar alterações para o GitHub

```bash
git add .
git commit -m "Atualiza projeto"
git push
```

---

## 16. Status do projeto

O projeto está funcional com:

- login;
- dashboard;
- CRUD de produtos;
- CRUD de clientes;
- CRUD de categorias;
- vendas;
- controle de estoque;
- logs;
- XML;
- JSON;
- PDF;
- documentação;
- navegação no frontend.

Versão atual:

```text
v12.3
```

---

## 17. Autor

Projeto desenvolvido por:

```text
João Victor de Campos e João Pedro Martins
```

Disciplina:

```text
Programação para Internet
```
