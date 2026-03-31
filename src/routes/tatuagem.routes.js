const express = require('express')
const router = express.Router()

const { validarTatuagem } = require('../validators/tatuagem.validator')

let tatuagens = []
let idAtual = 1

router.post('/', (req, res) => {
  const erro = validarTatuagem(req.body)

  if (erro) {
    return res.status(400).json({ erro })
  }

  const novaTatuagem = {
    id: idAtual++,
    ...req.body
  }

  tatuagens.push(novaTatuagem)

  return res.status(201).json({
    id: novaTatuagem.id,
    mensagem: 'Tatuagem cadastrada com sucesso',
    tatuagem: novaTatuagem
  })
})

router.get('/', (req, res) => {
  return res.json(tatuagens)
})

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const tatuagem = tatuagens.find(t => t.id === id)

  if (!tatuagem) {
    return res.status(404).json({ erro: 'Tatuagem não encontrada' })
  }

  return res.json(tatuagem)
})

router.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = tatuagens.findIndex(t => t.id === id)

  if (index === -1) {
    return res.status(404).json({ erro: 'Tatuagem não encontrada' })
  }

  const erro = validarTatuagem(req.body)

  if (erro) {
    return res.status(400).json({ erro })
  }

  tatuagens[index] = { id, ...req.body }

  return res.json({ mensagem: 'Tatuagem atualizada com sucesso', tatuagem: tatuagens[index] })
})

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = tatuagens.findIndex(t => t.id === id)

  if (index === -1) {
    return res.status(404).json({ erro: 'Tatuagem não encontrada' })
  }

  tatuagens.splice(index, 1)

  return res.status(204).send()
})

if (process.env.NODE_ENV === 'test') {
  router.delete('/test/reset', (req, res) => {
    tatuagens = []
    idAtual = 1
    return res.status(204).send()
  })
}

module.exports = router