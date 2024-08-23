const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret_key } = require('../config');
const msg = require('../messages');
const authenticateToken = require('../middlewares/authMiddleware');


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

        // Return token 
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: msg.INTERNAL_SERVER_ERROR });
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

        // Save the user to the database
        await newUser.save();

        res.status(200).json({ message: msg.USER_REGISTERED });
    } catch (error) {
        res.status(500).json({ message: msg.INTERNAL_SERVER_ERROR });
    }
});

module.exports = router;