const db = require('mysql2');

const pool = db.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectTimeout: 10000,
    connectionLimit: 10,
    queueLimit: 0
});

console.log(`Database available` );

module.exports = pool.promise();