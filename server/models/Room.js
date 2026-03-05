const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String },
    capacity: { type: Number },
    amenities: [String],
    price: { type: Number, required: true },
    images: [String],
    category: { type: String }, // Deluxe, King, Family, Suite
    slug: { type: String, unique: true }
});

module.exports = mongoose.model('Room', roomSchema);
