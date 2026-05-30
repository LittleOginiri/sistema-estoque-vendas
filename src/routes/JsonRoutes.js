const express = require('express');
const multer = require('multer');

const JsonController = require('../controllers/JsonController');
const authMiddleware = require('../middlewares/AuthMiddleware');

class JsonRoutes {
  constructor() {
    this.router = express.Router();
    this.upload = multer({
      storage: multer.memoryStorage(),
      limits: {
        fileSize: 2 * 1024 * 1024
      },
      fileFilter: (request, file, callback) => {
        if (file.mimetype === 'application/json' || file.originalname.endsWith('.json')) {
          callback(null, true);
        } else {
          callback(new Error('Apenas arquivos .json são permitidos.'));
        }
      }
    });

    this.jsonController = new JsonController();
    this.configurarRotas();
  }

  configurarRotas() {
    this.router.get(
      '/export/:entidade',
      authMiddleware.verificarToken,
      authMiddleware.verificarAdmin,
      this.jsonController.exportController
    );

    this.router.post(
      '/import/:entidade',
      authMiddleware.verificarToken,
      authMiddleware.verificarAdmin,
      this.upload.single('arquivo_json'),
      this.jsonController.importController
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new JsonRoutes().getRouter();
