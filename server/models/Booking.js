const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    guestName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    totalPrice: { type: Number },
    specialRequests: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
