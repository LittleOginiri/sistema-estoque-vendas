const dashboardService = require('../services/DashboardService');

class DashboardController {
  resumoController = async (request, response, next) => {
    try {
      const resumo = await dashboardService.resumo();
      response.status(200).json({ success: true, data: resumo });
    } catch (error) {
      next(error);
    }
  };

  vendasPorStatusController = async (request, response, next) => {
    try {
      const dados = await dashboardService.vendasPorStatus();
      response.status(200).json({ success: true, data: dados });
    } catch (error) {
      next(error);
    }
  };

  produtosMaisVendidosController = async (request, response, next) => {
    try {
      const dados = await dashboardService.produtosMaisVendidos();
      response.status(200).json({ success: true, data: dados });
    } catch (error) {
      next(error);
    }
  };

  vendasPorDiaController = async (request, response, next) => {
    try {
      const dados = await dashboardService.vendasPorDia();
      response.status(200).json({ success: true, data: dados.reverse() });
    } catch (error) {
      next(error);
    }
  };

  estoquePorCategoriaController = async (request, response, next) => {
    try {
      const dados = await dashboardService.estoquePorCategoria();
      response.status(200).json({ success: true, data: dados });
    } catch (error) {
      next(error);
    }
  };

  produtosBaixoEstoqueController = async (request, response, next) => {
    try {
      const dados = await dashboardService.produtosBaixoEstoque();
      response.status(200).json({ success: true, data: dados });
    } catch (error) {
      next(error);
    }
  };

  completoController = async (request, response, next) => {
    try {
      const [
        resumo,
        vendasPorStatus,
        produtosMaisVendidos,
        vendasPorDia,
        estoquePorCategoria,
        produtosBaixoEstoque
      ] = await Promise.all([
        dashboardService.resumo(),
        dashboardService.vendasPorStatus(),
        dashboardService.produtosMaisVendidos(),
        dashboardService.vendasPorDia(),
        dashboardService.estoquePorCategoria(),
        dashboardService.produtosBaixoEstoque()
      ]);

      response.status(200).json({
        success: true,
        data: {
          resumo,
          vendas_por_status: vendasPorStatus,
          produtos_mais_vendidos: produtosMaisVendidos,
          vendas_por_dia: vendasPorDia.reverse(),
          estoque_por_categoria: estoquePorCategoria,
          produtos_baixo_estoque: produtosBaixoEstoque
        }
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = DashboardController;
