const express = require('express');
const router = express.Router();
const bookingsController = require('../../controllers/bookingsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(bookingsController.getAllBookings)
    .post(verifyRoles(ROLES_LIST.Admin), bookingsController.createNewBooking)
    .delete(verifyRoles(ROLES_LIST.Admin), bookingsController.deleteBooking);

router.route('/:id').get(bookingsController.getBooking);

router.route('/:id/update_status')
    .put(verifyRoles(ROLES_LIST.Admin), bookingsController.updateStatus);

module.exports = router;