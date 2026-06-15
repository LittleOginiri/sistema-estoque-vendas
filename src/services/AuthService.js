const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ServiceInterface = require('../interfaces/ServiceInterface');

class AuthService extends ServiceInterface {
  #authDAO;

  constructor(authDAO) {
    super();
    this.#authDAO = authDAO;
  }

  async login(email, senha) {
    if (!email || !senha) {
      const error = new Error('Email e senha são obrigatórios.');
      error.status = 400;
      throw error;
    }

    const usuario = await this.#authDAO.findByEmail(email.trim().toLowerCase());

    if (!usuario) {
      const error = new Error('Email ou senha inválidos.');
      error.status = 401;
      throw error;
    }

    if (!usuario.ativo) {
      const error = new Error('Usuário inativo.');
      error.status = 403;
      throw error;
    }

    let senhaValida = false;

    if (String(usuario.senha).startsWith('$2b$') || String(usuario.senha).startsWith('$2a$')) {
      senhaValida = await bcrypt.compare(senha, usuario.senha);
    } else {
      senhaValida = senha === usuario.senha;
    }

    if (!senhaValida) {
      const error = new Error('Email ou senha inválidos.');
      error.status = 401;
      throw error;
    }

    const payload = {
      id_usuario: usuario.id_usuario,
      nome: usuario.nome,
      email: usuario.email,
      tipo: usuario.tipo
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'chave_secreta_para_desenvolvimento',
      { expiresIn: process.env.JWT_EXPIRES_IN || '2h' }
    );

    return { token, usuario: payload };
  }

  async buscarUsuarioLogado(idUsuario) {
    const usuario = await this.#authDAO.findById(idUsuario);

    if (!usuario) {
      const error = new Error('Usuário não encontrado.');
      error.status = 404;
      throw error;
    }

    return usuario;
  }
}

module.exports = AuthService;
