const express = require('express');
const router = express.Router();
const bookingsController = require('../../controllers/bookingsController');

router.route('/')
    .get(bookingsController.getAllBookings)
    .post(bookingsController.createNewBooking);

router.route('/:id')
    .get(bookingsController.getBooking);

module.exports = router;