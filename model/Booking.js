const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    guestName: String,
    nationality: String,
    adults: Number,
    child: Number,
    board: String,
    roomType: String,
    roomPrice: Number,
    notes: [{}],
});

const PassengerSchema = new Schema({
    name: String,
    idNumber: Number,
    idExp: Date,
    passportNum: Number,
    birthDate: Date,
    ticketNum: Number,
});

const PartialSchema = new Schema({
    code: String,
    depart: Date,
    arrive: Date,
    from: String,
    status: String,
    baggage: String,
});

const BookingSchema = new Schema({
    bookingCode: String,
    bookingDate: {
        type: Date,
        default: Date.now
    },
    bookingItem: String,
    bookingStatus: String,
    postBookingStatus: String,
    currency: String,
    hotel: {
        hotelId: String,
        hotelName: String,
        checkin: Date,
        checkout: Date,
        vendor: String,
        rooms: [RoomSchema],
    },
    flight: {
        roundtrip: Boolean,
        airportFrom: String,
        airportTo: String,
        departureDate: Date,
        returnDate: Date,
        airline: String,
        flightCode: String,
        classType: String,
        passengers: [PassengerSchema],
        partials: [PartialSchema],
    },
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
        amount: Number,
        paymentDate: Date,
        trx: [{}],
    },
    insurance: {
        isSelected: Boolean,
        customerPref: Boolean,
        checkoutOption: Boolean,
        amount: Number,
        status: String,
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }],
},
{
    virtuals: {
        paymentTimeLimit: {
            get() {
                var timeLimit = new Date(this.bookingDate);
                timeLimit.setHours(timeLimit.getHours() + 6);
          
                return timeLimit;
            }
        },
        systemTimeLimit: {
            get() {
                var sysTimeLimit = new Date(this.virtuals.paymentTimeLimit);
                sysTimeLimit.setMinutes(sysTimeLimit.getMinutes() + 15);
          
                return sysTimeLimit;
            }
        },
        insuranceAmount: {
            get() {
                return (this.payment.amount * 0.15);
            }
        }
    }
});

module.exports = mongoose.model('Booking', BookingSchema);