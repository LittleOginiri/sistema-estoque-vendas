const jsonService = require('../services/JsonService');

class JsonController {
  exportController = async (request, response, next) => {
    try {
      const entidade = request.params.entidade;
      const resultado = await jsonService.exportar(entidade);

      const nomeArquivo = `${entidade}_${new Date().toISOString().slice(0, 10)}.json`;

      response.setHeader('Content-Type', 'application/json; charset=utf-8');
      response.setHeader('Content-Disposition', `attachment; filename="${nomeArquivo}"`);
      response.status(200).send(JSON.stringify(resultado, null, 2));
    } catch (error) {
      next(error);
    }
  };

  importController = async (request, response, next) => {
    try {
      const entidade = request.params.entidade;

      if (!request.file) {
        return response.status(400).json({
          success: false,
          message: 'Arquivo JSON não enviado. Use o campo arquivo_json.'
        });
      }

      const conteudo = request.file.buffer.toString('utf-8');
      const json = JSON.parse(conteudo);

      const registros = Array.isArray(json) ? json : json.dados;
      const resultado = await jsonService.importar(entidade, registros);

      response.status(200).json({
        success: true,
        message: 'Importação processada.',
        data: resultado
      });
    } catch (error) {
      if (error instanceof SyntaxError) {
        error.message = 'Arquivo JSON inválido.';
        error.status = 400;
      }

      next(error);
    }
  };
}

module.exports = JsonController;
