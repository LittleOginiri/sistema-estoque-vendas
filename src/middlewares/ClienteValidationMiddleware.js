class ClienteValidationMiddleware {
  validar = (request, response, next) => {
    const { nome, email } = request.body;

    if (!nome) {
      return response.status(400).json({
        success: false,
        message: 'Campo obrigatório: nome.'
      });
    }

    if (typeof nome !== 'string' || nome.trim().length < 3) {
      return response.status(400).json({
        success: false,
        message: 'nome deve ter pelo menos 3 caracteres.'
      });
    }

    if (email && (typeof email !== 'string' || !email.includes('@') || !email.includes('.'))) {
      return response.status(400).json({
        success: false,
        message: 'email inválido.'
      });
    }

    next();
  };
}

module.exports = new ClienteValidationMiddleware();
