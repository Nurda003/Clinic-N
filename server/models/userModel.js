const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    role: { type: String, default: 'user', enum: ['user', 'medicalStoreWorker']},
    gender: {type: String, default: 'male'},
    saved: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    clinics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'clinic' }],

}, {
    timestamps: true
})


module.exports = mongoose.model('user', userSchema)