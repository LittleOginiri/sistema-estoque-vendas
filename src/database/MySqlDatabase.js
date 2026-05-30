const mysql = require('mysql2/promise');

class MySqlDatabase {
  constructor() {
    this.pool = mysql.createPool({
      host: process.env.MYSQL_HOST || 'localhost',
      port: process.env.MYSQL_PORT || 3306,
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'estoque_vendas',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  async getConnection() {
    return this.pool.getConnection();
  }

  async execute(sql, params = []) {
    const [rows] = await this.pool.execute(sql, params);
    return rows;
  }

  async testConnection() {
    const conn = await this.getConnection();
    try {
      const [rows] = await conn.query('SELECT DATABASE() AS banco_atual, NOW() AS data_hora;');
      return rows[0];
    } finally {
      conn.release();
    }
  }
}

module.exports = new MySqlDatabase();
