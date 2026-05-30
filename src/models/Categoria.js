class Categoria {
  #idCategoria;
  #nome;
  #descricao;
  #ativo;

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

  get ativo() { return this.#ativo; }
  set ativo(value) { this.#ativo = Boolean(value); }

  toDatabaseObject() {
    return {
      nome: this.#nome,
      descricao: this.#descricao,
      ativo: this.#ativo
    };
  }
}

module.exports = Categoria;
