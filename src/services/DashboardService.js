const database = require('../database/MySqlDatabase');

class DashboardService {
  async resumo() {
    const vendasResumo = await database.execute(`
      SELECT
        COUNT(*) AS quantidade_vendas,
        COALESCE(SUM(CASE WHEN status = 'FINALIZADA' THEN total ELSE 0 END), 0) AS total_finalizado,
        COALESCE(SUM(CASE WHEN status = 'CANCELADA' THEN total ELSE 0 END), 0) AS total_cancelado
      FROM vendas;
    `);

    const produtosResumo = await database.execute(`
      SELECT
        COUNT(*) AS quantidade_produtos,
        COALESCE(SUM(estoque), 0) AS estoque_total,
        COALESCE(SUM(preco * estoque), 0) AS valor_estoque
      FROM produtos
      WHERE ativo = TRUE;
    `);

    const clientesResumo = await database.execute(`
      SELECT COUNT(*) AS quantidade_clientes
      FROM clientes
      WHERE ativo = TRUE;
    `);

    return {
      vendas: {
        quantidade_vendas: Number(vendasResumo[0].quantidade_vendas || 0),
        total_finalizado: Number(vendasResumo[0].total_finalizado || 0),
        total_cancelado: Number(vendasResumo[0].total_cancelado || 0)
      },
      produtos: {
        quantidade_produtos: Number(produtosResumo[0].quantidade_produtos || 0),
        estoque_total: Number(produtosResumo[0].estoque_total || 0),
        valor_estoque: Number(produtosResumo[0].valor_estoque || 0)
      },
      clientes: {
        quantidade_clientes: Number(clientesResumo[0].quantidade_clientes || 0)
      }
    };
  }

  async vendasPorStatus() {
    return database.execute(`
      SELECT
        status,
        COUNT(*) AS quantidade,
        COALESCE(SUM(total), 0) AS total
      FROM vendas
      GROUP BY status
      ORDER BY status;
    `);
  }

  async produtosMaisVendidos() {
    return database.execute(`
      SELECT
        p.nome AS produto,
        SUM(iv.quantidade) AS quantidade_total,
        SUM(iv.subtotal) AS total_vendido
      FROM itens_venda iv
      INNER JOIN produtos p ON p.id_produto = iv.id_produto
      INNER JOIN vendas v ON v.id_venda = iv.id_venda
      WHERE v.status = 'FINALIZADA'
      GROUP BY p.id_produto, p.nome
      ORDER BY quantidade_total DESC
      LIMIT 10;
    `);
  }

  async vendasPorDia() {
    return database.execute(`
      SELECT
        DATE(data_venda) AS dia,
        COUNT(*) AS quantidade,
        COALESCE(SUM(total), 0) AS total
      FROM vendas
      WHERE status = 'FINALIZADA'
      GROUP BY DATE(data_venda)
      ORDER BY dia DESC
      LIMIT 15;
    `);
  }

  async estoquePorCategoria() {
    return database.execute(`
      SELECT
        c.nome AS categoria,
        COALESCE(SUM(p.estoque), 0) AS estoque_total,
        COALESCE(SUM(p.preco * p.estoque), 0) AS valor_estoque
      FROM categorias c
      LEFT JOIN produtos p ON p.id_categoria = c.id_categoria AND p.ativo = TRUE
      WHERE c.ativo = TRUE
      GROUP BY c.id_categoria, c.nome
      ORDER BY estoque_total DESC;
    `);
  }

  async produtosBaixoEstoque() {
    return database.execute(`
      SELECT
        p.id_produto,
        p.nome AS produto,
        c.nome AS categoria,
        p.estoque,
        p.preco
      FROM produtos p
      INNER JOIN categorias c ON c.id_categoria = p.id_categoria
      WHERE p.ativo = TRUE AND p.estoque <= 10
      ORDER BY p.estoque ASC, p.nome ASC
      LIMIT 10;
    `);
  }
}

module.exports = new DashboardService();
