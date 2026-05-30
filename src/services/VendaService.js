const ServiceInterface = require('../interfaces/ServiceInterface');
const Venda = require('../models/Venda');

class VendaService extends ServiceInterface {
  #vendaDAO;

  constructor(vendaDAO) {
    super();
    this.#vendaDAO = vendaDAO;
  }

  async create(dados, usuarioLogado) {
    const venda = new Venda();

    venda.idCliente = dados.id_cliente;
    venda.idUsuario = usuarioLogado.id_usuario;
    venda.itens = dados.itens;

    return this.#vendaDAO.create(venda);
  }

  async findAll() {
    return this.#vendaDAO.findAll();
  }

  async findById(idVenda) {
    const venda = await this.#vendaDAO.findById(idVenda);

    if (!venda) {
      const error = new Error('Venda não encontrada.');
      error.status = 404;
      throw error;
    }

    return venda;
  }

  async delete(idVenda) {
    return this.#vendaDAO.cancelar(idVenda);
  }
}

module.exports = VendaService;
