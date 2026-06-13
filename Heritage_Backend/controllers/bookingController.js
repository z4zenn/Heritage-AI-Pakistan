// controllers/bookingController.js
// Handles tour booking registrations, pricing estimations, and list retrievals

const Booking = require('../models/Booking');
const Site = require('../models/Site');

// POST /api/bookings
// Protected route
exports.createBooking = async (req, res, next) => {
  try {
    const { siteId, date, numberOfPeople } = req.body;
    const userId = req.user.id;

    if (!siteId || !date || !numberOfPeople) {
      return res.status(400).json({ success: false, message: 'Please provide siteId, date, and numberOfPeople.' });
    }

    const site = await Site.findById(siteId);
    if (!site) {
      return res.status(404).json({ success: false, message: 'Archaeological site not found.' });
    }

    // Cost calculations (matching front-end business rules)
    const isUnesco = site.tags.includes('unesco');
    const baseTicket = isUnesco ? 800 : 500;
    const guideFeePerPerson = 1200;
    const totalPrice = (baseTicket + guideFeePerPerson) * Number(numberOfPeople);

    const booking = await Booking.create({
      userId,
      siteId,
      date,
      numberOfPeople: Number(numberOfPeople),
      totalPrice,
      status: 'pending'
    });

    // Populate site details for the response
    const populated = await Booking.findById(booking._id).populate('siteId', 'name region coordinates');

    return res.status(201).json({
      success: true,
      data: populated
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/bookings/me
// Protected route
exports.getMyBookings = async (req, res, next) => {
  try {
    const userId = req.user.id;
    // Populate site info (name, region, etc.)
    const bookings = await Booking.find({ userId })
      .populate('siteId', 'name region era type coordinates')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/bookings/:id
// Protected route
exports.getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id).populate('siteId', 'name region coordinates visitingHours entryFee');

    if (!booking) {
      return res.status(404).json({ success: false, message: `Booking not found with ID: ${id}` });
    }

    // Security check: Only allow the owner of the booking or an Admin to view it
    if (booking.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this booking record.' });
    }

    return res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};
