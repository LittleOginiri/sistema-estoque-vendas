# Banco de Dados

## Banco principal

O sistema usa MySQL como banco principal.

Nome do banco:

```text
estoque_vendas
```

## Tabelas

O banco possui 6 tabelas principais:

```text
usuarios
clientes
categorias
produtos
vendas
itens_venda
```

## Tabela usuarios

Armazena os usuários do sistema.

Campos principais:

```text
id_usuario
nome
email
senha
tipo
ativo
criado_em
atualizado_em
```

Tipos de usuário:

```text
ADMIN
COMUM
```

Usuários iniciais:

```text
admin@admin.com / 123456 / ADMIN
usuario@teste.com / 123456 / COMUM
```

## Tabela clientes

Armazena os clientes cadastrados.

Campos principais:

```text
id_cliente
nome
email
telefone
cpf
ativo
criado_em
atualizado_em
```

Relacionamento:

```text
clientes 1:N vendas
```

Um cliente pode ter várias vendas.

## Tabela categorias

Armazena as categorias dos produtos.

Campos principais:

```text
id_categoria
nome
descricao
ativo
criado_em
atualizado_em
```

Relacionamento:

```text
categorias 1:N produtos
```

Uma categoria pode ter vários produtos.

## Tabela produtos

Armazena os produtos do estoque.

Campos principais:

```text
id_produto
id_categoria
nome
descricao
preco
estoque
imagem
ativo
criado_em
atualizado_em
```

Relacionamento:

```text
produtos N:N vendas
```

Esse relacionamento passa pela tabela `itens_venda`.

## Tabela vendas

Armazena as vendas realizadas.

Campos principais:

```text
id_venda
id_cliente
id_usuario
data_venda
total
status
```

Status possíveis:

```text
ABERTA
FINALIZADA
CANCELADA
```

Relacionamentos:

```text
clientes 1:N vendas
usuarios 1:N vendas
vendas 1:N itens_venda
```

## Tabela itens_venda

Tabela intermediária entre vendas e produtos.

Campos principais:

```text
id_item_venda
id_venda
id_produto
quantidade
preco_unitario
subtotal
```

Relacionamentos:

```text
vendas 1:N itens_venda
produtos 1:N itens_venda
```

Essa tabela permite que uma venda tenha vários produtos e que um produto apareça em várias vendas.

## Integridade referencial

O banco usa chaves estrangeiras para garantir integridade.

Regras importantes:

- cliente com venda vinculada não pode ser excluído diretamente;
- categoria com produto vinculado não pode ser excluída diretamente;
- produto usado em venda não pode ser excluído diretamente;
- ao excluir/cancelar uma venda, o estoque é tratado pela regra da aplicação.

## MongoDB

O MongoDB é usado apenas para logs.

Banco:

```text
estoque_vendas_logs
```

Coleção:

```text
logs
```

Campos principais dos logs:

```text
acao
endpoint
metodo
status_code
ip
usuario
mensagem
erro
body
criado_em
atualizado_em
```

## Papel de cada banco

```text
MySQL → dados principais e relacionais do sistema
MongoDB → histórico de logs e eventos da aplicação
```
