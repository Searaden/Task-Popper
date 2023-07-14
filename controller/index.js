const router = require('express').Router();

const subtaskRoutes = require('./subtaskRoutes');
const taskRoutes = require('./taskRoutes.js');

router.use('/task', taskRoutes);
router.use('/task/subtask', subtaskRoutes);

module.exports = router;