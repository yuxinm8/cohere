const mongoose = require('mongoose');

// Define the Patient schema
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    contactNumber: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    sysptom: {
        type: Object
    },
});

// Create and export the Patient model
const User = mongoose.model('User', UserSchema);
module.exports = User;