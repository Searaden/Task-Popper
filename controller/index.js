const router = require('express').Router();

const subtaskRoutes = require('./subtaskRoutes');
const taskRoutes = require('./taskRoutes');
const bountyRoutes = require('./bountyRoutes');

router.use('/task', taskRoutes);
router.use('/subtask', subtaskRoutes);
router.use('/bounty', bountyRoutes);

module.exports = router;