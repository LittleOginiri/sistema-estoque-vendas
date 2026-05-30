const express = require('express');

const database = require('../database/MySqlDatabase');

const AuthDAO = require('../dao/AuthDAO');
const AuthService = require('../services/AuthService');
const AuthController = require('../controllers/AuthController');

const authMiddleware = require('../middlewares/AuthMiddleware');
const loginValidationMiddleware = require('../middlewares/LoginValidationMiddleware');

class AuthRoutes {
  constructor() {
    this.router = express.Router();

    const authDAO = new AuthDAO(database);
    const authService = new AuthService(authDAO);
    this.authController = new AuthController(authService);

    this.configurarRotas();
  }

  configurarRotas() {
    this.router.post(
      '/login',
      loginValidationMiddleware.validar,
      this.authController.loginController
    );

    this.router.get(
      '/me',
      authMiddleware.verificarToken,
      this.authController.meController
    );

    this.router.get(
      '/teste-token',
      authMiddleware.verificarToken,
      (request, response) => {
        response.status(200).json({
          success: true,
          message: 'Token aceito. Rota protegida acessada com sucesso.',
          usuario_token: request.usuario
        });
      }
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new AuthRoutes().getRouter();
