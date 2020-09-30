const express = require('express')
const router = express.Router()
const instructors = require('./instructors')

router.get('/', function (req, res) {
    return res.redirect('/instructors') // o metodo redirect() retorna o parametro para a barra de pesquisa
});

router.get('/instructors', function (req, res) {
    return res.render('instructors/index')
})

router.get('/instructors/create', function (req, res) {
    return res.render('instructors/create')
})

router.get('/instructors/:id', instructors.show)

router.get('/instructors/:id/edit', instructors.edit)

router.post('/instructors', instructors.post)

router.put('/instructors', instructors.put)

router.get('/members', function (req, res) {
    return res.render('members')
})

module.exports = router