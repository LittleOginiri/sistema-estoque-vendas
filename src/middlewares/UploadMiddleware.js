const multer = require('multer');
const path = require('path');
const fs = require('fs');

const pastaProdutos = path.join(__dirname, '../../uploads/produtos');

if (!fs.existsSync(pastaProdutos)) {
  fs.mkdirSync(pastaProdutos, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, pastaProdutos);
  },

  filename: (request, file, callback) => {
    const extensao = path.extname(file.originalname).toLowerCase();
    const nomeArquivo = `${Date.now()}-${Math.round(Math.random() * 1E9)}${extensao}`;

    callback(null, nomeArquivo);
  }
});

const fileFilter = (request, file, callback) => {
  const tiposPermitidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (tiposPermitidos.includes(file.mimetype)) {
    return callback(null, true);
  }

  const error = new Error('Formato de imagem inválido. Use JPG, PNG ou WEBP.');
  error.status = 400;
  return callback(error);
};

const uploadProduto = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024
  }
});

module.exports = uploadProduto;
