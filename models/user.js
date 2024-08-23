const mongoose = require('mongoose');

// Define User schema
const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
}, { collection: 'tbl_users' });

// Export User model
module.exports = mongoose.model('User', UserSchema);
