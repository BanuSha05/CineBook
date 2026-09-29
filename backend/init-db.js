const mysql = require('mysql2/promise');
const fs = require('fs');

async function initDb() {
    try {
        console.log("Attempting to connect to MySQL...");
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: ''
        });
        console.log("Connected to MySQL server. Creating database and tables...");
        
        const schema = fs.readFileSync('./database/schema.sql', 'utf8');
        
        // Execute schema statements one by one
        const statements = schema.split(';').filter(stmt => stmt.trim().length > 0);
        for (const stmt of statements) {
            console.log(`Executing: ${stmt.trim().substring(0, 50)}...`);
            await connection.query(stmt);
        }
        
        console.log("Database initialized successfully!");
        process.exit(0);
    } catch (err) {
        console.error("Database initialization failed:", err);
        process.exit(1);
    }
}

initDb();
