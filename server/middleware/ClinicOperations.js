// mongodb query to get data and sort it

const Clinic = require('../models/clinicsModel');

const getAll = async () => {
  try {
    return await Clinic.find().sort({ createdAt: -1 });;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAll
};
