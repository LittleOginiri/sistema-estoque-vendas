class ServiceInterface {
  create() { throw new Error('Método create deve ser implementado.'); }
  findAll() { throw new Error('Método findAll deve ser implementado.'); }
  findById() { throw new Error('Método findById deve ser implementado.'); }
  update() { throw new Error('Método update deve ser implementado.'); }
  delete() { throw new Error('Método delete deve ser implementado.'); }
}

module.exports = ServiceInterface;
