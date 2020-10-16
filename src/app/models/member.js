const db = require('../../config/db')

module.exports = {
    all(callback) {

        const query = `
            SELECT *
            FROM members
        `

        db.query(query, function(err, results) {
            if (err) throw `Database ${err}`

            callback(results.rows)
        })

    },
    create(data, callback) {

        const query = `
            INSERT INTO members (
                avatar_url,
                name,
                birth,
                gender,
                blood,
                weight,
                height,
                email
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `
        
        db.query(query, data, function(err, results) {
            if (err) throw `Database ${err}`

            callback(results.rows[0])
        })

    },
    read(id, callback) {

        const query = `
            SELECT * 
            FROM members
            WHERE id = $1
        `

        db.query(query, [id], function(err, results) {
            if (err) throw `Database ${err}`

            callback(results.rows[0])
        })

    },
    update(data, callback) {

        const query = `
            UPDATE members
            SET avatar_url = $1,
                name    = $2,
                birth   = $3,
                gender  = $4,
                blood   = $5,
                weight  = $6,
                height  = $7,
                email   = $8
            WHERE id = $9
            RETURNING id
        `

        db.query(query, data, function(err, results) {
            if (err) throw `Database ${err}`

            callback(results.rows[0])
        })

    },
    delete(id, callback) {

        const query = `
            DELETE FROM members
            WHERE id = $1
        `

        db.query(query, [id], function(err, results) {
            if (err) throw `Database ${err}`

            callback()
        })


    }
}