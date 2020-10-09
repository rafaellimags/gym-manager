const { Pool } = require('pg')

module.exports = new Pool({
    name: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'gymmanager'
})