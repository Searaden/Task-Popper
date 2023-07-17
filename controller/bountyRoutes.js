const express = require('express');
const router = express.Router();
const Bounty = require('../model/bountyModel');

// Get all bounties // ! CREATED by ME
router.get('/', async (req, res) => {
  try {
    const bountiesCreatedByMe = await Bounty.findAll(
      //{
      //include: { model: task},
      //where:
      // task.user_ID matches my userID(via sessionkey)
      // AND bounties that match its task_id
    //}
    );

    //console.log("I found my bounties: "+ bountiesCreatedByMe)
    return res.status(200).json( bountiesCreatedByMe );
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all bounties //! ASSIGNED to ME
router.get('/assigned', async (req, res) => {
  try {
    const bountiesAssignedToMe = await Bounty.findAll({
      //where:
      // bounty.assignee_ID matches my userID(via sessionkey)
      // AND bounties that match its task_id
    });
    return res.json( bountiesAssignedToMe );
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});


// Get a specific bounty
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const bounty = await Bounty.findByPk(id);
    if (!bounty) {
      return res.status(404).json({ error: 'Bounty not found' });
    }
    return res.status(200).json( bounty );
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  const { price, task_id } = req.body;
  try {
    const newBounty = await Bounty.create({ price, task_id });
    return res.status(200).json( newBounty );
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;
  try {
    const bounty = await Bounty.findByPk(id);
    if (!bounty) {
      return res.status(404).json({ error: 'Bounty not found' });
    }
    bounty.size = size;
    await bounty.save();
    return res.json({ bounty });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const bounty = await Bounty.findByPk(id);
    if (!bounty) {
      return res.status(404).json({ error: 'Bounty not found' });
    }
    await bounty.destroy();
    return res.json({ message: 'Bounty deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
