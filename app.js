const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes'); // Ensure the path is correct
const userRoute = require('./routes/userRoute');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send("Fritz Imperial, MIT");
});

// Use authentication routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
