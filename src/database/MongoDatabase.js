const mongoose = require('mongoose');

class MongoDatabase {
  #conectado = false;

  async connect() {
    if (this.#conectado) {
      return;
    }

    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/estoque_vendas_logs';

    try {
      await mongoose.connect(mongoUri);
      this.#conectado = true;
      console.log('MongoDB conectado com sucesso.');
    } catch (error) {
      console.error('Erro ao conectar no MongoDB:', error.message);
    }
  }
}

module.exports = new MongoDatabase();
