const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/main', withAuth, (req, res) => {
  // Only authenticated users can reach this route
  // Use req.session.user to access user data
});

// More routes...

module.exports = router;