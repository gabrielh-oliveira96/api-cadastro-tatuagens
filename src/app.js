const express = require('express')
const swaggerUi = require('swagger-ui-express')
const orcamentoRoutes = require('./routes/tatuagem.routes.js')
const swaggerDocument = require('./docs/swagger.json')

const app = express()

app.use(express.json())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.get('/docs.json', (req, res) => res.json(swaggerDocument))
app.use('/orcamentos', orcamentoRoutes)

module.exports = app