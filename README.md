# API de Cadastro de Tatuagens

API REST para cadastro e gerenciamento de tatuagens em um estúdio, construída com Node.js, Express e armazenamento em memória.

## Regras de Negócio

### Valores Mínimos
- **Tatuagem nova**: Valor mínimo de R$200,00.
- **Retoque pequeno após cicatrização**: R$80,00.
- **Retoque por falta de cuidado do cliente**: 50% do valor da tatuagem original.

### Cálculo de Valor
O valor é influenciado por:
- **Tipo**: Preto/Cinza ou Colorido.
- **Estilo**: Pontilhismo, Realismo, Fineline, Botânica.
- **Tamanho**: Em centímetros.
- **Local no corpo**:
  - Maior valor: Pé, Pescoço, Dedos, Cabeça.
  - Menor valor: Panturrilha, Coxa, Braços.
  - Médio valor: Barriga, Costas, Peito, Ombro, Mãos.
- **Idade**:
  - 14-17 anos: Necessária presença dos pais e assinatura de consentimento.
  - >=18 anos: Não necessita presença dos pais.
- **Ficha de Anamnese**: Obrigatória para qualquer idade.

### Validações Adicionais
- Tamanho > 30cm: Valor mínimo de R$500,00.
- Cliente deve ter pelo menos 14 anos (menor de 14 não é permitido fazer tatuagem).

## Endpoints

### POST /tatuagens
Cadastra uma nova tatuagem.

**Corpo da requisição:**
```json
{
  "clienteNome": "string",
  "clienteIdade": "number",
  "areaCorpo": "string",
  "descricao": "string",
  "tamanhoCm": "number",
  "valor": "number",
  "tipo": "preto_cinza" | "colorido",
  "estilo": "pontilhismo" | "realismo" | "fineline" | "botanica",
  "local": "pe" | "pescoco" | "dedos" | "cabeca" | "panturrilha" | "coxa" | "bracos" | "barriga" | "costas" | "peito" | "ombro" | "maos",
  "tipoServico": "nova" | "retoque_pequeno" | "retoque_cuidado",
  "presencaPais": "boolean",
  "fichaAnamnese": "boolean"
}
```

**Resposta de sucesso (201):**
```json
{
  "id": 1,
  "mensagem": "Tatuagem cadastrada com sucesso",
  "tatuagem": { ... }
}
```

### GET /tatuagens
Lista todas as tatuagens cadastradas.

**Resposta (200):**
```json
[
  {
    "id": 1,
    "clienteNome": "Carlos Silva",
    ...
  }
]
```

### GET /tatuagens/:id
Busca uma tatuagem por ID.

**Resposta (200):**
```json
{
  "id": 1,
  "clienteNome": "Carlos Silva",
  ...
}
```

### PUT /tatuagens/:id
Atualiza uma tatuagem existente.

**Corpo:** Mesmo do POST.

**Resposta (200):**
```json
{
  "mensagem": "Tatuagem atualizada com sucesso",
  "tatuagem": { ... }
}
```

### DELETE /tatuagens/:id
Remove uma tatuagem.

**Resposta (204):** Sem corpo.

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

## Tecnologias Utilizadas

- Node.js
- Express.js
- Jest (testes)
- Supertest (testes de API)

## Estrutura do Projeto

```
src/
  app.js          # Configuração do Express
  server.js       # Inicialização do servidor
  routes/
    tatuagem.routes.js  # Rotas da API
  validators/
    tatuagem.validator.js  # Validações
tests/
  tatuagem.test.js  # Testes automatizados
```

## Contribuição

Este projeto foi desenvolvido utilizando IA Generativa conforme solicitado no enunciado do trabalho em grupo.