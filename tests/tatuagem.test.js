const request = require('supertest')
const { expect } = require('chai')
const app = require('../src/app')

beforeEach(async () => {
  await request(app).delete('/orcamentos/test/reset')
})

describe('API de orcamentos de tatuagem - CRUD', () => {
  const orcamentoValido = {
    clienteNome: 'Carlos Silva',
    clienteIdade: 25,
    descricao: 'Leao no braco',
    tamanhoCm: 15,
    estilo: 'realismo',
    local: 'bracos',
    presencaPais: false,
    fichaAnamnese: true
  }

  it('deve cadastrar um orçamento com sucesso', async () => {
    const res = await request(app).post('/orcamentos').send(orcamentoValido)

    expect(res.statusCode).to.equal(201)
    expect(res.body).to.deep.include({
      id: 1,
      mensagem: 'Orcamento cadastrado com sucesso'
    })
    expect(res.body.orcamento).to.deep.include({
      clienteNome: 'Carlos Silva',
      valorBase: 500,
      percentualAjuste: 25,
      valor: 625
    })
  })

  it('deve calcular a dificuldade pelo local quando ele for mais difícil que o estilo', async () => {
    const res = await request(app).post('/orcamentos').send({
      ...orcamentoValido,
      tamanhoCm: 35,
      estilo: 'fineline',
      local: 'cabeca'
    })

    expect(res.statusCode).to.equal(201)
    expect(res.body.orcamento).to.deep.include({
      nivelDificuldade: 'dificil',
      percentualAjuste: 50,
      valorBase: 800,
      valor: 1200
    })
  })

  it('deve calcular percentual zero quando a dificuldade final for facil', async () => {
    const res = await request(app).post('/orcamentos').send({
      ...orcamentoValido,
      tamanhoCm: 8,
      estilo: 'fineline',
      local: 'costas'
    })

    expect(res.statusCode).to.equal(201)
    expect(res.body.orcamento).to.deep.include({
      nivelDificuldade: 'facil',
      percentualAjuste: 0,
      valorBase: 200,
      valor: 200
    })
  })

  it('deve somar os percentuais de estilo e local quando ambos tiverem dificuldade', async () => {
    const res = await request(app).post('/orcamentos').send({
      ...orcamentoValido,
      tamanhoCm: 15,
      estilo: 'botanica',
      local: 'cabeca'
    })

    expect(res.statusCode).to.equal(201)
    expect(res.body.orcamento).to.deep.include({
      nivelDificuldade: 'dificil',
      percentualAjuste: 75,
      valorBase: 500,
      valor: 875
    })
  })

  it('deve validar campos obrigatórios', async () => {
    const res = await request(app).post('/orcamentos').send({})

    expect(res.statusCode).to.equal(400)
    expect(res.body).to.deep.equal({ erro: 'Todos os campos sao obrigatorios: clienteNome, clienteIdade, descricao, tamanhoCm, estilo, local, presencaPais e fichaAnamnese' })
  })

  it('deve validar presença dos pais para menores de 18', async () => {
    const orcamentoMenor = {
      ...orcamentoValido,
      clienteIdade: 16,
      presencaPais: false
    }
    const res = await request(app).post('/orcamentos').send(orcamentoMenor)

    expect(res.statusCode).to.equal(400)
    expect(res.body).to.deep.equal({ erro: 'Para clientes de 14 a 17 anos, a presenca dos pais e obrigatoria' })
  })

  it('deve validar a ficha de anamnese', async () => {
    const orcamentoSemFicha = {
      ...orcamentoValido,
      fichaAnamnese: false
    }
    const res = await request(app).post('/orcamentos').send(orcamentoSemFicha)

    expect(res.statusCode).to.equal(400)
    expect(res.body).to.deep.equal({ erro: 'Ficha de anamnese e obrigatoria' })
  })

  it('deve validar idade mínima de 14 anos', async () => {
    const orcamentoMenor = {
      ...orcamentoValido,
      clienteIdade: 13
    }
    const res = await request(app).post('/orcamentos').send(orcamentoMenor)

    expect(res.statusCode).to.equal(400)
    expect(res.body).to.deep.equal({ erro: 'Menor de 14 anos nao e permitido fazer tatuagem' })
  })

  it('deve retornar erro 400 quando o nome tiver menos de 3 caracteres', async () => {
    const res = await request(app).post('/orcamentos').send({
      ...orcamentoValido,
      clienteNome: 'Al'
    })

    expect(res.statusCode).to.equal(400)
    expect(res.body).to.deep.equal({ erro: 'Nome do cliente deve ter pelo menos 3 caracteres' })
  })

  it('deve retornar erro 400 quando a descricao estiver vazia', async () => {
    const res = await request(app).post('/orcamentos').send({
      ...orcamentoValido,
      descricao: '   '
    })

    expect(res.statusCode).to.equal(400)
    expect(res.body).to.deep.equal({ erro: 'Descricao do desenho e obrigatoria' })
  })

  it('deve retornar erro 400 quando o tamanho for invalido', async () => {
    const res = await request(app).post('/orcamentos').send({
      ...orcamentoValido,
      tamanhoCm: 0
    })

    expect(res.statusCode).to.equal(400)
    expect(res.body).to.deep.equal({ erro: 'Tamanho deve ser maior que 0' })
  })

  it('deve retornar erro 400 quando presencaPais nao for booleana', async () => {
    const res = await request(app).post('/orcamentos').send({
      ...orcamentoValido,
      presencaPais: 'sim'
    })

    expect(res.statusCode).to.equal(400)
    expect(res.body).to.deep.equal({ erro: 'Presenca dos pais deve ser informada como booleano' })
  })

  it('deve retornar erro 400 quando o estilo for invalido', async () => {
    const res = await request(app).post('/orcamentos').send({
      ...orcamentoValido,
      estilo: 'tribal'
    })

    expect(res.statusCode).to.equal(400)
    expect(res.body).to.deep.equal({ erro: 'Estilo invalido' })
  })

  it('deve retornar erro 400 quando o local for invalido', async () => {
    const res = await request(app).post('/orcamentos').send({
      ...orcamentoValido,
      local: 'joelho'
    })

    expect(res.statusCode).to.equal(400)
    expect(res.body).to.deep.equal({ erro: 'Local invalido' })
  })

  it('deve listar todos os orcamentos', async () => {
    await request(app).post('/orcamentos').send(orcamentoValido)
    const res = await request(app).get('/orcamentos')

    expect(res.statusCode).to.equal(200)
    expect(res.body).to.have.lengthOf(1)
    expect(res.body[0]).to.deep.include({ clienteNome: 'Carlos Silva', valor: 625 })
  })

  it('deve buscar orcamento por id', async () => {
    await request(app).post('/orcamentos').send(orcamentoValido)

    const res = await request(app).get('/orcamentos/1')

    expect(res.statusCode).to.equal(200)
    expect(res.body).to.deep.include({ id: 1, clienteNome: 'Carlos Silva', valor: 625 })
  })

  it('deve retornar erro ao buscar orcamento inexistente', async () => {
    const res = await request(app).get('/orcamentos/999')

    expect(res.statusCode).to.equal(404)
    expect(res.body).to.deep.equal({ erro: 'Orcamento nao encontrado' })
  })

  it('deve atualizar orcamento existente', async () => {
    await request(app).post('/orcamentos').send(orcamentoValido)

    const res = await request(app).put('/orcamentos/1').send({
      ...orcamentoValido,
      tamanhoCm: 40,
      estilo: 'pontilhismo',
      local: 'cabeca',
      descricao: 'Leao maior e mais complexo'
    })

    expect(res.statusCode).to.equal(200)
    expect(res.body.orcamento).to.deep.include({ id: 1, valorBase: 1200, percentualAjuste: 100, valor: 2400 })
  })

  it('deve retornar erro 400 ao atualizar orcamento com dados invalidos', async () => {
    await request(app).post('/orcamentos').send(orcamentoValido)

    const res = await request(app).put('/orcamentos/1').send({
      ...orcamentoValido,
      fichaAnamnese: false
    })

    expect(res.statusCode).to.equal(400)
    expect(res.body).to.deep.equal({ erro: 'Ficha de anamnese e obrigatoria' })
  })

  it('deve retornar erro ao atualizar orcamento inexistente', async () => {
    const res = await request(app).put('/orcamentos/999').send(orcamentoValido)

    expect(res.statusCode).to.equal(404)
    expect(res.body).to.deep.equal({ erro: 'Orcamento nao encontrado' })
  })

  it('deve excluir orcamento existente', async () => {
    await request(app).post('/orcamentos').send(orcamentoValido)

    const resDelete = await request(app).delete('/orcamentos/1')
    expect(resDelete.statusCode).to.equal(204)

    const resGet = await request(app).get('/orcamentos/1')
    expect(resGet.statusCode).to.equal(404)
  })

  it('deve retornar erro ao excluir orcamento inexistente', async () => {
    const res = await request(app).delete('/orcamentos/999')

    expect(res.statusCode).to.equal(404)
    expect(res.body).to.deep.equal({ erro: 'Orcamento nao encontrado' })
  })
})
