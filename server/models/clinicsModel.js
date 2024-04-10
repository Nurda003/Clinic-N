const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    address: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    doctor: {
        type: String, 
        required: true,
        maxlength: 30 
    },
    price: { 
        type: Number, 
        required: true,
        maxlength: 4
    },
    rating: { type: Number },
    image: {
        id: String,
        contentType: String,
        filename: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    services: [String]
}, { timestamps: true });

const Clinic = mongoose.model('Clinic', clinicSchema);

module.exports = Clinic;