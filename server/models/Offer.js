const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    discountCode: { type: String },
    discountValue: { type: String },
    image: { type: String },
    expiryDate: { type: Date },
    isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Offer', offerSchema);
