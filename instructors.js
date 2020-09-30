const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils')

// create
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

// show
exports.show = function (req, res) {
    const { id } = req.params //pega somente o id passado na uri
    const foundInstructor = data.instructors.find(function(instructor) { // busca o instrutor no array de dados
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
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at)
    }

    return res.render("instructors/show", { instructor })

}

// edit
exports.edit = function(req, res) {

    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor) {
        return id == instructor.id
    })

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }

    if (!foundInstructor) return res.send('Instructor nor found!')

    return res.render('instructors/edit', { instructor })
}

// put
exports.put = function(req, res) {
    const { id } = req.body
    let index = 0
    const foundInstructor = data.instructors.find(function(instructor, instructorIndex) {
        if (id == instructor.id) {
            index = instructorIndex
            return true
        }
    })

    if (!foundInstructor) return res.send('Instructor not found')

    console.log(index)

    // mantém a estrutura
    const instructor = {
        ...foundInstructor, // manda os dados de instrutor que ja estao salvos
        ...req.body, // manda somente os dados que quer salvar
        birth: Date.parse(req.body.birth)
    }

    data.instructors[index] = instructor // procura no array de structors o instrutor para alterar

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('Error writing file')

        return res.redirect(`/instructors/${ id }`)
    })

}

// delete
exports.delete = function(req, res) {
    const { id } = req.body

    const filteredInstructors = data.instructors.filter(function(instructors) {
        return instructors.id != id
    })

    data.instructors = filteredInstructors

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Error writing file.')

        console.log('Passou')

        return res.redirect('/instructors')
    })
}