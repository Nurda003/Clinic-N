const Booking = require('../models/bookingModel'); 

const getAll = async () => {
  try {
    return await Booking.find(); 
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAll
};