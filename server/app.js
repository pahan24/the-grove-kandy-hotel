const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// View Engine
app.set('view engine', 'html'); // Using plain HTML for frontend as requested, or I'll use ejs if templating needed.
// Actually, user requested HTML/Tailwind/JS. I'll use static html or a simple template engine if needed.
// For now, I'll serve static files.

// Routes
app.use('/api', require('./routes/api'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

// Basic room route
app.get('/stay', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/stay.html'));
});

app.get('/dine', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/dine.html'));
});

app.get('/experiences', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/experiences.html'));
});

app.get('/offers', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/offers.html'));
});

app.get('/history', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/history.html'));
});

app.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/gallery.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/contact.html'));
});

app.get('/reservation', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/reservation.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin/login.html'));
});

app.get('/admin/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin/dashboard.html'));
});

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/morning_dew')
//     .then(() => console.log('MongoDB Connected'))
//     .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
