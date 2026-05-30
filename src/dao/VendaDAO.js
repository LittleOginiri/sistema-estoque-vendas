const DaoInterface = require('../interfaces/DaoInterface');

class VendaDAO extends DaoInterface {
  #database;

  constructor(database) {
    super();
    this.#database = database;
  }

  async create(venda) {
    const conn = await this.#database.getConnection();

    try {
      await conn.beginTransaction();

      const [clientes] = await conn.execute(
        'SELECT id_cliente FROM clientes WHERE id_cliente = ? AND ativo = TRUE LIMIT 1;',
        [venda.idCliente]
      );

      if (clientes.length === 0) {
        const error = new Error('Cliente informado não existe ou está inativo.');
        error.status = 400;
        throw error;
      }

      let totalVenda = 0;
      const itensCalculados = [];

      for (const item of venda.itens) {
        const [produtos] = await conn.execute(
          `SELECT id_produto, nome, preco, estoque, ativo
           FROM produtos
           WHERE id_produto = ?
           LIMIT 1;`,
          [item.id_produto]
        );

        if (produtos.length === 0 || !produtos[0].ativo) {
          const error = new Error(`Produto ${item.id_produto} não existe ou está inativo.`);
          error.status = 400;
          throw error;
        }

        const produto = produtos[0];

        if (produto.estoque < item.quantidade) {
          const error = new Error(`Estoque insuficiente para o produto ${produto.nome}. Estoque atual: ${produto.estoque}.`);
          error.status = 400;
          throw error;
        }

        const precoUnitario = Number(produto.preco);
        const subtotal = precoUnitario * item.quantidade;
        totalVenda += subtotal;

        itensCalculados.push({
          id_produto: produto.id_produto,
          quantidade: item.quantidade,
          preco_unitario: precoUnitario,
          subtotal
        });
      }

      const [vendaResult] = await conn.execute(
        `INSERT INTO vendas (id_cliente, id_usuario, total, status)
         VALUES (?, ?, ?, 'FINALIZADA');`,
        [venda.idCliente, venda.idUsuario, totalVenda]
      );

      const idVenda = vendaResult.insertId;

      for (const item of itensCalculados) {
        await conn.execute(
          `INSERT INTO itens_venda
            (id_venda, id_produto, quantidade, preco_unitario, subtotal)
           VALUES (?, ?, ?, ?, ?);`,
          [
            idVenda,
            item.id_produto,
            item.quantidade,
            item.preco_unitario,
            item.subtotal
          ]
        );

        await conn.execute(
          `UPDATE produtos
           SET estoque = estoque - ?
           WHERE id_produto = ?;`,
          [item.quantidade, item.id_produto]
        );
      }

      await conn.commit();
      return this.findById(idVenda);
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  async findAll() {
    const sql = `
      SELECT
        v.id_venda,
        v.id_cliente,
        c.nome AS cliente,
        v.id_usuario,
        u.nome AS usuario,
        v.data_venda,
        v.total,
        v.status
      FROM vendas v
      INNER JOIN clientes c ON c.id_cliente = v.id_cliente
      INNER JOIN usuarios u ON u.id_usuario = v.id_usuario
      ORDER BY v.id_venda DESC;
    `;

    return this.#database.execute(sql);
  }

  async findById(idVenda) {
    const vendas = await this.#database.execute(
      `SELECT
        v.id_venda,
        v.id_cliente,
        c.nome AS cliente,
        v.id_usuario,
        u.nome AS usuario,
        v.data_venda,
        v.total,
        v.status
      FROM vendas v
      INNER JOIN clientes c ON c.id_cliente = v.id_cliente
      INNER JOIN usuarios u ON u.id_usuario = v.id_usuario
      WHERE v.id_venda = ?
      LIMIT 1;`,
      [idVenda]
    );

    if (vendas.length === 0) {
      return null;
    }

    const itens = await this.#database.execute(
      `SELECT
        iv.id_item_venda,
        iv.id_venda,
        iv.id_produto,
        p.nome AS produto,
        iv.quantidade,
        iv.preco_unitario,
        iv.subtotal
      FROM itens_venda iv
      INNER JOIN produtos p ON p.id_produto = iv.id_produto
      WHERE iv.id_venda = ?
      ORDER BY iv.id_item_venda;`,
      [idVenda]
    );

    return {
      ...vendas[0],
      itens
    };
  }

  async cancelar(idVenda) {
    const conn = await this.#database.getConnection();

    try {
      await conn.beginTransaction();

      const [vendas] = await conn.execute(
        `SELECT id_venda, status
         FROM vendas
         WHERE id_venda = ?
         LIMIT 1;`,
        [idVenda]
      );

      if (vendas.length === 0) {
        const error = new Error('Venda não encontrada.');
        error.status = 404;
        throw error;
      }

      if (vendas[0].status === 'CANCELADA') {
        const error = new Error('Venda já está cancelada.');
        error.status = 400;
        throw error;
      }

      const [itens] = await conn.execute(
        `SELECT id_produto, quantidade
         FROM itens_venda
         WHERE id_venda = ?;`,
        [idVenda]
      );

      for (const item of itens) {
        await conn.execute(
          `UPDATE produtos
           SET estoque = estoque + ?
           WHERE id_produto = ?;`,
          [item.quantidade, item.id_produto]
        );
      }

      await conn.execute(
        `UPDATE vendas
         SET status = 'CANCELADA'
         WHERE id_venda = ?;`,
        [idVenda]
      );

      await conn.commit();
      return this.findById(idVenda);
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }
}

module.exports = VendaDAO;
