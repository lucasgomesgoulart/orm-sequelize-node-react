const express = require('express')
const routes = require('./routes')
require("dotenv").config();
const app = express()

const port = 3000
routes(app)

app.listen(port, () => {
    console.log(`Servidor: ON, na porta ${port}`)
})

module.exports = app