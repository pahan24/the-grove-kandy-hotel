const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date },
    location: { type: String },
    image: { type: String },
    type: { type: String, enum: ['hotel', 'private'], default: 'hotel' }
});

module.exports = mongoose.model('Event', eventSchema);
