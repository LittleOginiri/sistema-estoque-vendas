const DaoInterface = require('../interfaces/DaoInterface');

class ProdutoDAO extends DaoInterface {
  #database;

  constructor(database) {
    super();
    this.#database = database;
  }

  async create(produto) {
    const dados = produto.toDatabaseObject();

    const sql = `
      INSERT INTO produtos 
        (id_categoria, nome, descricao, preco, estoque, imagem, ativo)
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    const result = await this.#database.execute(sql, [
      dados.id_categoria,
      dados.nome,
      dados.descricao,
      dados.preco,
      dados.estoque,
      dados.imagem,
      dados.ativo
    ]);

    return this.findById(result.insertId);
  }

  async findAll() {
    const sql = `
      SELECT
        p.id_produto,
        p.id_categoria,
        c.nome AS categoria,
        p.nome,
        p.descricao,
        p.preco,
        p.estoque,
        p.imagem,
        p.ativo,
        p.criado_em,
        p.atualizado_em
      FROM produtos p
      INNER JOIN categorias c ON c.id_categoria = p.id_categoria
      ORDER BY p.id_produto;
    `;

    return this.#database.execute(sql);
  }

  async findById(idProduto) {
    const sql = `
      SELECT
        p.id_produto,
        p.id_categoria,
        c.nome AS categoria,
        p.nome,
        p.descricao,
        p.preco,
        p.estoque,
        p.imagem,
        p.ativo,
        p.criado_em,
        p.atualizado_em
      FROM produtos p
      INNER JOIN categorias c ON c.id_categoria = p.id_categoria
      WHERE p.id_produto = ?
      LIMIT 1;
    `;

    const rows = await this.#database.execute(sql, [idProduto]);
    return rows.length > 0 ? rows[0] : null;
  }

  async update(idProduto, produto) {
    const dados = produto.toDatabaseObject();

    const sql = `
      UPDATE produtos
      SET 
        id_categoria = ?,
        nome = ?,
        descricao = ?,
        preco = ?,
        estoque = ?,
        imagem = ?,
        ativo = ?
      WHERE id_produto = ?;
    `;

    await this.#database.execute(sql, [
      dados.id_categoria,
      dados.nome,
      dados.descricao,
      dados.preco,
      dados.estoque,
      dados.imagem,
      dados.ativo,
      idProduto
    ]);

    return this.findById(idProduto);
  }

  async delete(idProduto) {
    const sql = `
      DELETE FROM produtos
      WHERE id_produto = ?;
    `;

    const result = await this.#database.execute(sql, [idProduto]);
    return result.affectedRows > 0;
  }

  async categoriaExiste(idCategoria) {
    const sql = `
      SELECT id_categoria
      FROM categorias
      WHERE id_categoria = ? AND ativo = TRUE
      LIMIT 1;
    `;

    const rows = await this.#database.execute(sql, [idCategoria]);
    return rows.length > 0;
  }
}

module.exports = ProdutoDAO;
