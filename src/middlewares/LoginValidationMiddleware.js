class LoginValidationMiddleware {
  validar = (request, response, next) => {
    const { email, senha } = request.body;

    if (!email || !senha) {
      return response.status(400).json({
        success: false,
        message: 'Email e senha são obrigatórios.'
      });
    }

    if (typeof email !== 'string' || !email.includes('@')) {
      return response.status(400).json({
        success: false,
        message: 'Email inválido.'
      });
    }

    if (typeof senha !== 'string' || senha.length < 6) {
      return response.status(400).json({
        success: false,
        message: 'Senha deve ter pelo menos 6 caracteres.'
      });
    }

    next();
  };
}

module.exports = new LoginValidationMiddleware();
