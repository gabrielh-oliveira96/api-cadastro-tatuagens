# 🎨 API Cadastro de Tatuagens

API Web desenvolvida em JavaScript com Express.js para gerenciamento e cadastro de tatuagens.

## 📋 Passo a Passo de Instalação e Configuração

### **Passo 1: Instalar Dependências**

Abra o terminal na raiz do projeto e execute:

```bash
npm install
```

Isso instalará o Express e as dependências necessárias.

### **Passo 2: Verificar a Estrutura do Projeto**

A estrutura básica deve ficar assim:

```
api-cadastro-tatuagens/
├── controllers/
│   └── tatuagemController.js    # Controlador com a lógica de negócio
├── models/
│   └── tatuagem.js              # Modelo de dados das tatuagens
├── routes/
│   └── tatuagens.js             # Definição das rotas
├── index.js                     # Arquivo principal da aplicação
├── package.json                 # Dependências do projeto
├── package-lock.json            # Lock file (criado automaticamente)
└── README.md                    # Este arquivo
```

### **Passo 3: Iniciar o Servidor**

Para modo de produção:
```bash
npm start
```

Para modo de desenvolvimento (com nodemon - reinicia automaticamente):
```bash
npm run dev
```

O servidor rodará na porta **3000** por padrão.

Você verá a mensagem: `Servidor rodando na porta 3000`

### **Passo 4: Testar a API**

Você pode testar usando:
- **cURL** (linhas de comando)
- **Postman** (interface visual)
- **Insomnia** (interface visual)
- **Thunder Client** (extensão do VS Code)

---

## 🔌 Endpoints da API

### **1. Verificar Saúde da API**

```http
GET http://localhost:3000/api/health
```

**Resposta (200):**
```json
{
  "message": "API está funcionando!"
}
```

---

### **2. Listar Todas as Tatuagens**

```http
GET http://localhost:3000/api/tatuagens
```

**Resposta (200):**
```json
{
  "mensagem": "Tatuagens listadas com sucesso",
  "dados": [
    {
      "id": 1,
      "nome": "Phoenix",
      "descricao": "Ave fênix em cores vibrantes",
      "artista": "João Silva",
      "preco": 250.00,
      "dataCriacao": "2025-01-15"
    },
    {
      "id": 2,
      "nome": "Dragão",
      "descricao": "Dragão oriental preto e branco",
      "artista": "Maria Santos",
      "preco": 300.00,
      "dataCriacao": "2025-02-10"
    }
  ],
  "total": 2
}
```

---

### **3. Obter uma Tatuagem por ID**

```http
GET http://localhost:3000/api/tatuagens/1
```

**Resposta (200):**
```json
{
  "mensagem": "Tatuagem encontrada",
  "dados": {
    "id": 1,
    "nome": "Phoenix",
    "descricao": "Ave fênix em cores vibrantes",
    "artista": "João Silva",
    "preco": 250.00,
    "dataCriacao": "2025-01-15"
  }
}
```

**Resposta (404 - não encontado):**
```json
{
  "erro": "Tatuagem não encontrada"
}
```

---

### **4. Criar Nova Tatuagem**

```http
POST http://localhost:3000/api/tatuagens

Content-Type: application/json

{
  "nome": "Samurai",
  "descricao": "Guerreiro samurai com espada",
  "artista": "Pedro Costa",
  "preco": 350.00
}
```

**Resposta (201):**
```json
{
  "mensagem": "Tatuagem criada com sucesso",
  "dados": {
    "id": 3,
    "nome": "Samurai",
    "descricao": "Guerreiro samurai com espada",
    "artista": "Pedro Costa",
    "preco": 350.00,
    "dataCriacao": "2026-03-30"
  }
}
```

**Resposta (400 - validação):**
```json
{
  "erro": "Campos obrigatórios: nome, descricao, artista, preco"
}
```

---

### **5. Atualizar uma Tatuagem**

```http
PUT http://localhost:3000/api/tatuagens/1

Content-Type: application/json

{
  "preco": 280.00,
  "descricao": "Ave fênix em cores vibrantes - atualizado"
}
```

**Resposta (200):**
```json
{
  "mensagem": "Tatuagem atualizada com sucesso",
  "dados": {
    "id": 1,
    "nome": "Phoenix",
    "descricao": "Ave fênix em cores vibrantes - atualizado",
    "artista": "João Silva",
    "preco": 280.00,
    "dataCriacao": "2025-01-15"
  }
}
```

---

### **6. Deletar uma Tatuagem**

```http
DELETE http://localhost:3000/api/tatuagens/1
```

**Resposta (200):**
```json
{
  "mensagem": "Tatuagem deletada com sucesso",
  "id": "1"
}
```

**Resposta (404 - não encontrado):**
```json
{
  "erro": "Tatuagem não encontrada"
}
```

---

## 💻 Exemplos com cURL

### Listar todas as tatuagens:
```bash
curl http://localhost:3000/api/tatuagens
```

### Criar nova tatuagem:
```bash
curl -X POST http://localhost:3000/api/tatuagens \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Lobo",
    "descricao": "Lobo uivando para a lua",
    "artista": "Ana Silva",
    "preco": 400
  }'
```

### Atualizar tatuagem (ID 1):
```bash
curl -X PUT http://localhost:3000/api/tatuagens/1 \
  -H "Content-Type: application/json" \
  -d '{
    "preco": 320.00
  }'
```

### Deletar tatuagem (ID 1):
```bash
curl -X DELETE http://localhost:3000/api/tatuagens/1
```

---

## 📚 Estrutura de Dados - Tatuagem

Cada tatuagem contém:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | number | ID único da tatuagem (auto-incrementado) |
| `nome` | string | Nome/título da tatuagem |
| `descricao` | string | Descrição detalhada do design |
| `artista` | string | Nome do artista que fez a tatuagem |
| `preco` | number | Preço em reais |
| `dataCriacao` | string | Data de criação (formato YYYY-MM-DD) |

---

## 🔧 Configurações

### Mudar Porta do Servidor

Digite no terminal:
```bash
PORT=5000 npm start
```

Ou edite o arquivo `index.js` e altere:
```javascript
const PORT = process.env.PORT || 3000; // Mude 3000 para sua porta
```

---

## 📦 Dependências

- **express** (^4.18.2) - Framework Web
- **body-parser** (^1.20.2) - Middleware para parsear JSON

### Dependências de Desenvolvimento

- **nodemon** (^3.0.1) - Reinicia o servidor ao detectar mudanças

---

## ✨ Próximas Melhorias Sugeridas

1. **Banco de Dados Real** - Integrar MongoDB, PostgreSQL ou MySQL
2. **Autenticação** - Adicionar JWT ou sessões
3. **Validação** - Usar biblioteca como Joi ou Yup
4. **Documentação Swagger** - Adicionar documentação interativa
5. **Testes** - Implementar testes com Jest ou Mocha
6. **Tratamento de Erros** - Criar middleware de erro robusto
7. **Logging** - Adicionar Winston ou Morgan para logs
8. **CORS** - Configurar CORS para requisições de frontend

---

## 🎯 Arquitetura (MVC)

```
Request → Router → Controller → Model → Database
                    ↓
                Response
```

- **Router** (`routes/tatuagens.js`): Define as rotas e métodos HTTP
- **Controller** (`controllers/tatuagemController.js`): Contém a lógica de negócio e validações
- **Model** (`models/tatuagem.js`): Gerencia os dados (atualmente em memória)

---

## 📝 Licença

ISC

---

## 👨‍💻 Desenvolvido como Desafio de Aprendizado

API simples para aprender Express.js e arquitetura MVC em Node.js.