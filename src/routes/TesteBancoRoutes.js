const express = require('express');
const database = require('../database/MySqlDatabase');

class TesteBancoRoutes {
  constructor() {
    this.router = express.Router();
    this.configurarRotas();
  }

  configurarRotas() {
    this.router.get('/mysql', async (request, response, next) => {
      try {
        const resultado = await database.testConnection();

        response.status(200).json({
          success: true,
          message: 'Conexão com MySQL realizada com sucesso.',
          data: resultado
        });
      } catch (error) {
        next(error);
      }
    });

    this.router.get('/usuarios', async (request, response, next) => {
      try {
        const usuarios = await database.execute(
          'SELECT id_usuario, nome, email, tipo, ativo, criado_em FROM usuarios ORDER BY id_usuario;'
        );

        response.status(200).json({
          success: true,
          total: usuarios.length,
          data: usuarios
        });
      } catch (error) {
        next(error);
      }
    });

    this.router.get('/produtos', async (request, response, next) => {
      try {
        const produtos = await database.execute(`
          SELECT p.id_produto, p.nome, p.preco, p.estoque, c.nome AS categoria
          FROM produtos p
          INNER JOIN categorias c ON c.id_categoria = p.id_categoria
          ORDER BY p.id_produto;
        `);

        response.status(200).json({
          success: true,
          total: produtos.length,
          data: produtos
        });
      } catch (error) {
        next(error);
      }
    });
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new TesteBancoRoutes().getRouter();
