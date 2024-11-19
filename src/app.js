const express = require('express');
const userRoutes = require('./routes/user.route.js');

const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({
    path: './.env'
});
const app = express();


// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/user', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;
