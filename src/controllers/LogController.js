const { create } = require('xmlbuilder2');
const logService = require('../services/LogService');

class LogController {
  findAllController = async (request, response, next) => {
    try {
      const logs = await logService.listarLogs(request.query);

      response.status(200).json({
        success: true,
        total: logs.length,
        data: logs
      });
    } catch (error) {
      next(error);
    }
  };

  findByIdController = async (request, response, next) => {
    try {
      const log = await logService.buscarLogPorId(request.params.id);

      if (!log) {
        return response.status(404).json({
          success: false,
          message: 'Log não encontrado.'
        });
      }

      response.status(200).json({
        success: true,
        data: log
      });
    } catch (error) {
      next(error);
    }
  };

  exportXmlController = async (request, response, next) => {
    try {
      const logs = await logService.listarLogsParaExportacao(request.query);

      const objetoXml = {
        logs_exportacao: {
          gerado_em: new Date().toISOString(),
          total: logs.length,
          filtros: {
            acao: request.query.acao || '',
            metodo: request.query.metodo || '',
            status_code: request.query.status_code || '',
            id_usuario: request.query.id_usuario || '',
            email_usuario: request.query.email_usuario || '',
            data_inicio: request.query.data_inicio || '',
            data_fim: request.query.data_fim || ''
          },
          logs: {
            log: logs.map((log) => ({
              id: String(log._id),
              acao: log.acao || '',
              endpoint: log.endpoint || '',
              metodo: log.metodo || '',
              status_code: log.status_code || '',
              ip: log.ip || '',
              usuario: {
                id_usuario: log.usuario && log.usuario.id_usuario ? log.usuario.id_usuario : '',
                nome: log.usuario && log.usuario.nome ? log.usuario.nome : '',
                email: log.usuario && log.usuario.email ? log.usuario.email : '',
                tipo: log.usuario && log.usuario.tipo ? log.usuario.tipo : ''
              },
              mensagem: log.mensagem || '',
              erro: log.erro || '',
              criado_em: log.criado_em ? new Date(log.criado_em).toISOString() : '',
              atualizado_em: log.atualizado_em ? new Date(log.atualizado_em).toISOString() : ''
            }))
          }
        }
      };

      const xml = create(objetoXml).end({
        prettyPrint: true
      });

      const nomeArquivo = `logs_${new Date().toISOString().slice(0, 10)}.xml`;

      response.setHeader('Content-Type', 'application/xml; charset=utf-8');
      response.setHeader('Content-Disposition', `attachment; filename="${nomeArquivo}"`);
      response.status(200).send(xml);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = LogController;
