const router = require('express').Router();

const userRoutes = require('./userRoutes');
const bountyRoutes = require('./bountyRoutes');
const taskRoutes = require('./taskRoutes');
const subtaskRoutes = require('./subtaskRoutes');

router.use('/user', userRoutes);
router.use('/bounty', bountyRoutes);
router.use('/task', taskRoutes);
router.use('/subtask', subtaskRoutes);

module.exports = router;