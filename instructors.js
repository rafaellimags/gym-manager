const fs = require('fs')
const data = require('./data.json')
const { age } = require('./utils')

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
    const id = Number(data.instructors.length + 1)

    data.instructors.push({
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

        return res.redirect("/instructors")
    })

}

// redireciona para página do instrutor buscado pelo id
exports.show = function (req, res) {
    const { id } = req.params //pega somente o id passado na uri
    const foundInstructor = data.instructors.find(function (instructor) { // busca o instrutor no array de dados
        return instructor.id == id // retorna o objeto da execução onde ele achou true. No caso, instructors.
        // if (instructor.id == id) {
        //     return instructor
        // }
    })

    if (!foundInstructor) return res.send('Instrutor não encontrado')

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth), // calcular idade
        services: foundInstructor.services.split(','),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at),
    }

    console.log(instructor)

    return res.render("instructors/show", { instructor })

}