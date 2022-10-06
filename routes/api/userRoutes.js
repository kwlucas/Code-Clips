const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    if (req.body.username && req.body.password) {
      const userData = await User.create({
        username: req.body.username,
        password: req.body.password,
      });
      console.log('created user');
      console.log(userData);
      //session save
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;

        res.json(userData);
      });
    } else {
      res.status(400).send({ message: 'Invalid user parameters!' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      console.log("no user");
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      console.log("incorrect");
      res.status(400).json({ message: 'No user account found!' });
      return;
    }
    console.log('accepted user and password');
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'No user account found!' });
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();

    });
  } else {
    res.status(404).end();
  }
  req.session.save(() => {
    req.session.user_id = user.id;
    req.session.username = user.username;
    req.session.loggedIn = true;
  });
});


module.exports = router;