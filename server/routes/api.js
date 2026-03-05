const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Room = require('../models/Room');

// Get all rooms
router.get('/rooms', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a booking
router.post('/bookings', async (req, res) => {
    const booking = new Booking({
        guestName: req.body.guestName,
        email: req.body.email,
        phone: req.body.phone,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        room: req.body.roomId,
        specialRequests: req.body.specialRequests
    });

    try {
        const newBooking = await booking.save();

        // Generate PDF
        const receiptPath = path.join(__dirname, '../../public/receipts/', `${newBooking._id}.pdf`);
        const { generateReceipt } = require('../utils/pdfGenerator');

        const room = await Room.findById(req.body.roomId);

        await generateReceipt({
            guestName: newBooking.guestName,
            email: newBooking.email,
            phone: newBooking.phone,
            bookingId: newBooking._id,
            roomType: room ? room.name : req.body.roomId,
            checkIn: newBooking.checkIn.toLocaleDateString(),
            checkOut: newBooking.checkOut.toLocaleDateString()
        }, receiptPath);

        // Send Email
        const { sendBookingConfirmation } = require('../utils/emailService');
        await sendBookingConfirmation({
            guestName: newBooking.guestName,
            email: newBooking.email,
            bookingId: newBooking._id,
            roomType: room ? room.name : req.body.roomId,
            checkIn: newBooking.checkIn.toLocaleDateString(),
            checkOut: newBooking.checkOut.toLocaleDateString(),
            receiptPath: receiptPath
        });

        res.status(201).json(newBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
