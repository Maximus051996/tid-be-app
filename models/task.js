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
        type: Date
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
}, { collection: 'tbl_taskInfo' });

// Export Task model
module.exports = mongoose.model('Task', TaskSchema);
