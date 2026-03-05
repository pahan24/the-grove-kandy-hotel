const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Booking = require('../models/Booking');
const Message = require('../models/Message');
const Offer = require('../models/Offer');
const Room = require('../models/Room');

// Middleware to check admin token
const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Failed to authenticate' });
        req.adminId = decoded.id;
        next();
    });
};

// Get Stats
router.get('/stats', auth, async (req, res) => {
    try {
        const bookingsCount = await Booking.countDocuments();
        const unreadMessages = await Message.countDocuments({ isRead: false });
        const activeOffers = await Offer.countDocuments({ isActive: true });

        res.json({
            bookings: bookingsCount,
            messages: unreadMessages,
            offers: activeOffers
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all bookings
router.get('/bookings', auth, async (req, res) => {
    try {
        const bookings = await Booking.find().populate('room').sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all messages
router.get('/messages', auth, async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
