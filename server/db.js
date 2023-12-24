const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Skadi@lter',
    database: 'taskmanager'
})
module.exports = connection