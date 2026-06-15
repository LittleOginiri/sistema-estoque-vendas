const ControllerInterface = require('../interfaces/ControllerInterface');

class VendaController extends ControllerInterface {
  #vendaService;

  constructor(vendaService) {
    super();
    this.#vendaService = vendaService;
  }

  createController = async (request, response, next) => {
    try {
      const venda = await this.#vendaService.create(request.body, request.usuario);

      response.status(201).json({
        success: true,
        message: 'Venda cadastrada com sucesso.',
        data: venda
      });
    } catch (error) {
      next(error);
    }
  };

  findAllController = async (request, response, next) => {
    try {
      const vendas = await this.#vendaService.findAll();

      response.status(200).json({
        success: true,
        total: vendas.length,
        data: vendas
      });
    } catch (error) {
      next(error);
    }
  };

  findByIdController = async (request, response, next) => {
    try {
      const venda = await this.#vendaService.findById(request.params.id);

      response.status(200).json({
        success: true,
        data: venda
      });
    } catch (error) {
      next(error);
    }
  };

  deleteController = async (request, response, next) => {
    try {
      const venda = await this.#vendaService.delete(request.params.id);

      response.status(200).json({
        success: true,
        message: 'Venda cancelada com sucesso. O estoque foi devolvido.',
        data: venda
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = VendaController;
