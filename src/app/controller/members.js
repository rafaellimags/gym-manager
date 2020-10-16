const { age, date } = require('../../lib/utils')
const member = require('../models/member')
const Member = require('../models/member')

module.exports = {
    index(req, res) {

        Member.all(function (members) {
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

        Member.create(data, function (member) {
            return res.redirect(`/members/${member.id}`)
        })

    },
    show(req, res) {

        Member.read(req.params.id, function (member) {

            member = {
                ...member,
                age: age(member.birth)
            }

            return res.render('members/show', { member })
        })



    },
    edit(req, res) {

        Member.read(req.params.id, function (member) {

            member = {
                ...member,
                birth: date(member.birth).iso
            }

            return res.render('members/edit', { member })
        })

    },
    put(req, res) {

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

        Member.update(data, function (member) {
            return res.redirect(`/members/${member.id}`)
        })

    },
    delete(req, res) {

        Member.delete(req.body.id, function () {
            return res.redirect('/members')
        })

    },
}