const ControllerInterface = require('../interfaces/ControllerInterface');

class AuthController extends ControllerInterface {
  #authService;

  constructor(authService) {
    super();
    this.#authService = authService;
  }

  loginController = async (request, response, next) => {
    try {
      const { email, senha } = request.body;
      const resultado = await this.#authService.login(email, senha);

      response.locals.usuarioLog = resultado.usuario;

      response.status(200).json({
        success: true,
        message: 'Login realizado com sucesso.',
        data: resultado
      });
    } catch (error) {
      next(error);
    }
  };

  meController = async (request, response, next) => {
    try {
      const usuario = await this.#authService.buscarUsuarioLogado(request.usuario.id_usuario);

      response.status(200).json({
        success: true,
        message: 'Usuário autenticado.',
        data: usuario
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = AuthController;
