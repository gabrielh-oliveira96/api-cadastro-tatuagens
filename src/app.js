const express = require('express')
const tatuagemRoutes = require('./routes/tatuagem.routes.js')

const app = express()

app.use(express.json())
app.use('/tatuagens', tatuagemRoutes)

module.exports = app