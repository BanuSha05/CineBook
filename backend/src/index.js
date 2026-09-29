const express = require('express');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/bookings', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM bookings ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        console.error("ACTUAL MYSQL/BACKEND ERROR:", err);
        const errMsg = err.code === 'ECONNREFUSED' ? 'MySQL Database is not running or unreachable on port 3306.' : (err.message || 'Unknown database error');
        res.status(500).json({ error: 'Server error', details: errMsg });
    }
});

app.post('/api/bookings', async (req, res) => {
    console.log("BOOKING REQUEST RECEIVED");
    const { name, email, phone, movie, time, date, members } = req.body;
    
    if (!name || !email || !movie || !time || !date || !members) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const query = `
            INSERT INTO bookings (customer_name, email, phone, movie_name, show_time, booking_date, num_members, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'CONFIRMED')
        `;
        const [result] = await db.query(query, [name, email, phone, movie, time, date, members]);
        
        console.log("DATABASE INSERT SUCCESS");
        console.log(`BOOKING ID: ${result.insertId}`);
        
        res.status(201).json({ 
            success: true, 
            booking: {
                id: result.insertId,
                name,
                movie,
                time,
                date,
                members,
                status: 'CONFIRMED'
            }
        });
    } catch (err) {
        console.error("ACTUAL MYSQL/BACKEND ERROR:", err);
        const errMsg = err.code === 'ECONNREFUSED' ? 'MySQL Database is not running or unreachable on port 3306.' : (err.message || 'Unknown database error');
        res.status(500).json({ error: 'Failed to create booking', details: errMsg });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
