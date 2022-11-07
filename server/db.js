const Pool = require('pg').Pool;

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: process.env.password,
    port: 5432,
    database:'nblog'

})

module.exports = pool;