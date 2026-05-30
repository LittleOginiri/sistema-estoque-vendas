class ControllerInterface {
  createController() { throw new Error('Método createController deve ser implementado.'); }
  findAllController() { throw new Error('Método findAllController deve ser implementado.'); }
  findByIdController() { throw new Error('Método findByIdController deve ser implementado.'); }
  updateController() { throw new Error('Método updateController deve ser implementado.'); }
  deleteController() { throw new Error('Método deleteController deve ser implementado.'); }
}

module.exports = ControllerInterface;
