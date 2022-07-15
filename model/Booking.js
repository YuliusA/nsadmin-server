const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    bookingCode: String,
    bookingDate: {
        type: Date,
        default: Date.now
    },
    bookingStatus: String,
    bookingItem: {
        prop: String,
        desc: String
    },
    contact: {
        name: String,
        email: String,
        mobile: String,
        nationality: String,
        lang: String
    },
    payment: {
        status: String,
        method: String,
        currency: String,
        amount: Number
    }
});

module.exports = mongoose.model('Booking', bookingSchema);