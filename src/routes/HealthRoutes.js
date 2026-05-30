const express = require('express');

class HealthRoutes {
  constructor() {
    this.router = express.Router();
    this.configurarRotas();
  }

  configurarRotas() {
    this.router.get('/', (request, response) => {
      response.status(200).json({
        success: true,
        status: 'online',
        timestamp: new Date().toISOString()
      });
    });
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new HealthRoutes().getRouter();
