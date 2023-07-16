const router = require('express').Router();

const subtaskRoutes = require('./subtaskRoutes');
const taskRoutes = require('./taskRoutes.js');

router.use('/task', taskRoutes);
router.use('/task/subtask', subtaskRoutes);
router.use('/bounty', bountyRoutes);

module.exports = router;