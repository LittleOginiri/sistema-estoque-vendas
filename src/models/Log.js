const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema(
  {
    acao: { type: String, required: true },
    endpoint: { type: String, required: true },
    metodo: { type: String, required: true },
    status_code: { type: Number, required: true },
    ip: { type: String },
    usuario: {
      id_usuario: Number,
      nome: String,
      email: String,
      tipo: String
    },
    mensagem: { type: String },
    erro: { type: String },
    body: { type: Object }
  },
  {
    timestamps: {
      createdAt: 'criado_em',
      updatedAt: 'atualizado_em'
    },
    collection: 'logs'
  }
);

module.exports = mongoose.model('Log', LogSchema);
