const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const bookmarkRoutes = require('./bookmarkRoutes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/bookmarks', bookmarkRoutes);

module.exports = router;
