const config = require('./config');
const mysql = require('mysql2/promise');

module.exports = {
    pool: () => {
        return mysql.createPool(config.db);
    }
};