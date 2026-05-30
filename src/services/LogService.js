const Log = require('../models/Log');

class LogService {
  async registrarLog(dados) {
    try {
      const log = new Log({
        acao: dados.acao || 'ACESSO_ROTA',
        endpoint: dados.endpoint,
        metodo: dados.metodo,
        status_code: dados.status_code,
        ip: dados.ip,
        usuario: dados.usuario || null,
        mensagem: dados.mensagem || null,
        erro: dados.erro || null,
        body: this.#filtrarBody(dados.body)
      });

      await log.save();
    } catch (error) {
      console.error('Erro ao registrar log no MongoDB:', error.message);
    }
  }

  async listarLogs(filtros = {}, limite = 200) {
    const query = this.#montarQuery(filtros);

    return Log.find(query)
      .sort({ criado_em: -1 })
      .limit(limite)
      .lean();
  }

  async buscarLogPorId(idLog) {
    return Log.findById(idLog).lean();
  }

  async listarLogsParaExportacao(filtros = {}) {
    const query = this.#montarQuery(filtros);

    return Log.find(query)
      .sort({ criado_em: -1 })
      .limit(1000)
      .lean();
  }

  #montarQuery(filtros = {}) {
    const query = {};

    if (filtros.acao) {
      query.acao = filtros.acao;
    }

    if (filtros.metodo) {
      query.metodo = filtros.metodo;
    }

    if (filtros.status_code) {
      query.status_code = Number(filtros.status_code);
    }

    if (filtros.id_usuario) {
      query['usuario.id_usuario'] = Number(filtros.id_usuario);
    }

    if (filtros.email_usuario) {
      query['usuario.email'] = filtros.email_usuario;
    }

    if (filtros.data_inicio || filtros.data_fim) {
      query.criado_em = {};

      if (filtros.data_inicio) {
        query.criado_em.$gte = new Date(filtros.data_inicio);
      }

      if (filtros.data_fim) {
        query.criado_em.$lte = new Date(filtros.data_fim);
      }
    }

    return query;
  }

  #filtrarBody(body) {
    if (!body || typeof body !== 'object') {
      return null;
    }

    const bodyFiltrado = { ...body };

    if (bodyFiltrado.senha) {
      bodyFiltrado.senha = '[REMOVIDO]';
    }

    if (bodyFiltrado.password) {
      bodyFiltrado.password = '[REMOVIDO]';
    }

    return bodyFiltrado;
  }
}

module.exports = new LogService();
