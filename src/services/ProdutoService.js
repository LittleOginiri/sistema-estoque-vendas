const ServiceInterface = require('../interfaces/ServiceInterface');
const Produto = require('../models/Produto');

class ProdutoService extends ServiceInterface {
  #produtoDAO;

  constructor(produtoDAO) {
    super();
    this.#produtoDAO = produtoDAO;
  }

  async create(dados) {
    const categoriaExiste = await this.#produtoDAO.categoriaExiste(dados.id_categoria);

    if (!categoriaExiste) {
      const error = new Error('Categoria informada não existe ou está inativa.');
      error.status = 400;
      throw error;
    }

    const produto = this.#montarProduto(dados);
    return this.#produtoDAO.create(produto);
  }

  async findAll() {
    return this.#produtoDAO.findAll();
  }

  async findById(idProduto) {
    const produto = await this.#produtoDAO.findById(idProduto);

    if (!produto) {
      const error = new Error('Produto não encontrado.');
      error.status = 404;
      throw error;
    }

    return produto;
  }

  async update(idProduto, dados) {
    const produtoAtual = await this.#produtoDAO.findById(idProduto);

    if (!produtoAtual) {
      const error = new Error('Produto não encontrado.');
      error.status = 404;
      throw error;
    }

    const categoriaExiste = await this.#produtoDAO.categoriaExiste(dados.id_categoria);

    if (!categoriaExiste) {
      const error = new Error('Categoria informada não existe ou está inativa.');
      error.status = 400;
      throw error;
    }

    const produto = this.#montarProduto(dados);
    return this.#produtoDAO.update(idProduto, produto);
  }

  async delete(idProduto) {
    const produtoAtual = await this.#produtoDAO.findById(idProduto);

    if (!produtoAtual) {
      const error = new Error('Produto não encontrado.');
      error.status = 404;
      throw error;
    }

    const removido = await this.#produtoDAO.delete(idProduto);

    if (!removido) {
      const error = new Error('Não foi possível remover o produto.');
      error.status = 400;
      throw error;
    }

    return true;
  }

  #montarProduto(dados) {
    const produto = new Produto();

    produto.idCategoria = dados.id_categoria;
    produto.nome = dados.nome;
    produto.descricao = dados.descricao;
    produto.preco = dados.preco;
    produto.estoque = dados.estoque;
    produto.imagem = dados.imagem;
    produto.ativo = dados.ativo === undefined ? true : dados.ativo;

    return produto;
  }
}

module.exports = ProdutoService;
