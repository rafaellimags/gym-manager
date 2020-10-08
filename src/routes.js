const express = require('express')
const router = express.Router()
const instructors = require('./src/app/controller/instructors')
const members = require('./src/app/controller/members')

/* INSTRUCTORS */
router.get('/', function (req, res) {
    return res.redirect('/instructors')
});

router.get('/instructors', instructors.index)
router.get('/instructors/create', instructors.create)
router.get('/instructors/:id', instructors.show)
router.get('/instructors/:id/edit', instructors.edit)
router.post('/instructors', instructors.post)
router.put('/instructors', instructors.put)
router.delete('/instructors', instructors.delete)


/* MEMBERS */
router.get('/members', members.index)
router.get('/members/create', members.create)
router.get('/members/:id', members.show)
router.get('/members/:id/edit', members.edit)
router.post('/members', members.post)
router.put('/members', members.put)
router.delete('/members', members.delete)

module.exports = router