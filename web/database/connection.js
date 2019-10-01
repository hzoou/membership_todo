const config = require('./config');
const mysql = require('mysql2');

module.exports = {
    connect: () => {
        return mysql.createConnection(config.db);
    }
};