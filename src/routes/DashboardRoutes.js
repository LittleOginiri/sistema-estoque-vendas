const express = require('express');

const DashboardController = require('../controllers/DashboardController');
const authMiddleware = require('../middlewares/AuthMiddleware');

class DashboardRoutes {
  constructor() {
    this.router = express.Router();
    this.dashboardController = new DashboardController();
    this.configurarRotas();
  }

  configurarRotas() {
    this.router.get('/resumo', authMiddleware.verificarToken, this.dashboardController.resumoController);
    this.router.get('/vendas-por-status', authMiddleware.verificarToken, this.dashboardController.vendasPorStatusController);
    this.router.get('/produtos-mais-vendidos', authMiddleware.verificarToken, this.dashboardController.produtosMaisVendidosController);
    this.router.get('/vendas-por-dia', authMiddleware.verificarToken, this.dashboardController.vendasPorDiaController);
    this.router.get('/estoque-por-categoria', authMiddleware.verificarToken, this.dashboardController.estoquePorCategoriaController);
    this.router.get('/produtos-baixo-estoque', authMiddleware.verificarToken, this.dashboardController.produtosBaixoEstoqueController);
    this.router.get('/completo', authMiddleware.verificarToken, this.dashboardController.completoController);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new DashboardRoutes().getRouter();
