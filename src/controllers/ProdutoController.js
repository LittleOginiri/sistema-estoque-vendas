const ControllerInterface = require('../interfaces/ControllerInterface');

class ProdutoController extends ControllerInterface {
  #produtoService;

  constructor(produtoService) {
    super();
    this.#produtoService = produtoService;
  }

  createController = async (request, response, next) => {
    try {
      const produto = await this.#produtoService.create(request.body);

      response.status(201).json({
        success: true,
        message: 'Produto cadastrado com sucesso.',
        data: produto
      });
    } catch (error) {
      next(error);
    }
  };

  findAllController = async (request, response, next) => {
    try {
      const produtos = await this.#produtoService.findAll();

      response.status(200).json({
        success: true,
        total: produtos.length,
        data: produtos
      });
    } catch (error) {
      next(error);
    }
  };

  findByIdController = async (request, response, next) => {
    try {
      const produto = await this.#produtoService.findById(request.params.id);

      response.status(200).json({
        success: true,
        data: produto
      });
    } catch (error) {
      next(error);
    }
  };

  updateController = async (request, response, next) => {
    try {
      const produto = await this.#produtoService.update(request.params.id, request.body);

      response.status(200).json({
        success: true,
        message: 'Produto atualizado com sucesso.',
        data: produto
      });
    } catch (error) {
      next(error);
    }
  };

  deleteController = async (request, response, next) => {
    try {
      await this.#produtoService.delete(request.params.id);

      response.status(200).json({
        success: true,
        message: 'Produto removido com sucesso.'
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ProdutoController;
