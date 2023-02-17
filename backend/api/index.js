require("dotenv").config();
const express = require('express')
const routes = require('./routes')
const app = express()

const port = 3000
routes(app)

app.listen(port, () => {
    console.log(`Servidor: ON, na porta ${port}`)
    console.log(process.env.DB_PASSWORD)
})

module.exports = app