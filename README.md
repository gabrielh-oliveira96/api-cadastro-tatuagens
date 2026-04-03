# API de Orcamentos de Tatuagem

API REST para cadastro, consulta, atualização e exclusão de orçamentos de tatuagem em memória, construída com Node.js e Express.

## Visão Geral

O projeto expõe um CRUD completo em `/orcamentos` e calcula automaticamente o valor do orçamento com base no tamanho, no estilo e no local da tatuagem.

## Regras de Negócio

### Cálculo de Valor

O valor é calculado em duas etapas:

1. Define-se o valor base pela faixa de tamanho:
   - Pequena: R$200,00.
   - Média: R$500,00.
   - Grande: R$800,00.
   - Fechamento: R$1200,00.

2. Aplica-se um ajuste pela dificuldade do estilo e do local:
  - Fácil: +0%.
  - Médio: +25%.
  - Difícil: +50%.

Os percentuais do estilo e do local são somados para chegar ao valor final.
Exemplo: um estilo médio combinado com um local difícil resulta em 75% sobre o valor base.

Exemplo de cálculo:
- Valor base: R$500,00.
- Estilo médio: +25%.
- Local difícil: +50%.
- Percentual total: 75%.
- Valor final: R$875,00.

### Dificuldade por Estilo
- Pontilhismo: difícil.
- Realismo: médio.
- Fineline: fácil.
- Botânica: médio.

### Dificuldade por Local
- Difícil: Cabeça, Pescoço, Clavículas, Dedos, Joelhos, Mãos, Pés, Tornozelos.
- Médio: Rosto, Virilha, Nádegas, Barriga.
- Fácil: Ombros, Braços, Antebraços, Peitoral, Coxas, Canelas, Panturrilhas, Costas.

Quando um local aparece em mais de uma categoria, o sistema considera o nível mais alto de dificuldade.

### Validações de Negócio
- O cliente deve ter pelo menos 14 anos.
- De 14 a 17 anos, a presença dos pais é obrigatória.
- A ficha de anamnese é obrigatória para qualquer idade.

## Endpoints da API

### POST /orcamentos
Cria um novo orçamento e calcula automaticamente os campos `valorBase`, `nivelDificuldade`, `percentualAjuste` e `valor`.

Regras aplicadas nessa rota:
- Recusa clientes menores de 14 anos.
- Exige presença dos pais entre 14 e 17 anos.
- Exige ficha de anamnese verdadeira.
- Valida estilo e local informados.

Campos enviados no corpo:
- `clienteNome`
- `clienteIdade`
- `descricao`
- `tamanhoCm`
- `estilo`
- `local`
- `presencaPais`
- `fichaAnamnese`

Retorno:
- `201` quando o orçamento é criado.
- `400` quando alguma regra de validação falha.

Resposta de sucesso:
```json
{
  "id": 1,
  "mensagem": "Orcamento cadastrado com sucesso",
  "orcamento": {
    "id": 1,
    "clienteNome": "Carlos Silva",
    "clienteIdade": 25,
    "descricao": "Leao no braco",
    "tamanhoCm": 15,
    "estilo": "realismo",
    "local": "bracos",
    "presencaPais": false,
    "fichaAnamnese": true,
    "valorBase": 500,
    "nivelDificuldade": "medio",
    "percentualAjuste": 25,
    "valor": 625
  }
}
```

### GET /orcamentos
Lista todos os orçamentos salvos em memória.

Essa rota não recalcula nada, apenas retorna o conteúdo atual da base em memória.

Retorno:
- `200` com uma lista de orçamentos.

### GET /orcamentos/:id
Busca um orçamento específico pelo ID.

Regras aplicadas nessa rota:
- Retorna `404` quando o orçamento não existe.

Retorno:
- `200` com o orçamento encontrado.
- `404` quando o registro não existe.

### PUT /orcamentos/:id
Atualiza um orçamento existente e recalcula novamente o valor final com os dados novos.

Regras aplicadas nessa rota:
- As mesmas validações do `POST /orcamentos`.
- Retorna `404` quando o orçamento não existe.

