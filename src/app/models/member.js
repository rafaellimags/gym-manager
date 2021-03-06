const db = require('../../config/db')

module.exports = {
    all(callback) {

        const query = `
            SELECT *
            FROM members
        `

        db.query(query, function (err, results) {
            if (err) throw `Database ${err}`

            callback(results.rows)
        })

    },
    pagination(params) {

        const { filter, limit, offset, callback } = params

        let query = ''
        let filterQuery = ''
        let totalQuery = `(
            SELECT COUNT(*) FROM members
            ) AS total`

        if (filter) {

            filterQuery =`
            WHERE members.name ILIKE '%${filter}%'
            OR members.email ILIKE '%${filter}%'
            `

            totalQuery = `(
            SELECT COUNT(*) FROM members
            ${filterQuery}
            ) AS total`
        }

        query = `
        SELECT members.*, ${totalQuery}
        FROM members        
        ${filterQuery}
        ORDER BY name ASC
        LIMIT $1
        OFFSET $2
        `

        db.query(query, [limit, offset], function (err, results) {
            if (err)`Database ${err}`

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
                email,
                instructor_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id
        `

        db.query(query, data, function (err, results) {
            if (err) throw `Database ${err}`

            callback(results.rows[0])
        })

    },
    read(id, callback) {

        const query = `
            SELECT members.*, instructors.name AS instructor_name
            FROM members
            LEFT JOIN instructors
            ON instructors.id = members.instructor_id
            WHERE members.id = $1
        `

        db.query(query, [id], function (err, results) {
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
                email   = $8,
                instructor_id = $9
            WHERE id = $10
            RETURNING id
        `

        db.query(query, data, function (err, results) {
            if (err) throw `Database ${err}`

            callback(results.rows[0])
        })

    },
    delete(id, callback) {

        const query = `
            DELETE FROM members
            WHERE id = $1
        `

        db.query(query, [id], function (err, results) {
            if (err) throw `Database ${err}`

            callback()
        })
    },
    selectInstructorOption(callback) {

        const query = `
            SELECT id, name
            FROM instructors
        `

        db.query(query, function (err, results) {
            if (err) throw `Database ${err}`

            callback(results.rows)
        })
    },
}