require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const DB = require('./Config/db');

// Db Connection
DB();

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.static(path.resolve("uploads")))

// Default Route
app.get("/", (req, res) => {
    res.json({ message: 'Server Running Successfully' });
});

// Routes
app.use('/api/user', require('./Routes/user'));
app.use('/api/car', require('./Routes/car'));

// Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});