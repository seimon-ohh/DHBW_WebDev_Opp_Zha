const mysql = require('mysql2');

const dbConnection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'nodejs_login'
});

module.exports = dbConnection.promise();