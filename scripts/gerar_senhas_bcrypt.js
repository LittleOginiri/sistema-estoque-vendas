require('dotenv').config();

const bcrypt = require('bcrypt');
const database = require('../src/database/MySqlDatabase');

async function executar() {
  try {
    const senhaPadrao = '123456';
    const hash = await bcrypt.hash(senhaPadrao, 10);

    await database.execute(
      'UPDATE usuarios SET senha = ? WHERE email IN (?, ?);',
      [hash, 'admin@admin.com', 'usuario@teste.com']
    );

    console.log('Senhas atualizadas com bcrypt com sucesso.');
    console.log('Usuários continuam usando a senha: 123456');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao atualizar senhas:', error.message);
    process.exit(1);
  }
}

executar();
