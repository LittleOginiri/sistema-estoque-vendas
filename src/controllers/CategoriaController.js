const ControllerInterface = require('../interfaces/ControllerInterface');

class CategoriaController extends ControllerInterface {
  #categoriaService;

  constructor(categoriaService) {
    super();
    this.#categoriaService = categoriaService;
  }

  createController = async (request, response, next) => {
    try {
      const categoria = await this.#categoriaService.create(request.body);

      response.status(201).json({
        success: true,
        message: 'Categoria cadastrada com sucesso.',
        data: categoria
      });
    } catch (error) {
      next(error);
    }
  };

  findAllController = async (request, response, next) => {
    try {
      const categorias = await this.#categoriaService.findAll();

      response.status(200).json({
        success: true,
        total: categorias.length,
        data: categorias
      });
    } catch (error) {
      next(error);
    }
  };

  findByIdController = async (request, response, next) => {
    try {
      const categoria = await this.#categoriaService.findById(request.params.id);

      response.status(200).json({
        success: true,
        data: categoria
      });
    } catch (error) {
      next(error);
    }
  };

  updateController = async (request, response, next) => {
    try {
      const categoria = await this.#categoriaService.update(request.params.id, request.body);

      response.status(200).json({
        success: true,
        message: 'Categoria atualizada com sucesso.',
        data: categoria
      });
    } catch (error) {
      next(error);
    }
  };

  deleteController = async (request, response, next) => {
    try {
      await this.#categoriaService.delete(request.params.id);

      response.status(200).json({
        success: true,
        message: 'Categoria removida com sucesso.'
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = CategoriaController;
