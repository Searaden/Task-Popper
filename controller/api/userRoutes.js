const router = require('express').Router();
const User = require('../../model/User');

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userData = await User.create({ username, password });
    // req.session.user = {
    //   id: user.id,
    //   username: user.username,
    // };
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const userData = await User.findOne({ where: { username } });

        if (!userData) { // Fail, if user doesn's exist
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        
        const validPassword = await userData.checkPassword(password);
        if (!validPassword) { //Fail, if password doesn't clear
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }
  
      // Create session variables based on the logged in user
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        req.session.username = username;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
      // Remove the session variables
      req.session.destroy(() => { res.status(204).end(); });
    } else { res.status(404).end(); }
});





module.exports = router;