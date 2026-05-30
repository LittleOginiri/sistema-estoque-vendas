const DaoInterface = require('../interfaces/DaoInterface');

class CategoriaDAO extends DaoInterface {
  #database;

  constructor(database) {
    super();
    this.#database = database;
  }

  async create(categoria) {
    const dados = categoria.toDatabaseObject();

    const sql = `
      INSERT INTO categorias
        (nome, descricao, ativo)
      VALUES (?, ?, ?);
    `;

    const result = await this.#database.execute(sql, [
      dados.nome,
      dados.descricao,
      dados.ativo
    ]);

    return this.findById(result.insertId);
  }

  async findAll() {
    const sql = `
      SELECT
        id_categoria,
        nome,
        descricao,
        ativo,
        criado_em,
        atualizado_em
      FROM categorias
      ORDER BY id_categoria;
    `;

    return this.#database.execute(sql);
  }

  async findById(idCategoria) {
    const sql = `
      SELECT
        id_categoria,
        nome,
        descricao,
        ativo,
        criado_em,
        atualizado_em
      FROM categorias
      WHERE id_categoria = ?
      LIMIT 1;
    `;

    const rows = await this.#database.execute(sql, [idCategoria]);
    return rows.length > 0 ? rows[0] : null;
  }

  async update(idCategoria, categoria) {
    const dados = categoria.toDatabaseObject();

    const sql = `
      UPDATE categorias
      SET
        nome = ?,
        descricao = ?,
        ativo = ?
      WHERE id_categoria = ?;
    `;

    await this.#database.execute(sql, [
      dados.nome,
      dados.descricao,
      dados.ativo,
      idCategoria
    ]);

    return this.findById(idCategoria);
  }

  async delete(idCategoria) {
    const sql = `
      DELETE FROM categorias
      WHERE id_categoria = ?;
    `;

    const result = await this.#database.execute(sql, [idCategoria]);
    return result.affectedRows > 0;
  }
}

module.exports = CategoriaDAO;
