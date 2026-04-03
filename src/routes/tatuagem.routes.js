const express = require('express')
const router = express.Router()

const { validarOrcamento, calcularOrcamento } = require('../validators/tatuagem.validator')

let orcamentos = []
let idAtual = 1

router.post('/', (req, res) => {
  const erro = validarOrcamento(req.body)

  if (erro) {
    return res.status(400).json({ erro })
  }

  const novoOrcamento = {
    id: idAtual++,
    ...req.body,
    ...calcularOrcamento(req.body)
  }

  orcamentos.push(novoOrcamento)

  return res.status(201).json({
    id: novoOrcamento.id,
    mensagem: 'Orcamento cadastrado com sucesso',
    orcamento: novoOrcamento
  })
})

router.get('/', (req, res) => {
  return res.json(orcamentos)
})

if (process.env.NODE_ENV === 'test') {
  router.delete('/test/reset', (req, res) => {
    orcamentos = []
    idAtual = 1
    return res.status(204).send()
  })
}

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const orcamento = orcamentos.find(item => item.id === id)

  if (!orcamento) {
    return res.status(404).json({ erro: 'Orcamento nao encontrado' })
  }

  return res.json(orcamento)
})

router.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = orcamentos.findIndex(item => item.id === id)

  if (index === -1) {
    return res.status(404).json({ erro: 'Orcamento nao encontrado' })
  }

  const erro = validarOrcamento(req.body)

  if (erro) {
    return res.status(400).json({ erro })
  }

  orcamentos[index] = {
    id,
    ...req.body,
    ...calcularOrcamento(req.body)
  }

  return res.json({ mensagem: 'Orcamento atualizado com sucesso', orcamento: orcamentos[index] })
})

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = orcamentos.findIndex(item => item.id === id)

  if (index === -1) {
    return res.status(404).json({ erro: 'Orcamento nao encontrado' })
  }

  orcamentos.splice(index, 1)

  return res.status(204).send()
})

module.exports = router