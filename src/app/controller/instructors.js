const { age, date } = require('../../lib/utils')
const db = require('../config/db')

module.exports = {
    index(req, res) {

        res.render('instructors/index')

    },
    create(req, res) {

        return res.render('instructors/create')

    },
    post(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all required fields.')
            }
        }

        const query = `
            INSERT INTO instructors (
                avatar_url,
                name,
                birth,
                gender,
                services,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const values = [
            req.body.avatar_url,
            req.body.name,
            date(req.body.birth).iso,
            req.body.gender,
            req.body.services,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results) {
            console.log(err)
            console.log(results)
            return
        })


    },
    show(req, res) {

        return

    },
    edit(req, res) {

        return

    },
    put(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all required fields.')
            }
        }

        let { avatar_url, birth, name, services, gender } = req.body

        return

    },
    delete(req, res) {

        return

    },
}