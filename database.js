var pg = require('pg')
var config = {
    user: 'postgres',
    host: 'localhost',
    database: 'patterns',
    password: 'password',
    port: 5432,
}

var pool = new pg.Pool(config);

module.exports = pool;