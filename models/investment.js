const mongoose = require('mongoose');

// Define InvestmentInfo schema
const InvestmentInfoSchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    componentName: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User', // Reference the 'User' model
        required: true // Make it required to associate the task with a user
    },
    amount: {
        type: Number,
        required: true
    },
    fyYear: {
        type: Number,
        required: true
    },
}, { collection: 'tbl_investmentInfo' });

// Export InvestmentInfo model
module.exports = mongoose.model('InvestmentInfo', InvestmentInfoSchema);
