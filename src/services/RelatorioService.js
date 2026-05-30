const database = require('../database/MySqlDatabase');

class RelatorioService {
  async buscarVendasPorPeriodo(filtros = {}) {
    const params = [];
    let where = 'WHERE 1 = 1';

    if (filtros.data_inicio) {
      where += ' AND DATE(v.data_venda) >= ?';
      params.push(filtros.data_inicio);
    }

    if (filtros.data_fim) {
      where += ' AND DATE(v.data_venda) <= ?';
      params.push(filtros.data_fim);
    }

    if (filtros.status) {
      where += ' AND v.status = ?';
      params.push(filtros.status);
    }

    const vendas = await database.execute(
      `
      SELECT
        v.id_venda,
        v.data_venda,
        v.total,
        v.status,
        c.nome AS cliente,
        u.nome AS usuario
      FROM vendas v
      INNER JOIN clientes c ON c.id_cliente = v.id_cliente
      INNER JOIN usuarios u ON u.id_usuario = v.id_usuario
      ${where}
      ORDER BY v.data_venda DESC, v.id_venda DESC;
      `,
      params
    );

    const resumoRows = await database.execute(
      `
      SELECT
        COUNT(*) AS quantidade_vendas,
        COALESCE(SUM(v.total), 0) AS total_geral
      FROM vendas v
      ${where};
      `,
      params
    );

    const produtosMaisVendidos = await database.execute(
      `
      SELECT
        p.id_produto,
        p.nome AS produto,
        SUM(iv.quantidade) AS quantidade_total,
        SUM(iv.subtotal) AS subtotal_total
      FROM itens_venda iv
      INNER JOIN vendas v ON v.id_venda = iv.id_venda
      INNER JOIN produtos p ON p.id_produto = iv.id_produto
      ${where}
      GROUP BY p.id_produto, p.nome
      ORDER BY quantidade_total DESC
      LIMIT 10;
      `,
      params
    );

    return {
      filtros: {
        data_inicio: filtros.data_inicio || null,
        data_fim: filtros.data_fim || null,
        status: filtros.status || null
      },
      resumo: {
        quantidade_vendas: Number(resumoRows[0].quantidade_vendas || 0),
        total_geral: Number(resumoRows[0].total_geral || 0)
      },
      vendas,
      produtos_mais_vendidos: produtosMaisVendidos
    };
  }
}

module.exports = new RelatorioService();
