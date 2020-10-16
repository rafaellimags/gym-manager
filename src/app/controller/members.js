const { age, date } = require('../../lib/utils')
const member = require('../models/member')
const Member = require('../models/member')

module.exports = {
    index(req, res) {

        Member.all(function(members) {
            return res.render('members/index', { members })
        })
        
    },
    create(req, res) {

        return res.render('members/create')

    },
    post(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all required fields.')
            }
        }

        let data = []

        for (key in req.body) {
            data.push(req.body[key])
        }

        Member.create(data, function(member) {
            return res.redirect(`/members/${member.id}`)
        })

    },
    show(req, res) {

        Member.read(req.params.id, function(member) {
            return res.render('members/show', { member })
        })

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

        return

    },
    delete(req, res) {

        return

    },
}