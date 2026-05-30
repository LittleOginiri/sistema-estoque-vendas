-- ==========================================================
-- Banco de Dados: estoque_vendas
-- Projeto: Sistema de Controle de Estoque e Vendas
-- Disciplina: Programação para Internet
-- ==========================================================

DROP DATABASE IF EXISTS estoque_vendas;
CREATE DATABASE estoque_vendas
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE estoque_vendas;

-- ==========================================================
-- Tabela: usuarios
-- Utilizada para login/autenticação do sistema
-- ==========================================================
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('ADMIN', 'COMUM') NOT NULL DEFAULT 'COMUM',
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================================
-- Tabela: clientes
-- Um cliente pode possuir várias vendas
-- Relacionamento: clientes 1:N vendas
-- ==========================================================
CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150),
    telefone VARCHAR(20),
    cpf VARCHAR(14),
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================================
-- Tabela: categorias
-- Uma categoria pode possuir vários produtos
-- Relacionamento: categorias 1:N produtos
-- ==========================================================
CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao VARCHAR(255),
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================================
-- Tabela: produtos
-- Produto pertence a uma categoria
-- ==========================================================
CREATE TABLE produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT NOT NULL,
    nome VARCHAR(120) NOT NULL,
    descricao VARCHAR(255),
    preco DECIMAL(10,2) NOT NULL,
    estoque INT NOT NULL DEFAULT 0,
    imagem VARCHAR(255),
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_produtos_categorias
        FOREIGN KEY (id_categoria)
        REFERENCES categorias(id_categoria)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT chk_produtos_preco
        CHECK (preco >= 0),

    CONSTRAINT chk_produtos_estoque
        CHECK (estoque >= 0)
);

-- ==========================================================
-- Tabela: vendas
-- Uma venda pertence a um cliente e a um usuário
-- ==========================================================
CREATE TABLE vendas (
    id_venda INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_usuario INT NOT NULL,
    data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    status ENUM('ABERTA', 'FINALIZADA', 'CANCELADA') NOT NULL DEFAULT 'FINALIZADA',

    CONSTRAINT fk_vendas_clientes
        FOREIGN KEY (id_cliente)
        REFERENCES clientes(id_cliente)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_vendas_usuarios
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT chk_vendas_total
        CHECK (total >= 0)
);

-- ==========================================================
-- Tabela: itens_venda
-- Tabela intermediária entre vendas e produtos
-- Relacionamento: vendas N:N produtos
-- ==========================================================
CREATE TABLE itens_venda (
    id_item_venda INT AUTO_INCREMENT PRIMARY KEY,
    id_venda INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_itens_venda_vendas
        FOREIGN KEY (id_venda)
        REFERENCES vendas(id_venda)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_itens_venda_produtos
        FOREIGN KEY (id_produto)
        REFERENCES produtos(id_produto)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT chk_itens_quantidade
        CHECK (quantidade > 0),

    CONSTRAINT chk_itens_preco_unitario
        CHECK (preco_unitario >= 0),

    CONSTRAINT chk_itens_subtotal
        CHECK (subtotal >= 0)
);

-- ==========================================================
-- Dados iniciais para teste
-- Observação:
-- A senha do usuário admin será ajustada no backend usando bcrypt.
-- Por enquanto usamos o texto: 123456
-- Depois trocaremos por hash criptografado.
-- ==========================================================

INSERT INTO usuarios (nome, email, senha, tipo) VALUES
('Administrador', 'admin@admin.com', '123456', 'ADMIN'),
('Usuario Comum', 'usuario@teste.com', '123456', 'COMUM');

INSERT INTO clientes (nome, email, telefone, cpf) VALUES
('João Silva', 'joao@email.com', '(12) 99999-1111', '111.111.111-11'),
('Maria Oliveira', 'maria@email.com', '(12) 99999-2222', '222.222.222-22');

INSERT INTO categorias (nome, descricao) VALUES
('Informática', 'Produtos de informática e tecnologia'),
('Papelaria', 'Materiais de escritório e papelaria'),
('Acessórios', 'Acessórios diversos');

INSERT INTO produtos (id_categoria, nome, descricao, preco, estoque, imagem) VALUES
(1, 'Mouse Gamer', 'Mouse USB com iluminação RGB', 89.90, 25, NULL),
(1, 'Teclado Mecânico', 'Teclado mecânico ABNT2', 199.90, 12, NULL),
(2, 'Caderno Universitário', 'Caderno 10 matérias', 24.90, 50, NULL),
(3, 'Suporte para Notebook', 'Suporte ajustável para notebook', 79.90, 18, NULL);

INSERT INTO vendas (id_cliente, id_usuario, total, status) VALUES
(1, 1, 289.80, 'FINALIZADA');

INSERT INTO itens_venda (id_venda, id_produto, quantidade, preco_unitario, subtotal) VALUES
(1, 1, 1, 89.90, 89.90),
(1, 2, 1, 199.90, 199.90);

-- ==========================================================
-- Consultas rápidas para testar
-- ==========================================================

SELECT * FROM usuarios;
SELECT * FROM clientes;
SELECT * FROM categorias;
SELECT * FROM produtos;
SELECT * FROM vendas;
SELECT * FROM itens_venda;
