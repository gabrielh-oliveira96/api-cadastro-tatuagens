// Modelo de dados - Simulando um banco de dados em memória
let tatuagens = [
  {
    id: 1,
    nome: 'Phoenix',
    descricao: 'Ave fênix em cores vibrantes',
    artista: 'João Silva',
    preco: 250.00,
    dataCriacao: '2025-01-15'
  },
  {
    id: 2,
    nome: 'Dragão',
    descricao: 'Dragão oriental preto e branco',
    artista: 'Maria Santos',
    preco: 300.00,
    dataCriacao: '2025-02-10'
  }
];

// Simulando um ID auto-incrementador
let proximoId = 3;

module.exports = {
  // Obter todas as tatuagens
  obterTodas: () => tatuagens,

  // Obter uma tatuagem por ID
  obterPorId: (id) => tatuagens.find(t => t.id === parseInt(id)),

  // Criar nova tatuagem
  criar: (dados) => {
    const novaTatuagem = {
      id: proximoId++,
      ...dados,
      dataCriacao: new Date().toISOString().split('T')[0]
    };
    tatuagens.push(novaTatuagem);
    return novaTatuagem;
  },

  // Atualizar uma tatuagem
  atualizar: (id, dados) => {
    const indice = tatuagens.findIndex(t => t.id === parseInt(id));
    if (indice === -1) return null;
    
    tatuagens[indice] = { ...tatuagens[indice], ...dados };
    return tatuagens[indice];
  },

  // Deletar uma tatuagem
  deletar: (id) => {
    const indice = tatuagens.findIndex(t => t.id === parseInt(id));
    if (indice === -1) return false;
    
    tatuagens.splice(indice, 1);
    return true;
  }
};
