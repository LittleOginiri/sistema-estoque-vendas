require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const mongoDatabase = require('./src/database/MongoDatabase');

const healthRoutes = require('./src/routes/HealthRoutes');
const testeBancoRoutes = require('./src/routes/TesteBancoRoutes');
const authRoutes = require('./src/routes/AuthRoutes');
const produtoRoutes = require('./src/routes/ProdutoRoutes');
const clienteRoutes = require('./src/routes/ClienteRoutes');
const categoriaRoutes = require('./src/routes/CategoriaRoutes');
const vendaRoutes = require('./src/routes/VendaRoutes');
const logRoutes = require('./src/routes/LogRoutes');
const jsonRoutes = require('./src/routes/JsonRoutes');
const relatorioRoutes = require('./src/routes/RelatorioRoutes');
const dashboardRoutes = require('./src/routes/DashboardRoutes');

const logMiddleware = require('./src/middlewares/LogMiddleware');
const ErrorMiddleware = require('./src/middlewares/ErrorMiddleware');

const app = express();
const portaServico = process.env.PORT || 3000;

mongoDatabase.connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logMiddleware.registrar);

const publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (request, response) => {
  response.status(200).json({
    success: true,
    message: 'API do Sistema de Estoque e Vendas está funcionando.',
    versao: '0.12.3',
    rotas_teste: [
      '/api/health',
      '/api/teste/mysql',
      '/api/teste/usuarios',
      '/api/teste/produtos',
      'POST /api/auth/login',
      'GET /api/auth/me',
      'GET /api/produtos',
      'GET /api/clientes',
      'GET /api/categorias',
      'GET /api/vendas',
      'GET /api/logs',
      'GET /api/logs/:id',
      'GET /api/logs/export/xml',
      'GET /api/json/export/:entidade',
      'POST /api/json/import/:entidade',
      'GET /api/relatorios/vendas',
      'GET /api/relatorios/vendas/pdf',
      'GET /api/dashboard/resumo',
      'GET /api/dashboard/vendas-por-status',
      'GET /api/dashboard/produtos-mais-vendidos',
      'GET /api/dashboard/vendas-por-dia',
      'GET /api/dashboard/estoque-por-categoria',
      'GET /api/dashboard/produtos-baixo-estoque',
      'GET /api/dashboard/completo',
      '/login',
      '/produtos',
      '/clientes',
      '/categorias',
      '/vendas',
      '/logs',
      '/json',
      '/relatorios',
      '/dashboard'
    ]
  });
});

app.get('/login', (request, response) => {
  response.sendFile(path.join(publicPath, 'html', 'login.html'));
});

app.get('/produtos', (request, response) => {
  response.sendFile(path.join(publicPath, 'html', 'produtos.html'));
});

app.get('/clientes', (request, response) => {
  response.sendFile(path.join(publicPath, 'html', 'clientes.html'));
});

app.get('/categorias', (request, response) => {
  response.sendFile(path.join(publicPath, 'html', 'categorias.html'));
});

app.get('/vendas', (request, response) => {
  response.sendFile(path.join(publicPath, 'html', 'vendas.html'));
});

app.get('/logs', (request, response) => {
  response.sendFile(path.join(publicPath, 'html', 'logs.html'));
});

app.get('/json', (request, response) => {
  response.sendFile(path.join(publicPath, 'html', 'json.html'));
});

app.get('/relatorios', (request, response) => {
  response.sendFile(path.join(publicPath, 'html', 'relatorios.html'));
});

app.get('/dashboard', (request, response) => {
  response.sendFile(path.join(publicPath, 'html', 'dashboard.html'));
});

app.use('/api/health', healthRoutes);
app.use('/api/teste', testeBancoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/vendas', vendaRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/json', jsonRoutes);
app.use('/api/relatorios', relatorioRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use((request, response) => {
  response.status(404).json({
    success: false,
    message: 'Rota não encontrada.',
    endpoint: request.originalUrl
  });
});

// O ErrorMiddleware deve ficar por último, depois de todas as rotas
app.use(ErrorMiddleware);

app.listen(portaServico, () => {
  console.log(`API rodando em: http://localhost:${portaServico}`);
  console.log(`Login disponível em: http://localhost:${portaServico}/login`);
  console.log(`Produtos disponível em: http://localhost:${portaServico}/produtos`);
  console.log(`Clientes disponível em: http://localhost:${portaServico}/clientes`);
  console.log(`Categorias disponível em: http://localhost:${portaServico}/categorias`);
  console.log(`Vendas disponível em: http://localhost:${portaServico}/vendas`);
  console.log(`Logs disponíveis em: http://localhost:${portaServico}/api/logs`);
  console.log(`Tela de logs disponível em: http://localhost:${portaServico}/logs`);
  console.log(`Importação/Exportação JSON disponível em: http://localhost:${portaServico}/json`);
  console.log(`Relatórios disponível em: http://localhost:${portaServico}/relatorios`);
  console.log(`Dashboard disponível em: http://localhost:${portaServico}/dashboard`);
});
