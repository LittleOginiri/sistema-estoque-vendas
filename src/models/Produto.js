class Produto {
  #idProduto;
  #idCategoria;
  #nome;
  #descricao;
  #preco;
  #estoque;
  #imagem;
  #ativo;

  get idProduto() { return this.#idProduto; }
  set idProduto(value) {
    const parsed = Number(value);
    if (!Number.isInteger(parsed) || parsed <= 0) {
      throw new Error('idProduto deve ser um número inteiro maior que zero.');
    }
    this.#idProduto = parsed;
  }

  get idCategoria() { return this.#idCategoria; }
  set idCategoria(value) {
    const parsed = Number(value);
    if (!Number.isInteger(parsed) || parsed <= 0) {
      throw new Error('idCategoria deve ser um número inteiro maior que zero.');
    }
    this.#idCategoria = parsed;
  }

  get nome() { return this.#nome; }
  set nome(value) {
    if (typeof value !== 'string') throw new Error('nome deve ser uma string.');
    const nome = value.trim();
    if (nome.length < 2) throw new Error('nome deve ter pelo menos 2 caracteres.');
    this.#nome = nome;
  }

  get descricao() { return this.#descricao; }
  set descricao(value) {
    this.#descricao = value ? String(value).trim() : null;
  }

  get preco() { return this.#preco; }
  set preco(value) {
    const preco = Number(value);
    if (Number.isNaN(preco) || preco < 0) throw new Error('preco deve ser maior ou igual a zero.');
    this.#preco = preco;
  }

  get estoque() { return this.#estoque; }
  set estoque(value) {
    const estoque = Number(value);
    if (!Number.isInteger(estoque) || estoque < 0) throw new Error('estoque deve ser um número inteiro maior ou igual a zero.');
    this.#estoque = estoque;
  }

  get imagem() { return this.#imagem; }
  set imagem(value) {
    this.#imagem = value ? String(value).trim() : null;
  }

  get ativo() { return this.#ativo; }
  set ativo(value) { this.#ativo = Boolean(value); }

  toDatabaseObject() {
    return {
      id_categoria: this.#idCategoria,
      nome: this.#nome,
      descricao: this.#descricao,
      preco: this.#preco,
      estoque: this.#estoque,
      imagem: this.#imagem,
      ativo: this.#ativo
    };
  }
}

module.exports = Produto;
