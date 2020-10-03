const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')


exports.index = function(req, res) {
    res.render('members/index', { members: data.members })
}

exports.show = function (req, res) {
    const { id } = req.params //pega somente o id passado na uri
    const foundMember = data.members.find(function(member) { // busca o instrutor no array de dados
        return member.id == id // retorna o objeto da execução onde ele achou true. No caso, members.
        // if (member.id == id) {
        //     return member
        // }
    })

    if (!foundMember) return res.send('Instrutor não encontrado')

    const member = {
        ...foundMember,
        age: age(foundMember.birth), // calcular idade
        // created_at: new Intl.DateTimeFormat('pt-BR').format(foundMember.created_at)
    }

    return res.render("members/show", { member })

}

exports.create = function(req, res) {
    return res.render('/members/create')
}

exports.post = function (req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {

        if (req.body[key] == "") {
            return res.send('Please, fill all required fields.')
        }
    }

    let { avatar_url, birth, name, services, gender } = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.members.length + 1)

    data.members.push({
        id,
        name,
        avatar_url,
        birth,
        gender,
        services,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Error writing file")

        return res.redirect("/members")
    })

}

exports.edit = function(req, res) {

    const { id } = req.params

    const foundMember = data.members.find(function(member) {
        return id == member.id
    })

    const member = {
        ...foundMember,
        birth: date(foundMember.birth)
    }

    if (!foundMember) return res.send('Member nor found!')

    return res.render('members/edit', { member })
}

exports.put = function(req, res) {
    const { id } = req.body
    let index = 0
    const foundMember = data.members.find(function(member, memberIndex) {
        if (id == member.id) {
            index = memberIndex
            return true
        }
    })

    if (!foundMember) return res.send('Member not found')

    // mantém a estrutura
    const member = {
        ...foundMember, // manda os dados de instrutor que ja estao salvos
        ...req.body, // manda somente os dados que quer salvar
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member // procura no array de structors o instrutor para alterar

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('Error writing file')

        return res.redirect(`/members/${ id }`)
    })

}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredMembers = data.members.filter(function(members) {
        return members.id != id
    })

    data.members = filteredMembers

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Error writing file.')

        return res.redirect('/members')
    })
}