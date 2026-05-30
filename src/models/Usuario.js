class Usuario {
  #idUsuario;
  #nome;
  #email;
  #senha;
  #tipo;
  #ativo;

  get idUsuario() { return this.#idUsuario; }
  set idUsuario(value) {
    const parsed = Number(value);
    if (!Number.isInteger(parsed) || parsed <= 0) {
      throw new Error('idUsuario deve ser um número inteiro maior que zero.');
    }
    this.#idUsuario = parsed;
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
    if (typeof value !== 'string') throw new Error('email deve ser uma string.');
    const email = value.trim().toLowerCase();
    if (!email.includes('@') || !email.includes('.')) throw new Error('email inválido.');
    this.#email = email;
  }

  get senha() { return this.#senha; }
  set senha(value) {
    if (typeof value !== 'string' || value.length < 6) throw new Error('senha deve ter pelo menos 6 caracteres.');
    this.#senha = value;
  }

  get tipo() { return this.#tipo; }
  set tipo(value) {
    const tipo = String(value).trim().toUpperCase();
    if (!['ADMIN', 'COMUM'].includes(tipo)) throw new Error('tipo deve ser ADMIN ou COMUM.');
    this.#tipo = tipo;
  }

  get ativo() { return this.#ativo; }
  set ativo(value) { this.#ativo = Boolean(value); }
}

module.exports = Usuario;
