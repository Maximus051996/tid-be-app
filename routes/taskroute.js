const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const { authenticateToken } = require('../middlewares/authMiddleware');
const msg = require('../messages');
const cron = require('node-cron');

// Get all tasks
router.get('/tasks', authenticateToken(), async (req, res) => {
    // #swagger.tags = ['Task-Module']
    try {
        const userId = req.user.userId;
        // Fetch tasks for the user and sort them by startDate in ascending order
        const tasks = await Task.find({ userId: userId }).sort({ startDate: 1 }); // 1 for ascending order

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
        const { subject, description, priority, startDate, endDate, isRemainder, subtasks, taskStatus } = req.body;

        // Validate required fields
        if (!subject || !description || !priority || !startDate || !endDate || !taskStatus) {
            return res.status(400).json({ error: msg.MANDATORY_FIELDS_ERROR });
        }



        const newTask = new Task({
            subject,
            description,
            priority,
            startDate,
            endDate,
            subtasks,
            isRemainder,
            isDeleted: false,
            taskStatus,
            userId: req.user.userId
        });
        console.log(newTask);

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
        const { description, priority, startDate, endDate, isRemainder, taskStatus, subtasks } = req.body;

        const task = await Task.findById({ _id: id });

        if (!task) {
            return res.status(404).json({ error: msg.NOT_FOUND_ERROR });
        }

        // Update the task's fields
        task.startDate = startDate || task.startDate;
        task.description = description || task.description;
        task.priority = priority || task.priority;
        task.endDate = endDate || task.endDate;
        task.isRemainder = isRemainder !== undefined ? isRemainder : task.isRemainder;
        task.taskStatus = taskStatus || task.taskStatus;
        task.subtasks = subtasks || task.subtasks;


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


// Cron Job to delete tasks every Sunday at 9 PM
cron.schedule('0 21 * * 0', async () => {
    try {
        console.log('Cron job running every Sunday at 9 PM to delete deleted or completed tasks.');

        // Delete tasks that are either marked as deleted or completed
        const result = await Task.deleteMany({
            $or: [
                { isDeleted: true },
                { taskStatus: 'completed' }
            ]
        });

        console.log(`Deleted ${result.deletedCount} tasks.`);
    } catch (error) {
        console.error('Error during cron job:', error.message);
    }
});

module.exports = router;




