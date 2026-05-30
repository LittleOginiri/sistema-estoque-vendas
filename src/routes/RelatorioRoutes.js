const express = require('express');

const RelatorioController = require('../controllers/RelatorioController');
const authMiddleware = require('../middlewares/AuthMiddleware');

class RelatorioRoutes {
  constructor() {
    this.router = express.Router();
    this.relatorioController = new RelatorioController();
    this.configurarRotas();
  }

  configurarRotas() {
    this.router.get(
      '/vendas',
      authMiddleware.verificarToken,
      authMiddleware.verificarAdmin,
      this.relatorioController.vendasJsonController
    );

    this.router.get(
      '/vendas/pdf',
      authMiddleware.verificarToken,
      authMiddleware.verificarAdmin,
      this.relatorioController.vendasPdfController
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new RelatorioRoutes().getRouter();
