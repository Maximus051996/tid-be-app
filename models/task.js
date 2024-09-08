const mongoose = require('mongoose');

// Define Task schema
const TaskSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    isRemainder: {
        type: Boolean,
    },
    isDeleted: {
        type: Boolean,
    },
    isCompleted: {
        type: Boolean,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User', // Reference the 'User' model
        required: true // Make it required to associate the task with a user
    }
}, { collection: 'tbl_taskInfo' });

// Export Task model
module.exports = mongoose.model('Task', TaskSchema);
