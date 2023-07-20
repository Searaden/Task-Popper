const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

router.use('/task', taskRoutes);
router.use('/subtask', subtaskRoutes);
router.use('/bounty', bountyRoutes);



module.exports = router;

//new file