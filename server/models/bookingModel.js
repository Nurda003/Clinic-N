const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  date: Date,
  message: String,
  userId: String,
});

module.exports = mongoose.model('Booking', bookingSchema);