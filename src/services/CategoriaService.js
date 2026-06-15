const ServiceInterface = require('../interfaces/ServiceInterface');
const Categoria = require('../models/Categoria');

class CategoriaService extends ServiceInterface {
  #categoriaDAO;

  constructor(categoriaDAO) {
    super();
    this.#categoriaDAO = categoriaDAO;
  }

  async create(dados) {
    const categoria = this.#montarCategoria(dados);
    return this.#categoriaDAO.create(categoria);
  }

  async findAll() {
    return this.#categoriaDAO.findAll();
  }

  async findById(idCategoria) {
    const categoria = await this.#categoriaDAO.findById(idCategoria);

    if (!categoria) {
      const error = new Error('Categoria não encontrada.');
      error.status = 404;
      throw error;
    }

    return categoria;
  }

  async update(idCategoria, dados) {
    const categoriaAtual = await this.#categoriaDAO.findById(idCategoria);

    if (!categoriaAtual) {
      const error = new Error('Categoria não encontrada.');
      error.status = 404;
      throw error;
    }

    const categoria = this.#montarCategoria(dados);
    return this.#categoriaDAO.update(idCategoria, categoria);
  }

  async delete(idCategoria) {
    const categoriaAtual = await this.#categoriaDAO.findById(idCategoria);

    if (!categoriaAtual) {
      const error = new Error('Categoria não encontrada.');
      error.status = 404;
      throw error;
    }

    const removida = await this.#categoriaDAO.delete(idCategoria);

    if (!removida) {
      const error = new Error('Não foi possível remover a categoria.');
      error.status = 400;
      throw error;
    }

    return true;
  }

  #montarCategoria(dados) {
    const categoria = new Categoria();

    categoria.nome = dados.nome;
    categoria.descricao = dados.descricao;
    categoria.ativo = dados.ativo === undefined ? true : dados.ativo;

    return categoria;
  }
}

module.exports = CategoriaService;
