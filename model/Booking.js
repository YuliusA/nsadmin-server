const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    bookingCode: String,
    bookingDate: {
        type: Date,
        default: Date.now
    },
    bookingStatus: String,
    postBookingStatus: String,
    bookingItem: String,
    hotel: String,
    checkin: Date,
    airportDep: String,
    airportArr: String,
    roundtrip: Boolean,
    departureDate: Date,
    returnDate: Date,
    contact: {
        name: String,
        email: String,
        mobile: String,
        nationality: String,
        lang: String
    },
    payment: {
        method: String,
        status: String,
        postPaymentStatus: String,
        currency: String,
        amount: Number,
        timeLImit: Date,
        systemTimeLimit: Date,
    },
    notes: Array,
});

module.exports = mongoose.model('Booking', bookingSchema);