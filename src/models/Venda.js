class Venda {
  #idCliente;
  #idUsuario;
  #itens;

  get idCliente() { return this.#idCliente; }
  set idCliente(value) {
    const parsed = Number(value);
    if (!Number.isInteger(parsed) || parsed <= 0) {
      throw new Error('idCliente deve ser um número inteiro maior que zero.');
    }
    this.#idCliente = parsed;
  }

  get idUsuario() { return this.#idUsuario; }
  set idUsuario(value) {
    const parsed = Number(value);
    if (!Number.isInteger(parsed) || parsed <= 0) {
      throw new Error('idUsuario deve ser um número inteiro maior que zero.');
    }
    this.#idUsuario = parsed;
  }

  get itens() { return this.#itens; }
  set itens(value) {
    if (!Array.isArray(value) || value.length === 0) {
      throw new Error('A venda deve possuir pelo menos um item.');
    }

    this.#itens = value.map((item) => {
      const idProduto = Number(item.id_produto);
      const quantidade = Number(item.quantidade);

      if (!Number.isInteger(idProduto) || idProduto <= 0) {
        throw new Error('id_produto deve ser um número inteiro maior que zero.');
      }

      if (!Number.isInteger(quantidade) || quantidade <= 0) {
        throw new Error('quantidade deve ser um número inteiro maior que zero.');
      }

      return {
        id_produto: idProduto,
        quantidade
      };
    });
  }
}

module.exports = Venda;
