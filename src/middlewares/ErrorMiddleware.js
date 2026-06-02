const logService = require('../services/LogService');

async function ErrorMiddleware(error, request, response, next) {
  console.error('Erro global:', error);

  const statusCode = error.status || error.statusCode || 500;

  await logService.registrarLog({
    acao: 'ERRO_EXCECAO',
    endpoint: request.originalUrl,
    metodo: request.method,
    status_code: statusCode,
    ip: request.ip || request.socket.remoteAddress,
    usuario: request.usuario || null,
    mensagem: error.message || 'Erro interno no servidor.',
    erro: error.stack,
    body: request.method === 'GET' ? null : request.body
  });

  return response.status(statusCode).json({
    success: false,
    message: error.message || 'Erro interno no servidor.'
  });
}

module.exports = ErrorMiddleware;
