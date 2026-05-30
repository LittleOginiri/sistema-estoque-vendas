class CategoriaValidationMiddleware {
  validar = (request, response, next) => {
    const { nome } = request.body;

    if (!nome) {
      return response.status(400).json({
        success: false,
        message: 'Campo obrigatório: nome.'
      });
    }

    if (typeof nome !== 'string' || nome.trim().length < 2) {
      return response.status(400).json({
        success: false,
        message: 'nome deve ter pelo menos 2 caracteres.'
      });
    }

    next();
  };
}

module.exports = new CategoriaValidationMiddleware();
