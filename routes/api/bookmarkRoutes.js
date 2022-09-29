const router = require('express').Router();
const { Bookmark } = require('../../models');

router.post('/', async (req, res) => {
  //body needs to have "user_id" and "post_id"
  //user_id is from cookie/session data and is the id of who is logged in
  //post_id is from front end regarding which post the bookmark button was linked to
  try {
    if (req.body.user_id && req.body.post_id) {
      const bookmarkData = await Bookmark.create(req.body);
      res.status(200).json(bookmarkData);
    } else {
      res.status(400).send({ message: 'Invalid bookmark parameters!' });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

//get the bookmark with the specified id
router.get('/:id', async (req, res) => {
  try {
    const bookmarkData = await Bookmark.findByPk(req.params.id);
    if (!bookmarkData) {
      res.status(404).json({ message: 'No bookmark with this id!' });

    } else {
      res.status(200).json(bookmarkData);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

//get all the bookmarks belonging to specificed user
router.get('/u/:user_id', async (req, res) => {
  try {
    const bookmarkData = await Bookmark.findAll({
      where: {
        user_id: req.params.user_id
      },
      attributes: {
        //Fields which won't be included in response data
        exclude: ['id', 'user_id']
      }
    });
    res.status(200).json(bookmarkData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//delete the bookmarks beloning to the specified user on the specified post
router.delete('/', async (req, res) => {
  try {
    if (req.body.user_id && req.body.post_id) {
      const bookmarkData = await Bookmark.destroy({
        where: {
          user_id: req.body.user_id,
          post_id: req.body.post_id
        },
      });
      if (!bookmarkData) {
        res.status(404).json({ message: 'No bookmark with these parameters!' });

      } else {
        res.status(200).json(bookmarkData);
      }
    } else {
      res.status(400).send({ message: 'Invalid bookmark parameters!' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete the bookmark with specified id
router.delete('/:id', async (req, res) => {
  try {
    const bookmarkData = await Bookmark.destroy({
      where: { id: req.params.id }
    });
    if (!bookmarkData) {
      res.status(404).json({ message: 'No bookmark with this id!' });

    } else {
      res.status(200).json(bookmarkData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;