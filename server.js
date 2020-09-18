// create server
const express = require('express')
const nunjucks = require('nunjucks')
const router = require('./routes')

const server = express()

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.set("view engine", "njk")

/* ====== MIDDLEWARE ====== */
server.use(express.urlencoded({ extended: true })) // Lê e mostra os dados da requisição
server.use(express.static("public"))
server.use(router)

/* ====== MIDDLEWARE ====== */

server.listen(5000, function() {
    console.log('Listening on port 5000.')
})
