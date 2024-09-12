const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const { authenticateToken } = require('../middlewares/authMiddleware');
const msg = require('../messages');

// Get all tasks
router.get('/tasks', authenticateToken(), async (req, res) => {
    // #swagger.tags = ['Task-Module']
    try {
        const userId = req.user.userId;
        const tasks = await Task.find({ userId: userId });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a task by ID
router.get('/task/:id', authenticateToken(), async (req, res) => {
    // #swagger.tags = ['Task-Module']
    try {
        const { id } = req.params;
        const task = await Task.findOne({ _id: id, userId: req.user.userId });

        if (!task) {
            return res.status(404).json({ error: msg.NOT_FOUND_ERROR });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new task
router.post('/add-task', authenticateToken(), async (req, res) => {
    // #swagger.tags = ['Task-Module']
    try {
        const { subject, description, priority, startDate, endDate, isRemainder } = req.body;

        // Validate required fields
        if (!subject || !description || !priority || !startDate || !endDate) {
            return res.status(400).json({ error: msg.MANDATORY_FIELDS_ERROR });
        }

        const newTask = new Task({
            subject,
            description,
            priority,
            startDate,
            endDate,
            isRemainder,
            isDeleted: false,
            isCompleted: false,
            userId: req.user.userId
        });

        await newTask.save();

        res.status(200).json({ message: msg.ADD_RECORD_MESSAGE });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a task
router.put('/update-task/:id', authenticateToken(), async (req, res) => {
    // #swagger.tags = ['Task-Module']
    try {
        const { id } = req.params;
        const { description, priority, endDate, isRemainder, isCompleted } = req.body;

        const task = await Task.findById({ _id: id });

        if (!task) {
            return res.status(404).json({ error: msg.NOT_FOUND_ERROR });
        }

        // Update the task fields if provided in the request body       
        if (description) task.description = description;
        if (priority) task.priority = priority;
        if (endDate) task.endDate = endDate;
        if (req.user.userId) task.userId = req.user.userId;
        if (typeof isRemainder !== 'undefined') task.isRemainder = isRemainder;
        if (typeof isRemainder !== 'undefined') task.isCompleted = isCompleted;

        await task.save();

        res.status(200).json({ message: msg.UPDATE_RECORD_MESSAGE });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Delete a task
router.delete('/delete-task/:id', authenticateToken(), async (req, res) => {
    // #swagger.tags = ['Task-Module']
    try {
        const { id } = req.params;

        const task = await Task.findOne({ _id: id, userId: req.user.userId });

        if (!task) {
            return res.status(404).json({ error: msg.NOT_FOUND_ERROR });
        }

        task.isDeleted = true;

        await task.save();

        const allTasks = await Task.find();

        res.status(200).json({ message: msg.DELETE_RECORD_MESSAGE, tasks: allTasks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;




