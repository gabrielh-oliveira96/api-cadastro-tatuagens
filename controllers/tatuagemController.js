const TatuagemModel = require('../models/tatuagem');

// Obter todas as tatuagens
exports.listar = (req, res) => {
  try {
    const tatuagens = TatuagemModel.obterTodas();
    res.status(200).json({
      mensagem: 'Tatuagens listadas com sucesso',
      dados: tatuagens,
      total: tatuagens.length
    });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao listar tatuagens' });
  }
};

// Obter uma tatuagem por ID
exports.obterPorId = (req, res) => {
  try {
    const { id } = req.params;
    const tatuagem = TatuagemModel.obterPorId(id);

    if (!tatuagem) {
      return res.status(404).json({ erro: 'Tatuagem não encontrada' });
    }

    res.status(200).json({
      mensagem: 'Tatuagem encontrada',
      dados: tatuagem
    });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar tatuagem' });
  }
};

// Criar nova tatuagem
exports.criar = (req, res) => {
  try {
    const { nome, descricao, artista, preco } = req.body;

    // Validação de dados obrigatórios
    if (!nome || !descricao || !artista || !preco) {
      return res.status(400).json({
        erro: 'Campos obrigatórios: nome, descricao, artista, preco'
      });
    }

    // Validação de preço
    if (isNaN(preco) || preco <= 0) {
      return res.status(400).json({ erro: 'Preço deve ser um número positivo' });
    }

    const novaTatuagem = TatuagemModel.criar({
      nome,
      descricao,
      artista,
      preco: parseFloat(preco)
    });

    res.status(201).json({
      mensagem: 'Tatuagem criada com sucesso',
      dados: novaTatuagem
    });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao criar tatuagem' });
  }
};

// Atualizar uma tatuagem
exports.atualizar = (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, artista, preco } = req.body;

    // Verificar se a tatuagem existe
    const tatuagem = TatuagemModel.obterPorId(id);
    if (!tatuagem) {
      return res.status(404).json({ erro: 'Tatuagem não encontrada' });
    }

    // Montar objeto com dados a atualizar
    const dadosAtualizacao = {};
    if (nome) dadosAtualizacao.nome = nome;
    if (descricao) dadosAtualizacao.descricao = descricao;
    if (artista) dadosAtualizacao.artista = artista;
    if (preco) {
      if (isNaN(preco) || preco <= 0) {
        return res.status(400).json({ erro: 'Preço deve ser um número positivo' });
      }
      dadosAtualizacao.preco = parseFloat(preco);
    }

    const tatuagemAtualizada = TatuagemModel.atualizar(id, dadosAtualizacao);

    res.status(200).json({
      mensagem: 'Tatuagem atualizada com sucesso',
      dados: tatuagemAtualizada
    });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar tatuagem' });
  }
};

// Deletar uma tatuagem
exports.deletar = (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se a tatuagem existe
    const tatuagem = TatuagemModel.obterPorId(id);
    if (!tatuagem) {
      return res.status(404).json({ erro: 'Tatuagem não encontrada' });
    }

    TatuagemModel.deletar(id);

    res.status(200).json({
      mensagem: 'Tatuagem deletada com sucesso',
      id: id
    });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao deletar tatuagem' });
  }
};
