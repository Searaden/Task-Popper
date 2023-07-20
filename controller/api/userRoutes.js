const router = require('express').Router();
const User = require('../../model/User');
const bcrypt = require('bcrypt');;

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    req.session.user = {
      id: user.id,
      username: user.username,
    };
    return res.json(user);
  } catch (error) {
    console.log(error); // Logs the error to the console
    return res.status(500).json({ error: error.message }); // Sends the error message in the response
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = {
        id: user.id,
        username: user.username,
      };
      return res.json(user);
    } else {
      return res.status(401).json({ error: 'bad username or password' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'server error' });
  }
});

router.post('/logout', (req, res) => {
  if (req.session && req.session.user) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(400).end();
  }
});

module.exports = router;