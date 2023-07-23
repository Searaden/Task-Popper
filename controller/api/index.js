const router = require('express').Router();
const userRoutes = require('./userRoutes');
const subtaskRoutes = require('./subtaskRoutes');
const taskRoutes = require('./taskRoutes');
const bountyRoutes = require('./bountyRoutes');



router.use('/user', userRoutes);
router.use('/bounty', bountyRoutes);
router.use('/task', taskRoutes);
router.use('/subtask', subtaskRoutes);



module.exports = router;