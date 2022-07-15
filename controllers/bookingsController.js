const Booking = require('../model/Booking');

const getAllBookings = async (req, res) => {
    const bookings = await Booking.find();
    if(!bookings) return res.status(204).json({ 'message': 'No booking found' });
    res.json(bookings);
}

const createNewBooking = async (req, res) => {
    if (!req?.body?.bookingCode) {
        return res.status(400).json({ 'message': 'Booking Code are required' });
    }

    try {
        const result = await Booking.create({
            bookingtype: req.body.bookingtype,
            customer: req.body.customer
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateBooking = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const booking = await Booking.findOne({ _id: req.body.id }).exec();
    if (!booking) {
        return res.status(204).json({ "message": `No booking matches ID ${req.body.id}.` });
    }
    if (req.body?.bookingtype) booking.bookingtype = req.body.bookingtype;
    if (req.body?.customer) booking.customer = req.body.customer;
    const result = await booking.save();
    res.json(result);
}

const deleteBooking = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Booking ID required.' });

    const booking = await Booking.findOne({ _id: req.body.id }).exec();
    if (!booking) {
        return res.status(204).json({ "message": `No booking matches ID ${req.body.id}.` });
    }
    const result = await booking.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getBooking = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Booking ID required.' });

    const booking = await Employee.findOne({ _id: req.params.id }).exec();
    if (!booking) {
        return res.status(204).json({ "message": `No booking matches ID ${req.params.id}.` });
    }
    res.json(booking);
}

module.exports = {
    getAllBookings,
    createNewBooking,
    updateBooking,
    deleteBooking,
    getBooking
}