const express = require('express');
const tatuagemController = require('../controllers/tatuagemController');

const router = express.Router();

// Rotas CRUD para Tatuagens
// GET - Listar todas as tatuagens
router.get('/', tatuagemController.listar);

// GET - Obter uma tatuagem por ID
router.get('/:id', tatuagemController.obterPorId);

// POST - Criar nova tatuagem
router.post('/', tatuagemController.criar);

// PUT - Atualizar uma tatuagem
router.put('/:id', tatuagemController.atualizar);

// DELETE - Deletar uma tatuagem
router.delete('/:id', tatuagemController.deletar);

module.exports = router;
