const express = require('express');

const database = require('../database/MySqlDatabase');

const VendaDAO = require('../dao/VendaDAO');
const VendaService = require('../services/VendaService');
const VendaController = require('../controllers/VendaController');

const authMiddleware = require('../middlewares/AuthMiddleware');
const vendaValidationMiddleware = require('../middlewares/VendaValidationMiddleware');

class VendaRoutes {
  constructor() {
    this.router = express.Router();

    const vendaDAO = new VendaDAO(database);
    const vendaService = new VendaService(vendaDAO);
    this.vendaController = new VendaController(vendaService);

    this.configurarRotas();
  }

  configurarRotas() {
    this.router.get(
      '/',
      authMiddleware.verificarToken,
      this.vendaController.findAllController
    );

    this.router.get(
      '/:id',
      authMiddleware.verificarToken,
      this.vendaController.findByIdController
    );

    this.router.post(
      '/',
      authMiddleware.verificarToken,
      vendaValidationMiddleware.validar,
      this.vendaController.createController
    );

    this.router.delete(
      '/:id',
      authMiddleware.verificarToken,
      authMiddleware.verificarAdmin,
      this.vendaController.deleteController
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new VendaRoutes().getRouter();
