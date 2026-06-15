const express = require('express');

const database = require('../database/MySqlDatabase');

const ProdutoDAO = require('../dao/ProdutoDAO');
const ProdutoService = require('../services/ProdutoService');
const ProdutoController = require('../controllers/ProdutoController');

const authMiddleware = require('../middlewares/AuthMiddleware');
const produtoValidationMiddleware = require('../middlewares/ProdutoValidationMiddleware');
const uploadProduto = require('../middlewares/UploadMiddleware');

class ProdutoRoutes {
  constructor() {
    this.router = express.Router();

    const produtoDAO = new ProdutoDAO(database);
    const produtoService = new ProdutoService(produtoDAO);
    this.produtoController = new ProdutoController(produtoService);

    this.configurarRotas();
  }

  configurarRotas() {
    this.router.get(
      '/',
      this.produtoController.findAllController
    );

    this.router.get(
      '/:id',
      this.produtoController.findByIdController
    );

    this.router.post(
      '/',
      authMiddleware.verificarToken,
      authMiddleware.verificarAdmin,
      uploadProduto.single('imagem'),
      produtoValidationMiddleware.validar,
      this.produtoController.createController
    );

    this.router.put(
      '/:id',
      authMiddleware.verificarToken,
      authMiddleware.verificarAdmin,
      uploadProduto.single('imagem'),
      produtoValidationMiddleware.validar,
      this.produtoController.updateController
    );

    this.router.delete(
      '/:id',
      authMiddleware.verificarToken,
      authMiddleware.verificarAdmin,
      this.produtoController.deleteController
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new ProdutoRoutes().getRouter();
