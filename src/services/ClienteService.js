const ServiceInterface = require('../interfaces/ServiceInterface');
const Cliente = require('../models/Cliente');

class ClienteService extends ServiceInterface {
  #clienteDAO;

  constructor(clienteDAO) {
    super();
    this.#clienteDAO = clienteDAO;
  }

  async create(dados) {
    const cliente = this.#montarCliente(dados);
    return this.#clienteDAO.create(cliente);
  }

  async findAll() {
    return this.#clienteDAO.findAll();
  }

  async findById(idCliente) {
    const cliente = await this.#clienteDAO.findById(idCliente);

    if (!cliente) {
      const error = new Error('Cliente não encontrado.');
      error.status = 404;
      throw error;
    }

    return cliente;
  }

  async update(idCliente, dados) {
    const clienteAtual = await this.#clienteDAO.findById(idCliente);

    if (!clienteAtual) {
      const error = new Error('Cliente não encontrado.');
      error.status = 404;
      throw error;
    }

    const cliente = this.#montarCliente(dados);
    return this.#clienteDAO.update(idCliente, cliente);
  }

  async delete(idCliente) {
    const clienteAtual = await this.#clienteDAO.findById(idCliente);

    if (!clienteAtual) {
      const error = new Error('Cliente não encontrado.');
      error.status = 404;
      throw error;
    }

    const removido = await this.#clienteDAO.delete(idCliente);

    if (!removido) {
      const error = new Error('Não foi possível remover o cliente.');
      error.status = 400;
      throw error;
    }

    return true;
  }

  #montarCliente(dados) {
    const cliente = new Cliente();

    cliente.nome = dados.nome;
    cliente.email = dados.email;
    cliente.telefone = dados.telefone;
    cliente.cpf = dados.cpf;
    cliente.ativo = dados.ativo === undefined ? true : dados.ativo;

    return cliente;
  }
}

module.exports = ClienteService;
