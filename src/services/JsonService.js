const database = require('../database/MySqlDatabase');

class JsonService {
  #entidadesPermitidas = {
    usuarios: {
      tabela: 'usuarios',
      chave: 'id_usuario',
      camposImportacao: ['nome', 'email', 'senha', 'tipo', 'ativo']
    },
    clientes: {
      tabela: 'clientes',
      chave: 'id_cliente',
      camposImportacao: ['nome', 'email', 'telefone', 'cpf', 'ativo']
    },
    categorias: {
      tabela: 'categorias',
      chave: 'id_categoria',
      camposImportacao: ['nome', 'descricao', 'ativo']
    },
    produtos: {
      tabela: 'produtos',
      chave: 'id_produto',
      camposImportacao: ['id_categoria', 'nome', 'descricao', 'preco', 'estoque', 'imagem', 'ativo']
    },
    vendas: {
      tabela: 'vendas',
      chave: 'id_venda',
      camposImportacao: []
    },
    itens_venda: {
      tabela: 'itens_venda',
      chave: 'id_item_venda',
      camposImportacao: []
    }
  };

  validarEntidade(entidade) {
    if (!this.#entidadesPermitidas[entidade]) {
      const error = new Error('Entidade inválida para importação/exportação JSON.');
      error.status = 400;
      throw error;
    }

    return this.#entidadesPermitidas[entidade];
  }

  async exportar(entidade) {
    const config = this.validarEntidade(entidade);

    const sql = `SELECT * FROM ${config.tabela} ORDER BY ${config.chave};`;
    const dados = await database.execute(sql);

    return {
      entidade,
      tabela: config.tabela,
      total: dados.length,
      exportado_em: new Date().toISOString(),
      dados
    };
  }

  async importar(entidade, registros) {
    const config = this.validarEntidade(entidade);

    if (!Array.isArray(registros)) {
      const error = new Error('O JSON importado deve ser um array de objetos.');
      error.status = 400;
      throw error;
    }

    if (config.camposImportacao.length === 0) {
      const error = new Error(`A entidade ${entidade} não está liberada para importação direta por segurança.`);
      error.status = 400;
      throw error;
    }

    const resultado = {
      entidade,
      recebidos: registros.length,
      inseridos: 0,
      erros: []
    };

    for (let i = 0; i < registros.length; i++) {
      const registro = registros[i];

      try {
        this.#validarRegistro(entidade, registro);

        const campos = config.camposImportacao.filter((campo) => registro[campo] !== undefined);
        const valores = campos.map((campo) => registro[campo]);
        const placeholders = campos.map(() => '?').join(', ');

        const sql = `
          INSERT INTO ${config.tabela}
            (${campos.join(', ')})
          VALUES
            (${placeholders});
        `;

        await database.execute(sql, valores);
        resultado.inseridos++;
      } catch (error) {
        resultado.erros.push({
          linha: i + 1,
          mensagem: error.message,
          registro
        });
      }
    }

    return resultado;
  }

  #validarRegistro(entidade, registro) {
    if (!registro || typeof registro !== 'object' || Array.isArray(registro)) {
      throw new Error('Cada item deve ser um objeto JSON.');
    }

    if (entidade === 'usuarios') {
      if (!registro.nome || !registro.email || !registro.senha || !registro.tipo) {
        throw new Error('Usuário precisa de nome, email, senha e tipo.');
      }

      if (!['ADMIN', 'COMUM'].includes(String(registro.tipo).toUpperCase())) {
        throw new Error('tipo do usuário deve ser ADMIN ou COMUM.');
      }

      registro.tipo = String(registro.tipo).toUpperCase();
      registro.ativo = registro.ativo === undefined ? true : Boolean(registro.ativo);
    }

    if (entidade === 'clientes') {
      if (!registro.nome || String(registro.nome).trim().length < 3) {
        throw new Error('Cliente precisa de nome com pelo menos 3 caracteres.');
      }

      if (registro.email && (!String(registro.email).includes('@') || !String(registro.email).includes('.'))) {
        throw new Error('email do cliente inválido.');
      }

      registro.ativo = registro.ativo === undefined ? true : Boolean(registro.ativo);
    }

    if (entidade === 'categorias') {
      if (!registro.nome || String(registro.nome).trim().length < 2) {
        throw new Error('Categoria precisa de nome com pelo menos 2 caracteres.');
      }

      registro.ativo = registro.ativo === undefined ? true : Boolean(registro.ativo);
    }

    if (entidade === 'produtos') {
      const idCategoria = Number(registro.id_categoria);
      const preco = Number(registro.preco);
      const estoque = Number(registro.estoque);

      if (!Number.isInteger(idCategoria) || idCategoria <= 0) {
        throw new Error('Produto precisa de id_categoria inteiro maior que zero.');
      }

      if (!registro.nome || String(registro.nome).trim().length < 2) {
        throw new Error('Produto precisa de nome com pelo menos 2 caracteres.');
      }

      if (Number.isNaN(preco) || preco < 0) {
        throw new Error('Produto precisa de preco maior ou igual a zero.');
      }

      if (!Number.isInteger(estoque) || estoque < 0) {
        throw new Error('Produto precisa de estoque inteiro maior ou igual a zero.');
      }

      registro.id_categoria = idCategoria;
      registro.preco = preco;
      registro.estoque = estoque;
      registro.ativo = registro.ativo === undefined ? true : Boolean(registro.ativo);
    }
  }
}

module.exports = new JsonService();
