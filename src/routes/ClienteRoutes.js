const express = require('express');

const database = require('../database/MySqlDatabase');

const ClienteDAO = require('../dao/ClienteDAO');
const ClienteService = require('../services/ClienteService');
const ClienteController = require('../controllers/ClienteController');

const authMiddleware = require('../middlewares/AuthMiddleware');
const clienteValidationMiddleware = require('../middlewares/ClienteValidationMiddleware');

class ClienteRoutes {
  constructor() {
    this.router = express.Router();

    const clienteDAO = new ClienteDAO(database);
    const clienteService = new ClienteService(clienteDAO);
    this.clienteController = new ClienteController(clienteService);

    this.configurarRotas();
  }

  configurarRotas() {
    this.router.get(
      '/',
      authMiddleware.verificarToken,
      this.clienteController.findAllController
    );

    this.router.get(
      '/:id',
      authMiddleware.verificarToken,
      this.clienteController.findByIdController
    );

    this.router.post(
      '/',
      authMiddleware.verificarToken,
      authMiddleware.verificarAdmin,
      clienteValidationMiddleware.validar,
      this.clienteController.createController
    );

    this.router.put(
      '/:id',
      authMiddleware.verificarToken,
      authMiddleware.verificarAdmin,
      clienteValidationMiddleware.validar,
      this.clienteController.updateController
    );

    this.router.delete(
      '/:id',
      authMiddleware.verificarToken,
      authMiddleware.verificarAdmin,
      this.clienteController.deleteController
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new ClienteRoutes().getRouter();
