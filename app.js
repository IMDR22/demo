const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes'); // Ensure the path is correct
const userRoute = require('./routes/userRoute');
const deptRoute = require('./routes/deptRoutes');
const courseRoute = require('./routes/courseRoute');
const studentRoute = require('./routes/studentRoutes');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send("Ian De los Reyes, MIT");
});

// Use authentication routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoute);
app.use('/api/dept', deptRoute);
app.use('/api/course', courseRoute);
app.use('/api/student', studentRoute);

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
