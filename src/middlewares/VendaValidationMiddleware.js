class VendaValidationMiddleware {
  validar = (request, response, next) => {
    const { id_cliente, itens } = request.body;

    if (!id_cliente) {
      return response.status(400).json({
        success: false,
        message: 'Campo obrigatório: id_cliente.'
      });
    }

    const idClienteNumero = Number(id_cliente);

    if (!Number.isInteger(idClienteNumero) || idClienteNumero <= 0) {
      return response.status(400).json({
        success: false,
        message: 'id_cliente deve ser um número inteiro maior que zero.'
      });
    }

    if (!Array.isArray(itens) || itens.length === 0) {
      return response.status(400).json({
        success: false,
        message: 'A venda deve possuir pelo menos um item.'
      });
    }

    for (const item of itens) {
      const idProduto = Number(item.id_produto);
      const quantidade = Number(item.quantidade);

      if (!Number.isInteger(idProduto) || idProduto <= 0) {
        return response.status(400).json({
          success: false,
          message: 'Cada item deve possuir id_produto inteiro maior que zero.'
        });
      }

      if (!Number.isInteger(quantidade) || quantidade <= 0) {
        return response.status(400).json({
          success: false,
          message: 'Cada item deve possuir quantidade inteira maior que zero.'
        });
      }

      item.id_produto = idProduto;
      item.quantidade = quantidade;
    }

    request.body.id_cliente = idClienteNumero;
    next();
  };
}

module.exports = new VendaValidationMiddleware();
