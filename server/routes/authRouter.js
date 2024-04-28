// routes/authRouter.js

// Import dependencies
const express = require("express"); // Web framework for node.js
const authCtrl = require("../controllers/authCtrl"); // Importing the AuthController
const dashboardCtrl = require("../controllers/dashboardController"); // Importing the DashboardController
const isMedicalWorker = require('../middleware/authMiddleware'); // import middleware for verifying if the user is a medical worker
const router = express.Router(); // Implementing the router

// Create the '/register' route that uses the 'register' function from 'authCtrl' 
router.post('/register', authCtrl.register);

// Create the '/login' route that uses the 'login' function from 'authCtrl' 
router.post('/login', authCtrl.login);     

// Create the '/logout' route that uses the 'logout' function from 'authCtrl' 
router.post('/logout', authCtrl.logout);

// Create the '/refresh_token' route that uses the 'generateAccessToken' function from 'authCtrl' 
router.post('/refresh_token', authCtrl.generateAccessToken);

// Create the '/register-medical-worker' route that uses the 'registerMedicalWorker' function from 'authCtrl'
router.post('/register-medical-worker', authCtrl.registerMedicalWorker);

// Create the '/dashboard' route that first verifies the access token and if the user is a medical worker before using the 'getDashboard' function from 'dashboardCtrl'
router.get('/dashboard', authCtrl.generateAccessToken, isMedicalWorker, dashboardCtrl.getDashboard);

// Export the router to use in other files
module.exports = router;
