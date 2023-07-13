const express = require ('express');
const router = express.router();
const Task = require('../model/taskModel');

//Post route for subtask
router.post('/task/:taskId/subtasks', (req, res) => {
    const {taskId} = req.params;
    const {name, size} = req.body;
    const mainTask = Task.findById(taskID)
    const subtask = new Task (name, size)

    mainTask.addSubtask(subtask);
});

//Get route for subtask

//Update Route for Subtask

//Delete route for subtask

model.exports = router;