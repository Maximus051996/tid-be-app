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
    taskStatus: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User', // Reference the 'User' model
        required: true // Make it required to associate the task with a user
    },
    subtasks: {
        type: [{ type: String }], // Array of strings
        default: [] // Default to an empty array
    }
}, { collection: 'tbl_taskInfo' });


// Convert UTC to Local Time (e.g., IST) before saving the task
TaskSchema.pre('save', function (next) {
    // Get local time zone offset in minutes
    const timezoneOffset = new Date().getTimezoneOffset(); // IST offset is -330 (UTC+5:30)

    // Adjust startDate and endDate to local time
    this.startDate = new Date(this.startDate.getTime() - timezoneOffset * 60000);
    this.endDate = new Date(this.endDate.getTime() - timezoneOffset * 60000);

    next();
});


// Export Task model
module.exports = mongoose.model('Task', TaskSchema);
