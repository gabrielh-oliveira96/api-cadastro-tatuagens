const request = require('supertest')
const app = require('../src/app')

beforeEach(async () => {
  await request(app).delete('/tatuagens/test/reset')
})

describe('API de tatuagens - CRUD', () => {
  const tatuagemValida = {
    clienteNome: 'Carlos Silva',
    clienteIdade: 25,
    areaCorpo: 'braco',
    descricao: 'Tatuagem de leão',
    tamanhoCm: 15,
    valor: 250,
    tipo: 'colorido',
    estilo: 'realismo',
    local: 'bracos',
    tipoServico: 'nova',
    presencaPais: false,
    fichaAnamnese: true
  }

  it('deve cadastrar uma tatuagem com sucesso', async () => {
    const res = await request(app).post('/tatuagens').send(tatuagemValida)

    expect(res.statusCode).toBe(201)
    expect(res.body).toEqual(expect.objectContaining({
      id: 1,
      mensagem: 'Tatuagem cadastrada com sucesso'
    }))
    expect(res.body.tatuagem).toEqual(expect.objectContaining({
      clienteNome: 'Carlos Silva',
      valor: 250
    }))
  })

  it('deve validar campos obrigatórios', async () => {
    const res = await request(app).post('/tatuagens').send({})

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual({ erro: 'Todos os campos são obrigatórios, incluindo tipo, estilo, local, tipoServico e fichaAnamnese' })
  })

  it('deve validar presença de pais para menores de 18', async () => {
    const tatuagemMenor = {
      ...tatuagemValida,
      clienteIdade: 16,
      presencaPais: false
    }
    const res = await request(app).post('/tatuagens').send(tatuagemMenor)

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual({ erro: 'Para clientes de 14 a 17 anos, presença dos pais é obrigatória' })
  })

  it('deve validar valor mínimo para tatuagem nova', async () => {
    const tatuagemBarata = {
      ...tatuagemValida,
      valor: 150
    }
    const res = await request(app).post('/tatuagens').send(tatuagemBarata)

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual({ erro: 'Valor mínimo para tatuagem nova é R$200,00' })
  })

  it('deve validar idade mínima de 14 anos', async () => {
    const tatuagemMenor = {
      ...tatuagemValida,
      clienteIdade: 13
    }
    const res = await request(app).post('/tatuagens').send(tatuagemMenor)

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual({ erro: 'Menor de 14 anos não é permitido fazer tatuagem' })
  })

  it('deve listar todas as tatuagens', async () => {
    await request(app).post('/tatuagens').send(tatuagemValida)
    const res = await request(app).get('/tatuagens')

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveLength(1)
    expect(res.body[0]).toMatchObject({ clienteNome: 'Carlos Silva' })
  })

  it('deve buscar tatuagem por id', async () => {
    await request(app).post('/tatuagens').send(tatuagemValida)

    const res = await request(app).get('/tatuagens/1')

    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ id: 1, clienteNome: 'Carlos Silva' })
  })

  it('deve atualizar tatuagem existente', async () => {
    await request(app).post('/tatuagens').send(tatuagemValida)

    const res = await request(app).put('/tatuagens/1').send({
      ...tatuagemValida,
      clienteIdade: 26,
      descricao: 'Tatuagem de leão renovada'
    })

    expect(res.statusCode).toBe(200)
    expect(res.body.tatuagem).toMatchObject({ id: 1, clienteIdade: 26 })
  })

  it('deve excluir tatuagem existente', async () => {
    await request(app).post('/tatuagens').send(tatuagemValida)

    const resDelete = await request(app).delete('/tatuagens/1')
    expect(resDelete.statusCode).toBe(204)

    const resGet = await request(app).get('/tatuagens/1')
    expect(resGet.statusCode).toBe(404)
  })
})
