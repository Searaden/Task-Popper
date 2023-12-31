const express = require('express');
const router = express.Router();
const Task = require('../../model/taskModel');
const withAuth = require('../../utils/auth');

// Get all tasks
router.get('/', withAuth ,async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { user_id: req.session.user_id } });
    return res.json({ tasks });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific task
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ where: { id, user_id: req.session.user_id } });
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
  const { name } = req.body;
  if(!name){
    return res.status(400).json({ error: 'Bad request' });
  }else{
    try {
      const task = await Task.create({
        name,
        user_id: req.session.user_id
      });
      return res.json({ task });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body; //deprecated size
  try {
    const task = await Task.findOne({ where: { id, user_id: req.session.user_id } });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    task.name = name;
    await task.save();
    return res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a task
router.delete('/:id', withAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk( id );
      //{ where: { user_id: req.session.user_id } }//prevents user from deleting others??

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await task.destroy();
    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;