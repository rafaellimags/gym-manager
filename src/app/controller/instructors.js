const { age, date } = require('../utils')

module.exports = {
    index(req, res) {

        res.render('instructors/index', { instructors: data.instructors })

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

        let { avatar_url, birth, name, services, gender } = req.body

        return

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