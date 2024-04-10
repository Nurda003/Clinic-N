require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const multer = require('multer');
const path = require('path');
const Clinic = require('../server/models/clinicsModel');
const { MongoClient } = require("mongodb");
const { GridFSBucket } = require("mongodb");
const app = express();
const NodeCache = require( "node-cache" );
const imageCache = new NodeCache();
const buildPath = path.resolve(__dirname, '../ds/client/build');
const Booking = require('../server/models/bookingModel');

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const client = new MongoClient(process.env.MONGODB_URI);


app.use(express.static(buildPath));

// create storage engine
const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return {
      filename: `${Date.now()}${path.extname(file.originalname)}`
    };
  }
});

const upload = multer({ storage });


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the server' });
});
const ClinicOperations = require('../server/middleware/ClinicOperations');

app.get('/api/clinics', async (req, res) => {
  try {
    // Query the database for all clinics
    const clinics = await ClinicOperations.getAll();
    // Send the results back to the client
    return res.json(clinics);
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while trying to retrieve clinics' });
  }
});

app.post('/api/clinics', upload.single('image'), (req, res) => {
  const rating = Number((Math.random() * (4.9 - 3.5) + 3.5).toFixed(1))
  const newClinic = new Clinic({
    name: req.body.name,
    address: req.body.address,
    image: { // store file data
      id: req.file.id,
      contentType: req.file.contentType,
      filename: req.file.filename
  },
    doctor: req.body.doctor,
    price: req.body.price,
    rating,
    services: req.body.services,
  });

  newClinic.save()
    .then(clinic => res.json(clinic))
    .catch(err => res.status(400).send('Error:' + err));
});


// Route for serving images
app.get('/api/image/:filename', async (req, res) => {

  const { filename } = req.params;
  let image = imageCache.get(filename);

  // Load from the cache if possible
  if (image) {
    res.setHeader('Content-Type', image.contentType); 
    res.send(image.buffer);
    return;
  }


  try {
      await client.connect();
      const db = client.db("test"); 
      const bucket = new GridFSBucket(db, {
          bucketName: "fs" 
      });

      const downloadStream = bucket.openDownloadStreamByName(filename);
      let chunks = [];
      downloadStream.on('data', (chunk) => {
        chunks.push(chunk);
      });

      downloadStream.on('end', () => {
        let buffer = Buffer.concat(chunks);
        let imageObject = {
          contentType: 'image/jpeg',
          buffer
        };
        // Cache the image
        imageCache.set(filename, imageObject);
        res.setHeader('Content-Type', imageObject.contentType); 
        res.send(buffer);
      });

  } catch (err) {
      console.error(err);
      res.status(404).send('Image not found');
  }
});

//router for back end booking

app.post('/api/bookings', (req, res) => {
  const newBooking = new Booking({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    date: req.body.date,
    message: req.body.message,
  });

  newBooking.save()
    .then(booking => res.json(booking))
    .catch(err => res.status(400).send('Error:' + err));
});


//booking router
const BookingOperations = require('../server/middleware/BookingOperations');
app.get('/api/bookings', async (req, res) => {
  try {
    // Query the database for all bookings
    const bookings = await BookingOperations.getAll();
  
    // Send the results back to the client
    return res.json(bookings);
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while trying to retrieve bookings' });
  }
});

const authRouter = require('./routes/authRouter');
app.use('/api', authRouter);

app.use(function(req, res, next) {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});


app.get('*', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, '../ds/client/build/index.html'),
    function (err) {   
      if (err) {
        res.status(500).send(err)
      }
    }
  );
});


const URI = process.env.MONGODB_URI;
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log('Server is running on port', port);
    });
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if unable to connect to MongoDB
});

module.exports.upload = upload;