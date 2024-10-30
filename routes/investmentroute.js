const express = require('express');
const router = express.Router();
const InvestmentInfo = require('../models/investment');
const { authenticateToken } = require('../middlewares/authMiddleware');
const msg = require('../messages'); // Adjust path if necessary

// Get all investments for authenticated user
router.get('/investments', authenticateToken(), async (req, res) => {
    // #swagger.tags = ['Investment-Module']
    try {
        const userId = req.user.userId;
        const investments = await InvestmentInfo.find({ userId: userId }).sort({ fyYear: -1 });
        res.status(200).json(investments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get a specific investment by ID
router.get('/investment/:id', authenticateToken(), async (req, res) => {
    // #swagger.tags = ['Investment-Module']
    try {
        const { id } = req.params;
        const investment = await InvestmentInfo.findOne({ _id: id, userId: req.user.userId });

        if (!investment) {
            return res.status(404).json({ error: msg.NOT_FOUND_ERROR });
        }

        res.status(200).json(investment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new investment
router.post('/add-investment', authenticateToken(), async (req, res) => {
    // #swagger.tags = ['Investment-Module']
    try {
        const { categoryName, componentName, amount, fyYear } = req.body;

        // Validate required fields
        if (!categoryName || !componentName || !amount || !fyYear) {
            return res.status(400).json({ error: msg.MANDATORY_FIELDS_ERROR });
        }

        const newInvestment = new InvestmentInfo({
            categoryName,
            componentName,
            amount,
            fyYear,
            userId: req.user.userId
        });

        await newInvestment.save();

        res.status(200).json({ message: msg.ADD_RECORD_MESSAGE });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an investment by ID
router.put('/update-investment/:id', authenticateToken(), async (req, res) => {
    // #swagger.tags = ['Investment-Module']
    try {
        const { id } = req.params;
        const { amount, fyYear } = req.body;

        const investment = await InvestmentInfo.findById({ _id: id });

        if (!investment) {
            return res.status(404).json({ error: msg.NOT_FOUND_ERROR });
        }

        // Update fields if provided         
        investment.amount = amount;
        investment.fyYear = fyYear;

        await investment.save();

        res.status(200).json({ message: msg.UPDATE_RECORD_MESSAGE });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Delete an investment by ID
router.delete('/delete-investment/:id', authenticateToken(), async (req, res) => {
    // #swagger.tags = ['Investment-Module']
    try {
        const { id } = req.params;

        const investment = await InvestmentInfo.findOne({ _id: id, userId: req.user.userId });

        if (!investment) {
            return res.status(404).json({ error: msg.NOT_FOUND_ERROR });
        }

        // Delete the investment
        await InvestmentInfo.deleteOne({ _id: id });

        res.status(200).json({ message: msg.DELETE_RECORD_MESSAGE });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;