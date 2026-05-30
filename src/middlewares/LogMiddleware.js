const jwt = require('jsonwebtoken');
const logService = require('../services/LogService');

class LogMiddleware {
  registrar = (request, response, next) => {
    const inicio = Date.now();

    response.on('finish', async () => {
      if (!request.originalUrl.startsWith('/api')) {
        return;
      }

      const tempoMs = Date.now() - inicio;
      const usuario = response.locals.usuarioLog || request.usuario || this.#extrairUsuarioDoToken(request);
      const acao = this.#definirAcao(request, response.statusCode);

      await logService.registrarLog({
        acao,
        endpoint: request.originalUrl,
        metodo: request.method,
        status_code: response.statusCode,
        ip: request.ip || request.socket.remoteAddress,
        usuario,
        mensagem: `Requisição ${request.method} ${request.originalUrl} finalizada em ${tempoMs}ms`,
        body: request.method === 'GET' ? null : request.body
      });
    });

    next();
  };

  #extrairUsuarioDoToken(request) {
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader) return null;

      const partes = authHeader.split(' ');
      if (partes.length !== 2 || partes[0] !== 'Bearer') return null;

      return jwt.verify(
        partes[1],
        process.env.JWT_SECRET || 'chave_secreta_para_desenvolvimento'
      );
    } catch (error) {
      return null;
    }
  }

  #definirAcao(request, statusCode) {
    if (statusCode >= 400) return 'ERRO_REQUISICAO';
    if (request.method === 'POST' && request.originalUrl === '/api/auth/login') return 'LOGIN';
    if (request.method === 'POST') return 'CADASTRO';
    if (request.method === 'PUT') return 'ATUALIZACAO';
    if (request.method === 'DELETE') {
      if (request.originalUrl.includes('/api/vendas')) return 'CANCELAMENTO';
      return 'EXCLUSAO';
    }
    return 'ACESSO_ROTA';
  }
}

module.exports = new LogMiddleware();
