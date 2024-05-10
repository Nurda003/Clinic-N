const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  date: Date,
  message: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming userId should be a reference to the User model
    ref: 'User'
  },
  clinicId: {
    type: mongoose.Schema.Types.ObjectId, // Adding clinicId as a reference to the Clinic model
    ref: 'Clinic',
    required: true // Make sure to handle this in your frontend and API call
  }
});

module.exports = mongoose.model('Booking', bookingSchema);