Retorno:
- `200` quando a atualização é concluída.
- `400` quando alguma regra de validação falha.
- `404` quando o registro não existe.

### DELETE /orcamentos/:id
Remove um orçamento da lista em memória.

Regras aplicadas nessa rota:
- Retorna `204` quando a remoção é concluída.
- Retorna `404` quando o orçamento não existe.

Retorno:
- `204` sem corpo quando a remoção é concluída.
- `404` quando o registro não existe.

## Documentação Swagger

- Interface Swagger UI: `GET /docs`
- JSON OpenAPI: `GET /docs.json`

O contrato completo da API fica em [src/docs/swagger.json](src/docs/swagger.json).

## Como Executar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Execute o servidor:
   ```bash
   npm start
   ```

3. Execute os testes:
   ```bash
   npm test
   ```

Ao executar os testes, o script define `NODE_ENV=test`, roda Mocha com Chai e Supertest, e gera os relatórios do Mochawesome em `reports/mochawesome/`.

## Comandos Customizados

### `npm test`
Executa a suíte principal de testes com Mocha, Chai e Supertest.
Também gera um relatório HTML/JSON do Mochawesome em `reports/mochawesome/`.

### `npm run test:watch`
Executa os testes em modo observação. Sempre que um arquivo de teste ou código relacionado muda, a suíte é reexecutada automaticamente.

### `npm run test:coverage`
Executa os testes com `c8` e mostra a cobertura de statements, branches, funções e linhas.
Use este comando para verificar a cobertura de decisão do projeto.

### `npm run test:coverage:check`
Executa a cobertura com validação rígida.
Falha se não atingir `100%` em branches, funções e linhas.

### `npm run test:coverage:watch`
Executa a cobertura em modo de acompanhamento, útil durante o desenvolvimento para inspecionar a cobertura sem travar o fluxo.

## Tecnologias Utilizadas

- Node.js
- Express.js
- Mocha (testes)
- Chai (assertivas)
- Supertest (testes de API)
- Mochawesome (relatórios de testes)
- cross-env (padronização de ambiente nos testes)

## Estrutura do Projeto

```
src/
  app.js          # Configuração do Express
  server.js       # Inicialização do servidor
  routes/
    tatuagem.routes.js  # Rotas do CRUD de orcamentos
  validators/
    tatuagem.validator.js  # Regras de validacao e calculo de orcamento
  docs/
    swagger.json  # Contrato OpenAPI da API
tests/
  tatuagem.test.js  # Testes automatizados com Mocha, Chai e Supertest
reports/
  mochawesome/  # Relatorios gerados pelos testes
```

### Explicação da estrutura

- `src/`: contém o código-fonte principal da API.
- `src/app.js`: configura o Express, registra o Swagger e monta as rotas.
- `src/server.js`: inicia o servidor HTTP na porta definida.
- `src/routes/`: concentra as rotas da API.
- `src/routes/tatuagem.routes.js`: implementa o CRUD de orçamentos em memória.
- `src/validators/`: reúne as regras de validação e cálculo.
- `src/validators/tatuagem.validator.js`: valida os dados enviados e calcula o orçamento final.
- `src/docs/`: guarda a documentação técnica da API no formato OpenAPI.
- `src/docs/swagger.json`: define o contrato Swagger exibido em `/docs`.
- `tests/`: contém a suíte de testes automatizados.
- `tests/tatuagem.test.js`: cobre os fluxos principais do CRUD e as validações.
- `reports/mochawesome/`: armazena os relatórios HTML e JSON gerados pelo Mochawesome.

## Notas de Implementação

- O projeto usa armazenamento em memória, então os dados são perdidos quando o servidor reinicia.
- A rota `DELETE /orcamentos/test/reset` existe apenas em ambiente de teste para limpar o estado entre cenários.
- A API não usa `areaCorpo`; a localização corporal é controlada apenas pelo campo `local`.

## Contribuição

Este projeto foi desenvolvido utilizando IA Generativa conforme solicitado no enunciado do trabalho em grupo.