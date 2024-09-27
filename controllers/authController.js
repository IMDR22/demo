const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    console.log('Register endpoint hit');
    const { fullname, username, passwordx } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(passwordx, 10);
        const [rows] = await pool.query('INSERT INTO users (fullname, username, passwordx) VALUES (?, ?, ?)', 
        [fullname, username, hashedPassword]);
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    console.log('Login endpoint hit');
    const { username, passwordx } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(passwordx, user.passwordx);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME });
            
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = {register, login};