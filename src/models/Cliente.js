class Cliente {
  #idCliente;
  #nome;
  #email;
  #telefone;
  #cpf;
  #ativo;

  get idCliente() { return this.#idCliente; }
  set idCliente(value) {
    const parsed = Number(value);
    if (!Number.isInteger(parsed) || parsed <= 0) {
      throw new Error('idCliente deve ser um número inteiro maior que zero.');
    }
    this.#idCliente = parsed;
  }

  get nome() { return this.#nome; }
  set nome(value) {
    if (typeof value !== 'string') throw new Error('nome deve ser uma string.');
    const nome = value.trim();
    if (nome.length < 3) throw new Error('nome deve ter pelo menos 3 caracteres.');
    this.#nome = nome;
  }

  get email() { return this.#email; }
  set email(value) {
    if (!value) {
      this.#email = null;
      return;
    }

    const email = String(value).trim().toLowerCase();

    if (!email.includes('@') || !email.includes('.')) {
      throw new Error('email inválido.');
    }

    this.#email = email;
  }

  get telefone() { return this.#telefone; }
  set telefone(value) {
    this.#telefone = value ? String(value).trim() : null;
  }

  get cpf() { return this.#cpf; }
  set cpf(value) {
    this.#cpf = value ? String(value).trim() : null;
  }

  get ativo() { return this.#ativo; }
  set ativo(value) { this.#ativo = Boolean(value); }

  toDatabaseObject() {
    return {
      nome: this.#nome,
      email: this.#email,
      telefone: this.#telefone,
      cpf: this.#cpf,
      ativo: this.#ativo
    };
  }
}

module.exports = Cliente;
