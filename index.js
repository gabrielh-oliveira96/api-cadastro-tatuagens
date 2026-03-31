const express = require('express');
const bodyParser = require('body-parser');
const tatuagemRoutes = require('./routes/tatuagens');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
app.use('/api/tatuagens', tatuagemRoutes);

// Rota de saúde da API
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'API está funcionando!' });
});

// Tratamento de erro 404
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
