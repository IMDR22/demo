const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
    host: process.env.DB_HOST,       // Database host (e.g., 'localhost')
    user: process.env.DB_USER,       // MySQL user
    password: process.env.DB_PASSWORD,   // MySQL password
    database: process.env.DB_NAME,   // Database name
    port: process.env.DB_PORT        // MySQL port (default is 3306)
});

// Export the pool for use in other parts of your application
module.exports = pool;
