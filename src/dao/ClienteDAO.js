const DaoInterface = require('../interfaces/DaoInterface');

class ClienteDAO extends DaoInterface {
  #database;

  constructor(database) {
    super();
    this.#database = database;
  }

  async create(cliente) {
    const dados = cliente.toDatabaseObject();

    const sql = `
      INSERT INTO clientes
        (nome, email, telefone, cpf, ativo)
      VALUES (?, ?, ?, ?, ?);
    `;

    const result = await this.#database.execute(sql, [
      dados.nome,
      dados.email,
      dados.telefone,
      dados.cpf,
      dados.ativo
    ]);

    return this.findById(result.insertId);
  }

  async findAll() {
    const sql = `
      SELECT
        id_cliente,
        nome,
        email,
        telefone,
        cpf,
        ativo,
        criado_em,
        atualizado_em
      FROM clientes
      ORDER BY id_cliente;
    `;

    return this.#database.execute(sql);
  }

  async findById(idCliente) {
    const sql = `
      SELECT
        id_cliente,
        nome,
        email,
        telefone,
        cpf,
        ativo,
        criado_em,
        atualizado_em
      FROM clientes
      WHERE id_cliente = ?
      LIMIT 1;
    `;

    const rows = await this.#database.execute(sql, [idCliente]);
    return rows.length > 0 ? rows[0] : null;
  }

  async update(idCliente, cliente) {
    const dados = cliente.toDatabaseObject();

    const sql = `
      UPDATE clientes
      SET
        nome = ?,
        email = ?,
        telefone = ?,
        cpf = ?,
        ativo = ?
      WHERE id_cliente = ?;
    `;

    await this.#database.execute(sql, [
      dados.nome,
      dados.email,
      dados.telefone,
      dados.cpf,
      dados.ativo,
      idCliente
    ]);

    return this.findById(idCliente);
  }

  async delete(idCliente) {
    const sql = `
      DELETE FROM clientes
      WHERE id_cliente = ?;
    `;

    const result = await this.#database.execute(sql, [idCliente]);
    return result.affectedRows > 0;
  }
}

module.exports = ClienteDAO;
