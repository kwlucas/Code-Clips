const router = require('express').Router();
const { Bookmark } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const bookmarkData = await Bookmark.create(req.body);
        res.status(200).json(bookmarkData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
      const bookmarkData = await Bookmark.destroy({
        where: { id: req.params.id }
      });
      if (!bookmarkData) {
        res.status(404).json({ message: 'No bookmark with this id!' });
        return;
      }
      res.status(200).json(bookmarkData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports = router;