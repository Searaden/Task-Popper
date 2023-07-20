const express = require('express');
const router = express.Router();
const Task = require('../model/taskModel');

// Post route for subtask
router.post('/:taskId', async (req, res) => {
    const { taskId } = req.params;
    const { name, size } = req.body;
  
    try {
      const mainTask = await Task.findOne({ where: { id: taskId } });
    
      if (!mainTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
    
      const subtask = await Task.create({ name, size });
      mainTask.addSubtask(subtask);
    
      return res.json({ subtask });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// Get route for subtask
router.get('/:ID', async (req, res) => {
    const { taskID } = req.params;
  
    try {
      const mainTask = await Task.findOne({ where: { id: taskID } });
  
      if (!mainTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      const subtasks = await mainTask.getSubtasks();
  
      return res.json({ subtasks });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

// Update Route for Subtask
// Update Route for Subtask
router.put('/:taskId/:subtaskId', async (req, res) => {
    const { taskId, subtaskId } = req.params;
    const { name, size } = req.body;
  
    try {
      const mainTask = await Task.findOne({ where: { id: taskId } });
  
      if (!mainTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      const subtask = await Task.findOne({ where: { id: subtaskId } });
  
      if (!subtask) {
        return res.status(404).json({ error: 'Subtask not found' });
      }
  
      // Update the subtask properties
      subtask.name = name;
      subtask.size = size;
  
      await subtask.save();
  
      return res.json({ subtask });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
// Delete route for subtask
router.delete('/:taskId/:subtaskId', async (req, res) => {
    const { taskId, subtaskId } = req.params;
  
    try {
      const mainTask = await Task.findOne({ where: { id: taskId } });
  
      if (!mainTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      const subtask = await Task.findOne({ where: { id: subtaskId } });
  
      if (!subtask) {
        return res.status(404).json({ error: 'Subtask not found' });
      }
  
      // Remove the subtask from the association
      await mainTask.removeSubtask(subtask);
  
      return res.json({ message: 'Subtask deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
module.exports = router;
