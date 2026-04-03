const BASE_POR_TAMANHO = [
  { limiteMaximo: 10, valor: 200 },
  { limiteMaximo: 20, valor: 500 },
  { limiteMaximo: 35, valor: 800 },
  { limiteMaximo: Infinity, valor: 1200 }
]

const NIVEL_PESO = {
  facil: 0,
  medio: 1,
  dificil: 2
}

const PERCENTUAIS_POR_NIVEL = {
  facil: 0,
  medio: 25,
  dificil: 50
}

const ESTILOS = {
  pontilhismo: 'dificil',
  realismo: 'medio',
  fineline: 'facil',
  botanica: 'medio'
}

const LOCAIS = {
  cabeca: 'dificil',
  pescoco: 'dificil',
  claviculas: 'dificil',
  dedos: 'dificil',
  joelhos: 'dificil',
  maos: 'dificil',
  pes: 'dificil',
  tornozelos: 'dificil',
  rosto: 'medio',
  virilha: 'medio',
  nadegas: 'medio',
  barriga: 'medio',
  ombros: 'facil',
  bracos: 'facil',
  antebracos: 'facil',
  peitoral: 'facil',
  coxas: 'facil',
  canelas: 'facil',
  panturrilhas: 'facil',
  costas: 'facil'
}

function validarOrcamento(data) {
  const {
    clienteNome,
    clienteIdade,
    descricao,
    tamanhoCm,
    estilo,
    local,
    presencaPais,
    fichaAnamnese
  } = data

  if (
    clienteNome === undefined ||
    clienteIdade === undefined ||
    descricao === undefined ||
    tamanhoCm === undefined ||
    estilo === undefined ||
    local === undefined ||
    presencaPais === undefined ||
    fichaAnamnese === undefined
  ) {
    return 'Todos os campos sao obrigatorios: clienteNome, clienteIdade, descricao, tamanhoCm, estilo, local, presencaPais e fichaAnamnese'
  }

  if (typeof clienteNome !== 'string' || clienteNome.trim().length < 3) {
    return 'Nome do cliente deve ter pelo menos 3 caracteres'
  }

  if (!Number.isInteger(clienteIdade) || clienteIdade < 14) {
    return 'Menor de 14 anos nao e permitido fazer tatuagem'
  }

  if (typeof descricao !== 'string' || descricao.trim().length === 0) {
    return 'Descricao do desenho e obrigatoria'
  }

  if (typeof tamanhoCm !== 'number' || Number.isNaN(tamanhoCm) || tamanhoCm <= 0) {
    return 'Tamanho deve ser maior que 0'
  }

  if (typeof presencaPais !== 'boolean') {
    return 'Presenca dos pais deve ser informada como booleano'
  }

  if (typeof fichaAnamnese !== 'boolean' || fichaAnamnese !== true) {
    return 'Ficha de anamnese e obrigatoria'
  }

  if (clienteIdade >= 14 && clienteIdade <= 17 && presencaPais !== true) {
    return 'Para clientes de 14 a 17 anos, a presenca dos pais e obrigatoria'
  }

  if (!Object.prototype.hasOwnProperty.call(ESTILOS, estilo)) {
    return 'Estilo invalido'
  }

  if (!Object.prototype.hasOwnProperty.call(LOCAIS, local)) {
    return 'Local invalido'
  }

  return null
}

function obterValorBasePorTamanho(tamanhoCm) {
  const tamanhoNumerico = Number(tamanhoCm)

  if (tamanhoNumerico <= 10) {
    return BASE_POR_TAMANHO[0].valor
  }

  if (tamanhoNumerico <= 20) {
    return BASE_POR_TAMANHO[1].valor
  }

  if (tamanhoNumerico <= 35) {
    return BASE_POR_TAMANHO[2].valor
  }

  return BASE_POR_TAMANHO[3].valor
}

function obterNivelDificuldade(estilo, local) {
  const nivelEstilo = NIVEL_PESO[ESTILOS[estilo]]
  const nivelLocal = NIVEL_PESO[LOCAIS[local]]

  if (nivelEstilo >= nivelLocal) {
    return ESTILOS[estilo]
  }

  return LOCAIS[local]
}

function obterPercentualAjuste(nivelDificuldade) {
  return PERCENTUAIS_POR_NIVEL[nivelDificuldade]
}

function calcularOrcamento(data) {
  const valorBase = obterValorBasePorTamanho(data.tamanhoCm)
  const percentualEstilo = obterPercentualAjuste(ESTILOS[data.estilo])
  const percentualLocal = obterPercentualAjuste(LOCAIS[data.local])
  const nivelDificuldade = obterNivelDificuldade(data.estilo, data.local)
  const percentualAjuste = percentualEstilo + percentualLocal
  const valor = Math.round(valorBase * (1 + percentualAjuste / 100))

  return {
    valorBase,
    nivelDificuldade,
    percentualAjuste,
    valor
  }
}

module.exports = {
  validarOrcamento,
  calcularOrcamento
}