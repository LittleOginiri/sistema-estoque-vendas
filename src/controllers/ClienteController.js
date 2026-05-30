const ControllerInterface = require('../interfaces/ControllerInterface');

class ClienteController extends ControllerInterface {
  #clienteService;

  constructor(clienteService) {
    super();
    this.#clienteService = clienteService;
  }

  createController = async (request, response, next) => {
    try {
      const cliente = await this.#clienteService.create(request.body);

      response.status(201).json({
        success: true,
        message: 'Cliente cadastrado com sucesso.',
        data: cliente
      });
    } catch (error) {
      next(error);
    }
  };

  findAllController = async (request, response, next) => {
    try {
      const clientes = await this.#clienteService.findAll();

      response.status(200).json({
        success: true,
        total: clientes.length,
        data: clientes
      });
    } catch (error) {
      next(error);
    }
  };

  findByIdController = async (request, response, next) => {
    try {
      const cliente = await this.#clienteService.findById(request.params.id);

      response.status(200).json({
        success: true,
        data: cliente
      });
    } catch (error) {
      next(error);
    }
  };

  updateController = async (request, response, next) => {
    try {
      const cliente = await this.#clienteService.update(request.params.id, request.body);

      response.status(200).json({
        success: true,
        message: 'Cliente atualizado com sucesso.',
        data: cliente
      });
    } catch (error) {
      next(error);
    }
  };

  deleteController = async (request, response, next) => {
    try {
      await this.#clienteService.delete(request.params.id);

      response.status(200).json({
        success: true,
        message: 'Cliente removido com sucesso.'
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ClienteController;
