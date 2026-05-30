const express = require('express');

const database = require('../database/MySqlDatabase');

const CategoriaDAO = require('../dao/CategoriaDAO');
const CategoriaService = require('../services/CategoriaService');
const CategoriaController = require('../controllers/CategoriaController');

const authMiddleware = require('../middlewares/AuthMiddleware');
const categoriaValidationMiddleware = require('../middlewares/CategoriaValidationMiddleware');

class CategoriaRoutes {
  constructor() {
    this.router = express.Router();

    const categoriaDAO = new CategoriaDAO(database);
    const categoriaService = new CategoriaService(categoriaDAO);
    this.categoriaController = new CategoriaController(categoriaService);

    this.configurarRotas();
  }

  configurarRotas() {
    this.router.get(
      '/',
      this.categoriaController.findAllController
    );

    this.router.get(
      '/:id',
      this.categoriaController.findByIdController
    );

    this.router.post(
      '/',
      authMiddleware.verificarToken,
      authMiddleware.verificarAdmin,
      categoriaValidationMiddleware.validar,
      this.categoriaController.createController
    );

    this.router.put(
      '/:id',
      authMiddleware.verificarToken,
      authMiddleware.verificarAdmin,
      categoriaValidationMiddleware.validar,
      this.categoriaController.updateController
    );

    this.router.delete(
      '/:id',
      authMiddleware.verificarToken,
      authMiddleware.verificarAdmin,
      this.categoriaController.deleteController
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new CategoriaRoutes().getRouter();
