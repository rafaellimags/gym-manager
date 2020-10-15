const db = require("../../config/db")

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM instructors`, function(err, result) {
            if (err) return result.send('Database error.')

            callback(result.rows)
        })
    },
    create() {

    }
}