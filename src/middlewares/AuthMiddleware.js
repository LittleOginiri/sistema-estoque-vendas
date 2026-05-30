const jwt = require('jsonwebtoken');

class AuthMiddleware {
  verificarToken = (request, response, next) => {
    try {
      const authHeader = request.headers.authorization;

      if (!authHeader) {
        return response.status(401).json({
          success: false,
          message: 'Token não informado.'
        });
      }

      const partes = authHeader.split(' ');

      if (partes.length !== 2 || partes[0] !== 'Bearer') {
        return response.status(401).json({
          success: false,
          message: 'Formato do token inválido. Use: Bearer token'
        });
      }

      const token = partes[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'chave_secreta_para_desenvolvimento'
      );

      request.usuario = decoded;
      next();
    } catch (error) {
      return response.status(401).json({
        success: false,
        message: 'Token inválido ou expirado.'
      });
    }
  };

  verificarAdmin = (request, response, next) => {
    if (!request.usuario || request.usuario.tipo !== 'ADMIN') {
      return response.status(403).json({
        success: false,
        message: 'Acesso permitido apenas para usuário ADMIN.'
      });
    }

    next();
  };
}

module.exports = new AuthMiddleware();
