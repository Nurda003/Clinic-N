// authMiddleware.js

const Users = require('../models/userModel');

const isMedicalWorker = async (req, res, next) => {
   try {
      const user = await Users.findById(req.user._id);
      if(user.role !== 'medicalStoreWorker') {
         return res.status(403).json({msg: "Access denied."});
      }
      next();
   } catch (err) {
      console.error(err);
      res.status(500).json({msg: 'Server error.'});
   }
}

module.exports = isMedicalWorker;