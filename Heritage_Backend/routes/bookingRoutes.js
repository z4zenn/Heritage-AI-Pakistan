// routes/bookingRoutes.js
// Route mapping for protected tour booking and history endpoints

const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply authMiddleware to all booking routes
router.use(authMiddleware);

router.post('/', bookingController.createBooking);
router.get('/me', bookingController.getMyBookings);
router.get('/:id', bookingController.getBookingById);

module.exports = router;
