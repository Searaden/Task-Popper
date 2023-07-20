const router = require('express').Router();
const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoutes');
const subtaskRoutes = require('./subtaskRoutes');
const bountyRoutes = require('./bountyRoutes');

router.use('/user', userRoutes);
router.use('/task', taskRoutes);
router.use('/subtask', subtaskRoutes);
router.use('/bounty', bountyRoutes);


module.exports = router;