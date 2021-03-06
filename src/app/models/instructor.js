const db = require("../../config/db")
const { date } = require("../../lib/utils")

module.exports = {
    all(callback) {

        const query = `
            SELECT instructors.*, COUNT(members) AS total_members
            FROM instructors
            LEFT JOIN members ON instructors.id = members.instructor_id
            GROUP BY instructors.id;
        `

        db.query(query, function (err, results) {
            if (err) throw 'Database error.'

            callback(results.rows)
        })

    },
    pagination(params) {

        const { filter, limit, offset, callback} = params

        let query = '',
            filterQuery = '',
            totalQuery = `(
                SELECT COUNT(*) FROM instructors
            ) AS total`

        if (filter) {

            filterQuery =`
            WHERE instructors.name ILIKE '%${filter}%'
            OR instructors.services ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT COUNT(*) FROM instructors
                ${filterQuery}
            ) AS total`
        }

        query = `
        SELECT instructors.*, ${totalQuery}, COUNT(members) as total_members
        FROM instructors
        LEFT JOIN members
        ON instructors.id = members.instructor_id
        ${filterQuery}
        GROUP BY instructors.id
        LIMIT $1
        OFFSET $2`

        db.query(query, [limit, offset], function(err, results) {
            if (err) throw `Database ${err}`

            callback(results.rows)
        })

    },
    create(data, callback) {

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
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.services,
            date(Date.now()).iso
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database ${err}`

            callback(results.rows[0])
        })

    },
    find(id, callback) {

        const query = `
            SELECT *
            FROM instructors
            WHERE id = $1
        `

        db.query(query, [id], function (err, results) {
            if (err) throw `Database ${err}`
            callback(results.rows[0])
        })
    },
    update(data, callback) {

        const query = `
            UPDATE instructors 
            SET avatar_url=($1),
                name=($2),
                birth=($3),
                gender=($4),
                services=($5)
            WHERE id = $6
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.services,
            data.id
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database ${err}`

            callback()
        })
    },
    remove(id, callback) {

        const query = `
            DELETE FROM instructors
            WHERE id = $1
        `

        db.query(query, [id], function(err, results) {
            if (err) throw `Database ${err}`

            callback()
        })
    }
}