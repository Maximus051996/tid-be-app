const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Task = require('../models/task');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret_key, whatsapp_accessToken } = require('../config');
const msg = require('../messages');
const { authenticateToken, sendMessage } = require('../middlewares/authMiddleware');


router.post('/login', async (req, res) => {
    // #swagger.tags = ['User-Module']
    const { userName, userPassword } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ message: msg.USER_NOT_FOUND_ERROR });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ message: msg.INVALID_PASSWORD });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, userName: user.userName }, secret_key, { expiresIn: '30m' });

        await Task.deleteMany({
            $and: [
                { isDeleted: true },
                { userId: user._id }
            ]
        });

        // Check if today is the last day of the month
        const today = new Date();
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        if (today.getDate() === lastDayOfMonth.getDate()) {
            // Delete all tasks for the user
            await Task.deleteMany({
                $and: [
                    { taskStatus: 'completed' },
                    { userId: user._id }
                ]
            });
        }


        // Return token 
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/register-user', async (req, res) => {
    // #swagger.tags = ['User-Module']
    try {
        const { userName, userEmail, phone, userPassword } = req.body;

        // Check if the username already exists
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({ message: msg.USER_EXIST });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(userPassword, 10);

        // Create a new user instance with hashed password
        const newUser = new User({
            userName,
            userEmail,
            phone,
            userPassword: hashedPassword,
            isActive: true // Assuming the user is active upon registration
        });

        await sendMessage(phone, userName, userPassword);

        // Save the user to the database
        await newUser.save();

        res.status(200).json({ message: msg.USER_REGISTERED });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/get-user-details/:id', authenticateToken(), async (req, res) => {
    // #swagger.tags = ['User-Module']
    try {
        const { id } = req.params;
        const user = await User.findById({ _id: id }).select('-userPassword');
        if (!user) {
            return res.status(404).json({ message: msg.NOT_FOUND_ERROR });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;