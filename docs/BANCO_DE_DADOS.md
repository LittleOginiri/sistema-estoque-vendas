# Banco de Dados

## Banco principal

O sistema usa MySQL como banco principal.

Nome do banco:

```text
estoque_vendas
```

## Tabelas

```text
usuarios
clientes
categorias
produtos
vendas
itens_venda
```

## usuarios

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

Tipos:

```text
ADMIN
COMUM
```

Usuários iniciais:

```text
admin@admin.com / 123456 / ADMIN
usuario@teste.com / 123456 / COMUM
```

## clientes

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

## categorias

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

## produtos

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

O campo `imagem` armazena o caminho da imagem salva no servidor.

Exemplo:

```text
/uploads/produtos/17123456789-123456789.png
```

A imagem física fica na pasta:

```text
uploads/produtos/
```

O banco guarda apenas o caminho da imagem, evitando salvar arquivos binários diretamente no MySQL.

Relacionamentos:

```text
categorias 1:N produtos
produtos 1:N itens_venda
```

Conceitualmente, produtos e vendas formam uma relação N:N, resolvida pela tabela intermediária `itens_venda`.

## vendas

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

## itens_venda

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

## Integridade referencial

Regras importantes:

- cliente com venda vinculada não pode ser excluído diretamente;
- categoria com produto vinculado não pode ser excluída diretamente;
- produto usado em venda não pode ser excluído diretamente;
- ao criar venda, o estoque é reduzido;
- ao cancelar venda, o estoque é devolvido.

## MongoDB

O MongoDB é usado para logs.

Banco:

```text
estoque_vendas_logs
```

Coleção:

```text
logs
```

Campos principais:

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

## Papel de cada armazenamento

```text
MySQL → dados principais e relacionais
MongoDB → histórico de logs e eventos
Servidor → arquivos de imagem dos produtos
```
