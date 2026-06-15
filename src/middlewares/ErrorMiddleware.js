const logService = require('../services/LogService');

async function ErrorMiddleware(error, request, response, next) {
  console.error('Erro global:', error);

  const statusCode = error.status || error.statusCode || 500;

  try {
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
  } catch (logError) {
    console.error('Erro ao registrar log de exceção:', logError);
  }

  return response.status(statusCode).json({
    success: false,
    message: error.message || 'Erro interno no servidor.'
  });
}

module.exports = ErrorMiddleware;
