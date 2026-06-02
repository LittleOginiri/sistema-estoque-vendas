function ErrorMiddleware(error, request, response, next) {
  console.error(error);

  const statusCode = error.statusCode || 500;

  return response.status(statusCode).json({
    success: false,
    message: error.message || 'Erro interno no servidor.'
  });
}

module.exports = ErrorMiddleware;
