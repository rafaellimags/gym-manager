const { age, date } = require('../../lib/utils')
const Member = require('../models/member')

module.exports = {
    index(req, res) {

        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(members) {

                const pagination = {
                    total: Math.ceil(members[0].total / limit),
                    page
                }

                return res.render('members/index', { members, pagination, filter })
                
            }
        }

        Member.pagination(params)

    },
    create(req, res) {

        Member.selectInstructorOption(function (options) {
            return res.render('members/create', { instructorOptions: options })
        })


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

            Member.selectInstructorOption(function (options) {
                return res.render('members/edit', { member, instructorOptions: options })
            })
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