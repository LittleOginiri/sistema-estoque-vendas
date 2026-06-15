const DaoInterface = require('../interfaces/DaoInterface');

class AuthDAO extends DaoInterface {
  #database;

  constructor(database) {
    super();
    this.#database = database;
  }

  async findByEmail(email) {
    const sql = `
      SELECT id_usuario, nome, email, senha, tipo, ativo
      FROM usuarios
      WHERE email = ?
      LIMIT 1;
    `;

    const rows = await this.#database.execute(sql, [email]);
    return rows.length === 0 ? null : rows[0];
  }

  async findById(idUsuario) {
    const sql = `
      SELECT id_usuario, nome, email, tipo, ativo, criado_em
      FROM usuarios
      WHERE id_usuario = ?
      LIMIT 1;
    `;

    const rows = await this.#database.execute(sql, [idUsuario]);
    return rows.length === 0 ? null : rows[0];
  }
}

module.exports = AuthDAO;
