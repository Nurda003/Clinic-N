const express = require('express');
const Booking = require('../models/bookingModel');
const auth = require('../controllers/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
    // Booking creation logic here
    try {
        const { firstName, lastName, email, phoneNumber, date, message, clinicId } = req.body;
        if (!clinicId || !mongoose.Types.ObjectId.isValid(clinicId)) {
            return res.status(400).json({ msg: "Invalid or missing clinicId" });
        }
        const clinic = await Clinic.findById(clinicId);
        if (!clinic) {
            return res.status(404).json({ msg: "Clinic not found" });
        }
        const newBooking = new Booking({
            firstName,
            lastName,
            email,
            phoneNumber,
            date,
            message,
            userId: req.user._id,
            clinicId
        });
        await newBooking.save();
        res.json(newBooking);
    } catch (err) {
        console.error('Error creating booking:', err);
        res.status(500).json({ msg: 'Error creating booking', error: err.message });
    }
});

router.get('/my', auth, async (req, res) => {
    try {
        const userId = req.user._id; // Extract user ID from authenticated token
        const bookings = await Booking.find({ userId: userId }).populate('clinicId');
        res.json(bookings);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
});

module.exports = router;