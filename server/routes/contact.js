const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Post a contact message
router.post('/contact', async (req, res) => {
    const msg = new Message({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    });

    try {
        await msg.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
