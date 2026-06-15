const express = require('express');

const LogController = require('../controllers/LogController');
const authMiddleware = require('../middlewares/AuthMiddleware');

class LogRoutes {
  constructor() {
    this.router = express.Router();
    this.logController = new LogController();
    this.configurarRotas();
  }

  configurarRotas() {
    this.router.get(
      '/',
      authMiddleware.verificarToken,
      authMiddleware.verificarAdmin,
      this.logController.findAllController
    );

    this.router.get(
      '/export/xml',
      authMiddleware.verificarToken,
      authMiddleware.verificarAdmin,
      this.logController.exportXmlController
    );

    this.router.get(
      '/:id',
      authMiddleware.verificarToken,
      authMiddleware.verificarAdmin,
      this.logController.findByIdController
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new LogRoutes().getRouter();
