const Users = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
 
const Clinic = require('../models/clinicsModel')
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

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
    getClinics : async (req, res) => {
        try {
            const clinics = await Clinic.find().sort({ createdAt: -1 });
            res.json(clinics);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while fetching the clinics.');
        }
    },

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


    registerMedicalWorker: async (req, res) => {
        try {
            const { fullname, username, email, password, gender, role } = req.body
            let newUserName = username.toLowerCase().replace(/ /g, '')

            if(role !== 'medicalStoreWorker') return res.status(400).json({msg: "Unauthorized role selection."});

            const user_name = await Users.findOne({username: newUserName})
            if(user_name) return res.status(400).json({msg: "This user name already exists."})

            const user_email = await Users.findOne({email: email})
            if(user_email) return res.status(400).json({msg: "This email already exists."})

            if(password.length < 6)
            return res.status(400).json({msg: "Password must be at least 6 characters."})

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = new Users({
                fullname: fullname,
                username: newUserName, 
                email: email,
                password: passwordHash,
                gender: gender,
                role: role
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
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            console.log('Received login request with email:', email);

            const user = await Users.findOne({email})
            .populate("username fullname")

            if(!user){
                console.log('User with email', email, 'not found.');
                return res.status(400).json({msg: "This email does not exist."})
            } 

            console.log("user password: " + user.password);
            console.log("plain password: " + password);
            
            const isMatch = await bcrypt.compare(password, user.password);

            console.log("password match: " + isMatch);
            
            if(!isMatch){
                console.log('Incorrect password for user with email', email);
                return res.status(400).json({msg: "Password is incorrect."})

            } 
            const access_token = createAccessToken({id: user._id})
            const refresh_token = createRefreshToken({id: user._id})

            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30*24*60*60*1000 // 30days
            })

            res.json({
                msg: 'Login Success!',
                access_token,
                user: {
                    ...user._doc,
                    password: ''
                }
            })
        } catch (err) {
            console.error('Error during login:', err);
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/api/refresh_token'})
            return res.json({msg: "Logged out!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    generateAccessToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if(!rf_token) return res.status(400).json({msg: "Please login now."})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async(err, result) => {
                if(err) return res.status(400).json({msg: "Please login now."})

                const user = await Users.findById(result.id).select("-password")
                .populate('username fullname')

                if(!user) return res.status(400).json({msg: "This does not exist."})

                const access_token = createAccessToken({id: result.id})

                res.json({
                    access_token,
                    user
                })
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    uploadClinicImage: upload.single('image'),
}



const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'})
}


module.exports = authCtrl