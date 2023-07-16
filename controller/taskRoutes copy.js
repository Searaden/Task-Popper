const express = require('express');
const router = express.Router();
const Task = require('../model/taskModel');

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    return res.json({ tasks });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific task
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    return res.json({ task });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  const { name, size } = req.body;
  try {
    const task = await Task.create({ name, size });
    return res.json({ task });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, size } = req.body;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    task.name = name;
    task.size = size;
    await task.save();
    return res.json({ task });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await task.destroy();
    return res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
