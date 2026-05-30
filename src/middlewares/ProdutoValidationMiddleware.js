class ProdutoValidationMiddleware {
  validar = (request, response, next) => {
    const { id_categoria, nome, preco, estoque } = request.body;

    if (!id_categoria || !nome || preco === undefined || estoque === undefined) {
      return response.status(400).json({
        success: false,
        message: 'Campos obrigatórios: id_categoria, nome, preco e estoque.'
      });
    }

    const idCategoriaNumero = Number(id_categoria);
    const precoNumero = Number(preco);
    const estoqueNumero = Number(estoque);

    if (!Number.isInteger(idCategoriaNumero) || idCategoriaNumero <= 0) {
      return response.status(400).json({
        success: false,
        message: 'id_categoria deve ser um número inteiro maior que zero.'
      });
    }

    if (typeof nome !== 'string' || nome.trim().length < 2) {
      return response.status(400).json({
        success: false,
        message: 'nome deve ter pelo menos 2 caracteres.'
      });
    }

    if (Number.isNaN(precoNumero) || precoNumero < 0) {
      return response.status(400).json({
        success: false,
        message: 'preco deve ser maior ou igual a zero.'
      });
    }

    if (!Number.isInteger(estoqueNumero) || estoqueNumero < 0) {
      return response.status(400).json({
        success: false,
        message: 'estoque deve ser um número inteiro maior ou igual a zero.'
      });
    }

    request.body.id_categoria = idCategoriaNumero;
    request.body.preco = precoNumero;
    request.body.estoque = estoqueNumero;

    next();
  };
}

module.exports = new ProdutoValidationMiddleware();
