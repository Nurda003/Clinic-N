const Users = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
 
const Clinic = require('../models/clinicsModel')
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const path = require('path');

// Create storage engine for images using GridFS
const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return {
      filename: `${Date.now()}${path.extname(file.originalname)}`
    };
  }
});

const upload = multer({ storage });

const authCtrl = {
 // fetches and returns all clinic records from the database, sorted by their creation date in descending order.


    getClinics : async (req, res) => {
        try {
            const clinics = await Clinic.find().sort({ createdAt: -1 });
            res.json(clinics);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while fetching the clinics.');
        }
    },
// creates and saves a new clinic record from the provided request body.
    createClinics : async (req, res) => {
        try {
            const { name, address, doctor, price, image } = req.body;
            const rating = Number((Math.random() * (5 - 3.5) + 3.5).toFixed(1));


            if (!name || !address || !medicalWorker) {  
                return res.status(400).json({message: 'Bad request: name, medicalWorker, and address are required'});
            }
    
            const newClinic = new Clinic({
                name,
                address,
                doctor,
                price,
                rating,
                image 
            });
    
    
            const savedClinic = await newClinic.save();

            res.json(savedClinic);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error. Please try again later.' });
        }
        
    },

 // Handler function for registering a medical worker
    registerMedicalWorker: async (req, res) => {
        try {
            const { fullname, username, email, password, gender, role } = req.body
            let newUserName = username.toLowerCase().replace(/ /g, '');

            // If the user's role is not a medical store worker, reject the request
            if(role !== 'medicalStoreWorker') return res.status(400).json({msg: "Unauthorized role selection."});

            // Check if the username already exists in the database
            const user_name = await Users.findOne({username: newUserName});
            if(user_name) return res.status(400).json({msg: "This user name already exists."});

            // Check if the email already exists in the database
            const user_email = await Users.findOne({email: email});
            if(user_email) return res.status(400).json({msg: "This email already exists."});

            // Check if the password is at least 6 characters long
            if(password.length < 6) return res.status(400).json({msg: "Password must be at least 6 characters."});

            // Hash the password for secure storage
            const passwordHash = await bcrypt.hash(password, 12);

            // Create a new user instance with hashed password
            const newUser = new Users({
                fullname: fullname,
                username: newUserName, 
                email: email,
                password: passwordHash,
                gender: gender,
                role: role
            });

            // Create access and refresh tokens
            const access_token = createAccessToken({id: newUser._id});
            const refresh_token = createRefreshToken({id: newUser._id});

            // Set refresh token as a cookie
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30*24*60*60*1000 // 30days
            });

            // Save newly created user in the database
            await newUser.save();

            // Respond with a success message, access token, and user data (without password)
            res.json({
                msg: 'Register Success!',
                access_token,
                user: {
                    ...newUser._doc,
                    password: ''
                }
            });
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    register: async (req, res) => {
        try {
            const { fullname, username, email, password, gender, role } = req.body
            let newUserName = username.toLowerCase().replace(/ /g, '')

            const user_name = await Users.findOne({username: newUserName})
            if(user_name) return res.status(400).json({msg: "This user name already exists."})

            const user_email = await Users.findOne({email})
            if(user_email) return res.status(400).json({msg: "This email already exists."})

            if(password.length < 6)
            return res.status(400).json({msg: "Password must be at least 6 characters."})

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = new Users({
                fullname,
                username: newUserName, 
                email,
                password: passwordHash,
                gender,
                role // Ensure the role is included here in the user model instance
            });


            const access_token = createAccessToken({id: newUser._id})
            const refresh_token = createRefreshToken({id: newUser._id})

            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30*24*60*60*1000 // 30days
            })

            await newUser.save()

            res.json({
                msg: 'Register Success!',
                access_token,
                user: {
                    ...newUser._doc,
                    password: ''
                }
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
// Verify login credentials provided by the user
login: async (req, res) => {
    try {
        // Extract the email and password from the request body
        const { email, password } = req.body;

        // Search for a user in the database with the provided email
        const user = await Users.findOne({email}).populate("username fullname");

        // If a user with this email does not exist, respond with an error message
        if(!user) return res.status(400).json({msg: "This email does not exist."});

        // Compare the hashed version of the provided password with the stored user password
        const isMatch = await bcrypt.compare(password, user.password);

        // If the password does not match, respond with an error message
        if(!isMatch) return res.status(400).json({msg: "Password is incorrect."});

        // If credentials are verified, generate access and refresh tokens 
        const access_token = createAccessToken({id: user._id});
        const refresh_token = createRefreshToken({id: user._id});

        // Set refresh token as a cookie
        res.cookie('refreshtoken', refresh_token, {
            httpOnly: true,
            path: '/api/refresh_token',
            maxAge: 30*24*60*60*1000 // 30days
        });

        // Respond with a success message, access token, and user data (without password)
        res.json({
            msg: 'Login Success!',
            access_token,
            user: {
                ...user._doc,
                password: ''
            }
        });
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
},

// Function to handle user logout
logout: async (req, res) => {
    try {
        // Clear refresh token from cookies
        res.clearCookie('refreshtoken', {path: '/api/refresh_token'});

        // Respond with a success message
        return res.json({msg: "Logged out!"});
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
},

// Function to generate a new access token when the old one expires
generateAccessToken: async (req, res) => {
    try {
        // Get refresh token from cookies
        const rf_token = req.cookies.refreshtoken;

        // If there's no refresh token present, ask user to login
        if(!rf_token) return res.status(400).json({msg: "Please login now."});

        // Try to verify the token and extract the user id
        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async(err, result) => {
            if(err) return res.status(400).json({msg: "Please login now."});

            // Extract the corresponding user from the database (without the password)
            const user = await Users.findById(result.id).select("-password").populate('username fullname');

            // If there's no user, respond with an error message
            if(!user) return res.status(400).json({msg: "This does not exist."});

            // Create a new access token 
            const access_token = createAccessToken({id: result.id});

            // Send the new access token and the user data in the response
            res.json({
                access_token,
                user
            });
        });
        
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
},

// Function to handle image upload for clinic
uploadClinicImage: upload.single('image'),
// multer middleware is used for handling multipart/form-data, which is primarily used for uploading files.
// 'image' is the key of the form-data under which image file is sent from the client.
};

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
  }
  
  const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'})
  }

module.exports = authCtrl;
